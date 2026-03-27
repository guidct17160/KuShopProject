import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingBag, FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import logo from "/img/KULOGOpng.png";
import { PRIMARY_DARK } from "../styles/tokens";

const NAV = ["HOME", "MEN", "WOMEN", "FACULTY"];

export default function Navbar({ onSearchSelect }) {
  const navigate = useNavigate();
  const { totalQty } = useCart();
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");

  const handleNav = (item) => {
    if (item === "HOME") {
      navigate("/home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    else navigate(`/category/${item.toLowerCase()}`);
  };

  const searchResults = searchQuery
    ? products.filter(p => p.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center transition-all duration-500">
       <div className="flex items-center gap-12">
         <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/home")}>
           <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-500">
             <img src={logo} alt="KU Logo" className="w-8" />
           </div>
           <div className="flex flex-col">
             <h1 className="text-xl font-black tracking-tighter" style={{ color: PRIMARY_DARK }}>KU SHOP</h1>
             <span className="text-[9px] font-bold tracking-[0.2em] opacity-40 uppercase">Academic Excellence</span>
           </div>
         </div>

         <div className="hidden lg:flex items-center gap-1">
           {NAV.map((item) => (
             <button 
               key={item} 
               onClick={() => handleNav(item)} 
               className="px-5 py-2 rounded-full text-[11px] font-black transition-all tracking-widest hover:bg-white/50 opacity-40 hover:opacity-100" 
               style={{ color: PRIMARY_DARK }}
             >
               {item}
             </button>
           ))}
         </div>
       </div>

       <div className="flex items-center gap-4">
         {/* Search Bar */}
         <div className="relative group hidden md:block">
           <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" size={16} color={PRIMARY_DARK} />
           <input 
             type="text" 
             value={searchQuery} 
             onChange={(e) => setSearchQuery(e.target.value)} 
             placeholder="ค้นหาสินค้า KU..." 
             className="bg-white/40 backdrop-blur-md border border-white/60 rounded-full py-2.5 pl-11 pr-5 text-xs w-48 focus:w-64 focus:bg-white transition-all outline-none font-bold placeholder:text-black/20" 
           />
           <AnimatePresence>
             {searchQuery && (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }} 
                 animate={{ opacity: 1, y: 0 }} 
                 exit={{ opacity: 0, y: 10 }} 
                 className="absolute top-14 right-0 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/5 p-4 max-h-96 overflow-y-auto z-50"
               >
                 {searchResults.length > 0 ? searchResults.map(p => (
                   <div 
                     key={p.id} 
                     onClick={() => { 
                       onSearchSelect?.(p); 
                       setSearchQuery(""); 
                       if (!onSearchSelect) navigate(`/category/${p.badge.toLowerCase()}`); 
                     }} 
                     className="flex items-center gap-4 p-2 hover:bg-black/5 rounded-xl cursor-pointer transition-colors group"
                   >
                     <div className="w-12 h-12 bg-gray-50 rounded-lg p-1 group-hover:scale-110 transition-transform">
                       <img src={p.img} alt={p.name} className="w-full h-full object-contain" />
                     </div>
                     <div className="flex-1">
                       <p className="text-xs font-black" style={{ color: PRIMARY_DARK }}>{p.name}</p>
                       <p className="text-[10px] font-bold opacity-40">฿{p.price.toLocaleString()}</p>
                     </div>
                   </div>
                 )) : <p className="text-center py-8 text-xs font-bold opacity-30">No products found</p>}
               </motion.div>
             )}
           </AnimatePresence>
         </div>
         
         <div className="flex items-center gap-2">
           <div 
             onClick={() => navigate("/cart")} 
             className="relative cursor-pointer p-2 hover:bg-white/80 rounded-full transition-all group"
           >
             <FiShoppingBag size={22} color={PRIMARY_DARK} />
             {totalQty > 0 && (
               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-white">
                 {totalQty}
               </span>
             )}
           </div>
           <div 
             onClick={() => navigate("/profile")} 
             className="cursor-pointer p-2 hover:bg-white/80 rounded-full transition-all"
           >
             <FiUser size={22} color={PRIMARY_DARK} />
           </div>
         </div>
       </div>
    </nav>
  );
}
