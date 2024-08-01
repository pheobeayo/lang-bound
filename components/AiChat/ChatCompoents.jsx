import React from "react";
import { logo } from "../../assets/images";
import Image from "next/image";
import Avatar from "react-avatar";

const ChatComponents = ({ role, message }) => {
  const isAI = role === "ai";

  const containerStyles = isAI
    ? "self-start bg-Black w-full md:w-[240px] lg:w-[449px]"
    : "self-end bg-Grey/20 w-full md:w-[240px] lg:w-[449px] ml-auto";

  const textStyles = isAI
    ? "text-white text-[0.75rem] md:text-base"
    : "text-Black text-[0.75rem] md:text-base";

  return (
    <div className="w-full">
      <div
        className={`flex ${containerStyles} flex flex-col py-[15px] md:py-[20px] px-[20px] md:px-[30px] lg:px-[40px] space-y-3 rounded-[12px] mb-3`}
      >
        {isAI && (
          <Image
            src={logo}
            alt="logo"
            className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] object-contain"
          />
        )}
        {!isAI && (
          <Avatar
            size="32px"
            className="object-contain rounded-full md:size-[40px] lg:size-[50px]"
          />
        )}
        <p className={textStyles}>{message}</p>
      </div>
    </div>
  );
};

export default ChatComponents;
