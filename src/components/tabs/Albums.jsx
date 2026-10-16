const Albums = () => {
  return (
    <div className="p-7 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Albums</h1>
      <div className="w-42 h-57 hover:bg-hover duration-150 rounded-sm flex flex-col gap-2.5 items-center">
        <img src="/cover.jpg" alt="" className="rounded-xl w-35 mt-3" />
        <div className="w-33">
          <p className="text-[22px]">Album</p>
          <p className="text-[14px] font-light">Artist Name</p>
          <p className="text-[14px] font-light">0 songs</p>
        </div>
      </div>
    </div>
  );
};

export default Albums;
