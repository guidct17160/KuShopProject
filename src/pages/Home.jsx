import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser, FiShoppingBag, FiShield, FiTruck, FiRefreshCw,
  FiSearch, FiChevronRight, FiGrid, FiLayout, FiInfo
} from "react-icons/fi";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import Orb from "../components/Orb";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import {
  BG_HOME, PRIMARY_DARK, PRIMARY, TEXT_MUTED, GOLD, GOLD_DARK, DIVIDER
} from "../styles/tokens";

import logo from "/img/KULOGOpng.png";
import promoImg from "/img/Promotion.webp";

// ── Glass Styles ───────────────────────────────────────────────
const GLASS_CONTAINER = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "2px solid rgba(255,255,255,0.75)",
  boxShadow: "0 32px 80px rgba(0,80,40,0.22), 0 0 0 6px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(255,255,255,0.15)",
};

const features = [
  { icon: <FiShield size={18} />, title: "LIFETIME WARRANTY", desc: "Built to last forever" },
  { icon: <FiTruck size={18} />, title: "FREE SHIPPING", desc: "Orders over ฿1,500" },
  { icon: <FiRefreshCw size={18} />, title: "30-DAY RETURNS", desc: "No questions asked" },
];

// ── Featured Product Card ──────────────────────────────────────
function FeaturedCard({ product, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isSoldOut = product.stock <= 0;

  const badgeColor =
    product.badge === "ชาย" ? { bg: "#D32F2F", text: "#fff" }
      : product.badge === "หญิง" ? { bg: "#C2185B", text: "#fff" }
        : { bg: "#F5C518", text: "#1a1a1a" };

  return (
    <motion.div
      whileHover={isSoldOut ? {} : { y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={isSoldOut ? undefined : () => onClick(product)}
      className={`relative w-full h-[400px] rounded-[36px] overflow-hidden ${isSoldOut ? 'cursor-not-allowed opacity-70 grayscale' : 'cursor-pointer'} group shadow-xl`}
      style={{ background: "#0D4236" }}
    >
      {isSoldOut && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
          <span className="bg-red-500 text-white font-black text-xs px-5 py-2 rounded-full shadow-lg border border-white/20 uppercase tracking-widest">
            Sold Out
          </span>
        </div>
      )}

      {/* Full-bleed product image */}
      <div className="absolute inset-0">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ objectPosition: "center top" }}
        />
        {/* dark gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      {/* Badge top-left */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-20">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-black shadow-lg border-2 border-white/40"
            style={{ background: badgeColor.bg, color: badgeColor.text }}
          >
            {product.badge}
          </div>
        </div>
      )}

      {/* Sparkle icon bottom-right */}
      <div className="absolute bottom-4 right-4 z-20 opacity-60">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
          <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" />
        </svg>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">
          {product.category || "KU NISIT"}
        </p>
        <h4 className="text-white text-lg font-black leading-tight tracking-tight line-clamp-2">
          {product.name}
        </h4>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[#F5C518] text-xl font-black">
            ฿{product.price?.toLocaleString()}
          </span>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 10 }}
            className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full"
          >
            <span className="text-white text-[10px] font-black uppercase tracking-wider">Explore</span>
            <FiChevronRight size={12} className="text-white" />
          </motion.div>
        </div>
      </div>

      {/* White inner border frame */}
      <div className="absolute inset-[18px] border border-white/20 rounded-[24px] pointer-events-none z-10" />
    </motion.div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { totalQty } = useCart();
  const { products } = useProducts();
  const scrollRef = useRef(null);
  const sectionRefs = useRef([]);

  const [activeProduct, setActiveProduct] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [activeSection, setActiveSection] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllFeatured, setShowAllFeatured] = useState(false);

  const heroMale = products.find(p => p.id === "w1") || products[0];
  const heroFemale = products.find(p => p.id === "m4") || products[1];

  const handleNav = (navItem) => {
    if (navItem === "HOME") return;
    if (navItem === "INFO") {
      sectionRefs.current[4]?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate(`/category/${navItem.toLowerCase()}`);
  };

  const allProducts = products;
  const searchResults = searchQuery
    ? allProducts.filter(p =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.badge?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];



  return (
    <div className="fixed inset-0 p-4 md:p-8 overflow-hidden flex flex-col" style={{ background: BG_HOME }}>
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>

      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <Orb style={{ width: 580, height: 580, top: "-120px", right: "-100px", background: "radial-gradient(circle,rgba(0,120,60,0.55) 0%,rgba(0,100,50,0.25) 50%,transparent 75%)" }} anim={{ x: [0, 20, 0], y: [0, -16, 0] }} />
        <Orb style={{ width: 420, height: 420, top: "15%", right: "-5%", background: "radial-gradient(circle,rgba(245,197,24,0.55) 0%,rgba(230,176,0,0.25) 50%,transparent 75%)" }} anim={{ x: [0, -12, 0], y: [0, 14, 0] }} />
        <Orb style={{ width: 380, height: 380, bottom: "-80px", left: "-60px", background: "radial-gradient(circle,rgba(26,160,88,0.5) 0%,rgba(0,120,60,0.2) 55%,transparent 75%)" }} anim={{ x: [0, 14, 0], y: [0, -18, 0] }} />
      </div>

      <div
        ref={scrollRef}
        className="relative flex-1 rounded-[40px] border border-white/50 shadow-[0_32px_88px_rgba(0,0,0,0.15)] overflow-y-auto hide-scrollbar z-10 scroll-smooth bg-white/15 backdrop-blur-[40px]"
      >
        {/* Navbar */}
        <Navbar onSearchSelect={setActiveProduct} onSearch={setSearchQuery} />

        {/* HERO Section */}
        <section ref={(el) => (sectionRefs.current[0] = el)} className="min-h-[92vh] flex items-center justify-center px-8 relative mt-[-12px]">
          <div className="w-full max-w-7xl h-[640px] rounded-[60px] relative overflow-hidden flex flex-col md:flex-row items-stretch" style={GLASS_CONTAINER}>
            <div className="w-full md:w-1/2 p-2 relative">
              <div className="w-full h-full bg-[#0D4236] rounded-[50px] relative overflow-hidden p-12 group">
                <h2 className="text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic">PREMIUM<br />QUALITY<br />NISIT OFFICIAL</h2>
                <p className="text-white/60 font-medium max-w-md mb-8 leading-relaxed">Official Kasetsart University apparel and accessories. Crafted for excellence, designed for pride.</p>
                <div className="relative w-full h-64 flex items-center justify-center">
                  <img src={heroMale.img} alt="Nisit Hero" className="h-full object-contain drop-shadow-[0_45px_45px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-700" />
                  <div onClick={() => setActiveProduct(heroMale)} onMouseEnter={() => setHovered("male")} onMouseLeave={() => setHovered(null)} className="absolute cursor-pointer" style={{ top: "45%", left: "42%", width: "20%", height: "20%" }}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg animate-pulse" />
                    <AnimatePresence>{hovered === "male" && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-12 left-0 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-2xl border border-white min-w-[140px] z-30">
                        <p className="text-[10px] font-black text-primary-dark">{heroMale.name}</p>
                        <p className="text-base font-black text-primary">฿{heroMale.price.toLocaleString()}</p>
                      </motion.div>
                    )}</AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col p-2 gap-2">
              <div className="flex-1 bg-white/40 rounded-[50px] p-10 flex flex-col justify-between group overflow-hidden relative">
                <div>
                  <h3 className="text-4xl font-black tracking-tighter italic" style={{ color: PRIMARY_DARK }}>NEW SIGNATURE<br />COLLECTION</h3>
                  <p className="text-xs font-bold opacity-40 mt-2 uppercase tracking-widest">Available now </p>
                </div>
                <div className="relative flex-1 flex items-center justify-center mt-4 h-full">
                  <img src={heroFemale.img} alt="Women Collection" className="w-full h-full max-h-64 object-contain scale-110 drop-shadow-2xl group-hover:scale-[1.2] transition-all duration-700" />
                  <div onClick={() => setActiveProduct(heroFemale)} onMouseEnter={() => setHovered("female")} onMouseLeave={() => setHovered(null)} className="absolute cursor-pointer" style={{ top: "30%", right: "25%", width: "25%", height: "25%" }}>
                    <div className="absolute w-3 h-3 bg-white rounded-full shadow-lg ring-4 ring-white/30" />
                    <AnimatePresence>{hovered === "female" && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="absolute top-0 left-8 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-2xl border border-white min-w-[140px] z-30">
                        <p className="text-[10px] font-black text-primary-dark">{heroFemale.name}</p>
                        <p className="text-base font-black text-primary">฿{heroFemale.price.toLocaleString()}</p>
                      </motion.div>
                    )}</AnimatePresence>
                  </div>
                </div>
              </div>
              <div className="h-44 bg-[#F5C518] rounded-[50px] flex items-center p-10 relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black italic tracking-tight" style={{ color: PRIMARY_DARK }}>OFFICIAL MERCH</h3>
                  <p className="text-sm font-bold opacity-60">KU NISIT COLLECTION</p>
                  <button onClick={() => {
                    const el = document.getElementById("explore-categories");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }} className="mt-4 px-6 py-2 bg-black text-white text-[10px] font-black rounded-full hover:scale-105 transition-transform tracking-widest">SHOP NOW</button>
                </div>
                <div className="absolute right-[-10%] top-[-20%] w-64 h-64 bg-white/20 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Row */}
        <div id="info-section" className="px-8 mb-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white/40 backdrop-blur-md p-8 rounded-[40px] border border-white/60 flex items-center gap-6 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">{f.icon}</div>
                <div><p className="text-xs font-black tracking-widest" style={{ color: PRIMARY_DARK }}>{f.title}</p><p className="text-[10px] font-bold opacity-40">{f.desc}</p></div>
              </div>
            ))}
          </div>
        </div>

        {/* SHOP BY CATEGORY SECTION */}
        <section id="explore-categories" className="px-8 py-20 bg-white/20 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <div className="mb-16 text-center">
              <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] block mb-4">Discovery</span>
              <h3 className="text-6xl font-black tracking-tighter italic" style={{ color: PRIMARY_DARK }}>EXPLORE <span className="text-primary underline decoration-gold/30">CATEGORIES</span></h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {[
                { title: "MEN", desc: "NISIT ESSENTIALS", route: "men", img: "/img/nisitshirtmen.png", bg: "#E8F3EF" },
                { title: "WOMEN", desc: "STYLE & SPIRIT", route: "women", img: "/img/nisitgirl.png", bg: "#F3E8EC" },
                { title: "FACULTY", desc: "ACADEMIC PRIDE", route: "faculty", img: "/img/capkums.png", bg: "#F3F1E8" }
              ].map((cat, i) => (
                <motion.div key={i} whileHover={{ y: -12 }} onClick={() => navigate(`/category/${cat.route}`)} className="relative h-[480px] rounded-[50px] overflow-hidden cursor-pointer group bg-white border border-black/5 shadow-xl transition-all duration-500">
                  <div className="absolute inset-0 z-0 opacity-40 transition-transform duration-700 group-hover:scale-110" style={{ background: cat.bg }} />
                  <div className="absolute inset-0 p-12 flex flex-col justify-end z-10">
                    <p className="text-[11px] font-black tracking-[0.25em] text-primary/40 mb-2 uppercase">{cat.desc}</p>
                    <h4 className="text-5xl font-black tracking-tighter italic" style={{ color: PRIMARY_DARK }}>{cat.title}</h4>
                    <div className="mt-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                      <span className="text-xs font-black uppercase tracking-widest text-primary">Browse Collection</span>
                      <FiChevronRight size={18} className="text-primary" />
                    </div>
                  </div>
                  <div className="absolute top-10 right-[-15%] w-[90%] h-full z-1 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 translate-x-10 group-hover:translate-x-0">
                    <img src={cat.img} alt={cat.title} className="w-full h-full object-contain drop-shadow-[-20px_20px_30px_rgba(0,0,0,0.1)]" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED PRODUCTS SECTION ───────────────────────────── */}
        <section className="py-20 px-8">
          <div className="max-w-7xl mx-auto">

            {/* Header row */}
            <div className="mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] block mb-3" style={{ color: PRIMARY }}>
                Popular Picks
              </span>
              <h3 className="text-5xl font-black tracking-tighter italic" style={{ color: PRIMARY_DARK }}>
                FEATURED <span style={{ color: PRIMARY }}>PRODUCTS</span>
              </h3>
            </div>

            {/* Products Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              <AnimatePresence>
                {(showAllFeatured ? [...allProducts].reverse() : [...allProducts].reverse().slice(0, 4)).map((product, i) => (
                  <motion.div
                    key={product.id || i}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i > 3 ? (i - 4) * 0.05 : 0 }}
                  >
                    <FeaturedCard product={product} onClick={setActiveProduct} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* See all / collapse button */}
            <div className="mt-10 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAllFeatured(prev => !prev)}
                className="flex items-center gap-2 px-8 py-3 rounded-full border-2 text-sm font-black uppercase tracking-widest transition-all cursor-pointer"
                style={{ borderColor: PRIMARY, color: PRIMARY }}
              >
                {showAllFeatured ? "ย่อสินค้า" : "ดูสินค้าทั้งหมด"}
                <motion.span
                  animate={{ rotate: showAllFeatured ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronRight size={16} />
                </motion.span>
              </motion.button>
            </div>
          </div>
        </section>

        {/* INFO Section and Footer */}
        <section ref={(el) => (sectionRefs.current[4] = el)}>
          <Footer />
        </section>
      </div>

      <AnimatePresence>
        {activeProduct && (
          <Modal product={activeProduct} onClose={() => setActiveProduct(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}