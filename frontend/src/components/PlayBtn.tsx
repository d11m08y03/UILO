import { useState } from "react";
import { Play, X } from "lucide-react";
import UILOvideo from "../assets/videos/UILO-Video.mp4"
const PlayButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Play Button */}
      <button
        onClick={handlePlayClick}
        className="flex items-center justify-center gap-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition lg:mt-5"
      >
        <Play className="lg:w-6 lg:h-6 h-4 w-4" />
        <h1>View our video</h1>
      </button>

      {/* Bigger Video Modal */}
      {isPlaying && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="relative bg-white p-4 rounded-lg w-[80%] max-w-4xl shadow-lg">
            {/* Close Button */}
            <button onClick={handleClose} className="absolute top-0 right-2 text-black">
              <X size={24} />
            </button>

            {/* Video Player */}
            <video controls autoPlay className="w-full h-[400px]">
              <source src={UILOvideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayButton;
