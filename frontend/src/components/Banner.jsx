import React, { useRef, useEffect } from "react";
import bannerVideo from "../assets/banner.mp4";
import "./Banner.css";

const Banner = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const handleEnded = () => {
      video.currentTime = 0; // ✅ Rewind to beginning
      video.pause(); // ✅ Stay paused at start
    };

    if (video) {
      video.addEventListener("ended", handleEnded);
    }

    return () => {
      if (video) {
        video.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  return (
    <div className="banner">
      <video
        ref={videoRef}
        className="banner-video"
        src={bannerVideo}
        autoPlay
        muted
        playsInline
      />
      <div className="banner-content">
        <h1>Codex Arcana – Rise of the Reptilian Order</h1>
        <p>Unlock the Secrets of the Ancients</p>
        <div className="banner-buttons">
          <button>Learn More</button>
          <button>Enter the Arena</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
