import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import Navbar from "../components/Navbar";
import { ChatCompoents, InputBox } from "../components/AiChat";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useFlow } from "../context/FlowContext";
import { useAccount } from "wagmi";

const AiChat = () => {
  const [chatHistories, setChatHistories] = useState([]);
  console.log(chatHistories);
  const [text, setText] = useState("");
  const { address: account } = useAccount();

  useEffect(() => {
    const fetchChat = async () => {
      if (account) {
        const q = query(
          collection(db, "chatrooms"),
          where("userId", "==", account),
          orderBy("created_at")
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let chat = [];
          querySnapshot.forEach((doc) => {
            chat.push({ ...doc.data(), id: doc.id });
          });
          setChatHistories(chat);
        });

        return () => {
          unsubscribe();
        };
      }
    };
    fetchChat();
  }, [account]);

  const containerRef = useRef(null); // Create a ref for the container

  useEffect(() => {
    // Scroll to the bottom of the container whenever chatHistories change
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatHistories]);

  return (
    <DefaultLayout>
      <Navbar />
      <div className="fle">
        <div className="md:w-full w-full overflow-y-scroll scrollbar-hide text-Black md:m-[10px]">
          <span className="text-[28px] my-[31px] mx-[37px] text-Black">
            Learn with AI
          </span>
          <div
            ref={containerRef}
            className="flex-1 min-h-screen bg-Black w-[80%] mt-[20px]  m-9"
          >
            {chatHistories.map((item, i) => (
              <ChatCompoents key={i} {...item} />
            ))}
            <InputBox text={text} setText={setText} />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AiChat;
