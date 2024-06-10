"use client";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { CreditCard } from "lucide-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Select({
  title,
  cards,
  cardInfo,
  setcardInfo,
  selected,
  setSelected,
}) {
  useEffect(() => {
    if (title === "Card Number On") {
      setcardInfo({ ...cardInfo, numberType: selected?.name });
    } else if (title === "Card Name On") {
      setcardInfo({ ...cardInfo, nameType: selected?.name });
    } else {
      // setcardInfo({...cardInfo, })
    }
  }, [selected]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-[rgba(23,23,23,0.5)]">
            {title}
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white pt-[10px] pb-[10px] pl-3 pr-10 text-left text-[rgba(23,23,23,1)] shadow-sm ring-inset ring-[#DEDEDE] focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm text-[17px] font-[600] sm:leading-6 border-[1px] border-solid border-[#DEDEDE]">
              <span className="flex items-center">
                {cards[0].name === "No Background" ? null : <CreditCard />}
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {cards.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? "" : "text-[rgba(23,23,23,1)]",
                        "relative select-none py-2 pl-3 pr-9 cursor-pointer"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {person.name === "Black Background" ? (
                            <div
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "100%",
                                background: "black",
                              }}
                              className="w-[30px] h-[30px] rounded-[100%] border-[1px] border-solid border-[#DEDEDE] bg-black"
                            ></div>
                          ) : person.name === "White Background" ? (
                            <div
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "100%",
                                background: "white",
                              }}
                              className="w-[30px] h-[30px] rounded-[100%] border-[1px] border-solid border-[#DEDEDE] bg-white"
                            ></div>
                          ) : person.name === "No Background" ? (
                            <div
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "100%",
                              }}
                              className="w-[30px] h-[30px] rounded-[100%] "
                            ></div>
                          ) : (
                            <CreditCard />
                          )}

                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
