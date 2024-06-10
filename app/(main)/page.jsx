import CardCustomization from "@/components/card/page";
import React from "react";
import Image from "next/image";
import Hero from "./Components/Hero";
import Steps from "./Components/Steps";
import Safety from "../../components/Safety";

export default function Home() {
  return (
    <div className="">
      {/* <CardCustomization /> */}
      <Hero />
      <div className="bg-slate-50">
        <Steps />
        {/* <FAQ /> */}
      </div>
      <Safety />
    </div>
  );
}
