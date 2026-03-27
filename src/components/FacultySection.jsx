import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import {
  PRIMARY_DARK,
  PRIMARY,
  TEXT_MUTED,
  GLASS_CARD,
} from "../styles/tokens";
import { facultyItems } from "../data/facultyItems";

export default function FacultySection() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (item) => {
    setSelectedProduct(item);
    setShowModal(true);
  };

  return (
    <div className="relative py-8 px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black mb-1" style={{ color: PRIMARY_DARK, fontFamily: "'Montserrat',sans-serif" }}>
            FACULTY COLLECTION
          </h2>
          <p className="text-xs" style={{ color: TEXT_MUTED }}>Explore merchandise by faculty</p>
        </div>
      </div>

      {/* 3-column Grid Container */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {facultyItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
            onClick={() => handleProductClick(item)}
            whileHover={{ y: -6, scale: 1.02 }}
            className="rounded-3xl p-4 cursor-pointer group flex flex-col"
            style={{ ...GLASS_CARD, border: `2px solid transparent` }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = `rgba(0,102,51,0.2)`}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = `transparent`}
          >
            <div
              className="w-full h-56 rounded-2xl mb-4 relative overflow-hidden flex items-center justify-center p-2"
              style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)` }}
            >
              <img src={item.img} alt={item.name} className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500" style={{ maxHeight: "96%" }} />
            </div>
            
            <div className="px-1 text-center mt-auto">
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full mb-2 inline-block text-white" style={{ background: item.color }}>
                {item.faculty}
              </span>
              <h3 className="text-sm font-black mb-1 line-clamp-1" style={{ color: PRIMARY_DARK }}>{item.name}</h3>
              <p className="text-lg font-black" style={{ color: PRIMARY }}>฿{item.price}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && selectedProduct && (
          <Modal product={selectedProduct} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}