import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiArrowLeft, FiPackage, FiClock, FiCheckCircle, FiSearch, FiShoppingBag, FiUser 
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import Orb from "../components/Orb";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  PRIMARY_DARK, PRIMARY, TEXT_MUTED, BG_HOME
} from "../styles/tokens";
import logo from "/img/KULOGOpng.png";



export default function OrderHistory() {
  const navigate = useNavigate();
  const { orders, totalQty } = useCart();
  const { products } = useProducts();

  const getStatusBadge = (status) => {
    switch (status) {
      case "delivered":
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black" style={{ background: "rgba(0,102,51,0.1)", color: PRIMARY }}><FiCheckCircle size={10} /> จัดส่งสำเร็จ</span>;
      case "processing":
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black" style={{ background: "rgba(245,197,24,0.2)", color: "#B8860B" }}><FiClock size={10} /> กำลังเตรียมจัดส่ง</span>;
      default: return null;
    }
  };

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
         <Navbar />

        <main className="max-w-4xl mx-auto px-8 py-10">
           <div className="flex items-center gap-4 mb-12">
             <button onClick={() => navigate("/profile")} className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center hover:bg-white transition-colors"><FiArrowLeft size={18} /></button>
             <h2 className="text-5xl font-black tracking-tighter italic" style={{ color: PRIMARY_DARK }}>ORDER <span className="text-primary">HISTORY</span></h2>
           </div>

           <div className="space-y-6">
              {orders.map((order, idx) => (
                <motion.div key={order.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white/40 backdrop-blur-xl rounded-[40px] p-8 border border-white shadow-xl">
                  <div className="flex justify-between items-start mb-6 pb-6 border-b border-dashed border-black/10">
                    <div><p className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1">Order ID</p><p className="text-lg font-black text-primary-dark">{order.id}</p></div>
                    <div className="text-right"><p className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1">{order.date}</p>{getStatusBadge(order.status)}</div>
                  </div>
                  <div className="space-y-4 mb-6">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white rounded-2xl p-1.5 shadow-sm"><img src={item.img} alt={item.name} className="w-full h-full object-contain" /></div>
                        <div className="flex-1"><p className="text-sm font-black text-primary-dark uppercase">{item.name}</p><p className="text-[10px] font-bold opacity-30 uppercase">Quantity: {item.qty}</p></div>
                        <p className="font-black text-sm text-primary">฿{(item.price * item.qty).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-black/5"><p className="text-[10px] font-black opacity-30 uppercase tracking-widest">Grand Total</p><p className="text-2xl font-black text-primary italic">฿{order.total.toLocaleString()}</p></div>
                </motion.div>
              ))}
              {orders.length === 0 && <div className="py-20 text-center"><p className="text-xl font-black opacity-20 italic">No orders found yet.</p></div>}
           </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}