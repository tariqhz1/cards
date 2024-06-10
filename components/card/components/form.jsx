"use client";
import Select from "@/lib/select";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Scrollbars from "react-custom-scrollbars-2";
import EditCard from "./edit";
import AddText from "./add";
import ChooseCard from "./choose";
import Pricing from "./pricing";
import { authUser } from "@/utils/authUser";
import { Spinner } from "@/lib/spinner";
import { useRouter } from "next/navigation";

const Form = ({
  selectedTab,
  setSelectedTab,
  cardInfo,
  setcardInfo,
  scrollToBottom,
  cards,
}) => {
  const handleTab = (tab) => {
    setSelectedTab(tab);
    scrollToBottom();
  };
  const [screenWidth, setscreenWidth] = useState("");
  const router = useRouter();
  const [numberSelected, setnumberSelected] = useState({ name: "Front" });
  const [nameSelected, setnameSelected] = useState({ name: "Front" });
  const [loading, setloading] = useState(false);
  const [backgroundSelected, setbackgroundSelected] = useState({
    name: "No Background",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let checkAuth = await authUser();
    if (!checkAuth.status) {
      router.push("/signin");
    } else {
      setloading(true);
      try {
        const { cardPrice, mirrorPrice, surfacePrice, typePrice } = cardInfo;
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: cardPrice + mirrorPrice + surfacePrice + typePrice,
            email: checkAuth.email,
            cardInfo,
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

  return (
    <div>
      <div className="border-solid border-b-[1px] border-b-[#DEDEDE] pb-[15px] md:pl-[30px] pl-[7px]">
        <div className="flex flex-row items-center border-solid border-[1px] border-[#DEDEDE] rounded-[10px] mb-[20px] md:w-max w-[97%]">
          <p
            onClick={() => {
              handleTab("edit");
            }}
            className={`md:text-[17px] text-[13px] font-[700] md:p-[16px_16px] p-[10px_10px] border-r-solid ${
              selectedTab === "edit"
                ? "bg-blue-500 text-[white]"
                : "text-[#17171799] hover:bg-[#dedede] hover:text-[rgb(0,0,0)]"
            }  cursor-pointer rounded-[10px_0px_0px_10px] md:w-[180px] w-[36%] text-center duration-700 `}
          >
            Edit Card Info
          </p>
          <p
            onClick={() => {
              handleTab("choose");
            }}
            className={`md:text-[17px] text-[13px] font-[700]  ${
              selectedTab === "choose"
                ? "bg-blue-500 text-[white]"
                : "text-[#17171799] hover:bg-[#dedede] hover:text-[rgb(0,0,0)]"
            }   md:p-[16px_16px] p-[10px_10px] border-r-solid cursor-pointer  md:w-[180px] w-[36%] text-center duration-700`}
          >
            Choose Card
          </p>
          <p
            onClick={() => {
              handleTab("add");
            }}
            className={`md:text-[17px] text-[13px] font-[700]  ${
              selectedTab === "add"
                ? "bg-blue-500 text-[white]"
                : "text-[#17171799] hover:bg-[#dedede] hover:text-[rgb(0,0,0)]"
            } rounded-[0px_10px_10px_0px] md:p-[16px_16px] p-[10px_10px] cursor-pointer  md:w-[180px] w-[38%] text-center duration-700`}
          >
            Add Logo/Text
          </p>
        </div>
      </div>

      <Scrollbars
        universal
        className="formScrollHeight"
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
              zIndex: 2000000,
            }}
          />
        )}
      >
        {selectedTab === "edit" ? (
          <EditCard
            cardInfo={cardInfo}
            setcardInfo={setcardInfo}
            numberSelected={numberSelected}
            setnumberSelected={setnumberSelected}
            nameSelected={nameSelected}
            setnameSelected={setnameSelected}
          />
        ) : selectedTab === "choose" ? (
          <ChooseCard
            cardInfo={cardInfo}
            setcardInfo={setcardInfo}
            cardType={cards[1]}
            cardSurface={cards[0]}
          />
        ) : (
          <AddText
            cardInfo={cardInfo}
            setcardInfo={setcardInfo}
            backgroundSelected={backgroundSelected}
            setbackgroundSelected={setbackgroundSelected}
          />
        )}
        <div
          className={`${
            selectedTab === "add"
              ? "mt-[44px]  mb-[0px]"
              : "mt-[25px]  mb-[25px] "
          } md:pl-[30px] pl-[7px]`}
        >
          <Pricing cardInfo={cardInfo} setcardInfo={setcardInfo} />
        </div>
      </Scrollbars>
      <div className="md:pl-[30px] pl-[7px] border-t-[1px] border-solid border-t-[#DEDEDE] pt-[25px] md:pb-[0px] pb-[20px]">
        <span
          onClick={handleSubmit}
          className="text-[16px] font-[700] text-[rgb(254,254,254)] p-[10px_20px] bg-blue-500 hover:bg-blue-400 rounded-[8px] flex flex-row gap-[5px] items-center w-max cursor-pointer transition-all duration-1000"
        >
          {loading ? (
            <Spinner color="white" size={25} />
          ) : (
            <>
              Create Order <ArrowRight size={20} />{" "}
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default Form;
