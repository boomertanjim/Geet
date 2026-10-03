const Controls = () => {
  return (
    <div className="h-23 shrink-0 bg-bg200 flex justify-between px-2">
      <div className="flex justify-center items-center gap-3">
        <img src="/cover.jpg" alt="cover" className="w-18 h-18 rounded-xl" />
        <div>
          <p className="text-2xl">Song Name</p>
          <p className="text-sm">Artist Name</p>
        </div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
      <div></div>
    </div>
  );
};

export default Controls;
