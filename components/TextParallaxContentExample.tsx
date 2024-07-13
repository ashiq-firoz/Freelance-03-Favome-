// TextParallaxContentExample.tsx
"use client"
import React, { useRef, ReactNode, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  description : string,
 
}
const TextParallaxContent: React.FC<TextParallaxContentProps> = ({
  imgUrl,
  subheading,
  heading,
  description,
}) => {
  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} description={description} />
        {/* <Description description={description} /> */}
      </div>
    </div>
  );
};

const StickyImage: React.FC<{ imgUrl: string }> = ({ imgUrl }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy: React.FC<{ subheading: string; heading: string; description: string }> = ({
  subheading,
  heading,
  description,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const headingOpacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  const descriptionY = useTransform(scrollYProgress, [0.5, 0.75, 1], [50, 0, -50]);
  const descriptionOpacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]); //useTransform(scrollYProgress, [0.5, 0.75, 1], [0, 1, 0]);

  return (
    <motion.div
      style={{ y, opacity: headingOpacity }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">{subheading}</p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
      <br /><br />
      <motion.p
        className="mb-4 text-2xl text-center font-bold md:text-2xl p-10"
        style={{ y: descriptionY, opacity: descriptionOpacity, color: 'rgba(255, 255, 255, 1)' }} // Adjust the alpha value (0.7) to make it less opaque
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

const Description: React.FC<{ description: string }> = ({ description }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]); // Starts from middle and moves up
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]); // Fades out as it scrolls up

  return (
    <div ref={targetRef} className="absolute w-full px-4 top-1/2 transform -translate-y-1/2">
      <motion.div
        style={{ y, opacity }}
        className="text-center text-white"
      >
        <p className="text-xl md:text-2xl">{description}</p>
      </motion.div>
    </div>
  );
};


const ExampleContent2: React.FC = () => (
  <div className="mx-auto grid h-[450px] max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
   
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-4xl text-neutral-600 ">
      Where we begin where other education apps fall short. We address the challenges parents face in their children's education. Experience tailored solutions 
      that make learning seamless and effective.
      </p>
     

    </div>
  </div>
);


const ExampleContent1: React.FC = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Additional content explaining the above card here
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
      Empowering local shops and businesses to compete with giants like Amazon and Flipkart. Our goal is to boost local business by 
      establishing a strong online presence. Adapt and thrive in the digital age with Favome.
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        reiciendis blanditiis aliquam aut fugit sint.
      </p>
      
    </div>
  </div>
);

const ExampleContent3: React.FC = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Additional content explaining the above card here
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
      Dedicated to promoting local manufacturers and businesses. We provide a platform for local shop owners to reach thousands of
       Favome customers. Support your community while enjoying a unique shopping experience.
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        reiciendis blanditiis aliquam aut fugit sint.
      </p>
      
    </div>
  </div>
);

const ExampleContent4: React.FC = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Additional content explaining the above card here
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
      We're hiring designers, digital marketers, influencers, photographers, content creators, sales executives, marketing managers, and team leaders. Be part of 
      a team that creates opportunities and shapes the future. Yes, we create jobs.
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        reiciendis blanditiis aliquam aut fugit sint.
      </p>
      
    </div>
  </div>
);


export const TextParallaxContentExample: React.FC = () => {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Collaborate"
        heading="Favome Biz Booster "
         description="Empowering local shops and businesses to compete with giants like Amazon and Flipkart. Our goal is to boost local business by establishing a strong online presence. Adapt and thrive in the digital age with Favome."
      >
        
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Quality"
        heading="Favome Edutrack App"
        description="Where we begin where other education apps fall short. We address the challenges parents face in their children's education. Experience tailored solutions that make learning seamless and effective."
      >
    
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Never Compromise"
        heading="Favome E-commerce Platform"
         description="Dedicated to promoting local manufacturers and businesses. We provide a platform for local shop owners to reach thousands of Favome customers. Support your community while enjoying a unique shopping experience."
      >
        
      </TextParallaxContent><TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Quality"
        heading="Favome Careers"
         description="We're hiring designers, digital marketers, influencers, photographers, content creators, sales executives, marketing managers, and team leaders. Be part of a team that creates opportunities and shapes the future. Yes, we create jobs."
      >
        
      </TextParallaxContent>
      
    </div>
  );
};

const IMG_PADDING = 12;
