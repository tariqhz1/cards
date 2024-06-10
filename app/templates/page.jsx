// @ts-nocheck
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import template1 from "@/public/Images/template1.png";
import template2 from "@/public/Images/template2.png";
import template3 from "@/public/Images/template3.png";
import card1 from "@/public/Images/card1.png";
import visa from "@/public/Images/visa.png";
import mastercard from "@/public/Images/mastercard.png";
import { useRouter } from "next/navigation";
import { getTemplates } from "@/Firebase/apis";
import { Spinner } from "@/lib/spinner";
import { useDispatch } from "react-redux";
import { templatesRecords } from "@/redux/userActions";

const Templates = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [templates, settemplates] = useState([]);
  const [customizableTemplates, setCustomizableTemplates] = useState([
    {
      image: card1,
      id: "2124121241",
    },
  ]);

  const [loader, setloader] = useState(false);

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

  const templatesRecord = async () => {
    setloader(true);
    const res = await getTemplates();
    if (res.status) {
      settemplates(res.record);
      dispatch(templatesRecords(res.record));
    }
    setloader(false);
  };

  useEffect(() => {
    templatesRecord();
  }, []);

  return (
    <div className="flex  md:px-[77px] px-[10px] flex-col md:py-[40px] py-[30px]">
      <div>
        <div className="pb-[14px] flex flex-col gap-[6px] justify-center items-center mt-[40px] mb-[20px]">
          <p
            id="pre-designed"
            className="text-[26px]  font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Pre-designed template
          </p>
          <p className=" text-center w-[100%]  lg:w-[52%] mt-1 md:mt-4 text-[17px] md:text-xl text-gray-500">
            No need to start from scratch! Our instant templates are
            pre-designed and ready to use, with a card design that&apos;s
            perfect for a quick and easy solution.{" "}
          </p>
        </div>
        {loader ? (
          <div className="h-[calc(100vh-277px)] flex justify-center items-center">
            <Spinner color="blue" size={50} />
          </div>
        ) : (
          <div className="md:grid-cols-3 grid-cols-1 grid gap-4">
            {templates.map((item, i) => (
              <div
                key={i}
                className="w-[100%]"
                onClick={() => {
                  router.push(`/templates/${item.id}`);
                }}
              >
                <div className="relative lg:w-[100%] flex lg:justify-start justify-center items-center md:w-[100%] w-[100%] mainDiv cursor-pointer  hover:scale-105 duration-500">
                  <Image
                    src={
                      item.image === "template1"
                        ? template1
                        : item.image === "template2"
                        ? template2
                        : item.image === "template3"
                        ? template3
                        : item.image === "template4"
                        ? card1
                        : ""
                    }
                    width={300}
                    height={400}
                    alt=""
                    unoptimized
                    className="rounded-[23px] w-[100%] bg-[#00000029] h-[277px]"
                  />
                  {item.paymentMethod !== "No Card" && (
                    <div className="absolute md:bottom-[13px] bottom-[7px] right-[20px]">
                      <Image
                        src={
                          item.paymentMethod === "Visa Card"
                            ? visa
                            : item.paymentMethod === "MasterCard"
                            ? mastercard
                            : ""
                        }
                        width={80}
                        height={80}
                        alt=""
                        unoptimized
                        className="md:w-[80px] md:h-[80px] w-[55px] h-[55px]"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-[64px]">
        <div className="pb-[14px] flex flex-col gap-[6px] justify-center items-center mt-[40px] mb-[20px]">
          <p
            className="text-[26px]  font-bold tracking-tight text-gray-900 sm:text-4xl"
            id="customizable"
          >
            Customizable template
          </p>
          <p className=" text-center w-[100%]  lg:w-[52%] mt-1 md:mt-4 text-[17px] md:text-xl text-gray-500">
            Take your design to the next level! Our customizable templates offer
            a range of debit card designs that can be tailored to fit your
            unique style and branding.{" "}
          </p>
        </div>
        {loader ? (
          <div className="h-[calc(100vh-277px)] flex justify-center items-center">
            <Spinner color="blue" size={50} />
          </div>
        ) : (
          <div className="md:grid-cols-3 grid-cols-1 grid gap-4">
            {customizableTemplates.map((item, i) => (
              <div
                key={i}
                className="w-[100%]"
                onClick={() => {
                  router.push(`/templates/customize/${item.id}`);
                }}
              >
                <div className="relative lg:w-[100%] flex lg:justify-start justify-center items-center md:w-[100%] w-[100%] mainDiv cursor-pointer  hover:scale-105 duration-500">
                  <Image
                    src={item.image}
                    width={300}
                    height={400}
                    alt=""
                    unoptimized
                    className="rounded-[23px] w-[100%] bg-[#00000029] h-[277px]"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;
