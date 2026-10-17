const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("node:fs/promises");
const path = require("node:path");
const dataBase = require("better-sqlite3");
const { parseFile } = require("music-metadata");
const { inspect } = require("node:util");

const isDev = !app.isPackaged;
const dbPath = path.join(app.getPath("userData"), "songs.db");
const db = new dataBase(dbPath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

//DB functions

const schema = [
  `
  CREATE TABLE IF NOT EXISTS songs(
    id            INTEGER PRIMARY KEY,
    title         TEXT NOT NULL,
    album_id      INTEGER REFERENCES albums(id) ON DELETE SET NULL,
    path          TEXT UNIQUE,
    folder_id     INTEGER REFERENCES folders(id) ON DELETE SET NULL,
    codec         TEXT NOT NULL,
    duration      REAL,
    bitrate       REAL,
    sample_rate   REAL,
    cover         BLOB,
    release_year  INTEGER,
    is_fav        INTEGER NOT NULL DEFAULT 0,
    play_count    INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS playlists(
    id    INTEGER PRIMARY KEY,
    name  TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS playlists_songs(
    playlist_id  INTEGER NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
    song_id      INTEGER NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
    position     INTEGER NOT NULL,
    PRIMARY KEY (playlist_id, song_id)
  );

  CREATE TABLE IF NOT EXISTS artists(
    id    INTEGER PRIMARY KEY,
    name  TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS artists_songs(
    artist_id    INTEGER NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    song_id      INTEGER NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
    position     INTEGER NOT NULL,
    PRIMARY KEY (artist_id, song_id)
  );

  CREATE TABLE IF NOT EXISTS albums(
    id    INTEGER PRIMARY KEY,
    name  TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS folders(
    id    INTEGER PRIMARY KEY,
    name  TEXT NOT NULL,
    path  TEXT UNIQUE
  );
`,
];

function migrate() {
  const ver = db.pragma("user_version", { simple: true });
  db.transaction(() => {
    for (let i = ver; i < schema.length; i++) {
      db.exec(schema[i]);
      db.pragma(`user_version = ${i + 1}`);
    }
  })();
}

migrate();

const insertSong = db.prepare(
  "INSERT INTO songs (title, path, album_id, folder_id, codec, duration, bitrate, sample_rate, cover, release_year) VALUES (@title, @path, @album_id, @folder_id, @codec, @duration, @bitrate, @sample_rate, @cover, @release_year)",
);

const insertPlaylist = db.prepare(
  "INSERT INTO playlists (name) VALUES (@name)",
);

const insertArtist = db.prepare("INSERT INTO artists (name) VALUES (@name)");

const insertAlbum = db.prepare("INSERT INTO albums (name) VALUES (@name)");

const insertFolder = db.prepare(
  "INSERT INTO folders (name, path) VALUES (@name, @path)",
);

const findSong = db.prepare("SELECT id FROM songs WHERE path = ?");

const findArtist = db.prepare("SELECT id FROM artists WHERE name = ?");

const findAlbum = db.prepare("SELECT id FROM albums WHERE name = ?");

const findFolder = db.prepare("SELECT id FROM folders WHERE path = ?");

const linkArtistToSong = db.prepare(`
    INSERT OR IGNORE INTO artists_songs (artist_id, song_id, position)
    VALUES (?, ?, ?)
  `);

const linkPlaylistToSong = db.prepare(`
    INSERT OR IGNORE INTO playlists_songs (playlist_id, song_id, position)
    VALUES (?, ?, ?)
  `);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Geet",
    titleBarStyle: "hidden",
    resizable: true,
    ...(process.platform !== "darwin" ? { titleBarOverlay: true } : {}),
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      enableRemoteModule: true,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL("http://localhost:5173");

  win.setMenuBarVisibility(false);

  if (isDev) {
    win.webContents.once("dom-ready", () => {
      win.webContents.openDevTools();
      setTimeout(() => {
        win.webContents.reload();
      }, 500);
    });
  }
}

// Windows Controls

ipcMain.on("window:minimize", (event) => {
  BrowserWindow.fromWebContents(event.sender)?.minimize();
});

ipcMain.on("window:close", (event) => {
  BrowserWindow.fromWebContents(event.sender)?.close();
});

ipcMain.handle("window:toggle-maximize", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win) return false;

  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }

  return win.isMaximized();
});

ipcMain.handle("window:is-maximized", (event) => {
  return BrowserWindow.fromWebContents(event.sender)?.isMaximized() ?? false;
});

// Folder Selection

ipcMain.handle("folder:prompt", async (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);

  const r = await dialog.showOpenDialog(win, {
    title: "Select Folder",
    properties: ["openDirectory"],
  });

  if (r.canceled || r.filePaths.length == 0) {
    return [];
  }

  const folderPath = r.filePaths[0];

  const s = await fs.readdir(folderPath, {
    withFileTypes: true,
  });

  const songs = s
    .filter(
      (song) =>
        song.isFile() &&
        [".flac", ".mp3", ".wav", ".ogg", ".m4a"].includes(
          path.extname(song.name).toLowerCase(),
        ),
    )
    .map((song) => ({
      name: song.name,
      path: path.join(folderPath, song.name),
    }));

  let skipped = 0;
  let failed = 0;
  let imported = 0;

  for (const song of songs) {
    const filePath = song.path;

    if (findSong.get(filePath)) {
      skipped++;
      continue;
    }

    try {
      const metaData = await parseFile(filePath);

      const saveSong = db.transaction(() => {
        let folder = findFolder.get(folderPath);
        if (!folder) {
          const result = insertFolder.run({
            name: folderPath,
            path: folderPath,
          });

          folder = { id: Number(result.lastInsertRowid) };
        }

        const albumName = metaData.common?.album?.trim() || null;
        let albumId = null;

        if (albumName) {
          let album = findAlbum.get(albumName);

          if (!album) {
            const result = insertAlbum.run({
              name: albumName,
            });
            album = { id: Number(result.lastInsertRowid) };
          }
          albumId = album.id;
        }

        const title =
          metaData.common.title?.trim() ||
          path.basename(song.path, path.extname(song.path));
        const result = insertSong.run({
          title: title,
          path: filePath,
          album_id: albumId,
          folder_id: folder.id,
          codec: metaData.format?.codecName ?? "unknown",
          duration: metaData.format.duration ?? null,
          bitrate: metaData.format.bitrate ?? null,
          sample_rate: metaData.format.sampleRate ?? null,
          cover: metaData.common.picture?.[0]?.data ?? null,
          release_year: metaData.common.year ?? null,
        });
        const songId = Number(result.lastInsertRowid);

        const artistsString =
          metaData.common.artist || metaData.common.artist?.join(", ") || "";
        const artists = artistsString
          .split(",")
          .map((name) => name.trim())
          .filter(Boolean);

        artists.forEach((artistName, position) => {
          let artist = findArtist.get(artistName);

          if (!artist) {
            const result = insertArtist.run({ name: artistName });

            artist = { id: Number(result.lastInsertRowid) };
          }

          linkArtistToSong.run(artist.id, songId, position);
        });
      });

      saveSong();
      imported++;
    } catch (error) {
      failed++;
      return error;
    }
  }

  return { imported, skipped, failed, dbPath };
});

// songs Database funcs

// ipcMain.on("initialize-db", (event) => {});

app.whenReady().then(async () => {
  if (isDev) {
    try {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require("electron-devtools-installer");
      const name = await installExtension(REACT_DEVELOPER_TOOLS);
    } catch (e) {
      console.log("ERROR: ", e);
    }
  }
  createWindow();
});
