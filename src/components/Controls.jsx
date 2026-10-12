import { useState } from "react";

const Controls = () => {
  const [volume, setVolume] = useState(70);
  const [playback, setPlayback] = useState(70);

  return (
    <div className="h-23 shrink-0 bg-bg100 flex justify-between px-2">
      <div className="flex justify-center items-center gap-3">
        <img src="/cover.jpg" alt="cover" className="w-18 h-18 rounded-xl" />
        <div>
          <p className="text-2xl">Song Name</p>
          <p className="text-sm">Artist Name</p>
        </div>
      </div>
      <div className="flex-col flex justify-center items-center gap-1">
        <div className="flex flex-row gap-4">
          <img src="/forward.svg" alt="fwd" className="w-4 -scale-x-100" />
          <div className="w-10 h-10 bg-accent rounded-full flex justify-center items-center">
            <img src="/play.svg" alt="Play" className="w-5 ml-1" />
          </div>
          <img src="/forward.svg" alt="fwd" className="w-4" />
        </div>
        <div>
          <input
            type="range"
            min={0}
            max={100}
            defaultValue={70}
            onChange={(e) => setPlayback(e.target.value)}
            className="playbackSlider"
            style={{
              "--value": `${playback}%`,
            }}
          />
        </div>
      </div>
      <div className="flex items-center">
        <img src="/volume.svg" alt="volume slider" className="w-7 mr-2" />
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
