"use client";

import Image from 'next/image'
import Navbar from "./Navigation/Navbar";

export default function Home() {
  return (
    <div>
        <div>
          <Navbar />
        </div>
      <h1 className="text-3xl font-bold underline">Home Page</h1>
      <p>Some content</p>
    </div>
  );
}
