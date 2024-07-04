import React from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Hero from '../components/Hero'
import StickyScroll from '../components/StickyScroll'
import { TextParallaxContentExample } from '../components/TextParallaxContentExample';

const Page: React.FC = () => {
  return (
    <div className='h-screen'>
      <Navbar />
      <Hero/>
      <div>
      <TextParallaxContentExample />
    </div>
     <StickyScroll/>
      <div className='bg-red-600 h-3/5  py-11'>hello world</div>

    </div>
  );
};

export default Page;
