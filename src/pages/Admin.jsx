import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiPackage, FiUsers, FiShoppingBag, FiPlus, FiEdit2, FiTrash2,
    FiArrowLeft, FiImage, FiCheck, FiX, FiChevronDown, FiShield, FiUser
} from "react-icons/fi";
import logo from "/img/KULOGOpng.png";

// ── Mock Data ──────────────────────────────────────────────
const mockProducts = [
    { id: 1, name: "เสื้อ KU Classic – ดำ/เทา",    price: 590, stock: 24, img: null, badge: "MEN" },
    { id: 2, name: "เสื้อ KU Classic – เขียว",      price: 590, stock: 18, img: null, badge: "WOMEN" },
    { id: 3, name: "Faculty of Engineering Polo",   price: 299, stock: 35, img: null, badge: "Faculty" },
    { id: 4, name: "Faculty of Science Jacket",     price: 699, stock: 8,  img: null, badge: "Faculty" },
    { id: 5, name: "กางเกงนิสิตชาย",                price: 350, stock: 42, img: null, badge: "MEN" },
];

const mockMembers = [
    { id: 1, name: "นิสิต เกษตรศาสตร์",  email: "nisit@ku.th",   role: "member", status: "active",   orders: 3 },
    { id: 2, name: "สมชาย ใจดี",          email: "somchai@ku.th", role: "member", status: "active",   orders: 1 },
    { id: 3, name: "มานะ รักเรียน",       email: "mana@ku.th",    role: "admin",  status: "active",   orders: 0 },
    { id: 4, name: "วิชัย เก่งมาก",       email: "wichai@ku.th",  role: "member", status: "inactive", orders: 5 },
];

const mockOrders = [
    { id: "ORD-001", member: "นิสิต เกษตรศาสตร์",  email: "nisit@ku.th",   date: "15 มี.ค. 67", total: 1180, status: "delivered",  items: 2 },
    { id: "ORD-002", member: "สมชาย ใจดี",          email: "somchai@ku.th", date: "20 มี.ค. 67", total: 299,  status: "processing", items: 1 },
    { id: "ORD-003", member: "วิชัย เก่งมาก",       email: "wichai@ku.th",  date: "22 มี.ค. 67", total: 789,  status: "pending",    items: 1 },
    { id: "ORD-004", member: "นิสิต เกษตรศาสตร์",  email: "nisit@ku.th",   date: "25 มี.ค. 67", total: 590,  status: "delivered",  items: 1 },
];

