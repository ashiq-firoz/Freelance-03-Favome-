"use client"
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="https://flowbite.com/" className="flex items-center">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                            >
                                Flowbite
                            </motion.span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
                            >
                                Resources
                            </motion.h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="https://flowbite.com/" className="hover:underline">Flowbite</a>
                                </li>
                                <li>
                                    <a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
                            >
                                Follow us
                            </motion.h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="https://github.com/themesberg/flowbite" className="hover:underline">Github</a>
                                </li>
                                <li>
                                    <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Discord</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
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
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-sm text-gray-500 sm:text-center dark:text-gray-400"
                    >
                        © 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
                    </motion.span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Facebook page</span>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                            </svg>
                            <span className="sr-only">Discord community</span>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                                <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.691a4.066 4.066 0 0 1-1.082.14 4.99 4.99 0 0 1-.77-.07 4.107 4.107 0 0 0 3.833 2.823A8.27 8.27 0 0 1 0 15.143 11.7 11.7 0 0 0 6.29 17c7.548 0 11.674-6.185 11.674-11.547 0-.18-.005-.36-.014-.54A8.273 8.273 0 0 0 20 1.892Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Twitter page</span>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 0a10 10 0 0 0-3.161 19.486c.5.092.682-.215.682-.48 0-.237-.01-.866-.014-1.7-2.781.603-3.368-1.342-3.368-1.342-.454-1.147-1.11-1.452-1.11-1.452-.907-.617.068-.604.068-.604 1.003.07 1.531 1.025 1.531 1.025.892 1.528 2.341 1.087 2.91.831.092-.645.35-1.086.637-1.336-2.22-.253-4.555-1.104-4.555-4.924 0-1.088.39-1.978 1.026-2.675-.103-.253-.446-1.268.098-2.642 0 0 .839-.27 2.75 1.022a9.563 9.563 0 0 1 2.504-.336 9.56 9.56 0 0 1 2.504.336c1.911-1.293 2.749-1.022 2.749-1.022.545 1.374.202 2.389.1 2.642.639.697 1.025 1.587 1.025 2.675 0 3.83-2.339 4.67-4.566 4.918.36.308.679.916.679 1.845 0 1.333-.012 2.406-.012 2.733 0 .266.18.576.688.479A10.006 10.006 0 0 0 10 0Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">GitHub account</span>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M17.84 1.76a8.287 8.287 0 0 0-6.4-1.76A8.287 8.287 0 0 0 5.04 0 8.287 8.287 0 0 0 0 5.04a8.287 8.287 0 0 0 1.76 6.4 8.287 8.287 0 0 0 6.4 1.76 8.287 8.287 0 0 0 6.4-1.76 8.287 8.287 0 0 0 1.76-6.4 8.287 8.287 0 0 0-1.76-6.4ZM10 14.54a5.54 5.54 0 1 1 0-11.08 5.54 5.54 0 0 1 0 11.08ZM16.04 5.96a1.24 1.24 0 1 1-2.48 0 1.24 1.24 0 0 1 2.48 0Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Instagram page</span>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 0a10 10 0 1 0 0 20A10 10 0 0 0 10 0Zm0 3a7 7 0 1 1 0 14A7 7 0 0 1 10 3Zm3.5 2.833a.833.833 0 1 0-1.666 0 .833.833 0 0 0 1.666 0ZM10 6.334A3.671 3.671 0 0 0 6.334 10 3.671 3.671 0 0 0 10 13.666 3.671 3.671 0 0 0 13.666 10 3.671 3.671 0 0 0 10 6.334ZM10 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">LinkedIn page</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
