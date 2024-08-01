import React from "react";
import { mentors } from "../../utils";
import Image from "next/image";
import Avatar from "react-avatar";
import { useMentor } from "../../context/MentorContext";
import Link from "next/link";
import { useUser } from "../../context/ProfileContext";

const AllMentorCard = () => {
  const { alllMentors } = useMentor()
  const { accountName} = useUser()
  return (
    <div className="flex items-start justify-start gap-[20px] w-[300px] md:w-[700px] bg-white py-[34px] px-[18.89px]">
      {alllMentors.slice(0, 6).map((item, i) => (
        <Link href={`/mentor/${item.accountOwner}`} key={i} className="flex flex-col items-start w-full">
          <Avatar className="rounded-full w-[28px] h-[28px]" size="58px" src={item.userName} />
          <span className="text-Black">{accountName}</span>
        </Link>
      ))}
    </div>
  );
};

export default AllMentorCard;
