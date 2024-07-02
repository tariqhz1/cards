"use client";

import React, { useEffect, useState } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars4Icon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/Firebase/config";
import Sidebar from "../Sidebar";


export default function Navbar() {
  const router = useRouter();
  const [authenticateUser, setAuth] = useState(undefined);
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.clear();
        router.push("/signin");
      })
      .catch((error) => {
        console.log("🚀 ~ handleSignout ~ error:", error);
        // An error happened.
      });
  };

  useEffect(() => {
    if (localStorage.getItem("email")) setAuth(true)
    else setAuth(false)
  }, []);

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 z-50 w-full h-[64px]"
    >
      {({ open }) => (
        <>
          <Sidebar open={openSidebar} setIsOpen={setOpenSidebar} handleSignout={handleSignout} />
          <div className="mx-auto  px- sm:px-4 lg:px-[70px] bg-black opacity-50">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <p
                    className="text-[24px] font-[900] text-[white] cursor-pointer"
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    <img src="/Images/logo.png" alt="logo" className="w-[48px] h-[48px]" />
                  </p>
                </div>
              </div>
              <div className="mr-4 lg:mr-0 lg:ml-4 lg:block">
                <div className="flex items-center">
                  {authenticateUser !== undefined && (
                    authenticateUser ? (
                      <Menu as="div" className="relative ml-4 flex-shrink-0">
                        <div onClick={() => setOpenSidebar(!openSidebar)}>
                          <Menu.Button className="relative flex rounded-full">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <Bars4Icon className="h-6 w-6 text-white" />
                          </Menu.Button>
                        </div>
                      </Menu>
                    ) : (
                      <p
                        className="rounded-md border border-transparent bg-blue-500 px-6 py-2 text-base font-medium cursor-pointer text-white shadow-md hover:bg-blue-600"
                        onClick={() => {
                          router.push("/signin");
                        }}
                      >
                        Login
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
