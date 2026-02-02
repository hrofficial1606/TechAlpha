import React from "react";
import video from "../assets/BgVideo.mp4"

function BackgroundVideo()
{
  return (
    <div className="video-container">
      <video autoPlay muted loop playsInline className="bg-video">
        <source
          src={video}
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default BackgroundVideo;