import Home from "./Home";
import Search from "./Search";
import Playlists from "./Playlists";
import Folders from "./Folders";
import Albums from "./Albums";
import Artists from "./Artists";

const Main = ({ current }) => {
  const tabs = [Home, Search, Playlists, Folders, Albums, Artists];
  return (
    <div className="flex-1 overflow-y-auto grid grid-cols-8">
      <div className="col-span-2 bg-bg200 rounded-tr-2xl p-2">
        <h1>Current Queue</h1>
      </div>
      <div className="col-span-6">
        {tabs.map((Component, i) => current == i && <Component key={i} />)}
      </div>
    </div>
  );
};

export default Main;
