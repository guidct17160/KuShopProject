import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiCheck, FiArrowLeft, FiShoppingBag, FiLogOut, FiPackage } from "react-icons/fi";
import logo from "/img/KULOGOpng.png";

export default function Profile() {
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const [form, setForm] = useState({
        firstName: "นิสิต",
        lastName: "เกษตรศาสตร์",
        email: "nisit@ku.th",
        phone: "081-234-5678",
        address: "มหาวิทยาลัยเกษตรศาสตร์ ศรีราชา",
    });

    const [tempForm, setTempForm] = useState({ ...form });

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setForm({ ...tempForm });
            setSaving(false);
            setSaved(true);
            setEditMode(false);
            setTimeout(() => setSaved(false), 2000);
        }, 900);
    };

    const handleCancel = () => {
        setTempForm({ ...form });
        setEditMode(false);
    };

    const fields = [
        { key: "firstName", label: "ชื่อ",     icon: <FiUser size={14} />,   type: "text" },
        { key: "lastName",  label: "นามสกุล",  icon: <FiUser size={14} />,   type: "text" },
        { key: "email",     label: "อีเมล",     icon: <FiMail size={14} />,   type: "email" },
        { key: "phone",     label: "เบอร์โทร",  icon: <FiPhone size={14} />,  type: "tel" },
        { key: "address",   label: "ที่อยู่",    icon: <FiMapPin size={14} />, type: "text" },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1e2a3a] py-10 px-4">
            <div className="relative flex items-center justify-center w-full max-w-md">

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 w-full bg-[#243447] rounded-3xl shadow-2xl overflow-hidden"
                >
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

                        {/* Avatar */}
                        <div className="flex flex-col items-center mb-7">
                            <div className="w-20 h-20 rounded-full bg-yellow-400/20 border-2 border-yellow-400 flex items-center justify-center mb-3 shadow-lg shadow-yellow-400/20">
                                <FiUser size={36} className="text-yellow-400" />
                            </div>
                            <h2 className="text-white font-black text-lg">{form.firstName} {form.lastName}</h2>
                            <p className="text-gray-400 text-xs mt-0.5">Member</p>

                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => navigate("/cart")}
                                    className="flex items-center gap-1.5 bg-[#1e2a3a] text-gray-300 hover:text-yellow-400 text-xs px-3 py-1.5 rounded-full border border-gray-600 hover:border-yellow-400 transition"
                                >
                                    <FiShoppingBag size={12} /> ตะกร้า
                                </button>
                                <button
                                    onClick={() => navigate("/orders")}
                                    className="flex items-center gap-1.5 bg-[#1e2a3a] text-gray-300 hover:text-yellow-400 text-xs px-3 py-1.5 rounded-full border border-gray-600 hover:border-yellow-400 transition"
                                >
                                    <FiPackage size={12} /> ประวัติการซื้อ
                                </button>
                                <button
                                    onClick={() => navigate("/")}
                                    className="flex items-center gap-1.5 bg-[#1e2a3a] text-gray-300 hover:text-red-400 text-xs px-3 py-1.5 rounded-full border border-gray-600 hover:border-red-400 transition"
                                >
                                    <FiLogOut size={12} /> ออกจากระบบ
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="space-y-3 mb-6">
                            {fields.map(({ key, label, icon, type }) => (
                                <div key={key}>
                                    <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                        {icon} {label}
                                    </p>
                                    <AnimatePresence mode="wait">
                                        {editMode ? (
                                            <motion.input
                                                key="input"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                type={type}
                                                value={tempForm[key]}
                                                onChange={e => setTempForm(prev => ({ ...prev, [key]: e.target.value }))}
                                                className="w-full px-4 py-2.5 rounded-2xl bg-[#1e2a3a] text-white text-sm outline-none focus:ring-2 focus:ring-yellow-400 border border-gray-600 focus:border-yellow-400 transition"
                                            />
                                        ) : (
                                            <motion.div
                                                key="text"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="px-4 py-2.5 rounded-2xl text-sm bg-[#1e2a3a] text-white border border-gray-700"
                                            >
                                                {form[key]}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* Buttons */}
                        {!editMode ? (
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={() => { setTempForm({ ...form }); setEditMode(true); }}
                                className="w-full py-3 rounded-full bg-yellow-400 text-black font-black text-sm flex items-center justify-center gap-2 hover:bg-yellow-300 transition shadow-lg shadow-yellow-400/30"
                            >
                                <FiEdit2 size={15} /> แก้ไขข้อมูล
                            </motion.button>
                        ) : (
                            <div className="flex gap-3">
                                <button
                                    onClick={handleCancel}
                                    className="flex-1 py-3 rounded-full bg-[#1e2a3a] text-gray-300 font-bold text-sm border border-gray-600 hover:border-gray-400 transition"
                                >
                                    ยกเลิก
                                </button>
                                <motion.button
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex-1 py-3 rounded-full font-black text-sm flex items-center justify-center gap-2 transition"
                                    style={{
                                        background: saving ? "#6b7280" : "linear-gradient(135deg, #facc15, #f97316)",
                                        color: saving ? "white" : "black",
                                        boxShadow: saving ? "none" : "0 4px 20px rgba(250,204,21,0.4)",
                                    }}
                                >
                                    {saving ? "⏳ กำลังบันทึก..." : <><FiCheck size={15} /> บันทึก</>}
                                </motion.button>
                            </div>
                        )}

                        <AnimatePresence>
                            {saved && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="mt-4 bg-green-500/20 border border-green-500/40 text-green-400 text-sm font-bold text-center py-2.5 rounded-2xl"
                                >
                                    ✓ บันทึกข้อมูลเรียบร้อยแล้ว
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}