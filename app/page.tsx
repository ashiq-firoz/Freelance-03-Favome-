import { useRef } from "react";
import BackgroundBeamsDemo from "./components/HeroSection";
import { SparklesPreview } from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import { SignupFormDemo } from "./components/Contact";
import Hero from "./components/Hero3";

export default function Page() {
  return (
   <>
   {/* <BackgroundBeamsDemo/> */}
   <Hero/>
   <About/>
   <img src="/img/banner.jpg" className="w-max" alt="" />
   <Products/>
   <SignupFormDemo/>
   </>
  );
}
