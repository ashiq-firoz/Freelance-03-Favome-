"use client"
import { useRef } from "react";
import BackgroundBeamsDemo from "./components/HeroSection";
import Hero from "./components/Hero"; 
import About from "./components/About";
import Products from "./components/Products";
import { SignupFormDemo } from "./components/Contact";
// import Hero from "./components/Hero3";
import { TextParallaxContentExample } from "./components/TextParallaxContentExample";
import Footer from "./components/footer";
import Loading from "./components/loading";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating content loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Change this to a suitable delay or remove it

    return () => clearTimeout(timer);
  }, []);
  return (
   <>
   {/* <BackgroundBeamsDemo/> */}
   <Hero/>
   <div className='py-10 bg-white'>
   <TextParallaxContentExample/>
   </div>

   {/* <SignupFormDemo/> */}
    
   </>
  );
}
