import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import {
  PRIMARY_DARK,
  PRIMARY,
  TEXT_MUTED,
  GOLD,
  GOLD_DARK,
  GLASS_MODAL,
} from "../styles/tokens";

// Example mapping for gradient color schemes
const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "2XL"];

export default function Modal({ product, onClose }) {
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const { addToCart } = useCart();

  if (!product) return null;

  const validSizes = product.sizes || SIZE_OPTIONS;

  const handleAdd = async () => {
    if (!size) {
      alert("กรุณาเลือกไซส์ก่อน");
      return;
    }
    setAdding(true);

    // Simulate tiny delay for realistic UI feedback
    await new Promise((resolve) => setTimeout(resolve, 300));

    const productToAdd = {
      ...product,
      badge: product.badge || "KU",
      color: product.color || PRIMARY,
      gradient: product.gradient || [PRIMARY_DARK, PRIMARY],
      subtitle: product.subtitle || "Original",
    };

    addToCart(productToAdd, size, qty);

    setAdding(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl"
        style={GLASS_MODAL}
      >
        {/* Shimmer line top */}
        <div style={{ height: 3, background: `linear-gradient(90deg,transparent,${GOLD},transparent)` }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 text-black/50 hover:bg-black/20 hover:text-black transition-all z-20"
        >
          ✕
        </button>

        <div className="p-6">
          {/* Product Image Area */}
          <div
            className="w-full h-48 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${product.gradient?.[0] || PRIMARY_DARK}, ${product.gradient?.[1] || PRIMARY})`,
              boxShadow: "inset 0 0 30px rgba(0,0,0,0.2)",
            }}
          >
            {product.img ? (
              <img src={product.img} alt={product.name} className="w-full h-full object-contain p-4 drop-shadow-xl" />
            ) : (
              <div className="text-white/30 text-4xl font-black">KU</div>
            )}

            {(product.badge || product.faculty) && (
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/30 backdrop-blur-md rounded-lg text-white text-[10px] font-black uppercase tracking-wider">
                {product.badge || product.faculty}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="mb-6">
            <h3 className="text-xl font-black mb-1 leading-tight" style={{ color: PRIMARY_DARK, fontFamily: "'Montserrat', sans-serif" }}>
              {product.name}
            </h3>
            {product.subtitle && (
              <p className="text-sm font-bold mb-2" style={{ color: PRIMARY }}>{product.subtitle}</p>
            )}
            <p className="text-2xl font-black" style={{ color: PRIMARY_DARK }}>
              ฿{product.price?.toLocaleString()}
            </p>

            <div className="my-4 h-px bg-black/10" />

            {product.description && (
              <p className="text-xs leading-relaxed" style={{ color: TEXT_MUTED }}>
                {product.description}
              </p>
            )}
          </div>

          {/* Configuration: Size & Qty */}
          <div className="space-y-4 mb-6">
            {/* Size Selector */}
            <div>
              <p className="text-xs font-bold mb-2" style={{ color: PRIMARY_DARK }}>เลือกขนาด</p>
              <div className="flex flex-wrap gap-2">
                {validSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-all"
                    style={
                      size === s
                        ? { background: PRIMARY_DARK, color: "white", boxShadow: "0 4px 12px rgba(0,61,31,0.3)" }
                        : { background: "rgba(255,255,255,0.6)", color: TEXT_MUTED, border: "1px solid rgba(0,0,0,0.1)" }
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold" style={{ color: PRIMARY_DARK }}>จำนวน</p>
              <div className="flex items-center gap-3 bg-white/40 rounded-xl p-1 border border-black/10">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/50 hover:bg-white text-black font-bold transition-colors"
                >
                  -
                </button>
                <span className="w-6 text-center font-black text-sm" style={{ color: PRIMARY_DARK }}>{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/50 hover:bg-white text-black font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {product.stock === 0 ? (
            <div 
              className="w-full py-4 rounded-2xl font-black text-sm tracking-wide flex items-center justify-center uppercase"
              style={{
                background: "rgba(0,0,0,0.1)",
                color: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(0,0,0,0.05)",
                cursor: "not-allowed"
              }}
            >
              SOLD OUT / สินค้าหมด
            </div>
          ) : (
            <motion.button
              onClick={handleAdd}
              disabled={adding}
              whileTap={{ scale: adding ? 1 : 0.97 }}
              className="w-full py-4 rounded-2xl font-black text-sm tracking-wide transition-all uppercase"
              style={{
                background: adding ? "rgba(0,102,51,0.3)" : `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`,
                color: PRIMARY_DARK,
                boxShadow: adding ? "none" : `0 8px 24px rgba(245,197,24,0.4)`,
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              {adding ? "กำลังเพิ่ม..." : "🛒 เพิ่มลงตะกร้า"}
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}