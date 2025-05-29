"use client";
import Link from "next/link";
import React from "react";

export default function Aside() {
  return (
    <aside className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b border-gray-700">
      <div className="max-w-6xl flex justify-between items-center px-4 py-4">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Grupo12 <span className="text-pink-400">🚀</span>
        </h1>
      </div>
    </aside>
  );
}