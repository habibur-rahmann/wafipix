"use client";

import { Source } from "@/data";
import { Volume2, VolumeX } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  sources: Source[];
  isVolumeControl?: boolean;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ sources, isVolumeControl = true }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMute, setMute] = useState<boolean>(true);

  const videoVolumeHandle = () => setMute(!isMute);

  useEffect(() => {
    if (videoRef.current) {
      if (isMute) {
        videoRef.current.muted = true;
      } else {
        videoRef.current.muted = false;
      }
    }
  }, [isMute]);
  return (
    <div className="w-full h-fit relative">
      <video className="w-full aspect-video" muted loop autoPlay ref={videoRef}>
        {sources?.map((source, index) => {
          return <source key={index} src={source.src} type={source.type} />;
        })}
      </video>
      {isVolumeControl ? (
        <div
          onClick={videoVolumeHandle}
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 backdrop-blur-3xl bg-primary/20  cursor-pointer hover:bg-primary/60 hover:scale-110 duration-300 rounded-full p-2"
        >
          {isMute ? (
            <VolumeX className="text-primary-foreground h-6 w-6 md:h-8 md:w-8" />
          ) : (
            <Volume2 className="text-primary-foreground h-6 w-6 md:h-8 md:w-8" />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default VideoPlayer;
