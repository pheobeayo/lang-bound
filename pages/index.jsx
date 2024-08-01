import Head from "next/head";
import Hero from "../components/Hero";
import Image from "next/image";
import { logo } from "../assets/images";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-black px-9 py-[10px]">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Image src={logo} alt="logo" className="h-8 w-8 mr-2" />
        <span className="font-semibold text-xl tracking-tight">Lacent</span>
      </div>
      <div className="block lg:hidden"></div>
    </nav>
  );
};

export default function Home() {
  // const { logIn, currentUser, modalOpen, setModalOpen } = useFlow();
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
}
