"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import * as crypto from "crypto";
import CryptoJS from "crypto-js";

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [desKey, setDesKey] = useState("");
  const [aesKey, setAesKey] = useState("");
  const [encryptedFile, setEncryptedFile] = useState<Blob | null>(null);
  const [decryptedFile, setDecryptedFile] = useState<Blob | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const padKey = (key: string, length: number) => {
    return key.padEnd(length, '0');
  };

  const handleDesEncrypt = () => {
    return new Promise<void>((resolve, reject) => {
      if (!file || !desKey) {
        alert("Please select a file and provide a valid key!");
        reject(new Error("File or key is missing"));
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        if (!event.target?.result) {
          reject(new Error("Failed to read file"));
          return;
        }

        // Convert file data to WordArray
        const fileData = CryptoJS.lib.WordArray.create(
          new Uint8Array(event.target.result as ArrayBuffer)
        );

        // Encrypt using DES
        const encrypted = CryptoJS.DES.encrypt(fileData, CryptoJS.enc.Utf8.parse(desKey), {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        });

        // Convert to Blob
        const encryptedBlob = new Blob([encrypted.toString()], { type: "text/plain" });

        // Set the encrypted file in state
        setEncryptedFile(encryptedBlob);
        resolve();
      };

      reader.onerror = (error) => reject(error);

      reader.readAsArrayBuffer(file);
    });
  };

  const handleDesDecrypt = () => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (!event.target?.result) {
        console.error("Failed to read encrypted file");
        return;
      }

      const encryptedText = event.target.result as string;

      // Decrypt using DES
      const decrypted = CryptoJS.DES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(desKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });

      // Convert decrypted WordArray to Uint8Array
      const decryptedArray = new Uint8Array(decrypted.sigBytes);
      for (let i = 0; i < decrypted.sigBytes; i++) {
        decryptedArray[i] = decrypted.words[i >>> 2] >>> (24 - (i % 4) * 8);
      }

      // Convert back to Blob
      const decryptedBlob = new Blob([decryptedArray], { type: "application/octet-stream" });

      // Set decrypted file in state
      setDecryptedFile(decryptedBlob);
    };

    reader.readAsText(file as Blob);
  };

  const handleAesEncrypt = () => {
    return new Promise<void>((resolve, reject) => {
      if (!file || !aesKey) {
        alert("Please select a file and provide a valid key!");
        reject(new Error("File or key is missing"));
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        if (!event.target?.result) {
          reject(new Error("Failed to read file"));
          return;
        }

        // Convert file data to WordArray
        const fileData = CryptoJS.lib.WordArray.create(
          new Uint8Array(event.target.result as ArrayBuffer)
        );

        // Pad the AES key to 32 bytes
        const paddedKey = padKey(aesKey, 32);

        // Encrypt using AES
        const encrypted = CryptoJS.AES.encrypt(fileData, CryptoJS.enc.Utf8.parse(paddedKey), {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        });

        // Convert to Blob
        const encryptedBlob = new Blob([encrypted.toString()], { type: "text/plain" });

        // Set the encrypted file in state
        setEncryptedFile(encryptedBlob);
        resolve();
      };

      reader.onerror = (error) => reject(error);

      reader.readAsArrayBuffer(file);
    });
  };

  const handleAesDecrypt = () => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (!event.target?.result) {
        console.error("Failed to read encrypted file");
        return;
      }

      const encryptedText = event.target.result as string;

      // Pad the AES key to 32 bytes
      const paddedKey = padKey(aesKey, 32);

      // Decrypt using AES
      const decrypted = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(paddedKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });

      // Convert decrypted WordArray to Uint8Array
      const decryptedArray = new Uint8Array(decrypted.sigBytes);
      for (let i = 0; i < decrypted.sigBytes; i++) {
        decryptedArray[i] = decrypted.words[i >>> 2] >>> (24 - (i % 4) * 8);
      }

      // Convert back to Blob
      const decryptedBlob = new Blob([decryptedArray], { type: "application/octet-stream" });

      // Set decrypted file in state
      setDecryptedFile(decryptedBlob);
    };

    reader.readAsText(file as Blob);
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Encrypt File" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Encrypt File using DES Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Encrypt File using DES
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    File
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
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

                {encryptedFile && (
                  <div className="mt-4.5">
                    <button
                      type="button"
                      onClick={() => downloadFile(encryptedFile, "encrypted.bin")}
                      className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                      Download Encrypted File
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Decrypt File using DES Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Decrypt File using DES
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    File
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
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

                {decryptedFile && (
                  <div className="mt-4.5">
                    <button
                      type="button"
                      onClick={() => downloadFile(decryptedFile, "decrypted.bin")}
                      className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                      Download Decrypted File
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Encrypt File using AES Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Encrypt File using AES
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    File
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
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
                    value={aesKey}
                    onChange={(e) => setAesKey(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAesEncrypt}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Encrypt
                </button>

                {encryptedFile && (
                  <div className="mt-4.5">
                    <button
                      type="button"
                      onClick={() => downloadFile(encryptedFile, "encrypted.bin")}
                      className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                      Download Encrypted File
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Decrypt File using AES Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Decrypt File using AES
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    File
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
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
                    value={aesKey}
                    onChange={(e) => setAesKey(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAesDecrypt}
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Decrypt
                </button>

                {decryptedFile && (
                  <div className="mt-4.5">
                    <button
                      type="button"
                      onClick={() => downloadFile(decryptedFile, "decrypted.bin")}
                      className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                      Download Decrypted File
                    </button>
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

export default Page;