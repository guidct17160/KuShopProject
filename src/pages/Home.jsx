import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiUser, FiShoppingBag, FiShield, FiTruck, FiRefreshCw } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/Cartcontext";
import FacultySection from "../components/FacultySection";
import ShoppingSection from "../components/ShoppingSection";
import Footer from "../components/Footer";
import logo from "/img/KULOGOpng.png";
import Promo from "/img/Promotion.webp";
import Modal from "../components/Modal";
import { products } from "../data/products";
import nisitMen from "/img/nisitshirtmen.png"
import nisitPant from "/img/nisitpant.png"
import ancess from "/img/ancess.webp"
import jersey from "/img/jersay.jpg"
import nisitWomen from "/img/nisitgirl.png"
import skirt from "/img/skirtgirl.png"
import ancessGirl from "/img/ancessgirl.jpg"




const features = [
    { icon: <FiShield size={22} className="text-pink-500" />, title: "LIFETIME WARRANTY", desc: "Built to last forever" },
    { icon: <FiTruck size={22} className="text-pink-500" />, title: "FREE SHIPPING", desc: "On orders over ฿1,500" },
    { icon: <FiRefreshCw size={22} className="text-pink-500" />, title: "30-DAY RETURNS", desc: "No questions asked" },
];

const menProducts = [
    { id: "m1", name: "เสื้อนิสิตชาย",       subtitle: "ชุดนิสิต – เสื้อขาว",   price: 390, img: nisitMen,   badge: "MEN", color: "#1a5c4a", gradient: ["#1a5c4a","#34d399"], sizes: ["S","M","L","XL","2XL"], description: "เสื้อนิสิตชายมหาวิทยาลัยเกษตรศาสตร์ ผ้าคุณภาพสูง", tag: "🎓 Classic" },
    { id: "m2", name: "กางเกงนิสิตชาย",     subtitle: "ชุดนิสิต – กางเกงดำ",   price: 350, img: nisitPant, badge: "MEN", color: "#1f2937", gradient: ["#1f2937","#6b7280"], sizes: ["28","30","32","34","36"], description: "กางเกงนิสิตชายสีดำ ผ้าเรียบหรู ใส่สบาย", tag: "⚫ Classic" },
    { id: "m3", name: "เสื้อ Accessories ชาย", subtitle: "KU Collection",         price: 290, img: ancess,   badge: "MEN", color: "#0369a1", gradient: ["#0369a1","#38bdf8"], sizes: ["S","M","L","XL"], description: "เสื้อ Accessories คณะชาย KU Collection", tag: "✨ New" },
    { id: "m4", name: "เสื้อเจอร์ซีย์ KU",   subtitle: "Jersey Collection",      price: 590, img: jersey,   badge: "MEN", color: "#374151", gradient: ["#111827","#6b7280"], sizes: ["S","M","L","XL","2XL"], description: "เสื้อเจอร์ซีย์ Kasetsart University โอเวอร์ไซส์", tag: "⚡ Popular" },
];

const womenProducts = [
    { id: "w1", name: "เสื้อนิสิตหญิง",       subtitle: "ชุดนิสิต – เสื้อขาว",    price: 390, img: nisitWomen,  badge: "WOMEN", color: "#1a5c4a", gradient: ["#1a5c4a","#34d399"], sizes: ["XS","S","M","L","XL"], description: "เสื้อนิสิตหญิงมหาวิทยาลัยเกษตรศาสตร์ ผ้าคุณภาพสูง", tag: "🎓 Classic" },
    { id: "w2", name: "กระโปรงนิสิตหญิง",   subtitle: "ชุดนิสิต – กระโปรงดำ",  price: 350, img: skirt,       badge: "WOMEN", color: "#2d6b58", gradient: ["#2d6b58","#6ee7b7"], sizes: ["XS","S","M","L"], description: "กระโปรงนิสิตหญิงสีดำ ผ้าเรียบหรู ใส่สบาย", tag: "⚫ Classic" },
    { id: "w3", name: "เสื้อ Accessories หญิง", subtitle: "KU Collection",          price: 290, img: ancessGirl, badge: "WOMEN", color: "#3a7a62", gradient: ["#3a7a62","#6ee7b7"], sizes: ["XS","S","M","L","XL"], description: "เสื้อ Accessories คณะหญิง KU Collection", tag: "✨ New" },
    { id: "w4", name: "เสื้อเจอร์ซีย์ KU หญิง", subtitle: "Jersey Collection",   price: 590, img: jersey,     badge: "WOMEN", color: "#1a5c4a", gradient: ["#064e3b","#10b981"], sizes: ["XS","S","M","L","XL"], description: "เสื้อเจอร์ซีย์ Kasetsart University โอเวอร์ไซส์ สำหรับผู้หญิง", tag: "⚡ Popular" },
];

