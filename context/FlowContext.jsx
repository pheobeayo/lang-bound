import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { communityAbi, communityAddress } from "../constants/contract";
import { connect, disconnect } from 'starknetkit'
import { useRouter } from "next/router";


// Create the context with default values
const FlowContext = createContext(undefined);

// Custom hook to use the Flow context
export const useFlow = () => useContext(FlowContext);

// Provider component to wrap around components that need access to the context
export const FlowProvider = ({ children }) => {
  const [allCommunity, setAllCommunity] = useState([]);
  const [active, setActive] = useState("learn");
  const [modalOpen, setModalOpen] = useState(false);
  const [isUserMember, setIsUserMember] = useState(false);
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const [provider, setProvider] = useState()
  const [connection, setConnection] = useState()
  const route = useRouter()


  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
 
    const connectToStarknet = async () => {
    
      const { wallet } = await connect( { modalMode: "neverAsk" } )
    
      if (wallet && wallet.isConnected) {
        setConnection(wallet);
        setProvider(wallet.account);
        setWalletAddress(wallet.selectedAddress);
      }
    };
    
    connectToStarknet();
  }, [])

  const connectWallet = async () => {
    const { wallet } = await connect();
 
  if(wallet && wallet.isConnected) {
    setConnection(wallet)
    setProvider(wallet.account)
    setWalletAddress(wallet.selectedAddress)
  }
  };
  

  const automaticallyTRoute = async () => {
    const { wallet } = await connect();
 
    if(wallet && wallet.isConnected) {
      setConnection(wallet)
      setProvider(wallet.account)
      setWalletAddress(wallet.selectedAddress)
  
        route.push('/dashboard')
    }
  };

  // Function to create a new community
  const createCommunity = async (name, description, image) => {
   
  };

  // Function to join an existing community
  const joinCommunity = async (communityId) => {
    
  };

  const retriveUserCommunity = async () => {
   
  };

  const ifMember = async (_communityId) => {
    
  };

  useEffect(() => {
    retriveUserCommunity();
    ifMember();
    automaticallyTRoute()
  }, [walletAddress]);

  return (
    <FlowContext.Provider
      value={{
        allCommunity,
        active,
        modalOpen,
        setModalOpen,
        isUserMember,
        createCommunity,
        joinCommunity,
        setActive,
        hideConnectBtn,
        setHideConnectBtn,
        walletAddress,
        connectWallet,
        setWalletAddress,
        ifMember
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};
