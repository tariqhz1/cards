"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <div className="bg-white lg:h-[calc(100vh-64px)]">
      <div className="relative isolate px-4 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl "
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-[44rem] pt-12 py-16 sm:py-48 lg:pt-[5rem] lg:pb-[8rem]">
          <div className="text-center">
            <h1 className="text-[30px] font-bold tracking-tight text-gray-900 sm:text-6xl">
              Contactless Metal Credit & Debit Cards
            </h1>
            <p className="mt-6 text-[16px]  md:text-lg leading-[24px] md:leading-8 text-gray-600">
              Experience the future of payments with our premium contactless
              metal credit and debit cards. Made with durable metal materials,
              these cards offer a sleek and modern design that not only looks
              luxurious but also provides an added layer of security and
              convenience.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <span
                onClick={() => {
                  router.push("/templates");
                }}
                className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              >
                Pre-made designs
              </span>
              <span
                onClick={() => {
                  router.push("/about-us");
                }}
                className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
              >
                Learn more <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
