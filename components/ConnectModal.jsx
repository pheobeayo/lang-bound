import React, { useState } from "react";
import { useFlow } from "../context/FlowContext";
import { useRouter } from "next/router";
import { XIcon } from "@heroicons/react/solid";
import { useUser } from "../context/ProfileContext";
import Image from "next/image";
import { success } from "../assets/images";

const ConnectModal = ({ title, detail}) => {
  const route = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white py-[27px] px-[24px] rounded-lg shadow-lg w-[434px] h-[452px]">
      <Image src={success} alt="success" className="w-[208p h-[208px] object-contain flex items-center justify-center w-full" />
        <div className="flex items-center justify-between w-full mb-9">
          <h2 className="text-[22px] font-semibold text-black">
            {title}
          </h2>
        </div>
        <p className="text-gray-700">
          {detail}
        </p>
     
        <div className="mt-6">
          <button
            onClick={() => route.push("/dashboard")}
            className="bg-Accent text-white w-full rounded-lg py-3"
          >
            Go to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
