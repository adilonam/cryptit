"use client";

import { useSession, signIn, signOut } from "next-auth/react";

const LoginButton = () => {
  return (
    <button
      className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      onClick={() => signIn("keycloak")}
    >
      Login
    </button>
  );
};

const LogoutButton = () => {
  return <button onClick={() => signOut()}>Logout</button>;
};

const ChatButton: React.FC = () => {
  return (
    <button
      className="hover:bg-gray-700 border-gray-200 hover:text-gray-900 fixed bottom-4 right-4 m-0 inline-flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border bg-black bg-none p-0 text-sm font-medium normal-case leading-5 disabled:pointer-events-none disabled:opacity-50"
      type="button"
      aria-haspopup="dialog"
      aria-expanded="false"
      data-state="closed"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="border-gray-200 block align-middle text-white"
      >
        <path
          d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
          className="border-gray-200"
        ></path>
      </svg>
    </button>
  );
};
export default LoginButton;
