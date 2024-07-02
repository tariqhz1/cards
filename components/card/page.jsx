// @ts-nocheck
"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import card1 from "@/public/Images/card1.png";
import card2 from "@/public/Images/card2.png";
import card3 from "@/public/Images/card3.png";
import card4 from "@/public/Images/card4.png";
import card5 from "@/public/Images/card5.png";
import card6 from "@/public/Images/card6.png";
import card7 from "@/public/Images/card7.png";
import card8 from "@/public/Images/card8.png";
import visa from "@/public/Images/visa.png";
import mastercard from "@/public/Images/mastercard.png";

import { Nfc, Trash } from "lucide-react";

import Form from "./components/form";
import Scrollbars from "react-custom-scrollbars-2";
import Draggable from "react-draggable";
import { getCards } from "@/Firebase/apis";
import { cardRecords } from "@/redux/userActions";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "@/Firebase/config";
import { doc, getDoc } from "firebase/firestore";

const CardCustomization = () => {
  const [selectedTab, setSelectedTab] = useState("edit");
  const dispatch = useDispatch();
  const bottomRef = useRef(null);
  const [textTrash, settextTrash] = useState(false);
  const [logoTrash, setlogoTrash] = useState(false);
  const [cards, setcards] = useState([]);

  const [cardInfo, setcardInfo] = useState({
    nameType: "Front",
    numberType: "Front",
    validDate: "",
    showDate: true,
    name: "",
    number: "",
    comment: "",
    tPrice: 140,
    cardPrice: 125,
    mirrorPrice: 15,
    typePrice: 0,
    surfacePrice: 0,
    color: "1",
    border: 3,
    customText: "",
    customLogo: "",
    fontSize: "24",
    logoName: "",
    logoWidth: "100",
    logoHeight: "100",
    proportion: false,
    showName: true,
    showNumber: true,
    cardType: "",
    cardSurface: "",
    paymentMethod: "Visa Card",
    config: {},
  });

  const getConfiguration = async () => {
    let document = doc(firestore, "configuration", "tO6cH40Kkq7iAOeA13Hw");
    await getDoc(document).then(async (docSnapshot) => {
      if (docSnapshot.exists()) {
        const config = docSnapshot.data();

        let info = await getCardInformation();
        const result = [];

        for (const category of ["cardType", "cardSurface"]) {
          for (const item of info[category]) {
            const title = item.title.toLowerCase();
            if (config[title] > 0) {
              result.push({ price: item.price, title: item.title, category });
            }
          }
        }
        let cardType = result.find((item) => item.category === "cardType");
        let cardSurface = result.find(
          (item) => item.category === "cardSurface"
        );

        setcardInfo({
          ...cardInfo,
          config,
          cardType: cardType ? cardType.title : "",
          cardSurface: cardSurface ? cardSurface.title : "",
          typePrice: cardType ? cardType.price : 0,
          surfacePrice: cardSurface ? cardSurface.price : 0,
        });
      }
    });
  };

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  let cardInformation = useSelector((rec) =>
    rec?.cardInfo ? rec?.cardInfo : []
  );

  useEffect(() => {
    if (cardInformation && Object.keys(cardInformation).length > 1) {
      setcardInfo(cardInformation);
    } else {
      getConfiguration();
    }
  }, []);

  const getCardInformation = async () => {
    try {
      let cardDetail = await getCards();
      let cardType = cardDetail[1];
      let cardSurface = cardDetail[0];

      setcards(cardDetail);
      return {
        cardType,
        cardSurface,
      };
    } catch (error) {
      return {};
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(cardRecords(cardInfo));
    console.log("🚀 ~ useEffect ~ cardInfo:", cardInfo);
  }, [cardInfo]);

  return (
    <div className="md:px-[15px] pl-[10px]">
      <div className="flex lg:flex-row flex-col lg:justify-between justify-center w-[100%]">
        <div className="pt-[40px] lg:w-[55%] w-[100%]">
          <Scrollbars
            universal
            className="scrollHeight"
            style={{
              width: "100%",
            }}
            // autoHide={height}
            renderThumbVertical={({ style, ...props }) => (
              <div
                {...props}
                style={{
                  ...style,
                  backgroundColor: "#DEDEDE",
                  borderRadius: "10px",
                  margin: "3px 0px -4px",
                  width: "128%",
                  zIndex: 9,
                }}
              />
            )}
          >
            <div className="pr-[15px] lg:pl-[50px] pl-[0px] flex flex-col gap-[25px] ">
              <div className="relative lg:w-max flex lg:justify-start justify-center items-center md:w-[100%] w-[100%] mainDiv">
                <div className="absolute top-0 left-0 z-20">
                  {cardInfo.customText && (
                    <Draggable bounds=".mainDiv">
                      <div
                        onMouseEnter={() => {
                          settextTrash(true);
                        }}
                        onMouseLeave={() => {
                          settextTrash(false);
                        }}
                        className="md:h-[50px] md:w-[80px]  absolute top-[7px] p-[30px]"
                      >
                        <div
                          className={`relative dragableDiv cursor-all-scroll min-w-[60px] min-h-[29px] border-[0px] hover:border-[3px] border-dashed border-[#ffffff8f] w-max px-[10px] rounded-[6px] text-[rgb(240,228,228)]`}
                          style={{ fontSize: `${cardInfo.fontSize}px` }}
                        >
                          {textTrash && (
                            <div
                              className="absolute top-[-33px] left-[-32px] bg-[red] rounded-[100%] p-[6px] cursor-pointer"
                              onClick={() => {
                                setcardInfo({
                                  ...cardInfo,
                                  customText: "",
                                  fontSize: "24",
                                });
                              }}
                            >
                              <Trash />
                            </div>
                          )}

                          {cardInfo.customText}
                        </div>
                      </div>
                    </Draggable>
                  )}
                  {cardInfo.customLogo && (
                    <Draggable bounds=".mainDiv">
                      <div
                        onMouseEnter={() => {
                          setlogoTrash(true);
                        }}
                        onMouseLeave={() => {
                          setlogoTrash(false);
                        }}
                        className="md:h-[50px] md:w-[80px] absolute top-[7px] p-[30px]"
                      >
                        <div
                          className={`relative dragableDiv cursor-all-scroll min-w-[60px] min-h-[29px] border-[0px] hover:border-[3px] border-dashed border-[#ffffff8f] w-max px-[10px] rounded-[6px] text-[rgb(240,228,228)]`}
                          style={{ fontSize: `${cardInfo.fontSize}px` }}
                        >
                          {logoTrash && (
                            <div
                              className="absolute top-[-33px] left-[-32px] bg-[red] rounded-[100%] p-[6px] cursor-pointer"
                              onClick={() => {
                                setcardInfo({
                                  ...cardInfo,
                                  customLogo: "",
                                  logoHeight: "20",
                                  logoWidth: "30",
                                  logoName: "",
                                  proportion: false,
                                });
                              }}
                            >
                              <Trash />
                            </div>
                          )}

                          <Image
                            src={cardInfo.customLogo}
                            width={100}
                            height={100}
                            alt=""
                            style={{
                              width: `${cardInfo.logoWidth}px`,
                              height: `${cardInfo.logoHeight}px`,
                            }}
                          />
                        </div>
                      </div>
                    </Draggable>
                  )}
                </div>

                <div className="absolute md:top-[84px] md:gap-[0] gap-[5px] top-[39px] text-[#f0e4e4] flex w-[100%] h-[100%] flex-col justify-center items-center font-[600]">
                  {cardInfo.numberType === "Front" && cardInfo.showNumber && (
                    <>
                      <p className="md:text-[45px] text-[20px] md:w-[79%] w-[78%] font-[300]">
                        {cardInfo.number
                          ? cardInfo.number.replace(/(.{4})/g, "$1 ")
                          : "0000 0000 0000 0000"}
                      </p>
                    </>
                  )}
                  <div className="w-[80%] md:mt-[12px] mt-[0px]">
                    {cardInfo.numberType === "Front" && cardInfo.showDate && (
                      <p className="md:text-[25px] text-[17px] flex items-center">
                        <span className="relative top-[1px] md:w-[37px] w-[29px] flex md:text-[10px] text-[7px] md:tracking-[] tracking-[0.7px] md:leading-[12px] leading-[8px] uppercase items-center">
                          valid thru
                        </span>
                        <span className="tracking-[2px] md:text-[25px] text-[13px] font-[400]">
                          55/55
                        </span>
                      </p>
                    )}
                    {cardInfo.nameType === "Front" && cardInfo.showName && (
                      <p className="text-left md:pt-[0px] pt-[0px] md:text-[28px] text-[15px] uppercase font-[400]">
                        {cardInfo.name ? cardInfo.name : "(your name)"}
                      </p>
                    )}
                  </div>
                </div>
                <Image
                  src={
                    cardInfo.color === "1"
                      ? cardInfo.border === 1
                        ? card6
                        : cardInfo.border === 2
                        ? card7
                        : card1
                      : cardInfo.border === 1
                      ? card5
                      : cardInfo.border === 2
                      ? card8
                      : card3
                  }
                  width={650}
                  height={400}
                  alt=""
                  unoptimized
                  className="rounded-[23px]"
                />
                {cardInfo.paymentMethod !== "No Card" && (
                  <div className="absolute md:bottom-[13px] bottom-[7px] right-[20px]">
                    <Image
                      src={
                        cardInfo.paymentMethod === "Visa Card"
                          ? visa
                          : cardInfo.paymentMethod === "MasterCard"
                          ? mastercard
                          : ""
                      }
                      width={98}
                      height={98}
                      alt=""
                      unoptimized
                      className="md:w-[98px] md:h-[98px] w-[55px] h-[55px]"
                    />
                  </div>
                )}

                {cardInfo.cardType === "Contactless" && (
                  <div className="absolute md:top-[153px] top-[62px] right-[20px]">
                    <Nfc
                      size={40}
                      color="#e2e4e4cf"
                      className="md:w-[40px] w-[25px]"
                    />
                  </div>
                )}
              </div>
              <div className="relative lg:w-max flex lg:justify-start justify-center items-center md:w-[100%] w-[100%]">
                <div className="absolute text-[#f0e4e4] flex w-[100%] h-[100%] flex-col font-[600] justify-end md:pl-[37px] pl-[16px] md:mb-[33px] mb-[15px] ">
                  {cardInfo.numberType === "Back" && cardInfo.showNumber && (
                    <>
                      <p className="md:text-[45px] text-[20px] md:w-[100%] w-[90%] font-[300]">
                        {cardInfo.number
                          ? cardInfo.number.replace(/(.{4})/g, "$1 ")
                          : "0000 0000 0000 0000"}
                      </p>
                    </>
                  )}
                  <div className="w-[80%] md:mt-[12px] mt-[3px]">
                    {cardInfo.numberType === "Back" && cardInfo.showDate && (
                      <p className="md:text-[25px] text-[17px] flex items-center">
                        <span className="relative top-[1px] md:w-[37px] w-[29px] flex md:text-[10px] text-[7px] md:tracking-[] tracking-[0.7px] md:leading-[12px] leading-[8px] uppercase items-center">
                          valid thru
                        </span>
                        <span className="tracking-[2px] md:text-[25px] text-[13px] font-[400]">
                          55/55
                        </span>
                      </p>
                    )}
                    {cardInfo.nameType === "Back" && cardInfo.showName && (
                      <p className="text-left md:pt-[0px] pt-[0px] md:text-[28px] text-[15px] uppercase font-[400]">
                        {cardInfo.name ? cardInfo.name : "(your name)"}
                      </p>
                    )}
                  </div>
                </div>
                <Image
                  src={cardInfo.color === "1" ? card2 : card4}
                  width={650}
                  height={400}
                  alt=""
                  unoptimized
                  className="rounded-[23px]"
                />
              </div>
            </div>
          </Scrollbars>
        </div>

        <div className="lg:w-[44%] w-[100%] border-l-solid border-l-[1px] border-l-[#DEDEDE] md:pt-[40px] pt-[13px]">
          <Form
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            cardInfo={cardInfo}
            setcardInfo={setcardInfo}
            scrollToBottom={scrollToBottom}
            cards={cards}
          />
        </div>
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
};

export default CardCustomization;
