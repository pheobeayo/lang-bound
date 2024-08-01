import React from "react";
import Image from "next/image";
import {
  AiOutlineLike,
  AiOutlineShareAlt,
  AiOutlineComment,
} from "react-icons/ai";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useTransferCUSD } from "../constants/transferCUSD";

const PostCard = ({ item }) => {
  const { transferCUSD } = useTransferCUSD();

  const likePost = () => {
    console.log("Liked!");
  };

  const sharePost = () => {
    console.log("Shared!");
  };

  const commentPost = () => {
    console.log("Commented!");
  };

  // ...

  const tipPost = async (receiverAddress, amount) => {
    try {
      const receipt = await transferCUSD(item?.contentOwner, "0.1");
      console.log(receipt);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full  bg-white rounded-xl shadow-md overflow-hidden min-h-fit md:max-w-2xl">
      <Image
        className="w-full h-[400px] object-contain"
        width={300}
        height={300}
        src={item?.contentImage}
        alt="PostCard Image"
      />
      <div className="p-4">
        <p className="text-lg font-medium">{item?.contentPost}</p>
        <p className="text-gray-600">Post Owner: John Doe</p>

        <div className="flex justify-between mt-4">
          <button className="btn" onClick={likePost}>
            <AiOutlineLike size={24} />
          </button>
          <button className="btn" onClick={sharePost}>
            <AiOutlineShareAlt size={24} />
          </button>
          <button className="btn" onClick={commentPost}>
            <AiOutlineComment size={24} />
          </button>
          <button className="btn" onClick={() => tipPost(item.contentOwner, "1")}>
            <MdOutlineAttachMoney size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
