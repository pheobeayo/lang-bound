import { useState, useEffect } from "react";
import {useAppContext} from '../context/AppProvider'

export default function Navbar() {
  const [loading, setLoading] = useState()


  const { handleWalletConnection, handleWalletDisconnection, address, contract } =
  useAppContext();

const disconnectWallet = () => {
  if (window.confirm("are you sure you want to disconnect") == true) {
    handleWalletDisconnection();
    window.location.reload();
  }
};

const enroll = () => {
  if (address) {
    const myCall = contract.populate("create_participant", []);
    setLoading(true);
    contract["create_participant"](myCall.calldata)
      .then((res) => {
        console.info("Successful Response:", res);
      })
      .catch((err) => {
        console.error("Error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  } else {
    handleWalletConnection();
  }
};
  return (
    <nav className="bg-Black shadow-xl p-4">

<div className="flex self-end items-end justify-en">
      <div className="w3-right">
        {address ? (
          <div className="flex-row items-center space-x-6">
             <button
            onClick={disconnectWallet}
            className="bg-Accent text-Black px-[20px] py-[12px] rounded-[8px] text-[12px] lg:text-[16px] lg:px-[26px] font-bold"
          >
           Disconnect
          </button>
          <button className="bg-Accent text-Black px-[20px] py-[12px] rounded-[8px] text-[12px] lg:text-[16px] lg:px-[26px] font-bold" onClick={enroll}>
           Click to enroll
         </button>
          </div>
         
        ) : (
          <button
            className="bg-Accent text-Black px-[20px] py-[12px] rounded-[8px] text-[12px] lg:text-[16px] lg:px-[26px] font-bold"
            onClick={handleWalletConnection}
          >
            Connect wallet
          </button>
        )}
      </div>
    </div>
    </nav>
  );
}
