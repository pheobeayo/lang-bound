import { XIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { badges, crying } from "../../assets/images";
import { useRouter } from "next/router";

const FailedModal = ({ closeModal, actionButton }) => {
  const route = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-full md:w-[60%] lg:w-[40%] xl:w-[30%] bg-white p-4 md:p-8 lg:p-12 xl:p-16 rounded-2xl">
        <div className="flex w-full justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold">
            You ran out of hearts!
          </h1>
          <div>
            <button onClick={closeModal}>
              <XIcon className="w-6 h-6 md:w-8 md:h-8 bg-Grey/20 text-white" />
            </button>
          </div>
        </div>
        <div className="my-4 md:my-8">
          <p className="text-gray-400 text-lg md:text-xl">
            You have run out of lives. To further improve your knowledge,
            purchase a podcast and come back when you are ready!
          </p>
        </div>

        <div className="mb-4 md:mb-8 flex flex-col justify-center items-center space-y-4 py-4">
          <Image
            src={crying}
            alt="crying"
            className="w-24 h-24 md:w-36 md:h-36 object-contain"
          />
        </div>
        <div className="w-full mt-4 md:mt-8">
          <button
            className="bg-Accent w-full md:w-auto text-center rounded font-semibold py-2 md:py-4"
            onClick={() => route.push("/store")}
          >
            Purchase Hearts
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailedModal;
