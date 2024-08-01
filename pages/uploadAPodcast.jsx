import React, { useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useLacentContent } from "../context/LacentContentContext";
import ipfsClient from "ipfs-http-client";
import { uploadFile } from "@mintbase-js/storage";
import ConnectModal from "../components/ConnectModal";
import { useUser } from "../context/ProfileContext";
import { ethers } from "ethers";

const BeAMentor = () => {
  const route = useRouter();
  const { createAContent } = useLacentContent();
  const { accountName } = useUser();

  // Define state variables
  const [preferredImage, setPreferredImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [contentFile, setContentFile] = useState("");
  const [subscriptionCharge, setSubscriptionCharge] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Function to handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const uploadResult = await uploadFile(file);
        const imageUrl = `https://arweave.net/${uploadResult.id}`;
        // Here you can store the `imageHash` or display a link to the IPFS image
        console.log("IPFS Image Hash:", imageUrl);
        setPreferredImage(imageUrl);
        // You can also save the `imageHash` to your component's state or perform other actions.
      } catch (error) {
        console.error("Error uploading image to IPFS:", error);
      }
    }
  };

  const handleAudioUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const uploadResult = await uploadFile(file);
        const audioUrl = `https://arweave.net/${uploadResult.id}`;
        // Here you can store the `imageHash` or display a link to the IPFS image
        console.log("IPFS Image Hash:", audioUrl);
        setContentFile(audioUrl);
        // You can also save the `imageHash` to your component's state or perform other actions.
        if (audioUrl) {
          alert("Upload Sucessfull");
        }
      } catch (error) {
        console.error("Error uploading image to IPFS:", error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      let price = ethers.utils.parseEther(subscriptionCharge);
      // Pass the state variables to the createAcontent function
      await createAContent(
        name,
        preferredImage,
        description,
        contentFile,
        category,
        price
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-2xl p-8 border bg-white rounded shadow">
          <div className="flex items-center justify-between mb-8">
            <XIcon
              onClick={() => route.back()}
              className="text-black w-6 h-6 cursor-pointer"
            />
            <h2 className="text-black text-2xl font-medium">
              Upload A Podcast
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Content Name</label>
              <input
                type="text"
                className="w-full px-4 text-Black py-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700">Content File</label>
                <input
                  type="file"
                  className="w-full text-Black px-4 py-2 border rounded"
                  onChange={handleAudioUpload}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700">Content Image</label>
                <input
                  type="file"
                  className="w-full text-Black px-4 py-2 border rounded"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">
                Tell us about this content
              </label>
              <textarea
                rows="6"
                className="w-full text-Black px-4 py-2 border rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="">
              <label className="block text-gray-700">Content Category</label>
              <select
                className="w-full text-Black px-4 py-2 border rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="select">Select your Language</option>
                <option value="Music">Music</option>
                <option value="Podcast">Podcast</option>
                <option value="English">AudioBook</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">
                Your subscription charge
              </label>
              <input
                type="number"
                className="w-full px-4 text-Black py-2 border rounded"
                value={subscriptionCharge}
                onChange={(e) => setSubscriptionCharge(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="text-Accent"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              <span className="text-Black font-bold text-sm">
                I agree to Terms of Service and Privacy Policy
              </span>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-Accent text-Black w-full py-2 rounded"
              disabled={!agreeToTerms}
            >
              Submit your application
            </button>
          </div>
        </div>
      </div>
      {/* <ConnectModal detail="Nice uploading an awesome content for users to learn, time to make some rewrads." title="Podcast Uploaded Sucessfully" /> */}
    </div>
  );
};

export default BeAMentor;
