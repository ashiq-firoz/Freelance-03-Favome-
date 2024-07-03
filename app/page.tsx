import { useRef } from "react";
import BackgroundBeamsDemo from "./components/HeroSection";
import { SparklesPreview } from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import { SignupFormDemo } from "./components/Contact";

export default function Page() {
  return (
   <>
   {/* <BackgroundBeamsDemo/> */}
   <SparklesPreview/>
   <About/>
   <img src="/img/banner.jpg" className="w-max" alt="" />
   <Products/>
   <SignupFormDemo/>
   </>
  );
}
