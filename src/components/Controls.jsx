import { useState } from "react";

const Controls = () => {
  const [volume, setVolume] = useState(70);

  return (
    <div className="h-23 shrink-0 bg-bg200 flex justify-between px-2">
      <div className="flex justify-center items-center gap-3">
        <img src="/cover.jpg" alt="cover" className="w-18 h-18 rounded-xl" />
        <div>
          <p className="text-2xl">Song Name</p>
          <p className="text-sm">Artist Name</p>
        </div>
      </div>
      <div className="flex-row flex justify-center">
        <div>
          <div className="w-12 h-12 bg-accent rounded-full"></div>
        </div>
        <div></div>
      </div>
      <div className="flex items-center">
        <img src="/volume.svg" alt="volume slider" className="w-7" />
        <input
          type="range"
          min={0}
          max={100}
          defaultValue={70}
          onChange={(e) => setVolume(e.target.value)}
          className="volumeSlider"
          style={{
            "--value": `${volume}%`,
          }}
        />
      </div>
    </div>
  );
};

export default Controls;
