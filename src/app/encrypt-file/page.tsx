"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import * as crypto from "crypto";

const FormLayout = () => {
  const [file, setFile] = useState<File | null>(null);
  const [desKey, setDesKey] = useState("");
  const [encryptedFile, setEncryptedFile] = useState<Blob | null>(null);
  const [decryptedFile, setDecryptedFile] = useState<Blob | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleDesEncrypt = () => {
    if (file && desKey) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = Buffer.from(e.target?.result as ArrayBuffer);
        const key = Uint8Array.from(Buffer.from(desKey.padEnd(8, ' '))); // Ensure key is 8 bytes
        const cipher = crypto.createCipheriv("des-ecb", key, null);
        const fileContentArray = new Uint8Array(fileContent);
        const encrypted = Buffer.concat([new Uint8Array(cipher.update(fileContentArray)), new Uint8Array(cipher.final())]);
        const encryptedBlob = new Blob([encrypted], { type: "application/octet-stream" });
        setEncryptedFile(encryptedBlob);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleDesDecrypt = () => {
    if (file && desKey) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const encryptedContent = Buffer.from(e.target?.result as ArrayBuffer);
        const key = Uint8Array.from(Buffer.from(desKey.padEnd(8, ' '))); // Ensure key is 8 bytes
        const decipher = crypto.createDecipheriv("des-ecb", key, null);
        const encryptedContentArray = new Uint8Array(encryptedContent);
        const decrypted = Buffer.concat([new Uint8Array(decipher.update(encryptedContentArray)), new Uint8Array(decipher.final())]);
        const decryptedBlob = new Blob([decrypted], { type: "application/octet-stream" });
        setDecryptedFile(decryptedBlob);
      };
      reader.readAsArrayBuffer(file);
    }
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
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;