"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiYoutube, FiInstagram, FiLinkedin } from 'react-icons/fi';
// import { Instagram, Youtube } from 'lucide-react';
import { Antonio } from 'next/font/google'

export const antonio = Antonio({
  subsets: ['latin'],
  display: 'swap',
  weight : '400'
});

const Footer: React.FC = () => {
    const [isInView, setIsInView] = useState(false);
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                setIsInView(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1, // Adjust this threshold as needed
            }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);

    return (
        <footer ref={footerRef} className="bg-white dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="#" className="flex items-center">
                            <img src="/img/logo.png" className="h-8 me-3" alt="FlowBite Logo" />
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isInView ? 1 : 0 }}
                                transition={{ duration: 1 }}
                                className={`${antonio.className} self-center text-2xl font-semibold whitespace-nowrap text-black`}
                            >
                                FAVOME
                            </motion.span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isInView ? 1 : 0 }}
                                transition={{ duration: 1 }}
                                className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
                            >
                                Resources
                            </motion.h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Careers</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">Contact US</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isInView ? 1 : 0 }}
                                transition={{ duration: 1 }}
                                className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
                            >
                                Follow us
                            </motion.h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline"><FiYoutube /></a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline"><FiInstagram /></a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isInView ? 1 : 0 }}
                                transition={{ duration: 1 }}
                                className="mb-6 text-sm font-semibold text-gray-900 uppercase"
                            >
                                Legal
                            </motion.h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isInView ? 1 : 0 }}
                                transition={{ duration: 1.5 }}
                                className="mb-6 text-sm font-semibold text-gray-900 uppercase"
                            >
                                Address
                            </motion.h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    FAVOME, ABC P.O, TRV, Kerala, 698735
                                </li>
                                <li>
                                    Phone : +91 786655454
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isInView ? 1 : 0 }}
                        transition={{ duration: 1 }}
                        className="text-sm text-gray-500 sm:text-center dark:text-gray-400"
                    >
                        © 2024 <a href="https://flowbite.com/" className="hover:underline">FAVOME™</a>. All Rights Reserved.
                    </motion.span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Facebook page</span>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                                <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.691a4.066 4.066 0 0 1-1.082.14 4.99 4.99 0 0 1-.77-.07 4.107 4.107 0 0 0 3.833 2.823A8.27 8.27 0 0 1 0 15.143 11.7 11.7 0 0 0 6.29 17c7.548 0 11.674-6.185 11.674-11.547 0-.18-.005-.36-.014-.54A8.273 8.273 0 0 0 20 1.892Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Twitter page</span>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                           <FiLinkedin/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
