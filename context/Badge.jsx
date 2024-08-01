import { useContext, createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { LancentBadgeAddress, lacentBadgeAbi } from "../constants/contract";

const LacentBadgeContext = createContext();

// Custom hook to use the Flow context
export const useBadge = () => useContext(LacentBadgeContext);

export const LacentBadgeProvider = ({ children }) => {
  const [allBadges, setAllBadges] = useState([]);
  const [userBadge, setUserBadge] = useState({});
  const { address: account } = useAccount();
  const nftAddress = LancentBadgeAddress;
  const nftAbi = lacentBadgeAbi;

  const conectwithContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window?.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(nftAddress, nftAbi, signer);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };

  const claimNFTS = async (badgeName) => {
    try {
      const contract = await conectwithContract();
      const tx = await contract.safeMint(badgeName);
      // console.log(tx.hash);
      await tx.wait();
      return `https://explorer.testnet.aurora.dev/tx/${tx.hash}`;
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAllBadges = async () => {
    try {
      const contract = await conectwithContract();
      const badges = await contract.retriveAllBadge();
      setAllBadges(badges);
    } catch (error) {
      console.log(error.message);
    }
  };

  const filterUserBadge = () => {
    const userBadge = allBadges.filter((user) => user.owner === account);
    setUserBadge(userBadge);
    return userBadge;
  };

  useEffect(() => {
    fetchAllBadges();
    filterUserBadge();
  }, [account]);

  const value = {
    claimNFTS,
    allBadges,
    userBadge,
  };
  return (
    <LacentBadgeContext.Provider value={value}>
      {children}
    </LacentBadgeContext.Provider>
  );
};
