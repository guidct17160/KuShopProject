import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiLogOut, FiUsers, FiBox, FiDollarSign, FiShield, FiTag, FiPlus, 
  FiX, FiCheck, FiTrash2, FiEdit3, FiSearch, FiArrowLeft, FiCamera, FiLock,
  FiUser, FiChevronRight 
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import Orb from "../components/Orb";
import {
  PRIMARY_DARK, PRIMARY, TEXT_MUTED, GOLD, BG_HOME, DIVIDER
} from "../styles/tokens";
import logo from "/img/KULOGOpng.png";

export default function Admin() {
  const navigate = useNavigate();
  const { orders } = useCart();
  const { users, currentUser, updateRole, updatePassword, updateProfile } = useAuth();
  const { products: allProducts, addProduct, updateProduct, deleteProduct } = useProducts();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [adminSearchQuery, setAdminSearchQuery] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [viewOrderHistoryFor, setViewOrderHistoryFor] = useState(null);
  const [viewSingleOrder, setViewSingleOrder] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const productFileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "", subtitle: "", price: "", stock: "20", badge: "MEN",
    img: "/img/nisitshirtmen.png", description: ""
  });

  // Admin Profile State
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState({
    firstName: currentUser?.firstName || "Admin",
    lastName: currentUser?.lastName || "System",
    email: currentUser?.email || "admin@ku.th",
    avatarUrl: currentUser?.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
  });
  const [editForm, setEditForm] = useState(profileData);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  const fields = [
    { name: "firstName", label: "ชื่อ", type: "text" },
    { name: "lastName", label: "นามสกุล", type: "text" },
    { name: "email", label: "อีเมล", type: "email" },
  ];

  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordError, setPasswordError] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const totalStock = allProducts.reduce((sum, p) => sum + (Number(p.stock) || 0), 0);
  const STATS = [
    { label: "ยอดขายรวม", value: `฿${totalSales.toLocaleString()}`, icon: <FiDollarSign />, color: GOLD },
    { label: "สินค้าทั้งหมด", value: `${allProducts.length} ชิ้น (${totalStock} ในคลัง)`, icon: <FiTag />, color: PRIMARY },
    { label: "สมาชิก", value: users.length.toLocaleString(), icon: <FiUsers />, color: "#3B82F6" },
  ];

  const handleEditClick = (p) => {
    setEditingProduct(p);
    setFormData({ ...p, price: String(p.price), stock: String(p.stock || 0) });
    setShowProductModal(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const data = { ...formData, price: Math.max(0, Number(formData.price)), stock: Math.max(0, Number(formData.stock)) };
    if (editingProduct) updateProduct({ ...editingProduct, ...data });
    else addProduct(data);
    setShowProductModal(false);
    setEditingProduct(null);
  };

  const handlePromote = (id) => updateRole(id, "admin");
  const handleDemote = (id) => updateRole(id, "user");
  const isHeadAdmin = currentUser?.email === "admin@ku.th";

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

  const handleImageClick = () => { if (isEditingProfile && fileInputRef.current) fileInputRef.current.click(); };
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditForm({ ...editForm, avatarUrl: URL.createObjectURL(file) });
  };

  const handleProductImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData({ ...formData, img: URL.createObjectURL(file) });
  };

  const handleSavePassword = async () => {
    setPasswordError("");
    const actualPassword = currentUser?.password || "password";
    if (passwordForm.currentPassword !== actualPassword) return setPasswordError("รหัสผ่านปัจจุบันไม่ถูกต้อง");
    if (passwordForm.newPassword !== passwordForm.confirmPassword) return setPasswordError("รหัสผ่านใหม่ไม่ตรงกัน");
    if (passwordForm.newPassword.length < 6) return setPasswordError("รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร");

    setSavingPassword(true);
    await new Promise(r => setTimeout(r, 800));
    if (updatePassword) updatePassword(passwordForm.newPassword);
    alert("อัปเดตรหัสผ่านสำเร็จ!");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setIsEditingPassword(false);
    setSavingPassword(false);
  };
  
  const resetForm = () => setFormData({ name: "", subtitle: "", price: "", stock: "20", badge: "MEN", img: "/img/nisitshirtmen.png", description: "" });

  return (
    <div className="fixed inset-0 p-4 md:p-8 overflow-hidden flex flex-col" style={{ background: BG_HOME }}>
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
      
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <Orb style={{ width: 580, height: 580, top: "-120px", right: "-100px", background: "radial-gradient(circle,rgba(0,120,60,0.55) 0%,rgba(0,100,50,0.25) 50%,transparent 75%)" }} anim={{ x: [0, 20, 0], y: [0, -16, 0] }} />
        <Orb style={{ width: 420, height: 420, bottom: "-5%", left: "-5%", background: "radial-gradient(circle,rgba(245,197,24,0.55) 0%,rgba(230,176,0,0.25) 50%,transparent 75%)" }} anim={{ x: [0, -12, 0], y: [0, 14, 0] }} />
      </div>

      <div className="relative flex-1 rounded-[40px] border border-white/50 shadow-2xl overflow-y-auto hide-scrollbar z-10 scroll-smooth bg-white/15 backdrop-blur-[40px] flex flex-col">
         
         {/* Admin Topbar */}
         <div className="px-10 py-8 flex justify-between items-center bg-white/40 border-b border-white/20">
            <div className="flex items-center gap-6">
               <button onClick={() => navigate("/home")} className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-black/5 transition-colors shadow-sm"><FiArrowLeft size={18} /></button>
               <div className="flex items-center gap-3">
                 <img src={logo} alt="logo" className="w-10 h-10" />
                 <div><h1 className="text-xl font-black italic tracking-tighter" style={{ color: PRIMARY_DARK }}>ADMIN PANEL</h1><p className="text-[10px] font-black opacity-40 uppercase tracking-widest">KU SHOP COMMAND CENTER</p></div>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="text-right hidden sm:block">
                 <p className="text-sm font-black text-primary-dark">{profileData.firstName}</p>
                 <p className="text-[10px] font-bold text-primary uppercase">{isHeadAdmin ? "Head Administrator" : "Administrator"}</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-white border-2 border-primary overflow-hidden shadow-lg"><img src={profileData.avatarUrl} className="w-full h-full object-cover" /></div>
            </div>
         </div>

         <div className="flex-1 flex overflow-hidden">
            {/* Admin Sidebar */}
            <div className="w-64 bg-white/20 border-r border-white/20 p-6 flex flex-col gap-2">
               {[
                 { id: "dashboard", label: "Dashboard", icon: <FiShield /> },
                 { id: "products", label: "Inventory", icon: <FiBox /> },
                 { id: "users", label: "Customers", icon: <FiUsers /> },
                 { id: "profile", label: "Profile", icon: <FiTag /> }
               ].map(tab => (
                 <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'hover:bg-white/40 opacity-40 hover:opacity-100'}`}>{tab.icon} {tab.label}</button>
               ))}
               <div className="mt-auto"><button onClick={() => navigate("/")} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-red-100 text-red-500 font-black text-sm hover:bg-red-50 transition-all"><FiLogOut /> EXIT ADMIN</button></div>
            </div>

            {/* Admin Content */}
            <div className="flex-1 overflow-y-auto p-10 hide-scrollbar">
               {activeTab === "dashboard" && (
                 <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {STATS.map((s, i) => (
                        <div key={i} className="bg-white/40 backdrop-blur-xl p-8 rounded-[30px] border border-white shadow-xl">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm" style={{ background: s.color + '20', color: s.color }}>{s.icon}</div>
                          <p className="text-3xl font-black text-primary-dark">{s.value}</p>
                          <p className="text-[10px] font-black opacity-30 uppercase tracking-widest">{s.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white/40 backdrop-blur-xl p-10 rounded-[40px] border border-white shadow-xl">
                      <h3 className="text-2xl font-black italic tracking-tighter mb-8" style={{ color: PRIMARY_DARK }}>RECENT <span className="text-primary-dark opacity-30">TRANSACTIONS</span></h3>
                      {orders.length > 0 ? (
                        <div className="space-y-4">
                          {orders.map(order => {
                             const user = users.find(u => u.id === order.userId);
                             const customerName = order.customerName || (user ? `${user.firstName} ${user.lastName}` : (order.userId === "guest" ? "Guest User" : "Deleted User"));
                             const customerEmail = order.customerEmail || user?.email;
                             return (
                               <div key={order.id} className="bg-white/60 p-6 rounded-3xl border border-white/80 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-white/90 transition-colors">
                                 <div>
                                   <div className="flex items-center gap-3 mb-4">
                                     <span className="px-3 py-1 bg-gold/20 text-gold-dark rounded-full text-[10px] font-black uppercase tracking-widest leading-none">{order.status}</span>
                                      <span className="text-xs font-black text-black/40">#{order.id}</span>
                                      <span className="text-xs font-bold text-black/40">• {order.date}</span>
                                   </div>
                                   <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                       <FiUser size={14} />
                                     </div>
                                     <div>
                                        <p className="text-sm font-black text-primary-dark leading-none">
                                          {customerName}
                                          {customerEmail && <span className="opacity-40 ml-2 font-bold text-[10px]">{customerEmail}</span>}
                                        </p>
                                        <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest mt-1">
                                          {order.items?.length || 0} ITEMS IN ORDER
                                        </p>
                                     </div>
                                   </div>
                                 </div>
                                 <div className="text-right w-full md:w-auto flex flex-row md:flex-col justify-between items-center md:items-end mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-none border-black/5">
                                   <p className="text-2xl font-black text-primary">฿{order.total?.toLocaleString()}</p>
                                   <button onClick={() => setViewSingleOrder(order)} className="md:mt-2 px-4 py-2 bg-black/5 hover:bg-black/10 rounded-full text-[10px] font-black text-primary-dark uppercase tracking-widest transition-colors cursor-pointer flex items-center gap-2">
                                     View Details <FiChevronRight size={12} />
                                   </button>
                                 </div>
                               </div>
                             );
                          })}
                        </div>
                      ) : (
                        <div className="h-40 flex items-center justify-center italic opacity-30 font-black">NO RECENT ORDERS</div>
                      )}
                    </div>
                 </div>
               )}

               {activeTab === "products" && (
                 <div className="space-y-8">
                    <div className="flex justify-between items-center">
                       <h2 className="text-4xl font-black italic tracking-tighter" style={{ color: PRIMARY_DARK }}>INVENTORY <span className="text-primary-dark opacity-30">PRO</span></h2>
                       <button onClick={() => { resetForm(); setShowProductModal(true); }} className="px-6 py-3 bg-primary text-white rounded-full font-black text-[10px] shadow-xl shadow-primary/20 flex items-center gap-2"><FiPlus /> ADD PRODUCT</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                       {allProducts.map(p => (
                         <div key={p.id} className="bg-white/60 backdrop-blur-xl p-6 rounded-[30px] border border-white shadow-xl flex gap-4 items-center group">
                            <div className="w-20 h-20 bg-white rounded-2xl p-2 shadow-sm overflow-hidden"><img src={p.img} className="w-full h-full object-contain group-hover:scale-110 transition-transform" /></div>
                            <div className="flex-1">
                              <p className="text-xs font-black text-primary-dark uppercase truncate w-32">{p.name}</p>
                              <p className="text-[10px] font-bold opacity-30 uppercase">{p.badge} • STOCK: {p.stock}</p>
                              <div className="flex gap-2 mt-4">
                                <button onClick={() => handleEditClick(p)} className="p-2 bg-black/5 hover:bg-black/10 rounded-lg transition-colors"><FiEdit3 size={14} /></button>
                                <button onClick={() => deleteProduct(p.id)} className="p-2 bg-red-50 hover:bg-red-100 text-red-400 rounded-lg transition-colors"><FiTrash2 size={14} /></button>
                              </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}

               {activeTab === "users" && (
                 <div className="space-y-8">
                    <h2 className="text-4xl font-black italic tracking-tighter" style={{ color: PRIMARY_DARK }}>MEMBERS <span className="text-primary-dark opacity-30">LIST</span></h2>
                    
                    {/* Admins Section */}
                    <div>
                      <h3 className="text-[10px] font-black italic tracking-[0.2em] uppercase opacity-40 mb-4 ml-4">Administrators</h3>
                      <div className="bg-white/40 backdrop-blur-xl rounded-[30px] border border-white p-6 shadow-xl space-y-4">
                        {users.filter(u => u.role === 'admin' || u.email === 'admin@ku.th').map(u => {
                          const isThisUserHeadAdmin = u.email === "admin@ku.th";
                          return (
                            <div key={u.id} className="bg-white/60 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border border-white/80 shadow-sm">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary bg-white">
                                  <img src={u.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.firstName}`} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                   <p className="text-sm font-black text-primary-dark">{u.firstName} {u.lastName}</p>
                                   <span className="text-[10px] font-bold opacity-40">{u.email}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                 <button onClick={() => setViewOrderHistoryFor(u)} className="px-4 py-2 bg-white text-primary-dark border border-black/10 rounded-full text-[10px] font-black hover:scale-105 transition-transform tracking-widest shadow-sm">ORDERS</button>
                                 <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isThisUserHeadAdmin ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-gold/20 text-gold-dark border border-gold/40'}`}>
                                   {isThisUserHeadAdmin ? "HEAD ADMIN" : "ADMIN"}
                                 </div>
                                 {!isThisUserHeadAdmin && isHeadAdmin && (
                                   <button onClick={() => handleDemote(u.id)} className="px-4 py-2 bg-red-50 text-red-500 rounded-full text-[10px] font-black hover:scale-105 transition-transform tracking-widest border border-red-200">DEMOTE</button>
                                 )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Regular Users Section */}
                    <div>
                      <h3 className="text-[10px] font-black italic tracking-[0.2em] uppercase opacity-40 mb-4 ml-4">Registered Users</h3>
                      <div className="bg-white/40 backdrop-blur-xl rounded-[30px] border border-white p-6 shadow-xl space-y-4">
                        {users.filter(u => u.role !== 'admin' && u.email !== 'admin@ku.th').map(u => (
                          <div key={u.id} className="bg-white/60 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border border-white/80 shadow-sm">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary bg-white">
                                <img src={u.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.firstName}`} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                 <p className="text-sm font-black text-primary-dark">{u.firstName} {u.lastName}</p>
                                 <span className="text-[10px] font-bold opacity-40">{u.email}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                               <button onClick={() => setViewOrderHistoryFor(u)} className="px-4 py-2 bg-white text-primary-dark border border-black/10 rounded-full text-[10px] font-black hover:scale-105 transition-transform tracking-widest shadow-sm">ORDERS</button>
                               <div className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                                 USER
                               </div>
                               {isHeadAdmin && (
                                 <button onClick={() => handlePromote(u.id)} className="px-4 py-2 bg-black text-white rounded-full text-[10px] font-black hover:scale-105 transition-transform tracking-widest">PROMOTE</button>
                               )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>
               )}

               {activeTab === "profile" && (
                 <div className="max-w-3xl space-y-8">
                    <h2 className="text-4xl font-black italic tracking-tighter mb-8" style={{ color: PRIMARY_DARK }}>ADMIN <span className="text-primary-dark opacity-30">SETTINGS</span></h2>
                    
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
                      
                      <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                        <div className={`relative w-28 h-28 flex-shrink-0 rounded-full border-4 border-white shadow-lg overflow-hidden ${isEditingProfile ? 'cursor-pointer group' : ''}`} onClick={handleImageClick}>
                          <img src={isEditingProfile ? editForm.avatarUrl : profileData.avatarUrl} alt="Avatar" className="w-full h-full object-cover bg-white" />
                          {isEditingProfile && <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"><FiCamera size={24} /></div>}
                          <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    </div>

                    <div className="bg-white/40 backdrop-blur-xl rounded-[40px] p-10 border border-white/60 shadow-xl">
                      <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xl font-black italic tracking-tight" style={{ color: PRIMARY_DARK }}>SECURITY</h3>
                        {!isEditingPassword ? (
                           <button onClick={() => { setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" }); setPasswordError(""); setIsEditingPassword(true); }} className="px-6 py-2.5 bg-white text-primary-dark border border-black/10 rounded-full font-black text-[10px] shadow-sm hover:scale-105 transition-all">CHANGE PASSWORD</button>
                        ) : (
                          <div className="flex gap-2">
                            <button onClick={() => { setIsEditingPassword(false); setPasswordError(""); }} className="px-4 py-2 text-[10px] font-black text-black/40 uppercase">Cancel</button>
                            <button onClick={handleSavePassword} className="px-6 py-2.5 bg-gold text-primary-dark rounded-full font-black text-[10px] shadow-lg shadow-gold/20">UPDATE PASSWORD</button>
                          </div>
                        )}
                      </div>
                      {isEditingPassword ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {passwordError && (
                            <div className="md:col-span-2 p-4 bg-red-100/90 border border-red-300 text-red-600 rounded-2xl text-xs font-black flex items-center gap-3">
                              <FiX size={16} />{passwordError}
                            </div>
                          )}
                          <div className="md:col-span-2"><label className="block text-[10px] font-black text-black/30 uppercase tracking-[0.2em] mb-3 ml-2">Current Password</label><input type="password" value={passwordForm.currentPassword} onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} className="w-full bg-white/60 border border-white rounded-2xl px-6 py-4 text-sm font-bold outline-none" /></div>
                          <div className="col-span-1"><label className="block text-[10px] font-black text-black/30 uppercase tracking-[0.2em] mb-3 ml-2">New Password</label><input type="password" value={passwordForm.newPassword} onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} className="w-full bg-white/60 border border-white rounded-2xl px-6 py-4 text-sm font-bold outline-none" /></div>
                          <div className="col-span-1"><label className="block text-[10px] font-black text-black/30 uppercase tracking-[0.2em] mb-3 ml-2">Confirm New Password</label><input type="password" value={passwordForm.confirmPassword} onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} className="w-full bg-white/60 border border-white rounded-2xl px-6 py-4 text-sm font-bold outline-none" /></div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center p-8 border-2 border-dashed border-black/10 rounded-3xl"><p className="text-xs font-bold opacity-30">Your admin account is secure.</p></div>
                      )}
                    </div>
                 </div>
               )}
            </div>
         </div>
      </div>

      <AnimatePresence>
        {showProductModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm">
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-xl bg-white rounded-[40px] shadow-2xl overflow-hidden p-10">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black italic">{editingProduct ? "EDIT PRODUCT" : "NEW PRODUCT"}</h3>
                  <button onClick={() => setShowProductModal(false)} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center"><FiX /></button>
                </div>
                <form onSubmit={handleSaveProduct} className="space-y-6">
                     <div className="flex flex-col items-center gap-4 mb-2">
                        <div onClick={() => productFileInputRef.current?.click()} className="w-32 h-32 rounded-3xl border-2 border-dashed border-black/20 bg-black/5 flex items-center justify-center cursor-pointer hover:bg-black/10 transition-colors overflow-hidden group relative shadow-inner">
                          {formData.img ? (
                            <>
                              <img src={formData.img} className="w-full h-full object-contain p-2" />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"><FiCamera size={24} /></div>
                            </>
                          ) : (
                            <div className="text-center opacity-40"><FiCamera size={32} className="mx-auto mb-2" /><p className="text-[10px] font-black uppercase tracking-widest">Upload Image</p></div>
                          )}
                          <input type="file" ref={productFileInputRef} onChange={handleProductImageUpload} accept="image/*" className="hidden" />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                       <div className="col-span-2"><label className="block text-[10px] font-black opacity-30 mb-2 uppercase tracking-widest">Product Name</label><input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black/5 rounded-2xl px-6 py-4 text-sm font-black" /></div>
                       <div className="col-span-1"><label className="block text-[10px] font-black opacity-30 mb-2 uppercase tracking-widest">Price (฿)</label><input required type="number" min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-black/5 rounded-2xl px-6 py-4 text-sm font-black" /></div>
                       <div className="col-span-1"><label className="block text-[10px] font-black opacity-30 mb-2 uppercase tracking-widest">Stock</label><input required type="number" min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full bg-black/5 rounded-2xl px-6 py-4 text-sm font-black" /></div>
                       <div className="col-span-2"><label className="block text-[10px] font-black opacity-30 mb-2 uppercase tracking-widest">Badge</label><select value={formData.badge} onChange={e => setFormData({...formData, badge: e.target.value})} className="w-full bg-black/5 rounded-2xl px-6 py-4 text-sm font-black outline-none"><option>MEN</option><option>WOMEN</option><option>FACULTY</option></select></div>
                     </div>
                   <button type="submit" className="w-full py-5 bg-primary text-white rounded-full font-black text-xs shadow-xl shadow-primary/20 tracking-widest uppercase">Save Product Data</button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* User Order History Modal */}
      <AnimatePresence>
        {viewOrderHistoryFor && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white rounded-[40px] w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl relative">
               <button onClick={() => setViewOrderHistoryFor(null)} className="absolute top-6 right-6 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors z-10"><FiX size={20} /></button>
               <div className="p-8 border-b border-black/5 bg-[#F8F9FA]">
                 <h2 className="text-3xl font-black italic tracking-tighter" style={{ color: PRIMARY_DARK }}>ORDER <span className="text-black/20">HISTORY</span></h2>
                 <p className="text-sm font-bold opacity-50 mt-1 uppercase tracking-widest">{viewOrderHistoryFor.firstName} {viewOrderHistoryFor.lastName} • {viewOrderHistoryFor.email}</p>
               </div>
               <div className="p-8 overflow-y-auto flex-1">
                 {orders.filter(o => o.userId === viewOrderHistoryFor.id).length > 0 ? (
                    <div className="space-y-4">
                      {orders.filter(o => o.userId === viewOrderHistoryFor.id).map(order => (
                         <div key={order.id} className="bg-white p-6 rounded-3xl border border-black/5 shadow-md hover:shadow-lg transition-shadow">
                           <div className="flex justify-between items-center mb-4 pb-4 border-b border-black/5">
                              <div>
                                <span className="px-3 py-1 bg-gold/20 text-gold-dark rounded-full text-[10px] font-black uppercase tracking-widest">{order.status}</span>
                                <span className="text-xs font-black text-black/40 ml-3">#{order.id}</span>
                              </div>
                              <span className="text-xs font-bold text-black/40">{order.date}</span>
                           </div>
                           <div className="space-y-3">
                             {order.items?.map((item, idx) => (
                               <div key={idx} className="flex gap-4 items-center bg-black/[0.02] p-3 rounded-2xl">
                                 <div className="w-12 h-12 bg-white rounded-xl p-2 shadow-sm border border-black/5"><img src={item.img} className="w-full h-full object-contain" /></div>
                                 <div className="flex-1">
                                   <p className="text-xs font-black text-primary-dark">{item.name}</p>
                                   <p className="text-[10px] font-bold opacity-40">SIZE: {item.size} • QTY: {item.qty}</p>
                                 </div>
                                 <p className="text-sm font-black text-primary">฿{(item.price * item.qty).toLocaleString()}</p>
                               </div>
                             ))}
                           </div>
                           <div className="mt-4 pt-4 border-t border-black/5 flex justify-between items-center">
                             <span className="text-xs font-bold text-black/40 uppercase tracking-widest">Total Amount</span>
                             <span className="text-lg font-black text-primary-dark">฿{order.total?.toLocaleString()}</span>
                           </div>
                         </div>
                      ))}
                    </div>
                 ) : (
                    <div className="h-40 flex flex-col items-center justify-center opacity-40">
                      <FiBox size={40} className="mb-4" />
                      <p className="font-black italic text-lg tracking-widest">NO ORDER HISTORY</p>
                    </div>
                 )}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Single Order Detail Modal */}
      <AnimatePresence>
        {viewSingleOrder && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl relative">
               <button onClick={() => setViewSingleOrder(null)} className="absolute top-6 right-6 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors z-10"><FiX size={20} /></button>
               <div className="p-8 border-b border-black/5 bg-[#F8F9FA]">
                 <h2 className="text-3xl font-black italic tracking-tighter" style={{ color: PRIMARY_DARK }}>ORDER <span className="text-black/20">DETAILS</span></h2>
                 <p className="text-sm font-bold opacity-50 mt-1 uppercase tracking-widest">#{viewSingleOrder.id} • {viewSingleOrder.date}</p>
                 {(() => {
                    const user = users.find(u => u.id === viewSingleOrder.userId);
                    const name = viewSingleOrder.customerName || (user ? `${user.firstName} ${user.lastName}` : (viewSingleOrder.userId === "guest" ? "Guest User" : "Deleted User"));
                    return <p className="text-[10px] font-black italic mt-2 text-primary-dark">PURCHASED BY: {name}</p>;
                 })()}
               </div>
               <div className="p-8 overflow-y-auto max-h-[60vh] bg-white">
                 <div className="flex justify-between items-center mb-6 pb-4 border-b border-black/5">
                    <span className="px-3 py-1 bg-gold/20 text-gold-dark rounded-full text-[10px] font-black uppercase tracking-widest">{viewSingleOrder.status}</span>
                    <span className="text-xs font-black text-black/40">{viewSingleOrder.items?.length || 0} ITEMS</span>
                 </div>
                 <div className="space-y-3">
                   {viewSingleOrder.items?.map((item, idx) => (
                     <div key={idx} className="flex gap-4 items-center bg-black/[0.02] p-3 rounded-2xl">
                       <div className="w-12 h-12 bg-white rounded-xl p-2 shadow-sm border border-black/5"><img src={item.img} className="w-full h-full object-contain" /></div>
                       <div className="flex-1">
                         <p className="text-xs font-black text-primary-dark">{item.name}</p>
                         <p className="text-[10px] font-bold opacity-40">SIZE: {item.size} • QTY: {item.qty}</p>
                       </div>
                       <p className="text-sm font-black text-primary">฿{(item.price * item.qty).toLocaleString()}</p>
                     </div>
                   ))}
                 </div>
                 <div className="mt-6 pt-6 border-t border-black/5 flex justify-between items-center">
                   <span className="text-sm font-black text-black/40 uppercase tracking-widest">Grand Total</span>
                   <span className="text-2xl font-black text-primary-dark">฿{viewSingleOrder.total?.toLocaleString()}</span>
                 </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}