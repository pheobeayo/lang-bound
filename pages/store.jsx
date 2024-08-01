import React from "react";
import ChatApp from "../components/ChatPage/ChatApp";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import StoreCard from "../components/store/storeCard";
import { Packages } from "../utils";

function Store() {
  return (
    <div>
      <DefaultLayout>
        <Navbar />
        <div className="w-screen h-screen overflow-y-scroll flex flex-col">
          <h1 className="text-black text-xl ml-6 pt-4 pb-4">Lacent Store</h1>
          <div className="flex flex-wrap mb-[90px] gap-6 m-6 ">
            {Packages.map((item, i) => (
              <StoreCard key={i} item={item} />
            ))}
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
}

export default Store;
