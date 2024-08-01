import React, { useState, useEffect } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { languageCommunity } from "../utils";
import CommunityScreen from "../components/community/CommunityScreen";
import { FaPlus } from "react-icons/fa";
import CreateCommunityModal from "../components/community/CreateCommunityModal";
import { useFlow } from "../context/FlowContext";

const Communities = () => {
  const { allCommunity } = useFlow();
  const [communities, setCommunities] = useState(languageCommunity);
  const [selectedCommunity, setSelectedCommunity] = useState();
  const [showSidebar, setShowSidebar] = useState(true);
  const [isCreateCommunityModalOpen, setCreateCommunityModalOpen] =
    useState(false);

  useEffect(() => {
    setSelectedCommunity(allCommunity[0]);
  }, [allCommunity]);

  const handleCreateCommunityClick = () => {
    setCreateCommunityModalOpen(true);
  };

  const handleCloseCreateCommunityModal = () => {
    setCreateCommunityModalOpen(false);
  };

  const handleCommunityClick = (community) => {
    setSelectedCommunity(community);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <DefaultLayout>
        <Navbar />
        {/* Create Community Modal */}

        <section className="flex items-start text-black w-full min-h-screen ">
          {showSidebar && (
            <div
              className={`${
                showSidebar ? "md:w-[10%] w-[50%]" : "w-0"
              } bg-Black min-h-screen p-4 border-l border-Grey flex flex-col items-center transition-all duration-300 ease-in-out`}
            >
              {allCommunity.slice(0, 4).map((community) => (
                <div
                  key={community.communityId}
                  onClick={() => handleCommunityClick(community)}
                >
                  <Image
                    src={community.image}
                    alt={community.communityName}
                    width={400}
                    height={400}
                    className={`cursor-pointer ${
                      selectedCommunity?.communityName === community.communityName
                        ? "border-Accent border-2 rounded-full"
                        : "hover:bg-gray-100"
                    } p- mb-2 rounded-full object-cover w-[60px] h-[60px] md:w-[90px] md:h-[90px]`}
                  />
                </div>
              ))}
              <div
                onClick={handleCreateCommunityClick}
                className="bg-Accent fixed bottom-0 cursor-pointer text-Black mb-2 rounded-full object-cover w-[60px] h-[60px] md:w-[90px] md:h-[90px] flex items-center justify-center"
              >
                <FaPlus color="black" size={24} />
              </div>
              <CreateCommunityModal
                isOpen={isCreateCommunityModalOpen}
                onClose={handleCloseCreateCommunityModal}
              />
            </div>
          )}

          <div className="flex-1 p-4">
            {selectedCommunity ? (
              <div className="overflow-y-scroll h-screen flex-1">
                <CommunityScreen selectedCommunity={selectedCommunity} />
              </div>
            ) : (
              <p className="">Select a community to view its posts</p>
            )}
          </div>
        </section>

        {/* Mobile view toggle button */}
        <button
          className="fixed bottom-4 right-4 p-2 bg-blue-500  text-white rounded-full"
          onClick={toggleSidebar}
        >
          {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
        </button>
      </DefaultLayout>
    </div>
  );
};

export default Communities;
