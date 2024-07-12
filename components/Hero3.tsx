"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    let initialCards = {
        "1": (
            <>
                <img
                    src="/img/Card.jpeg"
                    alt="Favome Card"
                    className="pointer-events-none rounded mx-auto h-[450px] w-auto border-2 border-slate-700 bg-slate-200 object-cover rounded-2xl"
                />
                
            </>
        ),
        "2": (
            <>
                <img
                    src="/img/Card3.jpg"
                    alt="Favome Card"
                    className="pointer-events-none rounded mx-auto h-[450px] w-[280px] border-2 border-slate-700 bg-slate-200 object-cover rounded-2xl"
                />
            </>
        ),
        "3": (
            <>
                <img
                    src="/img/Card2.jpeg"
                    alt="Favome Card"
                    className="pointer-events-none rounded mx-auto h-[450px] w-auto border-2 border-slate-700 bg-slate-200 object-cover rounded-2xl"
                />
               
            </>
        ),
    };

    const [cards, setCards] = useState(initialCards);
    const [dragged, setDragged] = useState(false);

    const handleDragEnd = () => {
        setDragged(false);
    
        // Rotate the cards in a queue-like manner
        const temp = cards["1"];
        cards["1"] = cards["2"];
        cards["2"] = cards["3"];
        cards["3"] = temp;
    
        // Update state to trigger re-render
        setCards({ ...cards });
    
        console.log('stop');
    };
    

    return (
        <section className="overflow-hidden bg-custom-blue bg-contain px-8 py-24 text-slate-50 h-[100vh]">
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-8">
                <div>
                    <h3 className="text-5xl font-black leading-[1.25] md:text-7xl">Favome</h3>
                    <p className="mb-8 mt-4 text-lg text-slate-400">
                    MY FAVORITE WAY
                    </p>
                    
                </div>
                
                <div className="relative h-[450px] w-[280px] ml-[100px] mt-[44px]">
                    <motion.div
                       drag
                       dragConstraints={{ top: 0, left: -400, right: 50, bottom: 100 }}
                       dragElastic={0.4} // Adjust dragElastic for smoother drag behavior
                       onDragStart={() => setDragged(true)}
                       onDragEnd={handleDragEnd}
                       animate={dragged ? {} : { x: 0, y: 0, rotate: -6 }}
                       transition={{ type: "spring", stiffness: 50,mass:10, damping: 300,duration:0.6,bounce:0.25,restDelta:0.5,restSpeed:0.5,velocity:10,from:0 }}
                       className="absolute left-0 top-0 grid h-[450px] w-[280px] select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-800/20  shadow-xl  cursor-grab active:cursor-grabbing"
                        style={{
                            zIndex: 2,
                            userSelect: 'none',
                            touchAction: 'none',
                        }}
                        draggable="false"
                    >
                        {cards["1"]}
                    </motion.div>
                    <div
                        className="absolute left-0 top-0 grid h-[450px] w-[280px] select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-800/20  shadow-xl"
                        style={{ zIndex: 0, transform: 'translateX(70%) rotate(12deg)' }}
                    >
                        {cards["2"]}
                    </div>
                    <div
                        className="absolute left-0 top-0 grid h-[450px] w-[280px]] select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-800/20  shadow-xl "
                        style={{ zIndex: 1, transform: 'translateX(30%) rotate(6deg)' }}
                    >
                        {cards["3"]}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
