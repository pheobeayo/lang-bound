import Link from "next/link";
import React from "react";
import { useFlow } from "../../context/FlowContext";
import { useRouter } from "next/router";

const IntroCard = () => {
  const { setActive } = useFlow();
  const route = useRouter();

  const handleRoute = () => {
    route.push("/quiz");
  };
  return (
    <div className="bg-Grey/900 p-[40px] w-[300px]  md:w-[700px] h-[200px] md:h-[150px] rounded-[8px]">
      <div className="md:flex-row flex flex-col items-center justify-between w-full">
        <div className="flex flex-col items-start space-y-[8px]">
          <h3 className="text-[16px] font-normal text-white">Hello OE</h3>
          <p className="md:w-[266px] w-[240px] text-[14px] text-Grey">
            Enhance your language skills in French by taking a quiz
          </p>
        </div>

        <button
          onClick={handleRoute}
          className="bg-Accent mt-4 text-Black py-[10px] px-[24px] rounded-[8px]"
        >
          Start quiz
        </button>
      </div>
    </div>
  );
};

export default IntroCard;
