import Home from "./tabs/Home";
import Search from "./tabs/Search";
import Playlists from "./tabs/Playlists";
import Folders from "./tabs/Folders";
import Albums from "./tabs/Albums";
import Artists from "./tabs/Artists";
import { useState } from "react";

const Main = ({ current }) => {
  const tabs = [Home, Search, Playlists, Folders, Albums, Artists];
  const [songs, setSongs] = useState([]);
  return (
    <div className="flex-1 overflow-y-auto grid grid-cols-8">
      <div className="col-span-2 bg-bg200 rounded-tr-2xl p-2">
        <h1>Current Queue</h1>
      </div>
      <div className="col-span-6">
        {tabs.map(
          (Component, i) =>
            current == i && (
              <Component key={i} setSongs={setSongs} songs={songs} />
            ),
        )}
      </div>
    </div>
  );
};

export default Main;
