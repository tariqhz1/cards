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
  const [showOverlay, setShowOverlay] = useState(null);

  const [loader, setloader] = useState(false);
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
    <div className="flex flex-col bg-black">
      <div style={{ paddingTop: 128, paddingBottom: 64 }}>
        <div className="pb-[14px] flex flex-col gap-[6px] justify-center items-center mt-[40px] mb-[20px]">
          <p
            id="pre-designed"
            className="font-bold tracking-tight text-white text-6xl text-center"
          >
            Pre-Designed Templates
          </p>
          <p className=" text-center w-[100%] lg:w-[52%] mt-1 md:mt-4 text-[17px] md:text-xl text-white">
            No need to start from scratch! Our instant templates are
            pre-designed and ready to use, with a card design that&apos;s
            perfect for a quick and easy solution.{" "}
          </p>
        </div>

        <div className="px-10">
          <h1
            className="mt-5 mb-5 p-2 text-4xl text-white font-bold text-left border-b border-gray-400"
            style={{ fontSize: '4vw' }}
            id="Anime"
          >
            Exclusive <span className="text-gray-400 text-lg">Items {templates?.length}</span>
          </h1>
          {loader ? (
            <div className="h-[calc(100vh-277px)] flex justify-center items-center">
              <Spinner color="blue" size={50} />
            </div>
          ) : (
            <div className="overflow-x-scroll overflow-y-hidden h-[324px]">
              <div className="flex flex-row items-center justify-center gap-4 w-max">
                {templates.map((item, i) => (
                  <div
                    key={i}
                    className="w-[33%]"
                    onClick={() => {
                      router.push(`/templates/${item.id}`);
                    }}
                    onMouseEnter={() => setShowOverlay(item.id)}
                    onMouseLeave={() => setShowOverlay(null)}
                  >
                    <div className="relative w-[100%] cursor-pointer">


                      {showOverlay === item.id && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-50 bg-black cursor-pointer">
                          <button type="submit" className="bg-white border border-white text-black hover:bg-white hover:text-gray-800 font-semibold py-4 px-6 rounded-full">
                            {item.paymentMethod}
                          </button>
                        </div>
                      )}

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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Templates;
