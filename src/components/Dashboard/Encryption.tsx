"use client";
import React from "react";

const Encryption: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">Cryptit.pro</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
          If you don&apos;t trust WhatsApp or mail servers, Cryptit can encrypt your files locally without any bit sent to the server, using your own key.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-around">
          <div className="w-full md:w-1/3 p-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Local Encryption</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Encrypt your files locally on your device. No data is sent to any server, ensuring complete privacy and security.
            </p>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Own Key</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Use your own encryption key to secure your files. Only you have access to the key, making sure your data remains safe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Encryption;