const statusConfig = {
    pending:    { label: "รอดำเนินการ", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30" },
    processing: { label: "กำลังจัดส่ง", color: "text-blue-400",  bg: "bg-blue-400/10  border-blue-400/30"  },
    delivered:  { label: "จัดส่งแล้ว",  color: "text-green-400", bg: "bg-green-400/10 border-green-400/30" },
};

const tabs = [
    { key: "products", label: "สินค้า",   icon: <FiPackage size={16} /> },
    { key: "members",  label: "สมาชิก",   icon: <FiUsers size={16} />   },
    { key: "orders",   label: "คำสั่งซื้อ", icon: <FiShoppingBag size={16} /> },
];

// ── Product Modal ──────────────────────────────────────────
function ProductModal({ product, onClose, onSave }) {
    const [form, setForm] = useState(
        product ?? { name: "", price: "", stock: "", badge: "MEN" }
    );

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="bg-[#243447] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                <div className="h-1.5 w-full" style={{ background: "linear-gradient(to right, #facc15, #f97316)" }} />
                <div className="p-6">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-white font-black text-lg">{product ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}</h3>
                        <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#1e2a3a] flex items-center justify-center text-gray-400 hover:text-white transition"><FiX size={16} /></button>
                    </div>

                    <div className="space-y-3">
                        {/* Image upload area */}
                        <div className="border-2 border-dashed border-gray-600 rounded-2xl h-24 flex items-center justify-center gap-2 text-gray-500 hover:border-yellow-400/50 hover:text-yellow-400 transition cursor-pointer">
                            <FiImage size={20} />
                            <span className="text-sm">คลิกเพื่ออัปโหลดรูปสินค้า</span>
                        </div>

                        <div>
                            <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-1">ชื่อสินค้า</p>
                            <input
                                value={form.name}
                                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                className="w-full px-4 py-2.5 rounded-2xl bg-[#1e2a3a] text-white text-sm outline-none focus:ring-2 focus:ring-yellow-400 border border-gray-600"
                                placeholder="ชื่อสินค้า"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-1">ราคา (฿)</p>
                                <input
                                    type="number" value={form.price}
                                    onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                                    className="w-full px-4 py-2.5 rounded-2xl bg-[#1e2a3a] text-white text-sm outline-none focus:ring-2 focus:ring-yellow-400 border border-gray-600"
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-1">สต็อก</p>
                                <input
                                    type="number" value={form.stock}
                                    onChange={e => setForm(p => ({ ...p, stock: e.target.value }))}
                                    className="w-full px-4 py-2.5 rounded-2xl bg-[#1e2a3a] text-white text-sm outline-none focus:ring-2 focus:ring-yellow-400 border border-gray-600"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-1">หมวดหมู่</p>
                            <select
                                value={form.badge}
                                onChange={e => setForm(p => ({ ...p, badge: e.target.value }))}
                                className="w-full px-4 py-2.5 rounded-2xl bg-[#1e2a3a] text-white text-sm outline-none focus:ring-2 focus:ring-yellow-400 border border-gray-600"
                            >
                                {["MEN","WOMEN","Faculty","Others"].map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-5">
                        <button onClick={onClose} className="flex-1 py-3 rounded-full bg-[#1e2a3a] text-gray-300 font-bold text-sm border border-gray-600 hover:border-gray-400 transition">ยกเลิก</button>
                        <button
                            onClick={() => onSave(form)}
                            className="flex-1 py-3 rounded-full font-black text-sm text-black flex items-center justify-center gap-2 transition"
                            style={{ background: "linear-gradient(135deg,#facc15,#f97316)", boxShadow: "0 4px 20px rgba(250,204,21,0.3)" }}
                        >
                            <FiCheck size={15} /> บันทึก
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── Main Admin ─────────────────────────────────────────────
export default function Admin() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("products");
    const [products, setProducts] = useState(mockProducts);
    const [members, setMembers] = useState(mockMembers);
    const [orders] = useState(mockOrders);
    const [productModal, setProductModal] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);

    const handleSaveProduct = (form) => {
        if (productModal === "new") {
            setProducts(prev => [...prev, { ...form, id: Date.now(), price: +form.price, stock: +form.stock }]);
        } else {
            setProducts(prev => prev.map(p => p.id === productModal.id ? { ...p, ...form, price: +form.price, stock: +form.stock } : p));
        }
        setProductModal(null);
    };

    const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));

    const toggleRole = (id) => {
        setMembers(prev => prev.map(m => m.id === id ? { ...m, role: m.role === "admin" ? "member" : "admin" } : m));
    };

    const toggleStatus = (id) => {
        setMembers(prev => prev.map(m => m.id === id ? { ...m, status: m.status === "active" ? "inactive" : "active" } : m));
    };

    return (
        <div className="min-h-screen bg-[#1e2a3a] flex flex-col">

            {/* ── Top bar ── */}
            <div className="bg-[#243447] border-b border-gray-700/50 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate("/home")} className="flex items-center gap-1.5 text-gray-400 hover:text-yellow-400 transition text-sm mr-2">
                        <FiArrowLeft size={16} />
                    </button>
                    <img src={logo} alt="logo" className="w-8 h-8" />
                    <div>
                        <p className="text-yellow-400 font-black text-sm tracking-widest leading-none">KU SHOP</p>
                        <p className="text-gray-500 text-[10px]">Admin Panel</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center gap-6">
                    {[
                        { label: "สินค้า", value: products.length, icon: <FiPackage size={14} /> },
                        { label: "สมาชิก", value: members.length, icon: <FiUsers size={14} /> },
                        { label: "คำสั่งซื้อ", value: orders.length, icon: <FiShoppingBag size={14} /> },
                    ].map(s => (
                        <div key={s.label} className="flex items-center gap-2 text-sm">
                            <span className="text-yellow-400">{s.icon}</span>
                            <span className="text-white font-black">{s.value}</span>
                            <span className="text-gray-500">{s.label}</span>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 px-3 py-1.5 rounded-full">
                    <FiShield size={13} className="text-yellow-400" />
                    <span className="text-yellow-400 text-xs font-bold">Admin</span>
                </div>
            </div>

            {/* ── Tabs ── */}
            <div className="bg-[#243447] border-b border-gray-700/50 px-6">
                <div className="flex gap-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-2 px-4 py-3.5 text-sm font-bold border-b-2 transition-all duration-200 ${
                                activeTab === tab.key
                                    ? "border-yellow-400 text-yellow-400"
                                    : "border-transparent text-gray-400 hover:text-gray-200"
                            }`}
                        >
                            {tab.icon} {tab.label}
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${activeTab === tab.key ? "bg-yellow-400/20 text-yellow-400" : "bg-gray-700 text-gray-400"}`}>
                                {tab.key === "products" ? products.length : tab.key === "members" ? members.length : orders.length}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Content ── */}
            <div className="flex-1 p-6 max-w-5xl mx-auto w-full">
                <AnimatePresence mode="wait">

                    {/* ════ PRODUCTS ════ */}
                    {activeTab === "products" && (
                        <motion.div key="products" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-white font-black text-xl">จัดการสินค้า</h2>
                                <button
                                    onClick={() => setProductModal("new")}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm text-black transition"
                                    style={{ background: "linear-gradient(135deg,#facc15,#f97316)", boxShadow: "0 4px 16px rgba(250,204,21,0.3)" }}
                                >
                                    <FiPlus size={15} /> เพิ่มสินค้า
                                </button>
                            </div>

                            <div className="space-y-3">
                                {products.map((p, i) => (
                                    <motion.div
                                        key={p.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-[#243447] rounded-2xl px-5 py-4 flex items-center gap-4 border border-gray-700/50"
                                    >
                                        {/* Color block แทนรูป */}
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-400/20 border border-yellow-400/20 flex items-center justify-center flex-shrink-0">
                                            <FiPackage size={18} className="text-yellow-400/60" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-bold text-sm truncate">{p.name}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-yellow-400 font-black text-sm">฿{p.price.toLocaleString()}</span>
                                                <span className="text-gray-500 text-xs">สต็อก {p.stock} ชิ้น</span>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.stock < 10 ? "bg-red-400/10 text-red-400 border border-red-400/30" : "bg-green-400/10 text-green-400 border border-green-400/30"}`}>
                                                    {p.stock < 10 ? "สต็อกเหลือน้อย" : "พร้อมขาย"}
                                                </span>
                                            </div>
                                        </div>

                                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#1e2a3a] text-gray-400 border border-gray-600">{p.badge}</span>

                                        <div className="flex gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => setProductModal(p)}
                                                className="w-8 h-8 rounded-xl bg-[#1e2a3a] border border-gray-600 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 transition"
                                            >
                                                <FiEdit2 size={14} />
                                            </button>
                                            <button
                                                onClick={() => deleteProduct(p.id)}
                                                className="w-8 h-8 rounded-xl bg-[#1e2a3a] border border-gray-600 flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-400/50 transition"
                                            >
                                                <FiTrash2 size={14} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ════ MEMBERS ════ */}
                    {activeTab === "members" && (
                        <motion.div key="members" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-white font-black text-xl">จัดการสมาชิก</h2>
                                <p className="text-gray-500 text-sm">ทั้งหมด {members.length} คน</p>
                            </div>

                            <div className="space-y-3">
                                {members.map((m, i) => {
                                    const memberOrders = orders.filter(o => o.email === m.email);
                                    return (
                                    <div key={m.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-[#243447] rounded-2xl px-5 py-4 flex items-center gap-4 border border-gray-700/50"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[#1e2a3a] border border-gray-600 flex items-center justify-center flex-shrink-0">
                                            {m.role === "admin"
                                                ? <FiShield size={16} className="text-yellow-400" />
                                                : <FiUser size={16} className="text-gray-400" />
                                            }
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-bold text-sm">{m.name}</p>
                                            <p className="text-gray-500 text-xs">{m.email} · {m.orders} คำสั่งซื้อ</p>
                                        </div>

                                        {/* Role badge */}
                                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${m.role === "admin" ? "bg-yellow-400/10 text-yellow-400 border-yellow-400/30" : "bg-gray-700/50 text-gray-400 border-gray-600"}`}>
                                            {m.role === "admin" ? "Admin" : "Member"}
                                        </span>

                                        {/* Status badge */}
                                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${m.status === "active" ? "bg-green-400/10 text-green-400 border-green-400/30" : "bg-red-400/10 text-red-400 border-red-400/30"}`}>
                                            {m.status === "active" ? "Active" : "Inactive"}
                                        </span>

                                        {/* Actions */}
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => toggleRole(m.id)}
                                                className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-[#1e2a3a] border border-gray-600 text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 transition whitespace-nowrap"
                                            >
                                                {m.role === "admin" ? "→ Member" : "→ Admin"}
                                            </button>
                                            <button
                                                onClick={() => toggleStatus(m.id)}
                                                className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-[#1e2a3a] border border-gray-600 text-gray-400 hover:text-orange-400 hover:border-orange-400/50 transition whitespace-nowrap"
                                            >
                                                {m.status === "active" ? "Deactivate" : "Activate"}
                                            </button>
                                            <button
                                                onClick={() => setSelectedMember(selectedMember?.id === m.id ? null : m)}
                                                className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition whitespace-nowrap ${selectedMember?.id === m.id ? "bg-yellow-400/20 text-yellow-400 border-yellow-400/50" : "bg-[#1e2a3a] border-gray-600 text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50"}`}
                                            >
                                                ประวัติซื้อ
                                            </button>
                                        </div>
                                    </motion.div>

                                    {/* ── Order History Panel ── */}
                                    <AnimatePresence>
                                        {selectedMember?.id === m.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="bg-[#1a2333] rounded-2xl mx-1 mb-1 p-4 border border-yellow-400/20">
                                                    <p className="text-yellow-400 text-xs font-black uppercase tracking-widest mb-3">
                                                        ประวัติการซื้อของ {m.name}
                                                    </p>
                                                    {memberOrders.length === 0 ? (
                                                        <p className="text-gray-500 text-sm text-center py-4">ยังไม่มีประวัติการซื้อ</p>
                                                    ) : (
                                                        <div className="space-y-2">
                                                            {memberOrders.map(o => {
                                                                const st = statusConfig[o.status];
                                                                return (
                                                                    <div key={o.id} className="flex items-center gap-3 bg-[#243447] rounded-xl px-4 py-3">
                                                                        <div className="w-8 h-8 rounded-lg bg-[#1e2a3a] flex items-center justify-center flex-shrink-0">
                                                                            <FiShoppingBag size={13} className="text-yellow-400" />
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-white text-xs font-bold">{o.id}</p>
                                                                            <p className="text-gray-500 text-[10px]">{o.date} · {o.items} รายการ</p>
                                                                        </div>
                                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${st.bg} ${st.color}`}>{st.label}</span>
                                                                        <span className="text-yellow-400 font-black text-xs flex-shrink-0">฿{o.total.toLocaleString()}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                            <div className="flex justify-between items-center pt-2 border-t border-gray-700/50 mt-2">
                                                                <p className="text-gray-500 text-xs">{memberOrders.length} คำสั่งซื้อ</p>
                                                                <p className="text-yellow-400 font-black text-sm">
                                                                    รวม ฿{memberOrders.reduce((s, o) => s + o.total, 0).toLocaleString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* ════ ORDERS ════ */}
                    {activeTab === "orders" && (
                        <motion.div key="orders" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-white font-black text-xl">คำสั่งซื้อทั้งหมด</h2>
                                <p className="text-gray-500 text-sm">ทั้งหมด {orders.length} รายการ</p>
                            </div>

                            <div className="space-y-3">
                                {orders.map((o, i) => {
                                    const st = statusConfig[o.status];
                                    const isOpen = expandedOrder === o.id;
                                    return (
                                        <motion.div
                                            key={o.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="bg-[#243447] rounded-2xl overflow-hidden border border-gray-700/50"
                                        >
                                            <button
                                                onClick={() => setExpandedOrder(isOpen ? null : o.id)}
                                                className="w-full px-5 py-4 flex items-center gap-4 hover:bg-white/5 transition text-left"
                                            >
                                                <div className="w-9 h-9 rounded-xl bg-[#1e2a3a] flex items-center justify-center flex-shrink-0">
                                                    <FiShoppingBag size={15} className="text-yellow-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white font-bold text-sm">{o.id}</p>
                                                    <p className="text-gray-500 text-xs">{o.member} · {o.date}</p>
                                                </div>
                                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${st.bg} ${st.color}`}>{st.label}</span>
                                                <span className="text-yellow-400 font-black text-sm flex-shrink-0">฿{o.total.toLocaleString()}</span>
                                                <FiChevronDown size={16} className={`text-gray-500 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-5 pb-4 border-t border-gray-700/50 pt-3 space-y-2">
                                                            <div className="flex justify-between text-xs text-gray-400">
                                                                <span>อีเมล: {o.email}</span>
                                                                <span>{o.items} รายการ</span>
                                                            </div>
                                                            {/* Change status */}
                                                            <div className="flex items-center gap-2 mt-2">
                                                                <span className="text-xs text-gray-500">เปลี่ยนสถานะ:</span>
                                                                {["pending","processing","delivered"].map(s => (
                                                                    <button
                                                                        key={s}
                                                                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition ${o.status === s ? `${statusConfig[s].bg} ${statusConfig[s].color}` : "bg-[#1e2a3a] text-gray-500 border-gray-600 hover:border-gray-400"}`}
                                                                    >
                                                                        {statusConfig[s].label}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* Product Modal */}
            <AnimatePresence>
                {productModal && (
                    <ProductModal
                        product={productModal === "new" ? null : productModal}
                        onClose={() => setProductModal(null)}
                        onSave={handleSaveProduct}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}