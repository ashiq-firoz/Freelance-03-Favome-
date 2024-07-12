import React from 'react';
import Footer from '@/components/footer';
import Card from '../components/Card';
import Hero from '../components/Hero'
import StickyScroll from '../components/StickyScroll'
import { TextParallaxContentExample } from '../components/TextParallaxContentExample';
import Navbar from '@/components/Navbar'
import Hero2 from '@/components/Hero2';
import Hero3 from '@/components/Hero3';


const Page: React.FC = () => {
  return (
    <div className='h-screen'>
     
      
      <Navbar/>
      <Hero3/>
      
      <div className='py-10'>

      <TextParallaxContentExample />
    </div>
    
     <Footer/> 
     

    </div>
  );
};

export default Page;
