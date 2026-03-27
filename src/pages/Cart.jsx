import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingBag, FiTag, FiSearch, FiUser
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import Orb from "../components/Orb";
import Navbar from "../components/Navbar";
import {
  PRIMARY_DARK, PRIMARY, TEXT_MUTED, GOLD, GOLD_DARK, FREE_SHIPPING_THRESHOLD,
  COUPON_DISCOUNT_RATE, VALID_COUPON_CODE, BG_HOME
} from "../styles/tokens";
import logo from "/img/KULOGOpng.png";



export default function Cart() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { products } = useProducts();
  const { cartItems, updateQty, removeItem, clearCart, addOrder, totalPrice } = useCart();

  const [confirmed, setConfirmed] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const discount = couponApplied ? Math.floor(totalPrice * COUPON_DISCOUNT_RATE) : 0;
  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : 60;
  const total = totalPrice - discount + shipping;
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
      setConfirmed(true);
      addOrder(cartItems, total, currentUser);
      clearCart();
    }, 1400);
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === VALID_COUPON_CODE) setCouponApplied(true);
    else alert("คูปองไม่ถูกต้องครับ");
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

        <main className="max-w-6xl mx-auto px-8 py-10">
          {confirmed ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-28 h-28 rounded-[40px] bg-gold flex items-center justify-center shadow-2xl mb-8 border-4 border-white"><span className="text-5xl">✅</span></motion.div>
              <h2 className="text-5xl font-black italic tracking-tighter mb-4" style={{ color: PRIMARY_DARK }}>ORDER CONFIRMED!</h2>
              <p className="text-sm font-medium opacity-40 mb-10">Thank you for shopping with KU Shop.</p>
              <button onClick={() => navigate("/home")} className="px-10 py-4 bg-primary text-white font-black rounded-full shadow-xl hover:scale-105 transition-transform tracking-widest">BACK TO SHOPPING</button>
            </div>
          ) : (
            <>
              <div className="flex flex-col mb-12">
                <h2 className="text-6xl font-black tracking-tighter italic" style={{ color: PRIMARY_DARK }}>YOUR <span className="text-primary">SHOPPING BAG</span></h2>
                <p className="text-sm font-bold opacity-30 uppercase tracking-[0.25em] mt-2">Check your items before checkout</p>
              </div>

              {cartItems.length === 0 ? (
                <div className="bg-white/40 backdrop-blur-xl rounded-[50px] p-20 text-center border border-white/60 shadow-xl">
                  <span className="text-6xl mb-8 block">🛒</span>
                  <h3 className="text-2xl font-black mb-4 opacity-30 italic">YOUR BAG IS EMPTY</h3>
                  <button onClick={() => navigate("/home")} className="px-8 py-3 bg-primary text-white rounded-full font-black text-xs shadow-lg">CONTINUE SHOPPING</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-4">
                    <AnimatePresence>
                      {cartItems.map((item, idx) => (
                        <motion.div key={`${item.id}-${item.size}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: -20 }} className="bg-white/60 backdrop-blur-xl rounded-[40px] p-6 flex gap-6 border border-white shadow-xl">
                          <div className="w-24 h-24 rounded-3xl bg-white p-2 flex-shrink-0 shadow-inner group overflow-hidden">
                            <img src={item.img} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <span className="text-[9px] font-black px-2 py-0.5 bg-black/5 rounded-full opacity-40 uppercase tracking-widest mb-1 block w-fit">{item.badge}</span>
                                <h4 className="text-sm font-black text-primary-dark uppercase">{item.name}</h4>
                              </div>
                              <button onClick={() => removeItem(item.id, item.size)} className="p-2 hover:bg-red-50 text-red-400 rounded-full transition-colors"><FiTrash2 size={16} /></button>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                               <div className="flex items-center bg-white/80 rounded-full p-1 border border-black/5">
                                 <button onClick={() => updateQty(item.id, item.size, -1)} className="p-1.5 hover:bg-black/5 rounded-full"><FiMinus size={12} /></button>
                                 <span className="w-8 text-center text-xs font-black">{item.qty}</span>
                                 <button onClick={() => updateQty(item.id, item.size, 1)} className="p-1.5 hover:bg-black/5 rounded-full"><FiPlus size={12} /></button>
                               </div>
                               <p className="text-lg font-black text-primary italic">฿{(item.price * item.qty).toLocaleString()}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white/40 backdrop-blur-xl rounded-[40px] p-8 border border-white/60 shadow-xl">
                       <h5 className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em] mb-6">Order Summary</h5>
                       <div className="space-y-4 mb-8">
                         <div className="flex justify-between text-sm font-bold opacity-60"><span>Subtotal</span><span>฿{totalPrice.toLocaleString()}</span></div>
                         <div className="flex justify-between text-sm font-bold opacity-60"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `฿${shipping}`}</span></div>
                         <div className="pt-4 border-t border-black/5 flex justify-between items-center"><span className="text-lg font-black italic">TOTAL</span><span className="text-3xl font-black text-primary italic">฿{total.toLocaleString()}</span></div>
                       </div>
                       <div className="flex gap-2 mb-6">
                         <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="PROMO CODE" className="flex-1 bg-white/60 rounded-full px-5 py-3 text-[10px] font-black outline-none border border-transparent focus:border-gold" />
                         <button onClick={applyCoupon} className="px-6 py-3 bg-black text-white rounded-full font-black text-[10px]">APPLY</button>
                       </div>
                       <button onClick={handleConfirm} disabled={confirming} className="w-full py-5 bg-gold text-primary-dark rounded-[30px] font-black text-xs shadow-xl shadow-gold/20 tracking-widest">{confirming ? "CONFIRMING..." : "CHECKOUT NOW"}</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}