export default function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const text = location.state?.text;
    const { totalQty } = useCart();

    const [activeProduct, setActiveProduct] = useState(null);
    const [shopProduct, setShopProduct] = useState(null);
    const [hovered, setHovered] = useState(null);
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 300);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const heroRef = useRef(null);

    return (
        <div className="min-h-screen bg-orange-50 flex flex-col">

            {/* ===== HERO SECTION ===== */}
            <div ref={heroRef} className="grid md:grid-cols-2 flex-1">

                {/* ===== LEFT ===== */}
                <div className="px-8 flex flex-col">

                    {/* Top Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex gap-4 items-start"
                    >
                        <img src={logo} className="my-6 w-[70px] h-[70px]" alt="logo" />
                        <nav className="px-75 py-8 text-sm space-y-2">
                            {[
                                { label: "MEN",     id: "section-men" },
                                { label: "WOMAN",   id: "section-women" },
                                { label: "FACULTY", id: "section-faculty" },
                                { label: "OTHERS",  id: "section-others" },
                            ].map(({ label, id }) => (
                                <p key={id}>
                                    <button
                                        onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                                        className="hover:text-pink-500 hover:translate-x-1 transition-all duration-200 cursor-pointer text-left"
                                    >
                                        {label}
                                    </button>
                                </p>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Hero Text */}
                    <div className="mt-20 max-w-lg space-y-6">
                        <motion.h2
                            layoutId="shopTitle"
                            layout="position"
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="text-6xl font-bold text-[#3b2f36] font-['Bitcount_Prop_Double_Ink']"
                        >
                            {text}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                            className="text-gray-600"
                        >
                            Kasetsart University gear, apparel, and books,
                            designed for the most convenient shopping experience.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex gap-4"
                        >
                            <button className="bg-pink-600 text-white px-6 py-3 rounded-md">Shop now →</button>
                            <button className="bg-white border px-6 py-3 rounded-md">Watch story 👁</button>
                        </motion.div>
                    </div>
                </div>

                {/* ===== RIGHT ===== */}
                <div className="flex flex-col pt-6 relative">

                    {/* Image + Clickable Zones — wrapper สำหรับ position icons ทับรูป */}
                    <div className="relative inline-block">

                        {/* รูป + icons + zones animate เหมือน MEN section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <img
                                src={Promo}
                                alt="Promotion"
                                className="mb-5 pr-3 h-auto w-auto object-cover rounded-[40px]"
                            />

                            {/* Icons — absolute บนรูป มุมขวาบน ติดไปกับรูปเลย */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="absolute top-5 right-12 flex gap-4 text-xl text-black drop-shadow-md items-center"
                            >
                                <FiSearch className="cursor-pointer hover:opacity-60 transition" />
                                {/* ปุ่มตะกร้า + badge */}
                                <button
                                    onClick={() => navigate("/cart")}
                                    className="relative cursor-pointer hover:opacity-60 transition"
                                >
                                    <FiShoppingBag />
                                    {totalQty > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-2 -right-2 w-4 h-4 bg-pink-600 text-white text-[9px] font-black rounded-full flex items-center justify-center"
                                        >
                                            {totalQty > 9 ? "9+" : totalQty}
                                        </motion.span>
                                    )}
                                </button>
                                <FiUser className="cursor-pointer hover:opacity-60 transition" onClick={() => navigate("/profile")} />
                            </motion.div>

                            {/* Male Zone */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                onClick={() => setActiveProduct(products.male)}
                                onMouseEnter={() => setHovered("male")}
                                onMouseLeave={() => setHovered(null)}
                                className="absolute cursor-pointer"
                                style={{ top: "38%", left: "8%", width: "40%", height: "28%" }}
                            >
                                <div className="absolute z-10" style={{
                                    top: "50%", left: "50%",
                                    transform: "translate(-50%,-50%)",
                                    width: 13, height: 13,
                                    background: "white", borderRadius: "50%",
                                    boxShadow: "0 0 0 3px rgba(255,255,255,0.4)"
                                }} />
                                <motion.svg
                                    animate={{ opacity: hovered === "male" ? 1 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                                >
                                    <path d="M 50% 50% L 50% 10% L 100% 10%" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </motion.svg>
                                <motion.div
                                    animate={{ opacity: hovered === "male" ? 1 : 0, scale: hovered === "male" ? 1 : 0.92 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                    className="absolute pointer-events-none z-20 bg-white rounded-2xl shadow-xl px-2 py-1"
                                    style={{ top: "100px", left: "-10%", marginLeft: "8px", width: "155px" }}
                                >
                                    <p className="text-xs font-extrabold text-gray-900 leading-snug">{products.male.name}</p>
                                    <p className="text-[10px] text-gray-400">{products.male.subtitle}</p>
                                    <p className="text-lg font-black text-gray-900">฿{products.male.price.toLocaleString()}</p>
                                </motion.div>
                            </motion.div>

                            {/* Female Zone */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.3 }}
                                onClick={() => setActiveProduct(products.female)}
                                onMouseEnter={() => setHovered("female")}
                                onMouseLeave={() => setHovered(null)}
                                className="absolute cursor-pointer"
                                style={{ top: "32%", right: "8%", width: "40%", height: "28%" }}
                            >
                                <div className="absolute z-10" style={{
                                    top: "50%", left: "50%",
                                    transform: "translate(-50%,-50%)",
                                    width: 13, height: 13,
                                    background: "white", borderRadius: "50%",
                                    boxShadow: "0 0 0 3px rgba(255,255,255,0.4)"
                                }} />
                                <motion.svg
                                    animate={{ opacity: hovered === "female" ? 1 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                                >
                                    <path d="M 50% 50% L 50% 10% L 0% 10%" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </motion.svg>
                                <motion.div
                                    animate={{ opacity: hovered === "female" ? 1 : 0, scale: hovered === "female" ? 1 : 0.92 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                    className="absolute pointer-events-none z-20 bg-white rounded-2xl shadow-xl px-2 py-1"
                                    style={{ top: "5px", right: "-10%", marginRight: "8px", width: "155px" }}
                                >
                                    <p className="text-xs font-extrabold text-gray-900 leading-snug">{products.female.name}</p>
                                    <p className="text-[10px] text-gray-400">{products.female.subtitle}</p>
                                    <p className="text-lg font-black text-gray-900">฿{products.female.price.toLocaleString()}</p>
                                </motion.div>
                            </motion.div>

                        </motion.div>
                    </div>
                </div>

            </div>

            {/* ===== SECTION 2 : FEATURES BAR ===== */}
            <div className="bg-white border-t border-gray-100 px-8 py-6">
                <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ delay: i * 0.15, duration: 0.45, ease: "easeOut" }}
                            className="flex items-center gap-4"
                        >
                            <div className="w-11 h-11 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
                                {f.icon}
                            </div>
                            <div>
                                <p className="text-xs font-extrabold text-gray-900 tracking-wide">{f.title}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{f.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            {/* ===== SECTION 3 : MEN COLLECTION ===== */}
            <div id="section-men" className="bg-white px-12 py-16">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">MEN</h2>
                    <p className="text-sm text-gray-400 mt-2 tracking-wide">Men's Apparel & Accessories</p>
                </motion.div>

                {/* Grid Layout */}
                <div className="max-w-5xl mx-auto grid grid-cols-3 grid-rows-2 gap-4" style={{ gridTemplateRows: "260px 220px" }}>

                    {/* Card 1 — เสื้อขาว */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ delay: 0.0, duration: 0.5 }}
                        className="row-span-2 relative rounded-3xl overflow-hidden cursor-pointer group"
                        style={{ background: "#1a5c4a" }}
                        onClick={() => setShopProduct(menProducts[0])}
                    >
                        <div className="absolute inset-4 border border-white/30 rounded-2xl z-10 pointer-events-none" />
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-white/20 text-8xl select-none"><img src={nisitMen} alt="" /></div>
                        </div>
                        <div className="absolute bottom-4 left-4 z-20">
                            <button className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full border border-white/40 group-hover:bg-white group-hover:text-gray-900 transition-all duration-300">
                                Explore →
                            </button>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    </motion.div>

                    {/* Card 2 — กางเกง */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ delay: 0.12, duration: 0.5 }}
                        className="row-span-2 relative rounded-3xl overflow-hidden cursor-pointer group"
                        style={{ background: "#2d6b58" }}
                        onClick={() => setShopProduct(menProducts[1])}
                    >
                        <div className="absolute inset-4 border border-white/30 rounded-2xl z-10 pointer-events-none" />
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-white/20 text-8xl select-none"><img src={nisitPant} alt="" /></div>
                        </div>
                        <div className="absolute bottom-4 left-4 z-20">
                            <button className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full border border-white/40 group-hover:bg-white group-hover:text-gray-900 transition-all duration-300">
                                Explore →
                            </button>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    </motion.div>

                    {/* Card 3 — Accessories */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ delay: 0.24, duration: 0.5 }}
                        className="relative rounded-3xl overflow-hidden cursor-pointer group"
                        style={{ background: "#3a7a62" }}
                        onClick={() => setShopProduct(menProducts[2])}
                    >
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-white/20 text-6xl select-none"><img src={ancess} alt="" /></div>
                        </div>
                        <div className="absolute bottom-3 left-3 z-20">
                            <button className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/40 group-hover:bg-white group-hover:text-gray-900 transition-all duration-300">
                                Explore →
                            </button>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    </motion.div>

                    {/* Card 4 — Jersey */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ delay: 0.36, duration: 0.5 }}
                        className="relative rounded-3xl overflow-hidden cursor-pointer group"
                        style={{ background: "#e8e8e8" }}
                        onClick={() => setShopProduct(menProducts[3])}
                    >
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-gray-400/40 text-6xl select-none"><img src={jersey} alt="" /></div>
                        </div>
                        <div className="absolute bottom-3 left-3 z-20">
                            <button className="bg-black/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/40 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                                Explore →
                            </button>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    </motion.div>

                </div>
            </div>
            {/* ===== SECTION 4 : WOMEN COLLECTION ===== */}
            <div id="section-women" className="bg-stone-100 px-12 py-16">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">WOMEN</h2>
                    <p className="text-sm text-gray-400 mt-2 tracking-wide">Women's Apparel & Accessories</p>
                </motion.div>

                {/* Grid Layout */}
                <div className="max-w-5xl mx-auto grid grid-cols-3 grid-rows-2 gap-4" style={{ gridTemplateRows: "260px 220px" }}>

                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }} transition={{ delay: 0.0, duration: 0.5 }}
                        className="row-span-2 relative rounded-3xl overflow-hidden cursor-pointer group"
                        style={{ background: "#1a5c4a" }} onClick={() => setShopProduct(womenProducts[0])}
                    >
                        <div className="absolute inset-4 border border-white/30 rounded-2xl z-10 pointer-events-none" />
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-white/20 text-8xl select-none"><img src={nisitWomen} alt="" /></div>
                        </div>
                        <div className="absolute bottom-4 left-4 z-20">
                            <button className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full border border-white/40 group-hover:bg-white group-hover:text-gray-900 transition-all duration-300">Explore →</button>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }} transition={{ delay: 0.12, duration: 0.5 }}
                        className="row-span-2 relative rounded-3xl overflow-hidden cursor-pointer group"
                        style={{ background: "#2d6b58" }} onClick={() => setShopProduct(womenProducts[1])}
                    >
                        <div className="absolute inset-4 border border-white/30 rounded-2xl z-10 pointer-events-none" />
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-white/20 text-8xl select-none"><img src={skirt} alt="" /></div>
                        </div>
                        <div className="absolute bottom-4 left-4 z-20">
                            <button className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full border border-white/40 group-hover:bg-white group-hover:text-gray-900 transition-all duration-300">Explore →</button>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }} transition={{ delay: 0.24, duration: 0.5 }}
                        className="relative rounded-3xl overflow-hidden cursor-pointer group"
                        style={{ background: "#3a7a62" }} onClick={() => setShopProduct(womenProducts[2])}
                    >
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-white/20 text-6xl select-none"><img src={ancessGirl} alt="" /></div>
                        </div>
                        <div className="absolute bottom-3 left-3 z-20">
                            <button className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/40 group-hover:bg-white group-hover:text-gray-900 transition-all duration-300">Explore →</button>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    </motion.div>

                    {/* Card 4 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }} transition={{ delay: 0.36, duration: 0.5 }}
                        className="relative rounded-3xl overflow-hidden cursor-pointer group"
                        style={{ background: "#e8e8e8" }} onClick={() => setShopProduct(womenProducts[3])}
                    >
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-gray-400/40 text-6xl select-none"><img src={jersey} alt="" /></div>
                        </div>
                        <div className="absolute bottom-3 left-3 z-20">
                            <button className="bg-black/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/40 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">Explore →</button>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    </motion.div>

                </div>
            </div>
            {/* ===== SECTION 5 : FACULTY ===== */}
            <div id="section-faculty">
            <FacultySection />
            </div>
             {/* ===== SECTION 6 : SHOPPING ANIMATION ===== */}
            <div id="section-others">
            <ShoppingSection />
            </div>
            {/* ===== FOOTER ===== */}
            <Footer />


            {/* ===== SCROLL TO TOP BUTTON ===== */}
            <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: showTop ? 1 : 0, scale: showTop ? 1 : 0.8, pointerEvents: showTop ? "auto" : "none" }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="fixed bottom-8 right-8 z-[9998] w-12 h-12 rounded-full bg-pink-600 text-white shadow-lg flex items-center justify-center hover:bg-pink-700 hover:scale-110 transition-colors duration-200"
                aria-label="กลับขึ้นไปด้านบน"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 15l-6-6-6 6"/>
                </svg>
            </motion.button>

            {/* ===== MODALS ===== */}
            <AnimatePresence>
                {activeProduct && (
                    <Modal product={activeProduct} onClose={() => setActiveProduct(null)} />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {shopProduct && (
                    <Modal product={shopProduct} onClose={() => setShopProduct(null)} />
                )}
            </AnimatePresence>

        </div>
    );
}