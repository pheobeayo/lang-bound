import { ethers, utils } from "ethers";
import { useAccount, useBalance } from "wagmi";
import { useCallback } from "react";
import { useFlow } from "../context/FlowContext";

// Mainnet address of cUSD
const CUSD_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

export function useTransferCUSD() {
  const { walletAddress } = useFlow();

  const transferCUSD = async (address, amount) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(walletAddress);

      let price = ethers.utils.parseEther(amount);

      let abi = ["function transfer(address to, uint256 amount)"];
      const CUSDContract = new ethers.Contract(CUSD_ADDRESS, abi, signer);
      const tx = CUSDContract.transfer(address, price);
      let receipt = await tx.wait();
      return receipt;
    }
  };

  return { transferCUSD };
}
