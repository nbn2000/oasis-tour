import React, { useEffect, useRef, useState } from 'react';

const VideoThumb: React.FC<{ src: string; className?: string; rounded?: string }> = ({
  src,
  className = '',
  rounded = 'rounded-lg',
}) => {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Ensure attributes are correct
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    // Try to autoplay; if blocked, we’ll still show frame
    const tryPlay = async () => {
      try {
        await v.play();
        setPaused(false);
      } catch {
        // Autoplay might be blocked; leave paused=true
        setPaused(true);
      }
    };
    tryPlay();
  }, [src]);

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <div
      onClick={toggle}
      className={`relative cursor-pointer overflow-hidden border bg-black/5 ${rounded} ${className}`}
      role="button"
      aria-label="Toggle video"
    >
      <video
        ref={ref}
        src={src}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        // no controls — it should look like an image
      />
      {/* Play/Pause hint overlay */}
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition ${
          paused ? 'bg-black/20 opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#fff">
            {paused ? (
              // Play icon
              <path d="M8 5v14l11-7z" />
            ) : (
              // Pause icon
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default VideoThumb;
