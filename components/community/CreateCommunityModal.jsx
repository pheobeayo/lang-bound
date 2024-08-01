// CreateCommunityModal.js
import React, { useState } from "react";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useFlow } from "../../context/FlowContext";
import { uploadFile } from "@mintbase-js/storage";

const CreateCommunityModal = ({ isOpen, onClose }) => {
  const [communityName, setCommunityName] = useState("");
  const [communityImage, setCommunityImage] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");

  const { createCommunity } = useFlow();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const uploadResult = await uploadFile(file);
        const audioUrl = `https://arweave.net/${uploadResult.id}`;
        // Here you can store the `imageHash` or display a link to the IPFS image

        setCommunityImage(audioUrl);
        // You can also save the `imageHash` to your component's state or perform other actions.
        if (audioUrl) {
          alert("upload successfull");
        }
      } catch (error) {
        console.error("Error uploading image to IPFS:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement your logic for community creation here
    const receipt = await createCommunity(
      communityName,
      communityDescription,
      communityImage
    );

    // Close the modal
    if (receipt) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal fixed top-0 z-[888888] flex items-center justify-center w-full h-screen bg-Black/50"
      overlayClassName="overlay"
    >
      <div className="flex md:w-[40%] flex-col text-Black p-8 bg-white rounded-md">
        <div className="flex flex-row items-center justify-between w-full">
          <h2 className="md:text-2xl text-lg font-bold mb-4">
            Create a Community
          </h2>
          <AiOutlineClose size={24} onClick={onClose} />
        </div>

        <label htmlFor="communityName" className="mb-2">
          Community Name:
        </label>
        <input
          type="text"
          id="communityName"
          value={communityName}
          onChange={(e) => setCommunityName(e.target.value)}
          className="border p-2 mb-4"
        />
        <label htmlFor="communityImage" className="mb-2">
          Community Image URL:
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 mb-4"
        />
        <label htmlFor="communityDescription" className="mb-2">
          Community Description:
        </label>
        <textarea
          id="communityDescription"
          value={communityDescription}
          onChange={(e) => setCommunityDescription(e.target.value)}
          className="border p-2 mb-4"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          onClick={handleSubmit}
        >
          Create Community
        </button>
      </div>
    </Modal>
  );
};

export default CreateCommunityModal;
