'use client'

import axios from 'axios';
import React, { useState } from 'react';
import ChatButton from '../Buttons/Buttons';
import { MessageComponent, MessageComponentProps } from './MessageComponent';

const ChatComponent: React.FC = () => {


const apiUrl =   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chat-proxy`
  // useState to hold messages
  const [messages, setMessages] = useState<MessageComponentProps[]>([
    { name: 'IA', backgroundColor: 'bg-secondary-100', darkbackgroundColor: 'bg-gray-700' , content:'IA hello world' },
  ]);

  const [message, setMessage] = useState(''); // Holds the new message input by the user

  // Function to handle the message send
  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault(); // Prevent default form behavior

    // Append new message to the messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      { name: 'User', backgroundColor: 'bg-gray-200', darkbackgroundColor: 'bg-gray-100', content: message },
    ]);


    axios.post(apiUrl, {chatQuestion: message})
    .then((response) => {
      console.log(response);
      setMessages((prevMessages) => [
        ...prevMessages,
        { name: 'IA', backgroundColor: 'bg-secondary-100', darkbackgroundColor: 'bg-gray-700', content: response?.data?.chatResponse as string },
      ]);
    })
    .catch((error) => {
      console.error("Error posting data: ", error);
    });
    setMessage(''); 
  };

  return (
    <div>
      <ChatButton />
      <div className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[550px]"
        style={{ boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
        <div className="flex flex-col space-y-1.5 pb-6">
          <h2 className="font-semibold text-lg tracking-tight text-black">Chatbot</h2>
        </div>
        
        {/* Scrollable container for messages */}
        <div className="flex flex-col h-[400px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pr-4">
          {messages.map((msg, index) => (
            <MessageComponent key={index}  name={msg.name} content={msg.content} backgroundColor={msg.backgroundColor} darkbackgroundColor={msg.darkbackgroundColor} />
          ))}
        </div>

        {/* Input form at the bottom */}
        <div className='mt-4'>
          <form className="flex items-center" onSubmit={sendMessage}>
            <input
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Type your message" value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="inline-flex items-center justify-center rounded-full bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;