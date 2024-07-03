"use client";
import React from "react";
import { SparklesCore } from "./ui/sparkles";
import BlurIn from "./ui/typing-animation";
import WordRotate from "./ui/word-rotate";

export function SparklesPreview() {
    return (
        <>
            <div className="h-[45rem] relative w-full bg-slate-300 flex flex-col items-center justify-center overflow-hidden rounded-md">
                <div className="w-full absolute inset-0 h-screen">
                    <SparklesCore
                        id="tsparticlesfullpage"
                        background="transparent"
                        minSize={1.5}
                        maxSize={3}
                        particleDensity={100}
                        className="w-full h-full"
                        particleColor="#083b8a"
                    />
                </div>
                <BlurIn
                    className=" text-7xl lg:text-9xl  text-center relative z-20 bg-clip-text text-transparent"
                    style='linear-gradient(to right, #0000ff, #800080)'
                    word="FAVOME"
                />
                <br />
                <span className="text-black text-xl lg:text-3xl">where education meets technology</span>
            </div>
          
            
          
        </>
    );
}
