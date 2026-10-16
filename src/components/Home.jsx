import HomeMusicCard from "./HomeMusicCard";
import HomePlaylistCard from "./HomePlaylistCard";

const Home = () => {
  return (
    <div className="p-7 flex flex-col gap-4">
      <h1 className="text-2xl">Saved Playlists</h1>
      <div className="mb-8">
        <HomePlaylistCard />
      </div>
      <div className="flex justify-between">
        <h1 className="text-2xl">All Songs</h1>
        <div>
          <img src="" alt="" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div>
        <HomeMusicCard />
      </div>
    </div>
  );
};

export default Home;
