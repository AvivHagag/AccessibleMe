"use client";

import React from "react";
import { ClipLoader } from "react-spinners";

interface LoaderProps {
  loading?: boolean;
  size?: number;
  color?: string;
  className?: string;
}

export default function Loader({
  loading = true,
  size = 35,
  color = "#36d7b7",
  className,
}: LoaderProps) {
  if (!loading) return null;

  return (
    <div className={`flex justify-center items-center ${className || ""}`}>
      <ClipLoader
        loading={loading}
        size={size}
        color={color}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
