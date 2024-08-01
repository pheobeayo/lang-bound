import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PostCard from "../../components/PostCard";
import { FaImage, FaVideo } from "react-icons/fa";
import { useFlow } from "../../context/FlowContext";
import { useAccount } from "wagmi";
import { useCommunity } from "../../context/CommunityContext";
import { uploadFile } from "@mintbase-js/storage";

const CommunityScreen = ({ selectedCommunity }) => {
  const [isPartOfCommunity, setIsPartOfCommunity] = useState(false);
  const { retriveCommunityPost } = useCommunity();
  const [allCommunityPost, setAllCommunityPost] = useState([]);

  const { address } = useAccount();
  useEffect(() => {
    const retrive = async () => {
      const result = await retriveCommunityPost(selectedCommunity.communityId);
      setAllCommunityPost(result)
    };
    retrive();
  }, [address, allCommunityPost]);

  // Check if the user is part of the selected community
  useEffect(() => {
    // Assuming 'communities' is an array of community IDs the user is part of
    const userIsPartOfCommunity =
      selectedCommunity.communityMembers.includes(address);
    console.log(userIsPartOfCommunity);
    setIsPartOfCommunity(userIsPartOfCommunity);
  }, [selectedCommunity, address]);

  const { joinCommunity } = useFlow();

  const handleJoinCommunity = async () => {
    joinCommunity(Number(selectedCommunity?.communityId));
  };

  return (
    <div>
      <div className="flex items-center space-x-9">
        <AiOutlineArrowLeft size={24} />
        <span className="text-[26px] font-bold">Community</span>
      </div>
      <div className="mb-[105px]">
        <Image
          src={selectedCommunity?.image}
          alt={selectedCommunity.communityName}
          width={400}
          height={400}
          className="w-full h-[190px] object-cover"
        />
        <div className="md:flex-row flex flex-col items-center justify-between px-4 py-2.5 w-full">
          <div className="flex flex-col items-start mt-5">
            <span className="text-[26px] font-bold leading-[26px]">
              {selectedCommunity?.communityName}
            </span>
            <span>{selectedCommunity?.communityMembers.length} Members</span>
          </div>
          <div className="flex items-center space-x-5">
            {isPartOfCommunity && (
              <button
                type="submit"
                className="bg-Accent text-Black px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-blue"
              >
                Leave Community
              </button>
            )}
            {!isPartOfCommunity && (
              <button
                onClick={handleJoinCommunity}
                type="submit"
                className="bg-Accent text-Black px-4 py-2 rounded-md  focus:outline-none focus:shadow-outline-blue"
              >
                Join Community
              </button>
            )}
          </div>
        </div>

        <SubmitPost
          selectedCommunity={selectedCommunity}
          isPartOfCommunity={isPartOfCommunity}
        />
        <div className="flex flex-wrap items-center justify-center md:items-start md:justify-start gap-[20px] ">
          {allCommunityPost.map((item, index) => (
            <PostCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityScreen;

const SubmitPost = ({ isPartOfCommunity, selectedCommunity }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const { createPost } = useCommunity();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const uploadResult = await uploadFile(file);
        const audioUrl = `https://arweave.net/${uploadResult.id}`;
        // Here you can store the `imageHash` or display a link to the IPFS image
        setFile(audioUrl);
        // You can also save the `imageHash` to your component's state or perform other actions.
        if(audioUrl){
          alert("upload sucessfull")
        }
      } catch (error) {
        console.error("Error uploading image to IPFS:", error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPartOfCommunity) {
      createPost(file, text, Number(selectedCommunity?.communityId));
    } else {
      alert("not a member");
    }
  };

  return (
    <div className="container bg-white shadow-xl rounded-md p-2 w-[80%] mb-6 mt-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            id="text"
            name="text"
            rows="4"
            value={text}
            onChange={handleTextChange}
            placeholder="What are you thinking... 😉"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 flex flex-col md:flex-row items-center md:items-start md:justify-between">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <label
              className="cursor-pointer text-blue-500 hover:underline"
              htmlFor="imageFile"
            >
              <FaImage size={24} color="#30F2A1" className="mr-2" />
            </label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              className="cursor-pointer text-blue-500 hover:underline"
              htmlFor="videoFile"
            >
              <FaVideo size={24} color="#30F2A1" className="mr-2" />
            </label>
            {/* <input
              type="file"
              id="videoFile"
              name="videoFile"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            /> */}
          </div>
          <button
            type="submit"
            className="bg-Accent text-Black px-8 py-2 rounded-md focus:outline-none focus:shadow-outline-blue"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
