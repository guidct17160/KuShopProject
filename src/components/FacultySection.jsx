import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { facultyItems } from "../data/facultyItems";
import Modal from "./Modal";

const ITEMS_PER_PAGE = 3;
const TOTAL_PAGES = Math.ceil(facultyItems.length / ITEMS_PER_PAGE);

const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export default function FacultySection() {
    const [[page, dir], setPageDir] = useState([0, 0]);
    const [activeProduct, setActiveProduct] = useState(null);

    const paginate = (newDir) => {
        const next = page + newDir;
        if (next < 0 || next >= TOTAL_PAGES) return;
        setPageDir([next, newDir]);
    };

    const visibleItems = facultyItems.slice(
        page * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    return (
        <>
        <div className="bg-white px-12 py-16">

            {/* Header Row */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-end mb-8"
            >
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">FACULTY</h2>
                    <p className="text-sm text-gray-400 mt-1">Shirts for each faculty</p>
                </div>
                {/* <div className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer hover:text-gray-800 transition">
                    <span>Sort by:</span>
                    <span className="font-semibold text-gray-800">Featured</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div> */}
            </motion.div>

            {/* Carousel */}
            <div className="max-w-5xl mx-auto relative">

                {/* Prev Button */}
                <button
                    onClick={() => paginate(-1)}
                    disabled={page === 0}
                    className="absolute -left-7 top-[40%] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:shadow-xl disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>

                {/* Next Button */}
                <button
                    onClick={() => paginate(1)}
                    disabled={page === TOTAL_PAGES - 1}
                    className="absolute -right-7 top-[40%] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:shadow-xl disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>

                {/* Sliding Window */}
                <div className="overflow-hidden rounded-2xl">
                    <AnimatePresence custom={dir} mode="wait">
                        <motion.div
                            key={page}
                            custom={dir}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="grid grid-cols-3 gap-6 min-h-[320px]"
                        >
                            {visibleItems.map((item, i) => (
                                <div key={i} className="group cursor-pointer" onClick={() => setActiveProduct(item)}>
                                    {/* Image Box */}
                                    <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-square flex items-center justify-center border border-gray-100">
                                        {item.img
                                            ? <img
                                                src={item.img}
                                                alt={item.name}
                                                className="w-full h-full object-contain p-4"
                                              />
                                            : <div className="text-gray-200 text-6xl select-none">👕</div>
                                        }
                                        {/* Wishlist */}
                                        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-gray-400 hover:text-pink-500 transition-colors duration-200" onClick={e => e.stopPropagation()}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                            </svg>
                                        </button>
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
                                        {/* Add to cart hint */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-pink-600 text-white text-xs font-bold py-2 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            + เพิ่มลงตะกร้า
                                        </div>
                                    </div>
                                    {/* Info */}
                                    <div className="mt-3 px-1">
                                        <p className="text-sm text-gray-700 leading-snug group-hover:text-gray-900 transition-colors">{item.name}</p>
                                        <p className="text-sm font-bold text-gray-900 mt-1">฿{item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPageDir([i, i > page ? 1 : -1])}
                            className="rounded-full transition-all duration-300"
                            style={{
                                width: page === i ? 28 : 8,
                                height: 8,
                                background: page === i ? "#db2777" : "#e5e7eb",
                            }}
                        />
                    ))}
                </div>

            </div>
        </div>

        <AnimatePresence>
            {activeProduct && (
                <Modal product={activeProduct} onClose={() => setActiveProduct(null)} />
            )}
        </AnimatePresence>
        </>
    );
}