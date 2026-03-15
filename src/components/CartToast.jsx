import { motion } from "framer-motion";

export default function CartToast({ show }) {
    return (
        <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: show ? 0 : 80, opacity: show ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] bg-[#111] text-white px-8 py-3 rounded-full font-semibold text-sm flex items-center gap-2 shadow-2xl pointer-events-none"
        >
            🛒 เพิ่มสินค้าในตะกร้าแล้ว!
        </motion.div>
    );
}