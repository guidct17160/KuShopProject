import { useState } from "react";
import { motion } from "framer-motion";
import CartToast from "./CartToast";
import { useCart } from "../context/Cartcontext";

export default function Modal({ product, onClose }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [qty, setQty] = useState(1);
    const [adding, setAdding] = useState(false);
    const [toast, setToast] = useState(false);
    const { addToCart } = useCart();

    if (!product) return null;

    const handleAdd = () => {
        if (!selectedSize) {
            alert("กรุณาเลือกไซส์ก่อนนะคะ");
            return;
        }
        setAdding(true);
        setTimeout(() => {
            addToCart(product, selectedSize, qty);
            setAdding(false);
            setToast(true);
            setTimeout(() => {
                setToast(false);
                onClose();
            }, 1800);
        }, 900);
    };

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000]"
            />

            {/* Panel */}
            <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] bg-white rounded-3xl overflow-hidden shadow-2xl w-[min(500px,92vw)]"
            >
                {/* Gradient top bar */}
                <div
                    className="h-2 w-full"
                    style={{ background: `linear-gradient(to right, ${product.gradient[0]}, ${product.gradient[1]})` }}
                />

                <div className="p-7">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-5">
                        <div>
                            <span
                                className="inline-block text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-2"
                                style={{ background: product.color }}
                            >
                                {product.badge}
                            </span>
                            <h2 className="text-xl font-extrabold text-gray-900 leading-tight">{product.name}</h2>
                            <p className="text-sm text-gray-500 mt-0.5">{product.subtitle}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-gray-500 text-xl"
                        >
                            ×
                        </button>
                    </div>

                    {/* Product Image Preview */}
                    <div
                        className="rounded-2xl h-48 flex items-center justify-center relative mb-5 overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]})` }}
                    >
                        {product.img ? (
                            <img
                                src={product.img}
                                alt={product.name}
                                className="h-full w-full object-contain p-4 drop-shadow-lg"
                            />
                        ) : (
                            <div className="text-center text-white drop-shadow-lg">
                                <p className="text-sm font-bold tracking-[0.2em]">KASETSART</p>
                                <p className="text-[10px] tracking-[0.35em] opacity-75">UNIVERSITY</p>
                            </div>
                        )}
                        <span className="absolute top-2.5 right-3 bg-white/20 backdrop-blur text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                            {product.tag}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-500 mb-5 leading-relaxed">{product.description}</p>

                    {/* Size Selector */}
                    <div className="mb-5">
                        <p className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">เลือกไซส์</p>
                        <div className="flex gap-2 flex-wrap">
                            {product.sizes.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSelectedSize(s)}
                                    className="w-11 h-11 rounded-xl font-bold text-sm transition-all duration-150"
                                    style={{
                                        border: `2px solid ${selectedSize === s ? product.color : "#e5e7eb"}`,
                                        background: selectedSize === s ? product.color : "#fff",
                                        color: selectedSize === s ? "#fff" : "#374151",
                                    }}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Qty + Price */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">จำนวน</span>
                            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                                    className="w-9 h-9 bg-gray-50 hover:bg-gray-100 transition text-gray-700 font-bold flex items-center justify-center"
                                >−</button>
                                <span className="w-9 h-9 flex items-center justify-center font-bold text-gray-800">
                                    {qty}
                                </span>
                                <button
                                    onClick={() => setQty((q) => q + 1)}
                                    className="w-9 h-9 bg-gray-50 hover:bg-gray-100 transition text-gray-700 font-bold flex items-center justify-center"
                                >+</button>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-400">ราคารวม</p>
                            <p className="text-2xl font-black" style={{ color: product.color }}>
                                ฿{(product.price * qty).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={handleAdd}
                        disabled={adding}
                        className="w-full py-4 rounded-2xl text-white font-extrabold text-base tracking-wide transition-all duration-300"
                        style={{
                            background: adding
                                ? "#9ca3af"
                                : `linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]})`,
                            transform: adding ? "scale(0.97)" : "scale(1)",
                            boxShadow: adding ? "none" : `0 8px 24px ${product.color}55`,
                        }}
                    >
                        {adding ? "⏳ กำลังเพิ่ม..." : "🛒 เพิ่มลงตะกร้า"}
                    </button>
                </div>
            </motion.div>

            <CartToast show={toast} />
        </>
    );
}