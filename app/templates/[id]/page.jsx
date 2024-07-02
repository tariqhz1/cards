// @ts-nocheck
"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import card1 from "@/public/Images/card1.png";
import visa from "@/public/Images/visa.png";
import mastercard from "@/public/Images/mastercard.png";
import template1 from "@/public/Images/template1.png";
import template2 from "@/public/Images/template2.png";
import template3 from "@/public/Images/template3.png";

import { ArrowRight, CircleOff, Nfc, Trash } from "lucide-react";
import { getCards, singleTemplate } from "@/Firebase/apis";
import Form from "./Components/form";
import { Spinner } from "@/lib/spinner";
import { useSelector } from "react-redux";
import { authUser } from "@/utils/authUser";
import { useRouter } from "next/navigation";

const CardCustomization = ({ params }) => {
  const [cardType, setcardType] = useState([]);
  const [loader, setloader] = useState(true);
  const router = useRouter();
  const [loading, setloading] = useState(false);

  const [card, setcard] = useState({
    id: 0,
    image: "",
    paymentMethod: "",
    cardType: "",
    cardSurface: "",
    borders: 0,
    totalPrice: 0,
    typePrice: 0,
    cardPrice: 0,
  });
  //   const templates = [
  //     {
  //       id: "1",
  //       image: template1,
  //       paymentMethod: "MasterCard",
  //       cardType: "",
  //       cardSurface: "Brushed",
  //       borders: 1,
  //     },
  //     {
  //       id: "2",
  //       image: template2,
  //       paymentMethod: "Visa Card",
  //       cardType: "",
  //       cardSurface: "Brushed",
  //       borders: 0,
  //     },
  //     {
  //       id: "3",
  //       image: template3,
  //       paymentMethod: "MasterCard",
  //       cardType: "",
  //       cardSurface: "Brushed",
  //       borders: 2,
  //     },
  //     {
  //       id: "4",
  //       image: card1,
  //       paymentMethod: "Visa Card",
  //       cardType: "",
  //       cardSurface: "Brushed",
  //       borders: 0,
  //     },
  //   ];

  const getCardType = async () => {
    let cardDetail = await getCards();
    let types = cardDetail[1];
    console.log("🚀 ~ getCardType ~ types:", types);
    setcardType(types);
    return types;
  };

  const templates = useSelector((template) =>
    template?.templates ? template?.templates : []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    let checkAuth = await authUser();
    if (!checkAuth.status) {
      router.push("/signin");
    } else {
      setloading(true);
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: card.totalPrice,
            email: checkAuth.email,
            cardInfo: card,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to create checkout session");
        }
        setloading(false);

        const session = await response.json();
        window.open(session, "_blank");
      } catch (error) {
        setloading(false);
        console.log("🚀 ~ handleSubmit ~ error:", error);
      }
    }
  };

  const getCard = async () => {
    if (templates && templates?.length > 1) {
      let selectedCard = templates?.find((item, i) => {
        return item.id === params.id;
      });
      console.log("🚀 ~ selectedCard ~ selectedCard:", selectedCard);

      if (selectedCard) {
        let values = await getCardType();
        let typePrice = 0;
        if (selectedCard.cardType === "Contactless") {
          typePrice = values.find((item) => item.title == "Contactless");
          typePrice = typePrice.price;
        } else if (selectedCard.cardType === "Non-Contactless") {
          typePrice = values.find((item) => item.title == "Non-Contactless");
          typePrice = typePrice.price;
        } else {
          typePrice = 0;
        }
        setcard({
          ...selectedCard,
          totalPrice: selectedCard.price + typePrice,
          cardPrice: selectedCard.price,
          typePrice,
        });
      }
      setloader(false);
    } else {
      singleRecord();
    }
  };

  useEffect(() => {
    getCard();
  }, []);

  const singleRecord = async () => {
    let template = await singleTemplate(params.id);
    console.log("🚀 ~ singleRecord ~ template:", template);
    if (template.status) {
      let values = await getCardType();
      let typePrice = 0;
      if (template.record.cardType === "Contactless") {
        typePrice = values.find((item) => item.title == "Contactless");
        typePrice = typePrice.price;
      } else if (template.record.cardType === "Non-Contactless") {
        typePrice = values.find((item) => item.title == "Non-Contactless");
        typePrice = typePrice.price;
      } else {
        typePrice = 0;
      }
      setcard({
        ...template.record,
        totalPrice: template.record.price + typePrice,
        cardPrice: template.record.price,
        typePrice,
      });
    }
    setloader(false);
  };

  useEffect(() => {
    console.log(card);
  }, [card]);

  return (
    <div className="md:px-[15px] pl-[10px]" style={{ paddingTop: 128, paddingBottom: 64 }}>
      {loader ? (
        <div className="h-[calc(100vh-91px)] flex justify-center items-center">
          <Spinner />
        </div>
      ) : card.image ? (
        <div className="flex lg:flex-row flex-col lg:justify-between  w-[100%]">
          <div className="pt-[40px] lg:w-[55%] w-[100%]">
            <div className="pr-[15px] lg:pl-[50px] pl-[0px] flex flex-col gap-[25px] ">
              <div className="relative lg:w-max flex lg:justify-start justify-center items-center md:w-[100%] w-[100%] mainDiv">
                <Image
                  src={
                    card.image === "template1"
                      ? template1
                      : card.image === "template2"
                      ? template2
                      : card.image === "template3"
                      ? template3
                      : card.image === "template4"
                      ? card1
                      : ""
                  }
                  width={650}
                  height={400}
                  alt=""
                  unoptimized
                  className="rounded-[23px] bg-[#00000082]"
                />
                {card.paymentMethod !== "No Card" &&
                  card.paymentMethod !== "" && (
                    <div className="absolute md:bottom-[13px] bottom-[7px] right-[20px]">
                      <Image
                        src={
                          card.paymentMethod === "Visa Card"
                            ? visa
                            : card.paymentMethod === "MasterCard"
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

                {card.cardType === "Contactless" && (
                  <div className="absolute md:top-[153px] top-[62px] right-[20px]">
                    <Nfc
                      size={40}
                      color="#e2e4e4cf"
                      className="md:w-[40px] w-[25px]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between lg:w-[44%] md:pl-[30px] pl-[7px] w-[100%] border-l-solid border-l-[1px] border-l-[#DEDEDE] md:pt-[40px] pt-[13px]">
            <Form card={card} setcard={setcard} cardType={cardType} />

            <div className="md:pl-[0px] md:w-[88%] w-[100%] pl-[7px] border-t-[1px] border-solid border-t-[#DEDEDE] pt-[18px] mt-[20px] md:pb-[0px] pb-[20px] bottom-[24px] ">
              <span
                onClick={handleSubmit}
                className="text-[16px] font-[700] text-[rgb(254,254,254)] p-[10px_20px] bg-blue-500 hover:bg-blue-400  rounded-[8px] flex flex-row gap-[5px] items-center w-max cursor-pointer transition-all duration-1000"
              >
                {loading ? (
                  <Spinner color="white" size={25} />
                ) : (
                  <>
                    Create Order <ArrowRight size={20} />{" "}
                  </>
                )}{" "}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[calc(100vh-91px)] flex justify-center items-center">
          <p className="text-[34px] font-[500]">404 Error</p>
        </div>
      )}
    </div>
  );
};

export default CardCustomization;
