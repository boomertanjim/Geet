const HomeMusicCard = () => {
  return (
    <div className="relative bg-[url('/cover.jpg')] w-70 h-38 rounded-2xl bg-cover bg-center">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 h-full grid grid-rows-2">
        <div className="row-span-1"></div>
        <div className="row-span-1 flex items-end justify-between flex-row px-3 pb-3">
          <div className="flex flex-col">
            <p className="text-2xl font-bold">Song Name</p>
            <p className="text-sm">Artist Name</p>
          </div>
          <div className="w-10 h-10 bg-text rounded-full flex justify-center items-center mb-2">
            <img src="/play.svg" alt="" className="w-4.5 ml-1 bg-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMusicCard;
