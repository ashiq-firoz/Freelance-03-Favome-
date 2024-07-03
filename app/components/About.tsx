import React from "react"
import { TextGenerateEffect } from "./ui/text-generate-effect";

export default function About() {

  const words = `Favome is an innovative IT startup committed to bridging technology gaps in education, entertainment, and job opportunities. By leveraging cutting-edge solutions, Favome aims to empower individuals with equal access and opportunities in these fields, fostering inclusive growth and advancement.`;


  return (
    <div id="about" className="scroll-smooth h-[40rem] w-full  bg-slate-200  bg-grid-black/[0.2] relative flex  justify-center">
      {/* Radial gradient for the container to give a faded look */}
      {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
      {/* <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Backgrounds
      </p> */}
      <div className="grid grid-cols-4 gap-4 p-10">
        <img src="/img/favome_logo.jpg" className="rounded-md col-span-4 lg:col-span-2" alt="" />
        <TextGenerateEffect words={words} className="text-gray-500 col-span-4 lg:col-span-2 text-sm lg:text-3xl items-center lg:py-8"/>
      </div>
    </div>
  )
}