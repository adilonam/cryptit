"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import toast from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";

type MessageItem = {
  question: string;
  response: string;
};

const ChatCore: React.FC = () => {
  const { data: session, status: sessionStatus } = useSession();

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      question: "",
      response: "",
    },
  ]);
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", ""]);

  useEffect(() => {
    if (sessionStatus === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [sessionStatus]);

  const resetForm = () => {
    setQuestion("");
    setOptions(["", ""]);
  };

  return (
    <div className="mx-auto my-2 h-full w-full p-2 xl:max-w-3xl">
      <div className="shadow-blue-gray-900/5 bg-base-200 h-[60vh]">
        <div className="border-solid p-4">
          {messages &&
            messages.slice(0, 10).map((item, index) => (
              <React.Fragment key={index}>
                <div className="chat chat-end">
                  <div className="chat-bubble">{item.question}</div>
                </div>
                <div className="chat chat-start ">
                  <div className="chat-image avatar">
                    <div className="w-17 rounded-full">
                      
                    </div>
                  </div>
                  <div className="chat-bubble">
                    {item.response ? (
                      item.response
                    ) : (
                      <span className="loading loading-dots loading-sm"></span>
                    )}
                  </div>
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>

      <div className="w-[100%]">
        <div className="w-[100%] pt-3">
          <div className="flex flex-row gap-1">
            <input
              type="text"
              placeholder="Enter your question here"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="input input-bordered border-gray-400 mb-2 w-full rounded-lg border-2"
            />
            <button className="btn btn-info rounded-lg text-white">
              <IoSend className="h-5 w-5" />
            </button>
          </div>

          <input
            type="text"
            placeholder="Default Input"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatCore;
