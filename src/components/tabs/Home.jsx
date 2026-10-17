// import { parse } from "node:path";
import HomeMusicCard from "../cards/HomeMusicCard";
import HomePlaylistCard from "../cards/HomePlaylistCard";

const Home = () => {
  return (
    <div className="p-7 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Saved Playlists</h1>
      <div className="mb-8">
        <HomePlaylistCard />
      </div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">All Songs</h1>
        <div className="flex gap-2 bg-bg200 pl-3 rounded-2xl">
          <div className="group flex items-center">
            <svg
              width="18"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-textgrey group-hover:text-text duration-75"
            >
              <path
                d="M20.8 10.4C20.8 12.695 20.055 14.815 18.8 16.535L25.13 22.87C25.755 23.495 25.755 24.51 25.13 25.135C24.505 25.76 23.49 25.76 22.865 25.135L16.535 18.8C14.815 20.055 12.695 20.8 10.4 20.8C4.655 20.8 0 16.145 0 10.4C0 4.655 4.655 0 10.4 0C16.145 0 20.8 4.655 20.8 10.4ZM10.4 17.6C14.375 17.6 17.6 14.375 17.6 10.4C17.6 6.425 14.375 3.2 10.4 3.2C6.425 3.2 3.2 6.425 3.2 10.4C3.2 14.375 6.425 17.6 10.4 17.6Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <input type="text" placeholder="Search..." className="pt-0.5 w-50" />
        </div>
      </div>
      <div>
        <HomeMusicCard />
      </div>
    </div>
  );
};

export default Home;
