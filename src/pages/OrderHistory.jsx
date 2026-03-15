import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiPackage, FiChevronDown, FiChevronUp, FiShoppingBag } from "react-icons/fi";
import logo from "/img/KULOGOpng.png";

// Mock order history — ตอน connect backend ดึงจาก API แทน
const mockOrders = [
    {
        id: "ORD-2024-001",
        date: "15 มี.ค. 2567",
        status: "delivered",
        total: 1180,
        items: [
            { name: "เสื้อ Kasetsart University", subtitle: "รุ่น Classic – สีดำ/เทา", size: "L", qty: 1, price: 590, gradient: ["#111827","#6b7280"], color: "#1f2937" },
            { name: "เสื้อ Kasetsart University", subtitle: "รุ่น Classic – สีเขียว",  size: "M", qty: 1, price: 590, gradient: ["#064e3b","#10b981"], color: "#064e3b" },
        ],
    },
    {
        id: "ORD-2024-002",
        date: "20 มี.ค. 2567",
        status: "processing",
        total: 299,
        items: [
            { name: "Faculty of Engineering Polo", subtitle: "Faculty of Engineering", size: "XL", qty: 1, price: 299, gradient: ["#b45309","#f59e0b"], color: "#b45309" },
        ],
    },
    {
        id: "ORD-2024-003",
        date: "25 มี.ค. 2567",
        status: "pending",
        total: 789,
        items: [
            { name: "Faculty of Management Science Jacket", subtitle: "Faculty of Management Science", size: "M", qty: 1, price: 789, gradient: ["#5b21b6","#7c3aed"], color: "#7c3aed" },
        ],
    },
];

const statusConfig = {
    pending:    { label: "รอดำเนินการ", color: "text-yellow-400",  bg: "bg-yellow-400/10  border-yellow-400/30",  dot: "bg-yellow-400" },
    processing: { label: "กำลังจัดส่ง",  color: "text-blue-400",   bg: "bg-blue-400/10   border-blue-400/30",   dot: "bg-blue-400"   },
    delivered:  { label: "จัดส่งแล้ว",   color: "text-green-400",  bg: "bg-green-400/10  border-green-400/30",  dot: "bg-green-400"  },
    cancelled:  { label: "ยกเลิกแล้ว",   color: "text-red-400",    bg: "bg-red-400/10    border-red-400/30",    dot: "bg-red-400"    },
};

export default function OrderHistory() {
    const navigate = useNavigate();
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(prev => prev === id ? null : id);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1e2a3a] py-10 px-4">
            <div className="relative flex items-center justify-center w-full max-w-lg">

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 w-full bg-[#243447] rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Top bar */}
                    <div className="h-1.5 w-full" style={{ background: "linear-gradient(to right, #facc15, #f97316)" }} />

                    <div className="p-7">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <button
                                onClick={() => navigate("/home")}
                                className="flex items-center gap-1.5 text-gray-400 hover:text-yellow-400 transition text-sm"
                            >
                                <FiArrowLeft size={16} /> กลับ
                            </button>
                            <div className="flex items-center gap-2">
                                <img src={logo} alt="logo" className="w-7 h-7" />
                                <span className="text-yellow-400 font-black text-sm tracking-widest">KU SHOP</span>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-yellow-400/20 flex items-center justify-center">
                                <FiPackage size={20} className="text-yellow-400" />
                            </div>
                            <div>
                                <h2 className="text-white font-black text-lg">ประวัติการซื้อ</h2>
                                <p className="text-gray-400 text-xs">{mockOrders.length} คำสั่งซื้อทั้งหมด</p>
                            </div>
                        </div>

                        {/* Empty state */}
                        {mockOrders.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-5xl mb-3">🛍️</div>
                                <p className="text-gray-400 font-bold">ยังไม่มีประวัติการสั่งซื้อ</p>
                                <button
                                    onClick={() => navigate("/home")}
                                    className="mt-4 px-6 py-2.5 bg-yellow-400 text-black font-bold text-sm rounded-full hover:bg-yellow-300 transition"
                                >
                                    เลือกซื้อสินค้า →
                                </button>
                            </div>
                        )}

                        {/* Order list */}
                        <div className="space-y-3">
                            {mockOrders.map((order, index) => {
                                const status = statusConfig[order.status];
                                const isOpen = expandedId === order.id;

                                return (
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-[#1e2a3a] rounded-2xl overflow-hidden border border-gray-700/50"
                                    >
                                        {/* Order header row */}
                                        <button
                                            onClick={() => toggleExpand(order.id)}
                                            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-white/5 transition"
                                        >
                                            <div className="flex items-center gap-3 text-left">
                                                <div className="w-9 h-9 rounded-xl bg-[#243447] flex items-center justify-center flex-shrink-0">
                                                    <FiShoppingBag size={15} className="text-yellow-400" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-bold text-sm">{order.id}</p>
                                                    <p className="text-gray-500 text-xs">{order.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-right">
                                                    <p className="text-yellow-400 font-black text-sm">฿{order.total.toLocaleString()}</p>
                                                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${status.bg} ${status.color}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                                        {status.label}
                                                    </span>
                                                </div>
                                                <div className="text-gray-500">
                                                    {isOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                                                </div>
                                            </div>
                                        </button>

                                        {/* Expanded items */}
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-4 pb-4 space-y-2 border-t border-gray-700/50 pt-3">
                                                        {order.items.map((item, i) => (
                                                            <div key={i} className="flex items-center gap-3">
                                                                {/* Color swatch */}
                                                                <div
                                                                    className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-[7px] font-bold text-white"
                                                                    style={{ background: `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})` }}
                                                                >
                                                                    KU
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-white text-xs font-bold truncate">{item.name}</p>
                                                                    <p className="text-gray-500 text-[10px]">{item.subtitle} · ไซส์ {item.size} · x{item.qty}</p>
                                                                </div>
                                                                <p className="text-yellow-400 text-xs font-black flex-shrink-0">
                                                                    ฿{(item.price * item.qty).toLocaleString()}
                                                                </p>
                                                            </div>
                                                        ))}

                                                        {/* Summary */}
                                                        <div className="border-t border-gray-700/50 pt-2 flex justify-between items-center mt-2">
                                                            <p className="text-gray-400 text-xs">{order.items.reduce((s, i) => s + i.qty, 0)} ชิ้น</p>
                                                            <p className="text-white font-black text-sm">รวม ฿{order.total.toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Bottom CTA */}
                        <button
                            onClick={() => navigate("/home")}
                            className="w-full mt-6 py-3 rounded-full bg-yellow-400 text-black font-black text-sm hover:bg-yellow-300 transition shadow-lg shadow-yellow-400/30"
                        >
                            ช้อปต่อ →
                        </button>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}