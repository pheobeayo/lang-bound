import React, { useState, useEffect } from "react";
import { useLacentContent } from "../../context/LacentContentContext";
import Image from "next/image";
import { ClockIcon } from "@heroicons/react/solid";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { useTransferCUSD } from "../../constants/transferCUSD";

const PodcastCard = ({ item }) => {
  const { allContent, purcahseAContent } = useLacentContent();
  const { transferCUSD } = useTransferCUSD();
  const { address } = useAccount();
  const [isPurchased, setIsPurcahsed] = useState(false);

  const handlePurcahse = async (id, amount) => {
    const res = await transferCUSD(id, amount);
    setIsPurcahsed(true);
  };

  // // Check if the user is part of the selected community
  // useEffect(() => {
  //   // Assuming 'communities' is an array of community IDs the user is part of
  //   const userIsPartOfCommunity = item.buyer.includes(address);
  //   setIsPurcahsed(userIsPartOfCommunity);
  // }, [item, address]);

  return (
    <div className="md:max-w-[300px] w-full bg-white border border-gray-300 rounded-md overflow-hidden  shadow-md">
      <Image
        src={item.contentImage}
        alt={item.contentName}
        width={400}
        height={400}
        className="w-full h-40 object-cover object-center"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{item.contentName}</h3>
        <p className="text-gray-600 mb-2">Category: {item.category}</p>
        <p className="text-gray-700">{item.contentDescription}</p>
      </div>

      {!isPurchased && (
        <div
          onClick={() =>
            handlePurcahse(
              item.contentOwner,
              Number(ethers.utils.formatEther(item.amount)).toString()
            )
          }
          className="bg-Accent p-3 flex justify-between items-center"
        >
          <button className="text-sm text-Black focus:outline-none">
            Purchase Now
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">
              {Number(ethers.utils.formatEther(item.amount))}{" "}
              <span className="text-yellow-200">cUSD</span>
            </span>
          </div>
        </div>
      )}

      {isPurchased && (
        <div className="bg-Black p-3 flex justify-between items-center">
          <button className="text-sm text-Accent focus:outline-none">
            Listen Now
          </button>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-gray-500"
            >
              <path d="M12 2s-4 8-8 8 8 12 8 12 8-8 8-12-4-12-8-12zm0 0v12m0 0s-3-4-8-4" />
            </svg>
            <span className="text-gray-500">23</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PodcastCard;
