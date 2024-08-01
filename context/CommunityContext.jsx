import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useConnect, useAccount } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ethers } from "ethers";
import {
  postAbi,
  postAddress,
} from "../constants/contract";

// Create the context with default values
const communityContext = createContext(undefined);

// Custom hook to use the Flow context
export const useCommunity = () => useContext(communityContext);

// Provider component to wrap around components that need access to the context
export const CommunityProvider = ({ children }) => {
  const [allCommunityPost, setAllCommunityPost] = useState([]);
  const [active, setActive] = useState("learn");
  const [modalOpen, setModalOpen] = useState(false);
  const [isUserMember, setIsUserMember] = useState(false);
  const { address, isConnected } = useAccount();

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  useEffect(() => {
    if (!isConnected) {
      connect();
    }
  }, [address]);

  const conectwithContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window?.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(postAddress, postAbi, signer);
      return contract;
    } catch (error) {
      console.error(error);
    }
  };

  // Function to create a new community
  const createPost = async (image, post, _communityId) => {
    try {
      const contract = await conectwithContract();
      if (contract) {
        const tx = await contract.createPost(image, post, _communityId);
        // Wait for the tx to be mined
        const receipt = await tx.wait();

        // Retrieve the tx hash from the receipt
        const transactionHash = receipt.transactionHash;

        // You may want to add additional logic here, such as updating state or showing a success message.
        return transactionHash;
      }
    } catch (error) {
      console.error("Error creating community:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const retriveCommunityPost = async (_communityID) => {
    try {
      const contract = await conectwithContract();
      // Call the retreiveCommunity function
      const communities = await contract.fetchPostByCommunityId(_communityID);
      setAllCommunityPost(communities)
      // Return the result
      return communities;
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <communityContext.Provider
      value={{
        allCommunityPost,
        active,
        modalOpen,
        setModalOpen,
        isUserMember,
        createPost,
        setActive,
        retriveCommunityPost
      }}
    >
      {children}
    </communityContext.Provider>
  );
};
