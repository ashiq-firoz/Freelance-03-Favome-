"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    const initialCards: Record<string, JSX.Element> = {
        "1": (
            <>
                <img
                    src="/img/head-shots/8.jpg"
                    alt="Image of Adrian Y. - Product Marketing @ Meta"
                    className="pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-slate-700 bg-slate-200 object-cover"
                />
                <span className="text-center text-lg italic text-slate-400">
                    My boss thinks I know what I&apos;m doing. Honestly, I just read this newsletter.
                </span>
                <span className="text-center text-sm font-medium text-indigo-400">
                    Adrian Y. - Product Marketing @ Meta
                </span>
            </>
        ),
        "2": (
            <>
                <img
                    src="/img/head-shots/7.jpg"
                    alt="Image of Jenn F. - Marketing Director @ Square"
                    className="pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-slate-700 bg-slate-200 object-cover"
                />
                <span className="text-center text-lg italic text-slate-400">
                    I feel like I&apos;ve learned as much from X as I did completing my masters. It&apos;s the first thing I read every morning.
                </span>
                <span className="text-center text-sm font-medium text-indigo-400">
                    Jenn F. - Marketing Director @ Square
                </span>
            </>
        ),
        "3": (
            <>
                <img
                    src="/img/head-shots/9.jpg"
                    alt="Image of Devin R. - Growth Marketing Lead @ OpenAI"
                    className="pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-slate-700 bg-slate-200 object-cover"
                />
                <span className="text-center text-lg italic text-slate-400">
                    Can not believe this is free. If X was $5,000 a month, it would be worth every penny. I plan to name my next child after X.
                </span>
                <span className="text-center text-sm font-medium text-indigo-400">
                    Devin R. - Growth Marketing Lead @ OpenAI
                </span>
            </>
        ),
    };

    const [cards, setCards] = useState(initialCards);
    const [dragged, setDragged] = useState(false);
    const [swapped, setSwapped] = useState(false);

    useEffect(() => {
        if (swapped) {
            const timer = setTimeout(() => {
                // Rotate the cards in a queue-like manner
                const temp = cards["1"];
                cards["1"] = cards["2"];
                cards["2"] = cards["3"];
                cards["3"] = temp;

                // Update state to trigger re-render
                setCards({ ...cards });
                setSwapped(false);
            }, 500); // delay of 500ms

            return () => clearTimeout(timer);
        }
    }, [swapped]);

    const handleDragEnd = () => {
        setDragged(false);
        setSwapped(true);
        console.log('stop');
    };

    const handleClick = () => {
        setDragged(true)
        
        setTimeout(() => {
            handleDragEnd();
        }, 500); // 2000 milliseconds = 2 seconds

    };

    return (
        <section className="overflow-hidden bg-slate-900 px-8 py-24 text-slate-50">
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-8">
                <div>
                    <h3 className="text-5xl font-black leading-[1.25] md:text-7xl">You don&apos;t know marketing</h3>
                    <p className="mb-8 mt-4 text-lg text-slate-400">
                        ...but we&apos;re going to help. We send out weekly breakdowns of exactly what&apos;s working and what&apos;s not for the largest companies in the world. It&apos;s free.
                    </p>
                    <form className="flex items-center gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full rounded border-transparent bg-slate-800 px-3 py-2 transition-colors focus:bg-slate-700 focus:outline-none"
                        />
                        <button className="whitespace-nowrap rounded bg-indigo-600 px-3 py-2 transition-transform hover:scale-[1.02] active:scale-[0.98]">
                            Join newsletter
                        </button>
                    </form>
                </div>
                <div className="relative h-[300px] lg:h-[450px] w-[200px] lg:w-[350px]">
                    <motion.div
                        layout
                        drag
                        dragConstraints={{ top: 0, left: -200, right: 0, bottom: 0 }}
                        dragElastic={0.1}
                        onDragStart={() => setDragged(true)}
                        onDragEnd={handleDragEnd}
                        animate={dragged ? {} : { x: 0, y: 0, rotate: -6 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute left-0 top-0 grid h-[300px] lg:h-[450px] w-[200px] lg:w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-800/20 p-6 shadow-xl backdrop-blur-md cursor-grab active:cursor-grabbing"
                        style={{
                            zIndex: 2,
                            userSelect: 'none',
                            touchAction: 'none',
                        }}
                        draggable="false"
                        onClick={handleClick}
                    >
                        {cards["1"]}
                    </motion.div>
                    <motion.div
                        layout
                        initial={{ x: 200, rotate: 6 }}
                        animate={{ x: dragged ? 0 : 200, rotate: dragged ? 0 : 6 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30, delay: dragged ? 0 : 0.2 }}
                        className="absolute left-0 top-0 grid h-[300px] lg:h-[450px] w-[200px] lg:w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-800/20 p-6 shadow-xl backdrop-blur-md"
                        style={{ zIndex: 0 }}
                        onClick={handleClick}
                    >
                        {cards["2"]}
                    </motion.div>
                    <motion.div
                        layout
                        initial={{ x: 100, rotate: 0 }}
                        animate={{ x: dragged ? 0 : 100, rotate: dragged ? 0 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30, delay: dragged ? 0 : 0.1 }}
                        className="absolute left-0 top-0 grid h-[300px] lg:h-[450px] w-[200px] lg:w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-800/20 p-6 shadow-xl backdrop-blur-md"
                        style={{ zIndex: 1 }}
                        onClick={handleClick}
                    >
                        {cards["3"]}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
