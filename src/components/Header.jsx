import { useState } from "react";

const Header = () => {
  const buttons = ["Home", "Playlists", "Folders", "Albums", "Artists"];
  const [current, setCurrent] = useState(0);
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
        {/* <div className="h-15 flex justify-center flex-col hover:bg-hover duration-300 cursor-pointer bg-hover">
          <p className="mt-4 px-5">Home</p>
          <div className="bg-accent w-full h-1 mt-1.5 rounded-3xl"></div>
        </div>
        <div className="h-15 flex justify-center flex-col hover:bg-hover duration-300 cursor-pointer">
          <p className="mt-4 px-5">Playlists</p>
          <div className="bg-accent w-full h-1 mt-1.5 rounded-3xl hidden"></div>
        </div>
        <div className="h-15 flex justify-center flex-col hover:bg-hover duration-300 cursor-pointer">
          <p className="mt-4 px-5">Folders</p>
          <div className="bg-accent w-full h-1 mt-1.5 rounded-3xl hidden"></div>
        </div>
        <div className="h-15 flex justify-center flex-col hover:bg-hover duration-300 cursor-pointer">
          <p className="mt-4 px-5">Albums</p>
          <div className="bg-accent w-full h-1 mt-1.5 rounded-3xl hidden"></div>
        </div>
        <div className="h-15 flex justify-center flex-col hover:bg-hover duration-300 cursor-pointer">
          <p className="mt-4 px-5">Artists</p>
          <div className="bg-accent w-full h-1 mt-1.5 rounded-3xl hidden"></div>
        </div> */}
      </div>
      <div className="h-full flex items-center justify-center">
        <img className="w-10 mb-0.5" src="/cross.svg" alt="None" />
      </div>
    </div>
  );
};

export default Header;
