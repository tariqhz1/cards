import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const features = [
  {
    name: "Shipping",
    description:
      "We only use secure and tracked shipping in discreet unbranded packaging.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Process    ",
    description:
      "Our equipment is highly secure and does not store any personal or sensitive card information.",
    icon: LockClosedIcon,
  },
  {
    name: "Card Data    ",
    description:
      "All payments are processed via our PCI compliant payment merchant.",
    icon: ShieldCheckIcon,
  },
];

export default function Safety() {
  return (
    <div className="relative bg-black py-16 sm:py-20 lg:py-24 lg:h-[100vh] flex items-center">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Financial Safety
        </p>
        <p className="mx-auto mt-5 max-w-prose text-xl text-white">
          Your financial safety is our priority.
        </p>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg bg-black bg-opacity-50 px-6 pb-8 h-[234px] border border-gray-300">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-xl bg-black p-3 shadow-lg border border-gray-300">
                        <feature.icon
                          className="h-8 w-8 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-semibold leading-8 tracking-tight text-white">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base leading-7 text-white">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
