import { useAccount } from "wagmi";
import { createContext, useContext, useState, useEffect } from "react";
import { LacentContentAbi, LacentContentAddress } from "../constants/contract";
import { BigNumber, ethers } from "ethers";
import { useFlow } from "./FlowContext";

const LacentContentContext = createContext();

export const useLacentContent = () => useContext(LacentContentContext);

export const LacentContentProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [allContent, setAllContent] = useState([]);
  const { address: account } = useAccount();
  const { walletAddress } = useFlow();

  const contentAddress = LacentContentAddress;
  const contentABI = LacentContentAbi;

  const conectwithContract = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window?.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contentAddress,
          contentABI,
          signer
        );
        return contract;
      }else{
        alert("noe eth")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createAContent = async (
    _contentName,
    _contentImage,
    _contentDescription,
    _contentLink,
    _category,
    _amount
  ) => {
    try {
      const contract = await conectwithContract();
      const tx = await contract.createContent(
        _contentName,
        _contentImage,
        _contentDescription,
        _contentLink,
        _category,
        _amount
      );
      console.log(tx.hash);
      await tx.wait();
      setModalOpen(true);
      return `https://explorer.testnet.aurora.dev/tx/${tx.hash}`;
    } catch (error) {
      console.log(error.message);
    }
  };

  const retriveBuyers = async () => {
    try {
      const contract = await conectwithContract();
      const buyers = await contract.retrieveBuyers();
      return buyers;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllContent = async () => {
    try {
      const contract = await conectwithContract();
      const allContent = await contract.retrieveAllContent();
      setAllContent(allContent);
      return allContent;
    } catch (error) {
      console.log(error);
    }
  };

  const purcahseAContent = async (_id, amount) => {
    try {
      const contract = await conectwithContract();
      const tx = await contract.purchaseContent(_id, {
        value: BigNumber.from(amount),
        // gasLimit: 1000000,
      });
      console.log(tx.hash);
      await tx.wait();
      setModalOpen(true);
      return `https://explorer.testnet.aurora.dev/tx/${tx.hash}`;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };



  return (
    <LacentContentContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        createAContent,
        allContent,
        purcahseAContent,
        conectwithContract,
        getAllContent
      }}
    >
      {children}
    </LacentContentContext.Provider>
  );
};
