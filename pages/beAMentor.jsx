import React, { useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useMentor } from "../context/MentorContext";
import ConnectModal from "../components/ConnectModal";
import { ethers } from "ethers";

const BeAMentor = () => {
  const route = useRouter();
  const { beAMentor, modalOpen } = useMentor();

  // Define state variables
  const [languageToMentor, setLanguageToMentor] = useState("Spanish");
  const [aboutYourself, setAboutYourself] = useState("");
  const [languageExperience, setLanguageExperience] = useState("");
  const [subscriptionCharge, setSubscriptionCharge] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = async () => {
    try {
      let price = ethers.utils.parseEther(subscriptionCharge);
      // Pass the state variables to the beAMentor function
      await beAMentor(
        languageToMentor,
        price,
        aboutYourself,
        languageExperience
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full h-screen md:h-[672px] max-w-2xl p-8 border bg-white rounded shadow">
          <div className="flex items-center justify-between mb-8">
            <XIcon
              onClick={() => route.back()}
              className="text-black w-6 h-6 cursor-pointer"
            />
            <h2 className="text-black text-sm md:text-2xl font-medium">
              Apply to become a language mentor on{" "}
              <span className="text-Accent">Lacent</span>
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Language to mentor</label>
              <select
                className="w-full text-Black px-4 py-2 border rounded"
                value={languageToMentor}
                onChange={(e) => setLanguageToMentor(e.target.value)}
              >
                <option value="select">Select your Language</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="English">English</option>
                <option value="Polish">Polish</option>
                <option value="Korean">Korean</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">
                Tell us about yourself
              </label>
              <textarea
                rows="6"
                className="w-full text-Black px-4 py-2 border rounded"
                value={aboutYourself}
                onChange={(e) => setAboutYourself(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">
                How long have you been speaking the chosen language
              </label>
              <input
                type="number"
                className="w-full text-Black px-4 py-2 border rounded"
                value={languageExperience}
                onChange={(e) => setLanguageExperience(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Your subscription charge
              </label>
              <input
                type="number"
                className="w-full px-4 text-Black py-2 border rounded"
                value={subscriptionCharge}
                onChange={(e) => setSubscriptionCharge(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="text-Accent"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              <span className="text-Black font-bold text-sm">
                I agree to Terms of Service and Privacy Policy
              </span>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-Accent text-Black w-full py-2 rounded"
              disabled={!agreeToTerms}
            >
              Submit your application
            </button>
          </div>
        </div>
      </div>
      {modalOpen && (
        <ConnectModal
          title="Application submitted"
          detail="We will review your application and give you a response soon, in the mean time, continue enjoying Lacent"
        />
      )}
    </div>
  );
};

export default BeAMentor;
