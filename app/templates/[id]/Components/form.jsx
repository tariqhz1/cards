"use client";
import { CircleOff, Nfc } from "lucide-react";
import Image from "next/image";
import React from "react";
import contactless from "@/public/Images/contactless.png";
import Pricing from "./Pricing";

const Form = ({ card, setcard, cardType }) => {
  return (
    <div>
      {" "}
      <div className="flex flex-col gap-[10px] w-[88%] mt-[21px] border-solid border-b-[1px] border-b-[#DEDEDE] pb-[25px]">
        <label
          htmlFor="cardholder"
          className="text-[15px] text-[rgba(23,23,23,0.5)]"
        >
          Card Type
        </label>
        <div className="flex flex-row gap-[16px]">
          {cardType?.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-[5px] justify-center items-center"
              onClick={() => {
                setcard({
                  ...card,
                  cardType: item.title,
                  totalPrice: card.cardPrice + item.price,
                  typePrice: item.price,
                });
              }}
            >
              <span
                className={`w-[85px] h-[72px] rounded-[7px] border-solid border-[1px] border-[#DEDEDE] hover:border-blue-500 duration-500 flex justify-center items-center cursor-pointer  ${
                  card.cardType === item.title ? "border-blue-500" : ""
                }`}
              >
                {item.title === "Contactless" ? (
                  <Image
                    src={contactless}
                    width={55}
                    height={55}
                    alt="image"
                    className="w-[55px] h-[55px] rounded-[100%]"
                  />
                ) : (
                  <div className="relative">
                    <Nfc
                      size={28}
                      color={
                        // card.cardType === item.title
                        //   ? "white"
                        //   :
                        "rgba(23,23,23,0.8)"
                      }
                    />
                    <span className="absolute top-[-8px] left-[-7px]">
                      <CircleOff
                        size={44}
                        color={
                          // card.border === 3
                          //   ? "white"
                          //   :
                          "#ff0000bf"
                        }
                      />
                    </span>
                  </div>

                  // <SmartphoneNfc
                  //   size={40}
                  //   color={
                  //     card.cardType === item.title
                  //       ? "white"
                  //       : "rgba(23,23,23,0.5)"
                  //   }
                  // />
                )}
              </span>
              <div className="flex flex-col">
                <p className="text-[14px] text-[rgba(23,23,23,0.5)] text-center w-max">
                  {item.title}
                </p>
                <p className="text-[14px] text-[rgba(23,23,23,0.5)] text-center">
                  {`${item.price}$`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pb-[25px]  pt-[25px]">
        <div className="flex flex-col gap-[10px] md:w-[88%] w-[96%]">
          <label
            htmlFor="comment"
            className="text-[15px] text-[rgba(23,23,23,0.5)]"
          >
            Comment
          </label>
          <textarea
            type="text"
            name="comment"
            id="comment"
            value={card?.comment ? card.comment : ""}
            onChange={(e) => setcardInfo({ ...card, comment: e.target.value })}
            placeholder="Add Comment"
            className="border-[1px] border-solid border-[#DEDEDE] rounded-[5px] p-[10px_10px] min-h-[110px] h-[110px]"
          />
        </div>
      </div>
      <Pricing card={card} />
    </div>
  );
};

export default Form;
