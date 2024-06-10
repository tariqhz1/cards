"use client";
import Select from "@/lib/select";
import React, { useEffect } from "react";
import Pricing from "./pricing";
import { BoxSelect, CircleOff, Scan } from "lucide-react";
import { useRouter } from "next/navigation";

const EditCard = ({
  cardInfo,
  setcardInfo,
  numberSelected,
  setnumberSelected,
  nameSelected,
  setnameSelected,
}) => {
  const router = useRouter();
  const cards = [
    {
      id: 1,
      name: "Back",
      avatar:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 2,
      name: "Front",
      avatar:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  const paymentMethod = [
    {
      image:
        "https://ovs927.p3cdn1.secureserver.net/wp-content/themes/catapulta-carbon/images/card-circles/silver.png",

      type: "Visa Card",
    },
    {
      image:
        "https://ovs927.p3cdn1.secureserver.net/wp-content/themes/catapulta-carbon/images/card-circles/rose.png",
      type: "MasterCard",
    },
    {
      image:
        "https://ovs927.p3cdn1.secureserver.net/wp-content/themes/catapulta-carbon/images/card-circles/rose.png",
      type: "No Card",
    },
  ];

  return (
    <>
      <div className="border-solid border-b-[1px] border-b-[#DEDEDE] pb-[25px] md:pl-[30px] pl-[7px] pt-[25px]">
        <div className="flex flex-col gap-[10px] mb-[21px] md:w-[48%] w-[96%]">
          <div className="flex flex-row items-center gap-[7px]">
            <input
              type="checkbox"
              name=""
              id="name"
              checked={cardInfo.showName}
              onChange={() => {
                setcardInfo({ ...cardInfo, showName: !cardInfo.showName });
              }}
            />
            <label
              htmlFor="name"
              className="text-[15px] text-[rgba(23,23,23,0.5)]"
            >
              {`Card Holder Name: (${cardInfo.name.length}/26)`}
            </label>
          </div>
          {cardInfo.showName && (
            <input
              type="text"
              name="cardholder"
              value={cardInfo?.name ? cardInfo.name : ""}
              onChange={(e) => {
                if (
                  cardInfo.name.length <= 25 ||
                  e.target.value.length < cardInfo.name.length
                ) {
                  setcardInfo({ ...cardInfo, name: e.target.value });
                }
              }}
              id="cardholder"
              placeholder="(Name Here)"
              className="border-[1px] border-solid border-[#DEDEDE] rounded-[5px] p-[10px_10px]"
            />
          )}
        </div>
        <div className="flex flex-col gap-[10px] mb-[21px] md:w-[48%] w-[96%]">
          <div className="flex flex-row items-center gap-[7px]">
            <input
              type="checkbox"
              name="number"
              id="number"
              checked={cardInfo.showNumber}
              onChange={() => {
                setcardInfo({ ...cardInfo, showNumber: !cardInfo.showNumber });
              }}
            />
            <label
              htmlFor="number"
              className="text-[15px] text-[rgba(23,23,23,0.5)]"
            >
              {`Card Holder Account Number: (${cardInfo.number.length}/16)`}
            </label>
          </div>
          {cardInfo.showNumber && (
            <input
              type="text"
              name="cardholder"
              value={cardInfo?.number ? cardInfo.number : ""}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  if (
                    cardInfo.number.length < 16 ||
                    e.target.value.length < cardInfo.number.length
                  ) {
                    setcardInfo({ ...cardInfo, number: e.target.value });
                  }
                }
              }}
              id="cardholder"
              placeholder="0000 0000 0000 0000"
              className="border-[1px] border-solid border-[#DEDEDE] rounded-[5px] p-[10px_10px]"
            />
          )}
        </div>
        <div className="flex flex-col gap-[10px] mb-[10px] md:w-[48%] w-[96%]">
          <div className="flex flex-row items-center gap-[7px]">
            <input
              type="checkbox"
              name="date"
              id="date"
              checked={cardInfo.showDate}
              onChange={() => {
                setcardInfo({ ...cardInfo, showDate: !cardInfo.showDate });
              }}
            />
            <label
              htmlFor="date"
              className="text-[15px] text-[rgba(23,23,23,0.5)]"
            >
              {`Card Valid Date`}
            </label>
          </div>
          {cardInfo.showDate && (
            <input
              type="text"
              name="cardholder"
              disabled={true}
              value={""}
              onChange={(e) => {
                // if (/^\d*$/.test(e.target.value)) {
                //   if (
                //     cardInfo.number.length < 16 ||
                //     e.target.value.length < cardInfo.number.length
                //   ) {
                //     setcardInfo({ ...cardInfo, number: e.target.value });
                //   }
                // }
              }}
              id="cardholder"
              placeholder="55/55"
              className="border-[1px] border-solid border-[#DEDEDE] rounded-[5px] p-[10px_10px] w-[69px]"
            />
          )}
        </div>
      </div>
      {(cardInfo.showNumber || cardInfo.showName) && (
        <div className="border-solid border-b-[1px] border-b-[#DEDEDE] pb-[25px] md:pl-[30px] pl-[7px] pt-[25px]">
          <div className="flex md:flex-row flex-col gap-[30px] md:w-[88%] w-[100%] justify-between">
            {cardInfo.showNumber && (
              <div className="flex flex-col gap-[5px] md:w-[48%] w-[96%]">
                <Select
                  title="Card Number On"
                  cards={cards}
                  cardInfo={cardInfo}
                  setcardInfo={setcardInfo}
                  selected={numberSelected}
                  setSelected={setnumberSelected}
                />
              </div>
            )}
            {cardInfo.showName && (
              <div className="flex flex-col gap-[5px] md:w-[48%] w-[96%]">
                <Select
                  title="Card Name On"
                  cards={cards}
                  cardInfo={cardInfo}
                  setcardInfo={setcardInfo}
                  selected={nameSelected}
                  setSelected={setnameSelected}
                />
              </div>
            )}
          </div>
        </div>
      )}
      <div className="border-solid border-b-[1px] border-b-[#DEDEDE] pb-[25px] md:pl-[30px] pl-[7px] pt-[25px]">
        <div className="flex flex-col gap-[5px] w-[30%]">
          <label
            htmlFor="cardholder"
            className="text-[15px] text-[rgba(23,23,23,0.5)]"
          >
            Border
          </label>
          <div className="flex flex-row gap-[16px]">
            <div
              className="flex flex-col gap-[5px] justify-center items-center"
              onClick={() => {
                setcardInfo({
                  ...cardInfo,
                  border: 1,
                });
              }}
            >
              <span
                className={`w-[75px] h-[55px] rounded-[7px] border-solid border-[1px] border-[#DEDEDE] hover:border-[black] duration-500 flex justify-center items-center cursor-pointer ${
                  cardInfo.border === 1 ? "bg-blue-500" : ""
                }`}
              >
                <Scan
                  size={40}
                  color={cardInfo.border === 1 ? "white" : "rgba(23,23,23,0.5)"}
                />
              </span>
              <p className="text-[14px] text-[rgba(23,23,23,0.5)]">+0$</p>
            </div>
            <div
              className="flex flex-col gap-[5px] justify-center items-center"
              onClick={() => {
                setcardInfo({
                  ...cardInfo,
                  border: 2,
                });
              }}
            >
              <span
                className={`w-[75px] h-[55px] rounded-[7px] border-solid border-[1px] border-[#DEDEDE] hover:border-blue-500 duration-500 flex justify-center items-center cursor-pointer ${
                  cardInfo.border === 2 ? "bg-blue-500" : ""
                }`}
              >
                <BoxSelect
                  size={40}
                  color={cardInfo.border === 2 ? "white" : "rgba(23,23,23,0.5)"}
                />
              </span>
              <p className="text-[14px] text-[rgba(23,23,23,0.5)]">+0$</p>
            </div>
            <div
              className="flex flex-col gap-[5px] justify-center items-center"
              onClick={() => {
                setcardInfo({
                  ...cardInfo,
                  border: 3,
                });
              }}
            >
              <span
                className={`w-[75px] h-[55px] rounded-[7px] border-solid border-[1px] border-[#DEDEDE] hover:border-blue-500 duration-500 flex justify-center items-center cursor-pointer ${
                  cardInfo.border === 3 ? "bg-blue-500" : ""
                }`}
              >
                <CircleOff
                  size={40}
                  color={cardInfo.border === 3 ? "white" : "rgba(23,23,23,0.5)"}
                />
              </span>
              <p className="text-[14px] text-[rgba(23,23,23,0.5)]">+0$</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[5px] w-[68%] mt-[21px]">
          <label
            htmlFor="cardholder"
            className="text-[15px] text-[rgba(23,23,23,0.5)]"
          >
            Payment Gateway
          </label>
          <div className="flex flex-row items-center gap-[16px] flex-wrap">
            <div className="flex flex-col gap-[3px] mt-[3px] mb-[21px] md:w-[48%] w-[96%]">
              {paymentMethod?.map((item, i) => (
                <div key={i} className="flex flex-row items-center gap-[7px]">
                  <input
                    type="checkbox"
                    name=""
                    id={item.type}
                    checked={cardInfo.paymentMethod === item.type}
                    onChange={() => {
                      setcardInfo({
                        ...cardInfo,
                        paymentMethod: item.type,
                      });
                    }}
                  />
                  <label
                    htmlFor={item.type}
                    className="text-[14px] text-[rgba(23,23,23,0.5)]"
                  >
                    {`${item.type}`}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-solid border-b-[1px] border-b-[#DEDEDE] pb-[25px] md:pl-[30px] pl-[7px] pt-[25px]">
        <div className="flex flex-col gap-[10px] md:w-[88%] w-[96%]">
          <label
            htmlFor="comment"
            className="text-[15px] text-[rgba(23,23,23,0.5)]"
          >
            Comment
          </label>
          <textarea
            name="comment"
            id="comment"
            value={cardInfo?.comment ? cardInfo.comment : ""}
            onChange={(e) =>
              setcardInfo({ ...cardInfo, comment: e.target.value })
            }
            placeholder="Add Comment"
            className="border-[1px] border-solid border-[#DEDEDE] rounded-[5px] p-[10px_10px] min-h-[110px] h-[110px]"
          />
        </div>
      </div>
    </>
  );
};

export default EditCard;
