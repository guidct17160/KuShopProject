import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingBag, FiTag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cartcontext";

export default function Cart() {
    const navigate = useNavigate();
    const { cartItems, updateQty, removeItem, clearCart, totalPrice } = useCart();
    const [confirmed, setConfirmed] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [coupon, setCoupon] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);

    const discount = couponApplied ? Math.floor(totalPrice * 0.1) : 0;
    const shipping = totalPrice >= 1500 ? 0 : 60;
    const total = totalPrice - discount + shipping;
    const totalQty = cartItems.reduce((s, i) => s + i.qty, 0);

    const handleConfirm = () => {
        setConfirming(true);
        setTimeout(() => {
            setConfirming(false);
            setConfirmed(true);
            clearCart();
        }, 1200);
    };

    const applyCoupon = () => {
        if (coupon.trim().toUpperCase() === "KU10") {
            setCouponApplied(true);
        } else {
            alert("คูปองไม่ถูกต้องครับ");
        }
    };

    // ===== CONFIRMED STATE =====
    if (confirmed) {
        return (
            <div className="min-h-screen bg-orange-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="text-center px-8"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 20 }}
                        className="w-24 h-24 rounded-full bg-pink-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-pink-200"
                    >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </motion.div>
                    <h2 className="text-4xl font-black text-[#3b2f36] mb-2 font-['Bitcount_Prop_Double_Ink']">ยืนยันคำสั่งซื้อแล้ว!</h2>
                    <p className="text-gray-500 mb-8">ขอบคุณที่ช้อปกับ KU Shop นะคะ 🎉</p>
                    <button
                        onClick={() => navigate("/home")}
                        className="bg-pink-600 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-700 transition"
                    >
                        กลับหน้าหลัก →
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-orange-50">

            {/* ===== HEADER ===== */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between sticky top-0 z-40 shadow-sm"
            >
                <button
                    onClick={() => navigate("/home")}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition font-medium text-sm"
                >
                    <FiArrowLeft size={18} />
                    กลับ
                </button>
                <h1 className="text-xl font-black text-[#3b2f36] font-['Bitcount_Prop_Double_Ink'] tracking-tight">
                    ตะกร้าสินค้า
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FiShoppingBag size={16} />
                    <span>{totalQty} ชิ้น</span>
                </div>
            </motion.div>

            {/* ===== EMPTY STATE ===== */}
            {cartItems.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-32 text-center px-8"
                >
                    <div className="text-7xl mb-4">🛒</div>
                    <h2 className="text-2xl font-black text-gray-300 mb-2">ตะกร้าว่างเปล่า</h2>
                    <p className="text-gray-400 mb-8">ยังไม่มีสินค้าในตะกร้า</p>
                    <button
                        onClick={() => navigate("/home")}
                        className="bg-pink-600 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-700 transition"
                    >
                        เลือกสินค้า →
                    </button>
                </motion.div>
            )}

            {/* ===== MAIN CONTENT ===== */}
            {cartItems.length > 0 && (
                <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ── LEFT: Cart Items ── */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-widest">
                                รายการสินค้า ({cartItems.length})
                            </h2>
                            <button
                                onClick={clearCart}
                                className="text-xs text-gray-400 hover:text-red-500 transition flex items-center gap-1"
                            >
                                <FiTrash2 size={12} />
                                ลบทั้งหมด
                            </button>
                        </div>

                        <AnimatePresence>
                            {cartItems.map((item, index) => (
                                <motion.div
                                    key={`${item.id}-${item.size}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -60, scale: 0.95 }}
                                    transition={{ delay: index * 0.08, duration: 0.35 }}
                                    className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex gap-4"
                                >
                                    {/* Product visual */}
                                    <div
                                        className="w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center relative overflow-hidden"
                                        style={{ background: `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})` }}
                                    >
                                        {item.img ? (
                                            <img src={item.img} alt={item.name} className="w-full h-full object-contain p-1.5" />
                                        ) : (
                                            <div className="text-center text-white drop-shadow">
                                                <p className="text-[8px] font-bold tracking-widest">KASETSART</p>
                                                <p className="text-[6px] tracking-widest opacity-70">UNIVERSITY</p>
                                            </div>
                                        )}
                                        <span className="absolute bottom-1.5 right-1.5 text-[9px] font-bold text-white bg-black/30 px-1.5 py-0.5 rounded-full">
                                            {item.size}
                                        </span>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span
                                                    className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full text-white mb-1"
                                                    style={{ background: item.color }}
                                                >
                                                    {item.badge}
                                                </span>
                                                <p className="text-sm font-extrabold text-gray-900 leading-snug">{item.name}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{item.subtitle}</p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id, item.size)}
                                                className="w-8 h-8 rounded-full bg-gray-50 hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-gray-300 transition-colors duration-200 flex-shrink-0"
                                            >
                                                <FiTrash2 size={14} />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                                <button
                                                    onClick={() => updateQty(item.id, item.size, -1)}
                                                    className="w-8 h-8 bg-gray-50 hover:bg-gray-100 transition text-gray-500 flex items-center justify-center"
                                                >
                                                    <FiMinus size={12} />
                                                </button>
                                                <span className="w-8 h-8 flex items-center justify-center font-bold text-gray-800 text-sm">
                                                    {item.qty}
                                                </span>
                                                <button
                                                    onClick={() => updateQty(item.id, item.size, 1)}
                                                    className="w-8 h-8 bg-gray-50 hover:bg-gray-100 transition text-gray-500 flex items-center justify-center"
                                                >
                                                    <FiPlus size={12} />
                                                </button>
                                            </div>
                                            <p className="text-base font-black text-gray-900">
                                                ฿{(item.price * item.qty).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* ── RIGHT: Summary ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="space-y-4"
                    >
                        {/* Coupon */}
                        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
                            <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                <FiTag size={12} /> คูปองส่วนลด
                            </p>
                            {couponApplied ? (
                                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-2xl px-4 py-2.5">
                                    <span className="text-green-600 text-sm font-bold">✓ ใช้คูปอง KU10 แล้ว (ลด 10%)</span>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={coupon}
                                        onChange={e => setCoupon(e.target.value)}
                                        placeholder="กรอกโค้ด..."
                                        className="flex-1 px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-pink-300"
                                    />
                                    <button
                                        onClick={applyCoupon}
                                        className="px-4 py-2.5 bg-pink-600 text-white text-sm font-bold rounded-2xl hover:bg-pink-700 transition"
                                    >
                                        ใช้
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
                            <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4">สรุปคำสั่งซื้อ</p>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>ราคาสินค้า</span>
                                    <span>฿{totalPrice.toLocaleString()}</span>
                                </div>
                                {couponApplied && (
                                    <div className="flex justify-between text-green-600">
                                        <span>ส่วนลด (10%)</span>
                                        <span>-฿{discount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-600">
                                    <span>ค่าจัดส่ง</span>
                                    <span>
                                        {shipping === 0
                                            ? <span className="text-green-500 font-bold">ฟรี</span>
                                            : `฿${shipping}`
                                        }
                                    </span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-[11px] text-gray-400">
                                        ซื้อครบ ฿1,500 จัดส่งฟรี (เหลืออีก ฿{(1500 - totalPrice).toLocaleString()})
                                    </p>
                                )}
                                <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                                    <span className="font-extrabold text-gray-900">ยอดรวม</span>
                                    <span className="text-2xl font-black text-pink-600">
                                        ฿{total.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <motion.button
                                onClick={handleConfirm}
                                disabled={confirming}
                                whileTap={{ scale: 0.97 }}
                                className="w-full mt-5 py-4 rounded-2xl text-white font-extrabold text-base tracking-wide transition-all duration-300"
                                style={{
                                    background: confirming ? "#9ca3af" : "linear-gradient(135deg, #db2777, #f472b6)",
                                    boxShadow: confirming ? "none" : "0 8px 24px rgba(219,39,119,0.35)",
                                }}
                            >
                                {confirming ? "⏳ กำลังยืนยัน..." : "✅ ยืนยันคำสั่งซื้อ"}
                            </motion.button>
                            <p className="text-[11px] text-gray-400 text-center mt-3">
                                เมื่อยืนยันแล้วจะไม่สามารถแก้ไขได้
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}