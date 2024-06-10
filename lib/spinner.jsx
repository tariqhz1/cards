"use client";
import { ClipLoader } from "react-spinners";
import React from "react";

export function Spinner({ color, size }) {
  return (
    <ClipLoader
      color={color}
      loading={true}
      // cssOverride={override}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
