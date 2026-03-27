import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft, FiShoppingBag, FiSearch, FiUser, FiChevronRight
} from "react-icons/fi";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import Orb from "../components/Orb";
import Navbar from "../components/Navbar";
import {
  BG_HOME, PRIMARY_DARK, PRIMARY, TEXT_MUTED
} from "../styles/tokens";

import logo from "/img/KULOGOpng.png";



export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { totalQty } = useCart();
  const [shopProduct, setShopProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const isAll = category.toLowerCase() === "all";
  const badge = category.toUpperCase();

  const filteredProducts = isAll ? products : products.filter(p => p.badge === badge);


  const titles = {
    ALL: { main: "ALL", sub: "PRODUCTS", desc: "สินค้าทั้งหมดจาก KU Shop — รวมทุกหมวดหมู่ Men, Women และ Faculty ไว้ในที่เดียว" },
    MEN: { main: "MEN'S", sub: "ESSENTIALS", desc: "Designed for academic excellence and everyday comfort. Discover official Kasetsart University apparel for Nisit." },
    WOMEN: { main: "WOMEN'S", sub: "SIGNATURE", desc: "Elegance meets university spirit. Timeless apparel designed for the modern Kasetsart woman." },
    FACULTY: { main: "FACULTY", sub: "ITEMS", desc: "Official merchandise representing the academic pride of Kasetsart University's diverse faculties." }
  };

  const currentTitle = titles[badge] || { main: badge, sub: "COLLECTION", desc: "" };

  const searchResults = [];

  return (
    <div className="fixed inset-0 p-4 md:p-8 overflow-hidden flex flex-col" style={{ background: BG_HOME }}>
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>

      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <Orb style={{ width: 580, height: 580, top: "-120px", right: "-100px", background: "radial-gradient(circle,rgba(0,120,60,0.55) 0%,rgba(0,100,50,0.25) 50%,transparent 75%)" }} anim={{ x: [0, 20, 0], y: [0, -16, 0] }} />
        <Orb style={{ width: 420, height: 420, top: "15%", right: "-5%", background: "radial-gradient(circle,rgba(245,197,24,0.55) 0%,rgba(230,176,0,0.25) 50%,transparent 75%)" }} anim={{ x: [0, -12, 0], y: [0, 14, 0] }} />
      </div>

      <div className="relative flex-1 rounded-[40px] border border-white/50 shadow-[0_32px_88px_rgba(0,0,0,0.15)] overflow-y-auto hide-scrollbar z-10 scroll-smooth bg-white/15 backdrop-blur-[40px]">

        {/* Navbar */}
        <Navbar onSearchSelect={setShopProduct} />

        <main className="pt-20 pb-20 px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-12">
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-sm bg-white border border-primary/10" style={{ color: PRIMARY_DARK }}>Premium Collection</motion.div>
              <h2 className="text-6xl font-black mb-4 tracking-tighter" style={{ color: PRIMARY_DARK }}>{currentTitle.main} <span style={{ color: PRIMARY }}>{currentTitle.sub}</span></h2>
              <p className="max-w-lg text-sm font-medium leading-relaxed" style={{ color: TEXT_MUTED }}>{currentTitle.desc}</p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((p, i) => (
                <div key={p.id || i}>
                  <ProductCard {...p} onClick={() => setShopProduct(p)} delay={i * 0.05} />
                </div>
              ))}
            </div>
            {filteredProducts.length === 0 && <p className="text-center py-40 text-xl font-bold opacity-30">No products found.</p>}
          </div>
        </main>
        <Footer />
      </div>
      
      <AnimatePresence>
        {shopProduct && (
          <Modal product={shopProduct} onClose={() => setShopProduct(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
