"use client";
import Select from "@/lib/select";
import React, { useEffect, useState } from "react";
import { CirclePlus, Link, Trash } from "lucide-react";
import Pricing from "./pricing";
import Input from "@/lib/input";

const AddText = ({
  cardInfo,
  setcardInfo,
  backgroundSelected,
  setbackgroundSelected,
}) => {
  const [addLogo, setaddLogo] = useState(false);
  const [customeText, setcustomText] = useState(false);
  const cards = [
    {
      id: 2,
      name: "No Background",
      avatar:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 1,
      name: "Black Background",
      avatar:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 2,
      name: "White Background",
      avatar:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; //
    const reader = new FileReader(); // Create a new FileReader object

    reader.onloadend = () => {
      setcardInfo({
        ...cardInfo,
        customLogo: reader.result,
        logoName:
          file.name.length > 40 ? file.name.slice(0, 40) + "..." : file.name,
      });
    };

    if (file) {
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  useEffect(() => {
    if (cardInfo.customText) {
      setcustomText(true);
    }
    if (cardInfo.customLogo) {
      setaddLogo(true);
    }
  }, []);

  return (
    <div className="md:pl-[30px] pl-[7px] pt-[25px] md:w-[88%] w-[96%]">
      {!customeText ? (
        <div
          className="border-[1px] border-dotted border-[#DEDEDE] p-[15px] flex flex-row items-center rounded-[24px] cursor-pointer"
          onClick={() => setcustomText(true)}
        >
          <p
            className="text-[16px] font-[400] bg-[#F3F3F3] flex justify-center items-center text-[#00000096] w-[48px] h-[72px]"
            style={{
              background: "rgba(34, 34, 34, 0.05)",
              border: "1px solid #ddd",
              boxSizing: "border-box",
              borderRadius: "4px",
              marginRight: "16px",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              listStyle: "circle",
              transition: "0.3s",
            }}
          >
            TXT
          </p>
          <div className="flex flex-col gap-[2px]">
            <p className="text-[rgb(23,23,23)] text-[16px] font-[700]">
              Add Custom Text
            </p>
            <p className="font-[400] text-[rgba(23,23,23,0.5)] text-[14px] ">
              Add / Edit text
            </p>
          </div>
        </div>
      ) : (
        <div className="border-solid border-[1px] border-[#171717] p-[15px] rounded-[24px] mt-[20px] duration-700">
          <div className="border-solid border-b-[1px] border-b-[#DEDEDE] pb-[20px]">
            <div className=" flex flex-row items-center justify-between ">
              <div className=" flex flex-row items-center ">
                <p
                  className="text-[16px] font-[400] bg-[#F3F3F3] flex justify-center items-center text-[#00000096] md:w-[48px] w-[44px] h-[72px]"
                  style={{
                    background: "rgba(34, 34, 34, 0.05)",
                    border: "1px solid #ddd",
                    boxSizing: "border-box",
                    borderRadius: "4px",
                    marginRight: "16px",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    listStyle: "circle",
                    transition: "0.3s",
                  }}
                >
                  TXT
                </p>
                <div className="flex flex-col gap-[2px]">
                  <p className="text-[rgb(23,23,23)] text-[16px] font-[700]">
                    Add Custom Text
                  </p>
                  <p className="font-[400] text-[rgba(23,23,23,0.5)] text-[14px] ">
                    Add / Edit text
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  setcustomText(false);
                  setcardInfo({ ...cardInfo, customText: "", fontSize: "24" });
                }}
                className="cursor-pointer hover:text-[red] duration-700"
              >
                <Trash />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-[38px] w-[88%] mt-[25px]">
            <div className="flex flex-col gap-[10px] w-[60%]">
              <label
                htmlFor="cardholder"
                className="text-[15px] text-[rgba(23,23,23,0.5)]"
              >
                {` Enter Text: (${cardInfo.customText.length}/26)`}
              </label>
              <input
                type="text"
                name="cardholder"
                value={cardInfo?.customText ? cardInfo.customText : ""}
                onChange={(e) => {
                  if (
                    cardInfo.customText.length <= 26 ||
                    e.target.value.length < cardInfo.customText.length
                  ) {
                    setcardInfo({ ...cardInfo, customText: e.target.value });
                  }
                }}
                id="cardholder"
                placeholder="(Enter Text)"
                className="border-[1px] border-solid border-[#DEDEDE] rounded-[5px] p-[10px_10px]"
              />
            </div>
            <div className="flex flex-col gap-[5px] w-[30%]">
              <label
                htmlFor="cardholder"
                className="text-[15px] text-[rgba(23,23,23,0.5)]"
              >
                Font Size
              </label>
              <input
                type="number"
                name="cardholder"
                value={cardInfo?.fontSize ? cardInfo.fontSize : ""}
                onChange={(e) => {
                  setcardInfo({ ...cardInfo, fontSize: e.target.value });
                }}
                id="cardholder"
                placeholder=""
                className="border-[1px] border-solid border-[#DEDEDE] rounded-[5px] p-[10px_10px] w-[69px]"
              />
            </div>
          </div>
        </div>
      )}

      {!addLogo ? (
        <div
          className="border-[1px] border-dotted border-[#DEDEDE] p-[15px] flex flex-row items-center rounded-[24px] mt-[25px] cursor-pointer"
          onClick={() => setaddLogo(true)}
        >
          <p
            className="text-[16px] font-[400] bg-[#F3F3F3] flex justify-center items-center text-[#00000096] md:w-[48px] w-[72px] h-[72px]"
            style={{
              background: "rgba(34, 34, 34, 0.05)",
              border: "1px solid #ddd",
              boxSizing: "border-box",
              borderRadius: "4px",
              marginRight: "16px",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              listStyle: "circle",
              transition: "0.3s",
            }}
          >
            <CirclePlus />
          </p>
          <div className="flex flex-col gap-[2px]">
            <p className="text-[rgb(23,23,23)] text-[16px] font-[700]">
              Add custom logo
            </p>
            <p className="font-[400] text-[rgba(23,23,23,0.5)] text-[14px] ">
              Recommended resolution: 1200 px * 2080 px
            </p>
          </div>
        </div>
      ) : (
        <div className="border-solid border-[1px] border-[#171717] p-[15px] rounded-[24px] mt-[20px] duration-700">
          <div className="border-solid border-b-[1px] border-b-[#DEDEDE] pb-[20px]">
            <div className=" flex flex-row items-center justify-between ">
              <div className=" flex flex-row items-center ">
                <p
                  className="text-[16px] font-[400] bg-[#F3F3F3] flex justify-center items-center text-[#00000096] w-[48px] h-[72px]"
                  style={{
                    background: "rgba(34, 34, 34, 0.05)",
                    border: "1px solid #ddd",
                    boxSizing: "border-box",
                    borderRadius: "4px",
                    marginRight: "16px",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    listStyle: "circle",
                    transition: "0.3s",
                  }}
                >
                  <CirclePlus />
                </p>
                <div className="flex flex-col gap-[2px]">
                  <p className="text-[rgb(23,23,23)] text-[16px] font-[700]">
                    {cardInfo.logoName ? cardInfo.logoName : "Add custom logo"}
                  </p>
                  <p className="font-[400] text-[rgba(23,23,23,0.5)] text-[14px] ">
                    {cardInfo.logoName
                      ? "High Resolution"
                      : " Recommended resolution: 1200 px * 2080 px"}
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  setaddLogo(false);
                  setcardInfo({
                    ...cardInfo,
                    customLogo: "",
                    logoHeight: "20",
                    logoWidth: "30",
                    proportion: false,
                  });
                }}
                className="cursor-pointer hover:text-[red] duration-700"
              >
                <Trash />
              </div>
            </div>
          </div>
          {cardInfo.customLogo ? (
            <div className="flex flex-row items-center md:gap-[38px] gap-[10px] duration-1000 w-[88%] mt-[25px]">
              <div className="flex flex-col gap-[10px] md:w-[20%] w-[65px]">
                <label
                  htmlFor="cardholder"
                  className="text-[15px] text-[rgba(23,23,23,0.5)]"
                >
                  Width
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardholder"
                    value={cardInfo?.logoWidth}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const aspectRatio = 16 / 9;
                      const height = Math.round(inputValue / aspectRatio);
                      if (/^\d*$/.test(inputValue)) {
                        setcardInfo({
                          ...cardInfo,
                          logoWidth: inputValue,
                          logoHeight: cardInfo.proportion
                            ? height
                            : cardInfo.logoHeight,
                        });
                      }
                    }}
                    id="cardholder"
                    placeholder="00"
                    className="border-[1px] border-solid border-[#DEDEDE] rounded-[5px] p-[10px_10px] w-[100%]"
                    pattern="[0-9]*"
                  />
                  <span className="absolute top-[9px] right-[7px] text-[#000000d4] font-[500] text-[19px]">
                    %
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[5px] md:w-[20%] w-[65px]">
                <label
                  htmlFor="cardholder"
                  className="text-[15px] text-[rgba(23,23,23,0.5)]"
                >
                  Height
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardholder"
                    value={cardInfo?.logoHeight}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const aspectRatio = 16 / 9;
                      const width = Math.round(inputValue * aspectRatio);
                      if (/^\d*$/.test(inputValue)) {
                        setcardInfo({
                          ...cardInfo,
                          logoHeight: inputValue,
                          logoWidth: cardInfo.proportion
                            ? width
                            : cardInfo.logoWidth,
                        });
                      }
                    }}
                    id="cardholder"
                    placeholder="00"
                    className="border-[1px] border-solid border-[#DEDEDE] rounded-[5px] p-[10px_10px] w-[100%]"
                    pattern="[0-9]*"
                  />
                  <span className="absolute top-[9px] right-[7px] text-[#000000d4] font-[500] text-[19px]">
                    %
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[5px] md:w-[20%] w-[65px]">
                <label
                  htmlFor="cardholder"
                  className="text-[15px] text-[rgba(23,23,23,0.5)]"
                >
                  Proportions
                </label>
                <div
                  className="relative"
                  style={{
                    width: "max-content",
                    background: cardInfo.proportion ? "black" : "white",
                    border: "1px solid #DEDEDE",
                    color: cardInfo.proportion ? "white" : "black",
                    height: "46px",
                    width: "53px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "13px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setcardInfo({
                      ...cardInfo,
                      proportion: !cardInfo.proportion,
                    });
                  }}
                >
                  <Link />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-[5px] md:w-[55%] w-[96%] pt-[20px]">
              <Select
                title="Select type of logo you want to upload:"
                cards={cards}
                cardInfo={cardInfo}
                setcardInfo={setcardInfo}
                selected={backgroundSelected}
                setSelected={setbackgroundSelected}
              />
            </div>
          )}

          <div className="mt-[40px] mb-[22px]">
            <label
              htmlFor="logo"
              className="bg-[rgba(23,23,23,1)] hover:bg-[#171717d1] duration-1000 text-[#FEFEFE] p-[16px_24px]  rounded-[10px] text-[16px] font-bold cursor-pointer transition-[0.4s] w-max"
            >
              Add Logo
            </label>
            <input
              type="file"
              name="logo"
              id="logo"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddText;
