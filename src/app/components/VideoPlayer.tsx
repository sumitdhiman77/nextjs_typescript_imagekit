"use client";

import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import "videojs-http-source-selector";

// Explicitly register the plugin

// Define a consistent type for the player instance.
// This ensures the type is correctly derived from the `videojs` function itself.
type PlayerInstance = ReturnType<typeof videojs>;

export default function VideoPlayer({
  videoUrl,
  poster,
}: {
  videoUrl: string;
  poster: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Use the newly defined PlayerInstance type for the ref
  const playerRef = useRef<PlayerInstance | null>(null);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      const player = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: "auto",
        fluid: true,
        // plugins: {
        //   httpSourceSelector: { default: "auto" },
        // },
      });

      // The player variable is now correctly typed as PlayerInstance
      playerRef.current = player;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="pt-0" data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered w-full rounded-lg"
        poster={poster}
      >
        <source
          src={`${videoUrl}/ik-master.m3u8?tr=sr-240_360_480_720`}
          type="application/x-mpegURL"
        />
      </video>
    </div>
  );
}
