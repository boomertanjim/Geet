// import { useState } from "react";

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
    <div className="flex items-center justify-between px-3 w-full h-15">
      <div className="flex items-center gap-3">
        <div className=" bg-accent rounded-lg w-10 h-10"></div>
        <h1 className="text-2xl mt-1.5">Geet</h1>
      </div>
      <div className="flex justify-center items-center text-[22px]">
        {buttons.map((val, i) => (
          <div
            className={`h-15 flex justify-center flex-col hover:bg-hover duration-300 cursor-pointer ${
              i == current ? "bg-hover" : "bg-transparent"
            }`}
            onClick={() => setCurrent(i)}
          >
            <p className="mt-4 px-5">{val}</p>
            <div
              className={`w-full h-1 mt-1.5 rounded-3xl ${
                i == current ? "bg-accent" : "bg-transparent"
              }`}
            ></div>
          </div>
        ))}
      </div>
      <div className="h-full flex items-center justify-center">
        <img className="w-10 mb-0.5" src="/cross.svg" alt="None" />
      </div>
    </div>
  );
};

export default Header;
