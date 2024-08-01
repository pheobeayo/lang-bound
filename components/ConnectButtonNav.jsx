import "@particle-network/connect-react-ui/dist/index.css";
import { ConnectButton } from "@particle-network/connect-react-ui";
import { BellIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import Avatar from "react-avatar";
import { book, korean } from "../assets/images";
import { useUser } from "../context/ProfileContext";

// if you want to custom connet button, you can use ConnectButton.Custom.
const ConnectButtonNav = () => {
  const { accountName, userLearnImage } = useUser();
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openConnectModal,
        openChainModal,
        accountLoading,
      }) => {
        return (
          <div className="hidden md:inline-flex">
            {!account && (
              <button
                className="bg-Accent py-[10px]  px-[24px]"
                onClick={openConnectModal}
              >
                Connect Wallet
              </button>
            )}
            {account && (
              <div className="flex items-center space-x-10 w-full">
                <Link href="/beAMentor">
                  <button className="bg-Orange/50 text-Orange flex space-x-[10px] items-center py-[10px] px-[24px]">
                    <Image
                      src={book}
                      alt="book"
                      className="w-[20px] h-[20px] object-contain"
                    />
                    Become a mentor
                  </button>
                </Link>

                {userLearnImage && (
                  <Image
                    src={userLearnImage}
                    alt="language"
                    width={234}
                    height={234}
                    className="w-[35.2px] h-[24px] object-contain"
                  />
                )}

                {!userLearnImage && (
                  <Link href="/profileOnboarding">
                    <button className="bg-Accent px-6 py-2.5 text-Black font-semibold">
                      Pick a Language
                    </button>
                  </Link>
                )}

                <BellIcon className="text-[#667185] w-[28px]" />

                <button
                  onClick={openAccountModal}
                  className="flex items-center space-x-[10px]"
                >
                  <Avatar
                    name={`${accountName}`}
                    className="rounded-full"
                    size="48px"
                  />
                  {account && (
                    <span className="text-Black">
                      {account.slice(0, 6)}...
                      {account.slice(30, 49)}
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectButtonNav;
