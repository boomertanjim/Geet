const Artists = () => {
  return (
    <div className="p-7 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Playlists</h1>
      <div className="w-32 h-43 hover:bg-hover duration-150 rounded-sm flex flex-col gap-2.5 items-center">
        <img
          src="/cover.jpg"
          alt=""
          className="w-25.5 h-25.5 bg-accent rounded-full mt-3"
        />
        <div className="w-32 text-center">
          <p className="text-[22px]">Playlist</p>
        </div>
      </div>
    </div>
  );
};

export default Artists;
