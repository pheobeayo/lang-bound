import { useContext, createContext, useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/typedefs";
import {
  MentorAbi,
  MentorAddress,
  claimNFTS,
  createPodcast,
  getToken,
} from "../constants/contract";
import { useFlow } from "./FlowContext";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const MentorContext = createContext();

// Custom hook to use the Flow context
export const useMentor = () => useContext(MentorContext);

export const MentorProvider = ({ children }) => {
  const [alllMentors, setAllMentors] = useState([]);
  const [charges, setCharges] = useState(0);
  const [userProfile, setUserProfile] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const { address: account } = useAccount();
  const mentorAddress = MentorAddress;
  const mentorABI = MentorAbi;

  const conectwithContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window?.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(mentorAddress, mentorABI, signer);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };

  const beAMentor = async (
    _languageToTeach,
    _chargingPrice,
    _aboutYou,
    _experience,
    _contact,
    _userName
  ) => {
    try {
      const contract = await conectwithContract();
      const tx = await contract.createAMentorAccount(
        _languageToTeach,
        _chargingPrice,
        _aboutYou,
        _experience,
      );
      console.log(tx.hash);
      await tx.wait();
      setModalOpen(true);
      return `https://explorer.testnet.aurora.dev/tx/${tx.hash}`;
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchUserCharges = async () => {
    try {
      const contract = await conectwithContract();
      const mentorCharge = await contract.retriveUserCharge(account);
      setCharges(Number(mentorCharge));
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAllMentors = async () => {
    try {
      const contract = await conectwithContract();
      const profiles = await contract.retreiveAllMentor();
      setAllMentors(profiles);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const contract = await conectwithContract();
      const profileData = await contract.retriveUserAccountByAddress(account);
      setUserProfile(profileData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchUserCharges();
    fetchAllMentors();
  }, [account]);

  const value = {
    beAMentor,
    alllMentors,
    charges,
    modalOpen,
  };
  return (
    <MentorContext.Provider value={value}>{children}</MentorContext.Provider>
  );
};
