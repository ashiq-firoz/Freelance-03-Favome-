// TextParallaxContentExample.tsx
"use client"
import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  paragraph: string;
  
 
}

const TextParallaxContent: React.FC<TextParallaxContentProps> = ({
  imgUrl,
  subheading,
  heading,
  paragraph,

  
}) => {
  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading}  />
        <OverlayCopy2 paragraph={paragraph}/>
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

const OverlayCopy: React.FC<{ subheading: string; heading: string }> = ({
  subheading,
  heading,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">{subheading}</p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const OverlayCopy2: React.FC<{ paragraph:string; }> = ({
  paragraph,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0.5, 0.85], [500, 300]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 0, 1]);

  return (
    <motion.div
      style={{ y, opacity }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-3/4 flex-col items-center justify-center text-white"
    >
      
      <p className="text-center text-4xl font-bold md:text-4xl">{paragraph}</p>
    </motion.div>
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




export const TextParallaxContentExample: React.FC = () => {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Collaborate"
        heading="Favome Biz Booster "
        paragraph="Empowering local shops and businesses to compete with giants like Amazon and Flipkart. 
        Our goal is to boost local business by establishing a strong online presence. Adapt and thrive in the digital age with Favome."
      >
        
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Quality"
        heading="Favome Edutrack App"
         paragraph="fkalsdfjlkaskldffjlaskdjkasdfjlsdakjfllllllll sdfakljafjasjdfjlk jsaldfjjasdfjjsdfjasjdf jjsdjfj sdjfjasdf jasjdj df"
      >
    
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Never Compromise"
        heading="Favome E-commerce Platform"
         paragraph="fkalsdfjlkaskldffjlaskdjkasdfjlsdakjfllllllll sdfakljafjasjdfjlk jsaldfjjasdfjjsdfjasjdf jjsdjfj sdjfjasdf jasjdj df"
      >
        
      </TextParallaxContent><TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Quality"
        heading="Favome Careers"
         paragraph="fkalsdfjlkaskldffjlaskdjkasdfjlsdakjfllllllll sdfakljafjasjdfjlk jsaldfjjasdfjjsdfjasjdf jjsdjfj sdjfjasdf jasjdj df"
      >
        
      </TextParallaxContent>
      
    </div>
  );
};

const IMG_PADDING = 12;
