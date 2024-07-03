

export default function Products() {
    return (
        <>
            <div id="products" className="scroll-smooth h-[55rem] lg:h-[40rem] w-full  bg-slate-200  bg-grid-black/[0.2] relative flex  justify-center">
                {/* Radial gradient for the container to give a faded look */}
                {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
                {/* <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Backgrounds
      </p> */}

                <div className="grid grid-cols-4 gap-4 p-10">
                    <span className="col-span-4 tracking-widest font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 text-3xl lg:text-5xl">
                        Our Products
                    </span>
                    <div className="col-span-4 lg:col-span-1">
                        <img src="/products/product1.jpg" className="rounded-md" alt="" />
                        <br />
                        <button className=" inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            Purchase now !
                        </button>
                    </div>
                    <div className="col-span-4 lg:col-span-3">
                        <p className="text-xl lg:text-4xl  relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-800 lg:py-8">
                            Boost your business with Favome Biz Booster! Our Google SEO course teaches the latest strategies to improve your search engine rankings, increase traffic, and drive sales. Transform your online presence today!
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
}