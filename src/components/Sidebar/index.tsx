"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-2 py-1 lg:py-.5">
        <Link href="/">
          <Image
            width={120}
            height={120}
            src={"/images/logo/logo.png"}
            alt="Logo"
            priority
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              
            

              {/* <!-- Menu Item encrypt text --> */}
              <li>
                <Link
                  href="/encrypt-text"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname?.includes("encrypt-text") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                <svg     className="fill-current"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V9C21 9.55228 20.5523 10 20 10C19.4477 10 19 9.55228 19 9V4C19 3.44772 18.5523 3 18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H9C9.55228 21 10 21.4477 10 22C10 22.5523 9.55228 23 9 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM6.41421 7H9V4.41421L6.41421 7ZM17.8003 14.3564C18.0771 13.8813 17.9184 13.2717 17.4449 12.992L14.8873 11.4811C14.1351 11.0367 13.1815 11.132 12.5321 11.7165L10.9322 13.1564C10.2432 13.7765 10.0706 14.7887 10.515 15.6021L12.034 18.3817C12.304 18.8758 12.9285 19.0497 13.4149 18.7662L14.4966 18.136C14.9249 17.8864 15.4715 17.9883 15.7811 18.3755L16.7004 19.5254L16.8845 19.3816C17.0936 19.2183 17.359 19.1448 17.6223 19.1772C17.8856 19.2097 18.1252 19.3454 18.2884 19.5545L19.4397 21.03C19.9282 21.656 20.9163 21.4903 21.174 20.7393L21.2714 20.4553L17.3143 16.7279C16.9757 16.4089 16.9018 15.8985 17.136 15.4966L17.8003 14.3564ZM18.4622 11.2701C19.8826 12.1092 20.3589 13.9378 19.5283 15.3633L19.2641 15.8169L23.1123 19.4418C23.3982 19.7111 23.4999 20.1228 23.3725 20.4943L23.0657 21.3884C22.2927 23.6415 19.3284 24.1383 17.863 22.2604L17.3271 21.5736L17.1522 21.7102C16.7204 22.0473 16.0978 21.9744 15.7557 21.5465L14.7578 20.2985L14.4218 20.4943C12.9624 21.3446 11.0889 20.823 10.2789 19.3408L8.75998 16.5611C7.87103 14.9344 8.2163 12.91 9.59422 11.6698L11.1942 10.2299C12.493 9.06095 14.4002 8.87035 15.9046 9.75912L18.4622 11.2701ZM13.5 16C14.3284 16 15 15.3284 15 14.5C15 13.6716 14.3284 13 13.5 13C12.6716 13 12 13.6716 12 14.5C12 15.3284 12.6716 16 13.5 16Z" fill="#FFFFFF"/></svg>
                 Encrypt Text
                </Link>
              </li>
              
              {/* <!-- Menu Item encrypt file --> */}
              <li>
                <Link
                  href="/encrypt-file"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname?.includes("encrypt-file") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V9C21 9.55228 20.5523 10 20 10C19.4477 10 19 9.55228 19 9V4C19 3.44772 18.5523 3 18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H9C9.55228 21 10 21.4477 10 22C10 22.5523 9.55228 23 9 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM6.41421 7H9V4.41421L6.41421 7ZM17.8003 14.3564C18.0771 13.8813 17.9184 13.2717 17.4449 12.992L14.8873 11.4811C14.1351 11.0367 13.1815 11.132 12.5321 11.7165L10.9322 13.1564C10.2432 13.7765 10.0706 14.7887 10.515 15.6021L12.034 18.3817C12.304 18.8758 12.9285 19.0497 13.4149 18.7662L14.4966 18.136C14.9249 17.8864 15.4715 17.9883 15.7811 18.3755L16.7004 19.5254L16.8845 19.3816C17.0936 19.2183 17.359 19.1448 17.6223 19.1772C17.8856 19.2097 18.1252 19.3454 18.2884 19.5545L19.4397 21.03C19.9282 21.656 20.9163 21.4903 21.174 20.7393L21.2714 20.4553L17.3143 16.7279C16.9757 16.4089 16.9018 15.8985 17.136 15.4966L17.8003 14.3564ZM18.4622 11.2701C19.8826 12.1092 20.3589 13.9378 19.5283 15.3633L19.2641 15.8169L23.1123 19.4418C23.3982 19.7111 23.4999 20.1228 23.3725 20.4943L23.0657 21.3884C22.2927 23.6415 19.3284 24.1383 17.863 22.2604L17.3271 21.5736L17.1522 21.7102C16.7204 22.0473 16.0978 21.9744 15.7557 21.5465L14.7578 20.2985L14.4218 20.4943C12.9624 21.3446 11.0889 20.823 10.2789 19.3408L8.75998 16.5611C7.87103 14.9344 8.2163 12.91 9.59422 11.6698L11.1942 10.2299C12.493 9.06095 14.4002 8.87035 15.9046 9.75912L18.4622 11.2701ZM13.5 16C14.3284 16 15 15.3284 15 14.5C15 13.6716 14.3284 13 13.5 13C12.6716 13 12 13.6716 12 14.5C12 15.3284 12.6716 16 13.5 16Z"
                      fill="#FFFFFF"
                    />
                  </svg>
                  Encrypt File
                </Link>
              </li>
              
              {/* <!-- Menu Item app --> */}

          
            </ul>
          </div>

     
          
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
