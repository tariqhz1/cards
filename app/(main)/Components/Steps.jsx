"use client";

import {
  LifebuoyIcon,
  NewspaperIcon,
  TruckIcon,
} from "@heroicons/react/20/solid";
import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import RotatingCardOnPalm from "./RotatingCard";

const cards = [
  {
    name: "Step 1",
    description:
      "Create your own Custom Design or choose from one of our Best Sellers. Once you have chosen your design complete the order details.",
    icon: NewspaperIcon,
  },
  {
    name: "Step 2",
    description:
      "Freeze / Lock your card and ship it to us. We begin working on  your card straight away. This means that when your card arrives, we can simply complete the transfer process.",
    icon: LifebuoyIcon,
  },
  {
    name: "Step 3",
    description:
      "We ship both your old and new metal cards back within 1-2 days with tracked shipping.",
    icon: TruckIcon,
  },
];

export default function Steps() {
  return (
    <div className="relative isolate overflow-hidden  py-24 sm:py-32 bg-black rounded-[18px] lg:h-[100vh]">
      <div class="flex flex-wrap h-[100%] items-center">
        <div class="w-full md:w-1/2 p-4 flex flex-col items-center justify-center">
          <RotatingCardOnPalm />
          <img src="/images/palm_2.webp" alt="palm" className="w-[60vh]" />
        </div>
        <div class="w-full md:w-1/2 p-4">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-3xl">
            Your Card Comes To Life
          </h2>
          <Carousel
            arrows={false}
            autoPlay={true}
            autoPlaySpeed={5000}
            swipeable={true}
            draggable={true}
            showDots={false}
            infinite={true}
            customTransition="all .5s linear"
            transitionDuration={500}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024
                },
                items: 1,
                partialVisibilityGutter: 40
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0
                },
                items: 1,
                partialVisibilityGutter: 30
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464
                },
                items: 1,
                partialVisibilityGutter: 30
              }
            }}
          >
            {cards.map((card) => (
              <div className="text-base leading-7 mt-14">
                <h3 className="font-semibold text-white">{card.name}</h3>
                <p className="mt-2 text-gray-300 pr-8">{card.description}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => (
            <div
              key={card.name}
              className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10"
            >
              <card.icon
                className="h-7 w-5 hidden md:flex-none text-indigo-400 "
                aria-hidden="true"
              />
              <div className="text-base leading-7">
                <h3 className="font-semibold text-white">{card.name}</h3>
                <p className="mt-2 text-gray-300">{card.description}</p>
              </div>
            </div>
          ))}
        </div> */}
    </div>
  );
}
