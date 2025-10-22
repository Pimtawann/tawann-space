import React from "react";
import { User } from 'lucide-react';


export default function Avatar({ src, alt = "User", name = "", size = 40 }) {
  const fallbackText = name ? name[0].toUpperCase() : "?";

  return (
    <div
      className="flex items-center justify-center rounded-full bg-brown-4 text-white font-semibold overflow-hidden"
      style={{
        width: size,
        height: size,
        fontSize: size / 2,
      }}
    >
        <User size={size * 0.6} className="text-white z-0" />
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
