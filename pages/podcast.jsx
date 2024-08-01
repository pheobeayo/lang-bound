import React, { useState, useEffect } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import PodcastCard from "../components/podcast/PodcastCard";
import { SearchIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useLacentContent } from "../context/LacentContentContext";
import { useFlow } from "../context/FlowContext";

const Podcast = () => {
  const route = useRouter();
  const { walletAddress } = useFlow();
  const [allContent, setAllContent] = useState([]);
  const { getAllContent } = useLacentContent();
  console.log(allContent);

  useEffect(() => {
    const getContent = async () => {
      const result = await getAllContent();
      console.log(result);
      setAllContent(result);
    };
    getContent();
  }, [walletAddress, getAllContent]);

  return (
    <DefaultLayout>
      <Navbar />
      <div className="text-Black h-screen p-[20px] overflow-y-scroll">
        <span className="text-[24px] font-normal">Podcast</span>
        <div className="flex items-center justify-around space-x-4 sm:space-x-9 w-full">
          <div className="flex bg-white border border-Grey p-3 sm:p-5 items-start space-x-2 sm:space-x-5 w-full sm:w-[90%]">
            <SearchIcon className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] object-contain" />
            <input
              placeholder="Search podcasts"
              className="w-full border-none outline-none bg-transparent text-[14px] sm:text-[16px]"
            />
          </div>
          <button
            onClick={() => route.push("/uploadAPodcast")}
            className="bg-Accent w-[30%] sm:w-[10%] py-[10px] text-[14px] sm:text-[16px] font-medium text-Black flex items-center justify-center"
          >
            Upload Podcast
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-[33px] gap-y-11 mb-[60px] mt-[20px] sm:mt-[62px]">
          {!allContent ? (
            <div>No Content Available</div>
          ) : (
            <div>
              {allContent?.map((item) => (
                <PodcastCard key={Number(item.id)} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Podcast;
