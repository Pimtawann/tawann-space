import React from "react";
import { User } from 'lucide-react';


export default function Avatar({ src, alt = "User", name = "", size = 40, className = "" }) {
  const fallbackText = name ? name[0].toUpperCase() : "?";

  return (
    <div
    className={`relative flex items-center justify-center rounded-full bg-brown-4 text-white font-semibold overflow-hidden w-10 h-10 text-base md:text-2xl ${className}`}
    >
        <User className="text-white z-0 w-5 h-5 md:w-8 md:h-8" />
      {src && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
