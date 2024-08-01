import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { ProfileAbi, profileAddress } from "../constants/contract";

// Create a context for user data.
const ProfileContext = createContext();

// Custom hook for accessing user context data.
export const useUser = () => useContext(ProfileContext);

// Provider component that wraps parts of the app that need user context.
export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null); // Added user profile state
  const { address: account } = useAccount();
  const [accountName, setAccountName] = useState("");
  const [userLearnImage, setUserLearnImage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const route = useRouter();

  const conectwithContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window?.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(profileAddress, ProfileAbi, signer);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };

  const createProfile = async (
    learnToSpeak,
    spokenLanguage,
    userNames,
    image
  ) => {
    try {
      const contract = await conectwithContract();
      const tx = await contract.createAProfile(
        learnToSpeak,
        spokenLanguage,
        userNames,
        image
      );
      console.log(tx, hash);
      await tx.wait();
      setModalOpen(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserName = async () => {
    try {
      const contract = await conectwithContract();
      const name = await contract.retrieveUserName(account);
      setAccountName(name);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserLanguage = async () => {
    try {
      const contract = await conectwithContract();
      const name = await contract.retrieveLearnLanguage(account);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllAccount = async () => {
    try {
      const contract = await conectwithContract();
      const name = await contract.retriveallAccount();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserName();
    getUserLanguage();
    getAllAccount();
    fetchUserProfile(); // Fetch the user's profile when the component mounts
    fetchUserLanuageImage();
  }, [account]);

  // Fetch the user's profile data
  const fetchUserProfile = async () => {
    try {
      const contract = await conectwithContract();
      const profileData = await contract.getUserProfile(account);
      setUserProfile(profileData);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Fetch the user's profile data
  const fetchUserLanuageImage = async () => {
    try {
      const contract = await conectwithContract();
      const profileData = await contract.retriveLanugeImage(account);
      setUserLearnImage(profileData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const value = {
    createProfile,
    userProfile,
    accountName,
    userLearnImage,
    modalOpen,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
