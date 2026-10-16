const HomePlaylistCard = () => {
  return (
    <div className="flex gap-3 items-center bg-bg200 w-60 rounded-lg p-2">
      <img src="/cover.jpg" alt="" className="w-12 rounded-lg" />
      <h2 className="text-lg">Playlist Name</h2>
    </div>
  );
};

export default HomePlaylistCard;
