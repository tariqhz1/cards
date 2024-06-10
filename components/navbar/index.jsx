"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authUser } from "@/utils/authUser";
import { signOut } from "firebase/auth";
import { auth } from "@/Firebase/config";

/**
 * @param {string[]} classes
 */
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();
  const [authenticateUser, setAuth] = useState(false);
  const pathname = usePathname();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/signin");
      })
      .catch((error) => {
        console.log("🚀 ~ handleSignout ~ error:", error);
        // An error happened.
      });
  };

  const checkAuthentication = async () => {
    try {
      let checkAuth = await authUser();
      if (checkAuth.status) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const navLinks = [
    {
      title: "Templates",
      link: "/templates",
    },
    {
      title: "About",
      link: "/about-us",
    },
  ];

  return (
    <Disclosure
      as="nav"
      className="bg-[#192231] border-b-[#ffffff0d] border-b-[1px] border-solid"
    >
      {({ open }) => (
        <>
          <div className="mx-auto  px- sm:px-4 lg:px-[70px]">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  {/* <Image
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                    width={300}
                    height={300}
                  />  */}
                  <p
                    className="text-[24px] font-[900] text-[white] cursor-pointer"
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    LOGO
                  </p>
                </div>
                <div className="hidden lg:ml-6 lg:block">
                  <div className="flex space-x-4">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    {navLinks.map((item, i) => (
                      <span
                        key={i}
                        onClick={() => {
                          router.push(item.link);
                        }}
                        className={`rounded-md hover:bg-[#374151] px-3 py-2 text-[17px] font-medium text-white cursor-pointer ${
                          item.title === "Templates"
                            ? pathname.includes("templates") && "bg-[#374151]"
                            : item.title === "About"
                            ? pathname.includes("about-us") && "bg-[#374151]"
                            : ""
                        }`}
                      >
                        {item.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center">
                  {/* Profile dropdown */}
                  {authenticateUser ? (
                    <Menu as="div" className="relative ml-4 flex-shrink-0">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <Image
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                            width={300}
                            height={300}
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={handleSignout}
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
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
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <Disclosure.Button
                as="a"
                href="#"
                onClick={() => {
                  router.push("/templates");
                }}
                className="block rounded-md hover:bg-gray-900 px-3 py-2 text-base font-medium text-white"
              >
                Templates
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                onClick={() => {
                  router.push("/about-us");
                }}
                className="block rounded-md hover:bg-gray-900 px-3 py-2 text-base font-medium text-white"
              >
                About
              </Disclosure.Button>
            </div>
            {authenticateUser ? (
              <div className="border-t border-gray-700 pb-3 pt-4">
                {/* <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      Tom Cook
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      tom@example.com
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div> */}
                <div className="mt-3 space-y-1 px-2">
                  {/* <Disclosure.Button
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Your Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Settings
                  </Disclosure.Button> */}
                  <Disclosure.Button
                    onClick={handleSignout}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            ) : (
              <p
                className="ml-[13px] text-white hover:bg-[#374151] p-[4px_9px] rounded-[6px] cursor-pointer pb-[22px]"
                onClick={() => {
                  router.push("/signin");
                }}
              >
                Login
              </p>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
