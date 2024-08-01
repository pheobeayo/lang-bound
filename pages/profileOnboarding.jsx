import React, { useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useLacentContent } from "../context/LacentContentContext";
import { uploadFile } from "@mintbase-js/storage";
import { useUser } from "../context/ProfileContext";
import { languages } from "../utils";

const ProfileOnboarding = () => {
  const route = useRouter();
  const { createAContent } = useLacentContent();
  const { accountName } = useUser();

  // Define state variables
  const [preferredImage, setPreferredImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [contentFile, setContentFile] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

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
      } catch (error) {
        console.error("Error uploading image to IPFS:", error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const asv2 = new ASv2();
      try {
        await registerAttestation(number, USER_ACCOUNT);
        console.log("attestation registered");
      } catch (err) {
        // mostly likely reason registering would fail is if this issuer has already
        // registered a mapping between this number and account
      }
      console.log(await lookupAddresses(number));
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
              Create A Profile
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">
                What Language do you want to learn ?
              </label>
              <select
                name=""
                id=""
                className="w-full px-4 text-Black py-2 border rounded"
              >
                <option value="">Select Language</option>
                {languages.map((item, i) => (
                  <option value="" key={i}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700">Profile Image</label>
                <input
                  type="file"
                  className="w-full text-Black px-4 py-2 border rounded"
                  onChange={handleAudioUpload}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700">Profile Username</label>
                <input
                  type="text"
                  className="w-full text-Black px-4 py-2 border rounded"
                  // onChange={handleImageUpload}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700">Phone Contact</label>
                <input
                  type="text"
                  className="w-full text-Black px-4 py-2 border rounded"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div className="w-1/2">
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

export default ProfileOnboarding;
