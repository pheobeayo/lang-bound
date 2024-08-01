import React from "react";
import { DahboardRight, DashboardLeft } from "../components/Dashboard";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";

const dashboard = () => {
  return (
    <DefaultLayout>
      <Navbar />
      <div className="flex flex-col md:flex-row mx-[20px] my-[20px] w-full h-screen overflow-y-scroll">
        <div className="w-[50%]">
          <DahboardRight />
        </div>

        <div className="my-[10%] md:my-0 lg:w-[50%]">
          <DashboardLeft />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default dashboard;
