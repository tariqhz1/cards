import React from "react";

const Pricing = ({ card }) => {
  let { typePrice, totalPrice, cardPrice } = card;
  return (
    <div className="flex flex-col gap-[10px] md:w-[56%] w-[88%]">
      <div className="flex flex-row gap-[10px] justify-between">
        <p className="text-[15px] text-[rgba(23,23,23,0.5)]">Type</p>
        <p className="text-[15px] text-[rgb(23,23,23)]">+${typePrice} USD</p>
      </div>

      <div className="flex flex-row gap-[10px] justify-between border-solid border-b-[1px] border-b-[#DEDEDE] pb-[10px]">
        <p className="text-[15px] text-[rgba(23,23,23,0.5)]">Card</p>
        <p className="text-[15px] text-[rgb(23,23,23)]">${cardPrice} USD</p>
      </div>
      <div className="flex flex-row gap-[10px] justify-between pt-[10px]">
        <p className="text-[17px] text-[rgba(23,23,23,0.5)]">Total (USD)</p>
        <p className="text-[17px] text-[#23262F] font-bold">
          ${totalPrice} USD
        </p>
      </div>
    </div>
  );
};

export default Pricing;
