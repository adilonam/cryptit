"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CryptoJS from "crypto-js";

const FormLayout = () => {
  const [text, setText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [desText, setDesText] = useState("");
  const [desKey, setDesKey] = useState("");
  const [desEncryptedText, setDesEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [desDecryptedText, setDesDecryptedText] = useState("");

  const handleEncrypt = () => {
    setEncryptedText(btoa(text));
  };

  const handleDecrypt = () => {
    setDecryptedText(atob(encryptedText));
  };

  const handleDesEncrypt = () => {
    const encrypted = CryptoJS.DES.encrypt(desText, desKey).toString();
    setDesEncryptedText(encrypted);
  };

  const handleDesDecrypt = () => {
    const decrypted = CryptoJS.DES.decrypt(desEncryptedText, desKey).toString(CryptoJS.enc.Utf8);
    setDesDecryptedText(decrypted);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Encrypt Text" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Encrypt Text Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Encrypt Text using Base64
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Text
                  </label>
                  <input
                    type="text"
                    placeholder="Enter text to encrypt"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleEncrypt}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Encrypt
                </button>

                {encryptedText && (
                  <div className="mt-4.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Encrypted Text
                    </label>
                    <textarea
                      readOnly
                      value={encryptedText}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* <!-- Encrypt Text using DES Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Encrypt Text using DES
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Text
                  </label>
                  <input
                    type="text"
                    placeholder="Enter text to encrypt"
                    value={desText}
                    onChange={(e) => setDesText(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Key
                  </label>
                  <input
                    type="text"
                    placeholder="Enter encryption key"
                    value={desKey}
                    onChange={(e) => setDesKey(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleDesEncrypt}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Encrypt
                </button>

                {desEncryptedText && (
                  <div className="mt-4.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Encrypted Text
                    </label>
                    <textarea
                      readOnly
                      value={desEncryptedText}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Decrypt Text Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Decrypt Text using Base64
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Encrypted Text
                  </label>
                  <textarea
                    placeholder="Enter text to decrypt"
                    value={encryptedText}
                    onChange={(e) => setEncryptedText(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleDecrypt}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Decrypt
                </button>

                {decryptedText && (
                  <div className="mt-4.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Decrypted Text
                    </label>
                    <textarea
                      readOnly
                      value={decryptedText}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* <!-- Decrypt Text using DES Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Decrypt Text using DES
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Encrypted Text
                  </label>
                  <textarea
                    placeholder="Enter text to decrypt"
                    value={desEncryptedText}
                    onChange={(e) => setDesEncryptedText(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Key
                  </label>
                  <input
                    type="text"
                    placeholder="Enter decryption key"
                    value={desKey}
                    onChange={(e) => setDesKey(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleDesDecrypt}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Decrypt
                </button>

                {desDecryptedText && (
                  <div className="mt-4.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Decrypted Text
                    </label>
                    <textarea
                      readOnly
                      value={desDecryptedText}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;