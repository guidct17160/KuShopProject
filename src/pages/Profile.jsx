import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiHome, FiSettings, FiUser, FiLogOut, FiEdit3, FiSave, FiX, 
  FiCamera, FiLock, FiShield, FiShoppingBag, FiSearch 
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import Orb from "../components/Orb";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import {
  PRIMARY_DARK,
  PRIMARY,
  TEXT_MUTED,
  GOLD,
  GOLD_DARK,
  DIVIDER,
  inputStyle,
  BG_HOME
} from "../styles/tokens";
import logo from "/img/KULOGOpng.png";



export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { currentUser, logout, updatePassword, updateProfile } = useAuth();
  const { totalQty, orders = [] } = useCart();
  const userOrders = orders.filter(o => o.userId === currentUser?.id);
  const { products } = useProducts();

  const [profileData, setProfileData] = useState({
    firstName: currentUser?.firstName || "นิสิต",
    lastName: currentUser?.lastName || "เกษตรศาสตร์",
    email: currentUser?.email || "nisit.k@ku.th",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nisit"
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [editForm, setEditForm] = useState(profileData);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [focused, setFocused] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProduct, setActiveProduct] = useState(null);

  const isEditingAny = isEditingProfile || isEditingPassword;

  const fields = [
    { name: "firstName", label: "ชื่อ", type: "text" },
    { name: "lastName", label: "นามสกุล", type: "text" },
    { name: "email", label: "อีเมล", type: "email" },
  ];

  const handleLogout = () => { logout(); navigate("/"); };
  const handleEditProfileClick = () => { setEditForm(profileData); setIsEditingProfile(true); };
  const handleCancelProfileClick = () => { setIsEditingProfile(false); };
  const handleChange = (e) => { setEditForm({ ...editForm, [e.target.name]: e.target.value }); };
  const handleSaveProfile = async () => {
    setSavingProfile(true);
    await new Promise(r => setTimeout(r, 800));
    setProfileData(editForm);
    if (updateProfile) updateProfile(editForm);
    setIsEditingProfile(false);
    setSavingProfile(false);
  };

  const handleEditPasswordClick = () => { setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" }); setPasswordError(""); setIsEditingPassword(true); };
  const handleCancelPasswordClick = () => { setIsEditingPassword(false); setPasswordError(""); };
  const handlePasswordChange = (e) => { setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value }); setPasswordError(""); };
  const handleSavePassword = async () => {
    setPasswordError("");
    const actualPassword = currentUser?.password || "password";
    if (passwordForm.currentPassword !== actualPassword) {
      setPasswordError("รหัสผ่านปัจจุบันไม่ถูกต้อง");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError("รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }

    setSavingPassword(true);
    await new Promise(r => setTimeout(r, 800));

    if (updatePassword) {
      updatePassword(passwordForm.newPassword);
    }
    
    alert("อัปเดตรหัสผ่านสำเร็จ!");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setIsEditingPassword(false);
    setSavingPassword(false);
  };

  const handleImageClick = () => { if (isEditingProfile && fileInputRef.current) fileInputRef.current.click(); };
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditForm({ ...editForm, avatarUrl: URL.createObjectURL(file) });
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

        <main className="max-w-5xl mx-auto px-8 py-10">
           {/* Profile Content */}
           <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full md:w-72">
                <div className="bg-white/60 backdrop-blur-xl rounded-[40px] p-8 border border-white shadow-xl text-center">
                  <div className={`relative w-28 h-28 rounded-full mx-auto mb-6 border-4 border-white shadow-lg overflow-hidden ${isEditingProfile ? 'cursor-pointer group' : ''}`} onClick={handleImageClick}>
                    <img src={isEditingProfile ? editForm.avatarUrl : profileData.avatarUrl} alt="Avatar" className="w-full h-full object-cover bg-white" />
                    {isEditingProfile && <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"><FiCamera size={24} /></div>}
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                  </div>
                  <h2 className="text-2xl font-black mb-6 italic" style={{ color: PRIMARY_DARK }}>{profileData.firstName} {profileData.lastName}</h2>
                  <div style={DIVIDER} className="mb-6" />
                  <nav className="flex flex-col gap-2">
                    <button 
                      onClick={() => setActiveTab("profile")}
                      className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === "profile" ? "bg-primary/10 text-primary" : "text-black/40 hover:bg-white/50"}`}
                    >
                      <FiUser /> ข้อมูลส่วนตัว
                    </button>
                    <button 
                      onClick={() => setActiveTab("orders")}
                      className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === "orders" ? "bg-primary/10 text-primary" : "text-black/40 hover:bg-white/50"}`}
                    >
                      <FiShoppingBag /> ประวัติการสั่งซื้อ
                    </button>
                  </nav>
                  <button onClick={handleLogout} className="mt-8 w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-red-100 text-red-500 font-black text-sm hover:bg-red-50 transition-all"><FiLogOut /> ออกจากระบบ</button>
                </div>
              </motion.div>

              {/* Main Form */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 space-y-8">
                {activeTab === "profile" ? (
                  <>
                    <div className="bg-white/40 backdrop-blur-xl rounded-[40px] p-10 border border-white/60 shadow-xl">
                      <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xl font-black italic tracking-tight" style={{ color: PRIMARY_DARK }}>GENERAL INFORMATION</h3>
                        {!isEditingProfile ? (
                           <button onClick={handleEditProfileClick} className="px-6 py-2.5 bg-white text-primary-dark border border-black/10 rounded-full font-black text-[10px] hover:scale-105 transition-all shadow-sm">EDIT PROFILE</button>
                        ) : (
                          <div className="flex gap-2">
                            <button onClick={handleCancelProfileClick} className="px-4 py-2 text-[10px] font-black text-black/40 uppercase">Cancel</button>
                            <button onClick={handleSaveProfile} className="px-6 py-2.5 bg-primary text-white rounded-full font-black text-[10px] shadow-lg shadow-primary/20">{savingProfile ? "SAVING..." : "SAVE CHANGES"}</button>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {fields.map(f => (
                          <div key={f.name}>
                            <label className="block text-[10px] font-black text-black/30 uppercase tracking-[0.2em] mb-3 ml-2">{f.label}</label>
                            {isEditingProfile ? (
                              <input name={f.name} value={editForm[f.name]} onChange={handleChange} className="w-full bg-white/60 border border-white focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold outline-none transition-all" />
                            ) : (
                              <div className="w-full bg-white/30 rounded-2xl px-6 py-4 text-sm font-bold text-primary-dark">{profileData[f.name]}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/40 backdrop-blur-xl rounded-[40px] p-10 border border-white/60 shadow-xl">
                      <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xl font-black italic tracking-tight" style={{ color: PRIMARY_DARK }}>SECURITY</h3>
                        {!isEditingPassword ? (
                           <button onClick={handleEditPasswordClick} className="px-6 py-2.5 bg-white text-primary-dark border border-black/10 rounded-full font-black text-[10px] hover:scale-105 transition-all shadow-sm">CHANGE PASSWORD</button>
                        ) : (
                          <div className="flex gap-2">
                            <button onClick={handleCancelPasswordClick} className="px-4 py-2 text-[10px] font-black text-black/40 uppercase">Cancel</button>
                            <button onClick={handleSavePassword} className="px-6 py-2.5 bg-gold text-primary-dark rounded-full font-black text-[10px] shadow-lg shadow-gold/20">UPDATE PASSWORD</button>
                          </div>
                        )}
                      </div>
                      {isEditingPassword ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {passwordError && (
                            <div className="md:col-span-2 p-4 bg-red-100/90 backdrop-blur-md border border-red-300 text-red-600 rounded-2xl text-xs font-black flex items-center gap-3">
                              <FiX size={16} />
                              {passwordError}
                            </div>
                          )}
                          <div className="md:col-span-2"><label className="block text-[10px] font-black text-black/30 uppercase tracking-[0.2em] mb-3 ml-2">Current Password</label><input type="password" name="currentPassword" value={passwordForm.currentPassword} onChange={handlePasswordChange} className="w-full bg-white/60 border border-white focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold outline-none" /></div>
                          <div className="col-span-1"><label className="block text-[10px] font-black text-black/30 uppercase tracking-[0.2em] mb-3 ml-2">New Password</label><input type="password" name="newPassword" value={passwordForm.newPassword} onChange={handlePasswordChange} className="w-full bg-white/60 border border-white focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold outline-none" /></div>
                          <div className="col-span-1"><label className="block text-[10px] font-black text-black/30 uppercase tracking-[0.2em] mb-3 ml-2">Confirm New Password</label><input type="password" name="confirmPassword" value={passwordForm.confirmPassword} onChange={handlePasswordChange} className="w-full bg-white/60 border border-white focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold outline-none" /></div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-6 p-6 bg-white/30 rounded-3xl border border-white/40"><div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary-dark shadow-sm"><FiLock size={20} /></div><div><p className="text-sm font-black text-primary-dark">Password Updated</p><p className="text-[10px] font-bold text-black/30 uppercase">Last changed: Today</p></div></div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="bg-white/40 backdrop-blur-xl rounded-[40px] p-10 border border-white/60 shadow-xl min-h-[500px] flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-black italic tracking-tight" style={{ color: PRIMARY_DARK }}>ORDER HISTORY</h3>
                    </div>
                    {userOrders.length > 0 ? (
                      <div className="space-y-6">
                        {userOrders.map(order => (
                          <div key={order.id} className="bg-white/60 rounded-3xl p-6 border border-white/80 shadow-sm flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">{order.status}</span>
                                <span className="text-xs font-bold text-black/40">Order #{order.id}</span>
                                <span className="text-xs font-bold text-black/40">• {order.date}</span>
                              </div>
                              <div className="space-y-3">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-black/5 p-1 flex items-center justify-center">
                                      <img src={item.img} alt={item.name} className="max-w-full max-h-full object-contain drop-shadow-sm" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-black text-primary-dark line-clamp-1">{item.name}</p>
                                      <p className="text-[10px] font-bold text-black/40 uppercase">Size: {item.size} | Qty: {item.qty}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col items-start md:items-end justify-between border-t md:border-t-0 md:border-l border-black/10 pt-4 md:pt-0 md:pl-6 min-w-[120px]">
                              <div className="mb-2 md:mb-0">
                                <p className="pt-1 text-[10px] font-black text-black/40 uppercase tracking-widest mb-1">Total Amount</p>
                                <p className="mt-5 text-2xl font-black text-primary">฿{order.total?.toLocaleString()}</p>
                              </div>
                              
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                        <FiShoppingBag size={64} className="text-black/10 mb-6" />
                        <h3 className="text-2xl font-black mb-3 italic" style={{ color: PRIMARY_DARK }}>ยังไม่มีประวัติการสั่งซื้อ</h3>
                        <p className="text-sm font-bold opacity-40 max-w-sm mb-8 leading-relaxed">
                          คุณยังไม่ได้ทำการสั่งซื้อสินค้าใดๆ ของเราเลย ลองแวะเข้าไปดูคอลเลกชันใหม่ๆ เพื่อสนับสนุนมหาวิทยาลัยกันเถอะ!
                        </p>
                        <button 
                          onClick={() => navigate("/home")} 
                          className="px-10 py-4 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
                        >
                          เริ่มช้อปปิ้งเลย
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
           </div>
        </main>
      </div>
    </div>
  );
}