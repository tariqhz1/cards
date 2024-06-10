import Select from "@/lib/select";
import Image from "next/image";
import React, { useEffect } from "react";
import brushed from "@/public/Images/brushed.jpg";
import mirror from "@/public/Images/mirror.jpg";
import contactless from "@/public/Images/contactless.png";
import "react-toastify/dist/ReactToastify.css";

import Pricing from "./pricing";
import { BoxSelect, CircleOff, Nfc, Scan, SmartphoneNfc } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

const ChooseCard = ({ cardInfo, setcardInfo, cardType, cardSurface }) => {
  const cardStyle = [
    {
      image:
        "https://ovs927.p3cdn1.secureserver.net/wp-content/themes/catapulta-carbon/images/card-circles/silver.png",
      price: 15,
      type: "1",
    },
    {
      image:
        "https://ovs927.p3cdn1.secureserver.net/wp-content/themes/catapulta-carbon/images/card-circles/rose.png",
      price: 10,
      type: "2",
    },
  ];

  return (
    <div>
      <div className="border-solid border-b-[1px] border-b-[#DEDEDE] pb-[0px] md:pl-[30px] pl-[7px] pt-[25px]">
        <div className="flex md:flex-row flex-col gap-[30px] md:w-[88%] w-[96%] justify-between">
          <div className="flex flex-col gap-[10px] w-[68%]">
            <label
              htmlFor="cardholder"
              className="text-[15px] text-[rgba(23,23,23,0.5)]"
            >
              Color
            </label>
            <div className="flex flex-row items-center gap-[16px] flex-wrap ml-[12px]">
              {cardStyle.map((item, i) => (
                <div
                  onClick={() =>
                    setcardInfo({
                      ...cardInfo,
                      color: item.type,
                      mirrorPrice: item.price,
                      tPrice: item.price + cardInfo.cardPrice,
                    })
                  }
                  key={i}
                  className="flex flex-col gap-[5px] justify-center items-center cursor-pointer"
                >
                  <div className="w-[55px] h-[55px] relative">
                    <Image
                      src={item.image}
                      width={55}
                      height={55}
                      alt="image"
                    />
                    {cardInfo.color === item.type && (
                      <div className="w-[100%] h-[100%] absolute top-0 left-0 flex justify-center items-center">
                        <div className="bg-[white]  w-[20px] h-[20px] rounded-[100%]"></div>
                      </div>
                    )}
                  </div>
                  <p className="text-[14px] text-[rgba(23,23,23,0.5)]">
                    {item.price}$
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] w-[70%] mt-[21px]">
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
                  if (
                    item.title === "Contactless" ||
                    item.title === "Non-Contactless"
                  ) {
                    const isContactless = item.title === "Contactless";
                    const stock = isContactless
                      ? cardInfo.config.contactless
                      : cardInfo.config["non-contactless"];
                    if (stock > 0) {
                      setcardInfo({
                        ...cardInfo,
                        cardType: item.title,
                        typePrice: item.price,
                      });
                    } else {
                      toast.error(`${item.title} cards are out of stock`);
                    }
                  }
                }}
              >
                <span
                  className={`w-[85px] h-[72px] rounded-[7px] border-solid border-[1px] border-[#DEDEDE] hover:border-blue-500 duration-500 flex justify-center items-center cursor-pointer  ${
                    cardInfo.cardType === item.title ? "border-blue-500" : ""
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
                          // cardInfo.cardType === item.title
                          //   ? "white"
                          //   :
                          "rgba(23,23,23,0.8)"
                        }
                      />
                      <span className="absolute top-[-8px] left-[-7px]">
                        <CircleOff
                          size={44}
                          color={
                            // cardInfo.border === 3
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
                    //     cardInfo.cardType === item.title
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

        <div className="flex flex-col gap-[10px] w-[68%] mt-[21px] mb-[30px]">
          <label
            htmlFor="cardholder"
            className="text-[15px] text-[rgba(23,23,23,0.5)]"
          >
            Card Surface
          </label>
          <div className="flex flex-row items-center gap-[16px] flex-wrap ml-[12px]">
            {cardSurface?.map((item, i) => (
              <div
                onClick={() => {
                  if (item.title === "Brushed" || item.title === "Mirror") {
                    const isContactless = item.title === "Brushed";
                    const stock = isContactless
                      ? cardInfo.config.brushed
                      : cardInfo.config.mirror;
                    if (stock > 0) {
                      setcardInfo({
                        ...cardInfo,
                        cardSurface: item.title,
                        surfacePrice: item.price,
                      });
                    } else {
                      toast.error(`${item.title} cards are out of stock`);
                    }
                  }
                }}
                key={i}
                className="flex flex-col gap-[5px] justify-center items-center cursor-pointer"
              >
                <div className="w-[55px] h-[55px] relative">
                  <Image
                    src={item.title === "Brushed" ? brushed : mirror}
                    width={55}
                    height={55}
                    alt="image"
                    className="w-[55px] h-[55px] rounded-[100%]"
                  />
                  {cardInfo.cardSurface === item.title && (
                    <div className="w-[100%] h-[100%] absolute top-0 left-0 flex justify-center items-center">
                      <div className="bg-[white]  w-[20px] h-[20px] rounded-[100%]"></div>
                    </div>
                  )}
                </div>
                <div className="flex gap-[0px] flex-col">
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChooseCard;
