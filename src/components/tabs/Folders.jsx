const Folders = ({ setSongs }) => {
  const handleSongs = async () => {
    try {
      const songs = await window.electronAPI.folderPrompt();
      console.log("Songs returned from Electron:", songs);
      setSongs(songs);
      const metaData = await window.electronAPI.findMetaData(songs);
      console.log(metaData);
    } catch (error) {
      console.log("Failed: ", error);
    }
  };
  return (
    <div className="p-7 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-2xl/none font-bold pt-2">Music Folders</p>
        <div>
          <div
            className="group px-2 py-1 flex gap-2 items-center border-textgrey hover:border-accent border-4 rounded-3xl duration-75 cursor-pointer"
            onClick={handleSongs}
          >
            <svg
              width="16"
              viewBox="0 0 43 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-text group-hover:text-accent duration-75"
            >
              <path
                d="M3.04169 21.2917H39.5417M21.2917 3.04169V39.5417"
                stroke="currentColor"
                strokeWidth="6.08333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-text text-sm pt-0.5 group-hover:text-text">
              Add Folder
            </p>
          </div>
        </div>
      </div>
      <div className="bg-bg100 h-12 rounded-lg flex items-center pl-5">
        <h1>1. Bangla</h1>
      </div>
    </div>
  );
};

export default Folders;
