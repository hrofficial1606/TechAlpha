import React from "react";

function BackgroundVideo()
{
  return (
    <div className="video-container">
      <video autoPlay muted loop playsInline className="bg-video">
        <source
          src="../public/video/BgVideo.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default BackgroundVideo;