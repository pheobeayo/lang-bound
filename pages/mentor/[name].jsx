import React from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import Navbar from "../../components/Navbar";
import Avatar from "react-avatar";
import { PhoneIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineMail, AiOutlineInstagram } from "react-icons/ai";

const MentorProfile = () => {
  return (
    <DefaultLayout>
      <Navbar />
      <div className="min-h-screen w-full overflow-y-scroll">
        <div className="relative bg-white md:w-full w-screen">
          <Image
            src="https://images.pexels.com/photos/18512532/pexels-photo-18512532/free-photo-of-a-mountain-range-with-a-small-pond-in-the-foreground.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" // Replace with your profile image URL
            alt="Profile Image"
            width={800}
            height={1800}
            className="mx-auto absolute top-[165px] md:top-[60px] left-6 my-4 w-[80px] h-[80px] md:h-[220px] md:w-[220px] rounded-full border-4 border-white"
          />

          <Image
            src="https://images.pexels.com/photos/18512532/pexels-photo-18512532/free-photo-of-a-mountain-range-with-a-small-pond-in-the-foreground.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" // Replace with your cover image URL
            alt="Cover Image"
            width={800}
            height={1800}
            className="w-full h-[250px] object-cover rounded mb-4"
          />
        </div>
        <div className="my-4 flex flex-row self-end w-full space-x-6 items-center justify-end px-4">
          <button className="border-4 p-2 border-black rounded-full">
            <BiPhoneCall size={24} color="black" />
          </button>
          <button className="border-4 p-2 border-black rounded-full">
            <AiOutlineMail size={24} color="black" />
          </button>
          <button className="border-4 p-2 border-black rounded-full">
            <AiOutlineInstagram size={24} color="black" />
          </button>
        </div>
        <div className="px-4 mt-4">
          <h2 className="text-3xl text-Black font-bold">John Doe</h2>
          <p className="text-gray-600">@johndoe</p>
          <p className="text-gray-600">Phone: +1 123-456-7890</p>
          {/* Add more details as needed */}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MentorProfile;
