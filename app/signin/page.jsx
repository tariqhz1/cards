"use client";
import { auth, firestore } from "@/Firebase/config";
import { Spinner } from "@/lib/spinner";
import { authUser } from "@/utils/authUser";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signin() {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [values, setvalues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.email.trim() || !values.password.trim()) {
      toast.error("Please fill out empty fields");
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      toast.error("Please enter a valid email address");
    } else {
      try {
        setloading(true);
        const user = await signInWithEmailAndPassword(
          auth,
          values?.email,
          values?.password
        );
        if (user) {
          if (user?.user?.emailVerified) {
            localStorage.setItem("email", values.email);
            router.push("/")
          } else {
            toast.error("Email verification is pending");
            setloading(false);
          }
        } else {
          throw new Error("error");
        }
      } catch (error) {
        console.log("🚀 ~ handleSubmit ~ error:", error);
        toast.error("Invalid Email && Password");
        setloading(false);
      }
    }
  };

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const checkAuthentication = async () => {
    try {
      let checkAuth = await authUser();
      if (checkAuth.status) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <>
      {/*
            This example requires updating your template:
    
            ```
            <html class="h-full bg-white">
            <body class="h-full">
            ```
          */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-[100vh] bg-black">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  required
                  className="block w-full px-[10px] outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm px-[10px] outline-none font-medium leading-6 text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-[10px] outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                {loading ? <Spinner color="white" size={25} /> : "Sign in"}
              </button>
            </div>
          </form>
          <div className="mt-10 text-center text-sm text-gray-500 flex flex-row items-center justify-center">
            No Account yet?
            <p
              onClick={() => {
                router.push("/signup");
              }}
              className="font-semibold leading-6 text-blue-500 hover:text-blue-400 pl-[5px] cursor-pointer"
            >
              Signup here
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
