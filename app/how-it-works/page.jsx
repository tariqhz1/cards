import React from "react";

const Works = () => {
  return <div className="bg-black flex flex-row items-center justify-center">
    <div className="lg:w-[50%] px-4" style={{ paddingTop: 128, paddingBottom: 64 }}>
      <div class="text-center text-white text-6xl font-bold">
        Our Services
      </div>
      <div className="pb-3 mb-5 bg-[#222222] rounded-lg overflow-hidden mt-[64px]">
        <h3 className="text-2xl border-b border-gray-700 p-3 text-gray-400">
          STEP 1:
        </h3>
        <p class="text-gray-400 mx-4 my-5">
          <b>
            <a href="/templates/customize/0" className="text-gray-400 underline">Create your own Custom Design </a>
            or choose from one of our
            <a href="/templates" className="text-gray-400 underline"> Best Sellers</a>. Once you have chosen
            your design complete the order details.
          </b>
        </p>
      </div>

      <div className="pb-3 mb-5 bg-[#222222] rounded-lg overflow-hidden mt-[32px]">
        <h3 className="text-2xl border-b border-gray-700 p-3 text-gray-400">
          STEP 2:
        </h3>
        <p class="text-gray-400 mx-4 my-5">
          <b>
            Freeze / Lock your card and ship it to us.
          </b>
        </p>
      </div>

      <div className="pb-3 mb-5 bg-[#222222] rounded-lg overflow-hidden mt-[32px]">
        <h3 className="text-2xl border-b border-gray-700 p-3 text-gray-400">
          STEP 3:
        </h3>
        <p class="text-gray-400 mx-4 my-5">
          <b>
            We begin working on your card straight away. This means that when your card arrives, we can simply complete the transfer process.
          </b>
        </p>
      </div>

      <div className="pb-3 mb-5 bg-[#222222] rounded-lg overflow-hidden mt-[32px]">
        <h3 className="text-2xl border-b border-gray-700 p-3 text-gray-400">
          STEP 4:
        </h3>
        <p class="text-gray-400 mx-4 my-5">
          <b>
            We ship both your old and new metal cards back within 1-2 days with tracked shipping.
          </b>
        </p>
      </div>

    </div>
  </div>;
};

export default Works;
