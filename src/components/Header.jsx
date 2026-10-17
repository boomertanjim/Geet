const Header = ({ current, setCurrent }) => {
  const buttons = [
    "Home",
    "Search",
    "Playlists",
    "Folders",
    "Albums",
    "Artists",
  ];

  return (
    <div className="[app-region:drag] flex items-center justify-between pl-3 w-full h-10">
      <div className="flex items-center gap-3">
        <div className=" bg-accent rounded-lg w-10 h-10"></div>
        <h1 className="text-2xl mt-1.5">Geet</h1>
      </div>
      <div className="flex justify-center items-center text-[22px] [app-region:no-drag]">
        {buttons.map((val, i) => (
          <div
            className={`h-15 flex justify-center flex-col hover:bg-hover duration-300 cursor-pointer ${
              i == current ? "bg-hover" : "bg-transparent"
            }`}
            onClick={() => setCurrent(i)}
            key={val}
          >
            <p className="mt-4 px-5 text-xl/tight">{val}</p>
            <div
              className={`w-full h-1 mt-1.5 rounded-3xl ${
                i == current ? "bg-accent" : "bg-transparent"
              }`}
              key={val}
            ></div>
          </div>
        ))}
      </div>
      <div className="h-full flex items-center justify-center [app-region:no-drag]">
        <div
          className="hover:bg-hover h-full w-15 flex justify-center items-center duration-75"
          onClick={() => window.windowControls?.minimize()}
        >
          <div className="bg-textgrey w-4 h-0.5 rounded-full"></div>
        </div>
        <div
          className="hover:bg-hover h-full w-15 flex justify-center items-center duration-75"
          onClick={window.windowControls?.toggleMaximize}
        >
          <img className="w-4 mb-0.5" src="/resize.svg" alt="None" />
        </div>
        <div
          className="hover:bg-hover h-full w-15 flex justify-center items-center duration-75"
          onClick={window.windowControls?.close}
        >
          <img className="w-6 mb-0.5" src="/cross.svg" alt="None" />
        </div>
      </div>
    </div>
  );
};

export default Header;
