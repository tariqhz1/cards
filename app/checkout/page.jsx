// "use client";
// import { Disclosure } from "@headlessui/react";
// import { LockClosedIcon } from "@heroicons/react/20/solid";
// import React, { useState } from "react";

// const total = "$341.68";

// export default function Checkout() {
//   const [values, setValues] = useState({
//     email: "",
//     name: "",
//     address: "",
//     city: "",
//     state: "",
//     postalCode: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/checkout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create checkout session");
//       }

//       const session = await response.json();
//       return session;
//     } catch (error) {}
//   };
//   return (
//     <>
//       <main className="lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden w-[99%]">
//         <h1 className="sr-only">Checkout</h1>

//         {/* Mobile order summary */}

//         {/* Order summary */}

//         {/* Checkout form */}
//         <section
//           aria-labelledby="payment-heading"
//           className="flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0"
//         >
//           <h1
//             style={{
//               textAlign: "center",
//               marginTop: "66px",
//               fontSize: "29px",
//               fontWeight: "400",
//               paddingBottom: "19px",
//             }}
//           >
//             Checkout Detail
//           </h1>
//           <div className="mx-auto max-w-lg">
//             <form className="mt-6">
//               <div className="grid grid-cols-12 gap-x-4 gap-y-6">
//                 <div className="col-span-full">
//                   <label
//                     htmlFor="name-on-card"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Name on card
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       id="name-on-card"
//                       name="name-on-card"
//                       autoComplete="cc-name"
//                       className="block w-full p-[8px] border-solid border-[1px] border-[#0000002e] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                 </div>

//                 <div className="col-span-full">
//                   <label
//                     htmlFor="address"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Address
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       id="address"
//                       name="address"
//                       autoComplete="street-address"
//                       className="block w-full p-[8px] border-solid border-[1px] border-[#0000002e] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                 </div>

//                 <div className="col-span-full sm:col-span-4">
//                   <label
//                     htmlFor="city"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     City
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       id="city"
//                       name="city"
//                       autoComplete="address-level2"
//                       className="block w-full p-[8px] border-solid border-[1px] border-[#0000002e] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                 </div>

//                 <div className="col-span-full sm:col-span-4">
//                   <label
//                     htmlFor="region"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     State / Province
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       id="region"
//                       name="region"
//                       autoComplete="address-level1"
//                       className="block w-full p-[8px] border-solid border-[1px] border-[#0000002e] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                 </div>

//                 <div className="col-span-full sm:col-span-4">
//                   <label
//                     htmlFor="postal-code"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Postal code
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       id="postal-code"
//                       name="postal-code"
//                       autoComplete="postal-code"
//                       className="block w-full p-[8px] border-solid border-[1px] border-[#0000002e] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-6 flex space-x-2">
//                 <div className="flex h-5 items-center">
//                   <input
//                     id="same-as-shipping"
//                     name="same-as-shipping"
//                     type="checkbox"
//                     defaultChecked
//                     className="h-4 w-4 rounded p-[8px] border-solid border-[1px] border-[#0000002e] border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                   />
//                 </div>
//                 <label
//                   htmlFor="same-as-shipping"
//                   className="text-sm font-medium text-gray-900"
//                 >
//                   Billing address is the same as shipping address
//                 </label>
//               </div>

//               <button
//                 onClick={handleSubmit}
//                 className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//               >
//                 Pay {total}
//               </button>

//               <p className="mt-6 flex justify-center text-sm font-medium text-gray-500">
//                 <LockClosedIcon
//                   className="mr-1.5 h-5 w-5 text-gray-400"
//                   aria-hidden="true"
//                 />
//                 Payment details stored in plain text
//               </p>
//             </form>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }

import React from "react";

const Checkout = () => {
  return <div>Checkout</div>;
};

export default Checkout;
