import React from "react";
import Image from "next/image";
import { useTransferCUSD } from "../../constants/transferCUSD";

const StoreCard = ({ item }) => {
  const { transferCUSD } = useTransferCUSD();

  const handlePurchase = async (amount, newLives) => {
    try {
      transferCUSD("0xCD387d3D0F41dD17Fe0c2f9462fDEC6B54D7819D", amount);
      // Store lives in local storage (only on the client side)
      if (typeof window !== "undefined") {
        localStorage.setItem("userLives", newLives);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="md:max-w-[300px] w-full bg-white border border-gray-300  rounded-md overflow-hidden shadow-md">
      <Image
        src={item.image_url}
        alt="store"
        width={400}
        height={400}
        className="w-full h-40 object-cover object-center"
      />
      <div className="p-4">
        <h3 className="text-lg text-Black font-semibold mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-2">
          Num of Live: {item.lives_received}{" "}
        </p>
        <p className="text-gray-700">
          Receive {item.lives_received} lives, to have more fun playing our fun quiz
          and win more NFT Badges.
        </p>
      </div>

      <div
        onClick={() => handlePurchase(item.price_in_ether, item.lives_received)}
        className="bg-Black cursor-pointer p-3 flex justify-between items-center"
      >
        <button className="text-sm text-Accent focus:outline-none">
          Purcahse Now
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">
            {item.price_in_ether} <span className="text-yellow-200">cUSD</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
