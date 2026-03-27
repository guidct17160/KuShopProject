import { motion } from "framer-motion";
const T1="#003D1F"; const GOLD="#F5C518";

export default function CartToast({ show }) {
  return (
    <motion.div initial={{y:80,opacity:0,scale:0.9}} animate={{y:show?0:80,opacity:show?1:0,scale:show?1:0.9}} transition={{type:"spring",stiffness:400,damping:28}}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] px-7 py-3.5 rounded-full font-black text-sm flex items-center gap-2.5 pointer-events-none"
      style={{background:"rgba(255,255,255,0.5)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",border:"1.5px solid rgba(255,255,255,0.8)",boxShadow:"0 8px 32px rgba(0,80,40,0.18),inset 0 1px 0 rgba(255,255,255,0.9)",color:T1}}>
      🛒 <span>เพิ่มสินค้าในตะกร้าแล้ว!</span>
    </motion.div>
  );
}