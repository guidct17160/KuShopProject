import { motion } from "framer-motion";
import { FiInstagram, FiTwitter, FiFacebook, FiMail } from "react-icons/fi";
import logo from "/img/KULOGOpng.png";

const T1="#003D1F"; const T2="#006633"; const TM="rgba(0,61,31,0.45)";
const links={Shop:["Men","Women","Faculty","Other"],Support:["FAQ","Shipping","Returns","Size Guide"],About:["Our Story","Careers","Press","Contact"]};

export default function Footer() {
  return (
    <footer className="px-10 pt-12 pb-7 rounded-b-[28px]" style={{borderTop:"1px solid rgba(255,255,255,0.25)"}}>
      <div className="max-w-5xl mx-auto grid grid-cols-5 gap-8 pb-10" style={{borderBottom:"1px solid rgba(0,61,31,0.08)"}}>
        <motion.div initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}} className="col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="KU Logo" className="w-11 h-11 drop-shadow"/>
            <div>
              <p className="font-black text-lg tracking-tight" style={{color:T1,fontFamily:"'Montserrat',sans-serif"}}>KU SHOP</p>
              <p className="text-xs" style={{color:TM}}>Kasetsart University</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-xs" style={{color:TM}}>Kasetsart University Nisit apparel and official merchandise, designed for the most premium shopping experience.</p>
          <div className="flex gap-2.5 mt-5">
            {[FiInstagram,FiTwitter,FiFacebook,FiMail].map((Icon,i)=>(
              <motion.button key={i} whileHover={{scale:1.15,y:-2}} transition={{type:"spring",stiffness:400,damping:20}}
                className="w-9 h-9 rounded-full flex items-center justify-center transition"
                style={{background:"rgba(255,255,255,0.6)",border:"1.5px solid rgba(255,255,255,0.85)",color:TM}}>
                <Icon size={15}/>
              </motion.button>
            ))}
          </div>
        </motion.div>
        {Object.entries(links).map(([title,items],ci)=>(
          <motion.div key={title} initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:(ci+1)*0.07}}>
            <p className="text-[10px] font-extrabold tracking-widest uppercase mb-4" style={{color:TM}}>{title}</p>
            <ul className="space-y-2.5">
              {items.map(item=>(<li key={item}><a href="#" className="text-sm font-medium transition hover:opacity-60" style={{color:TM}}>{item}</a></li>))}
            </ul>
          </motion.div>
        ))}
      </div>
      <div className="max-w-5xl mx-auto flex justify-between items-center pt-5 text-xs" style={{color:TM}}>
        <p>© {new Date().getFullYear()} KU Shop. All rights reserved.</p>
        <div className="flex gap-5">
          {["Privacy Policy","Terms","Cookies"].map(t=>(<a key={t} href="#" className="hover:opacity-60 transition">{t}</a>))}
        </div>
      </div>
    </footer>
  );
}