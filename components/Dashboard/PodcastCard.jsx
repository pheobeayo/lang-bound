import React from "react";
import Image from "next/image";
import { ClockIcon, PlayIcon } from "@heroicons/react/solid";

const PodcastCard = ({
  contentImage,
  contentName,
  contentDescription,
  audio_file,
  author,
}) => {
  return (
    <div className="bg-white cursor-pointer w-[300px] min-h-[250px] md:w-full p-4 shadow-md rounded-lg">
      <div className="md:flex flex-col space-y-[15px] items-center">
        <div>
          <Image
            src={contentImage}
            alt={contentName}
            width={96}
            height={96}
            className="md:w-24 md:h-24 w-full h-[96px] object-cover rounded-lg"
          />
        </div>
        <div className="ml-4 flex flex-col flex-grow">
          <span className="text-xl font-semibold text-black">{contentName}</span>
          <span className="text-sm text-gray-600 mt-2">{contentDescription}</span>
          <div className="flex items-center mt-2">
            <div className="flex items-center text-Orange">
              <ClockIcon className="w-4 h-4" />
              <span className="ml-2 font-medium">5:00</span>
            </div>
            <span className="ml-4 text-sm font-medium">
              Learn the perfect French accent
            </span>
          </div>
          <button className="bg-black  text-Accent flex items-center justify-center py-2 px-4 rounded-lg">
          <PlayIcon className="w-5 h-5 mr-2" />
          <span className="text-sm">Play Now</span>
        </button>
        </div>
        <button className="bg-black hidden text-Accent md:flex items-center py-2 px-4 rounded-lg">
          <PlayIcon className="w-5 h-5 mr-2" />
          <span className="text-sm">Play Now</span>
        </button>
      </div>
    </div>
  );
};

export default PodcastCard;
