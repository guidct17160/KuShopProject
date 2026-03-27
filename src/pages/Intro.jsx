import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BG_HOME, PRIMARY_DARK, GOLD, GOLD_DARK } from "../styles/tokens";
import logo from "/img/KULOGOpng.png";
import Orb from "../components/Orb";

export default function Intro() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const steps = [1, 2, 3, 4];
    const delays = [700, 500, 400, 900];
    let i = 0;
    const run = () => {
      if (i < steps.length) {
        setStep(steps[i]);
        setTimeout(run, delays[i]);
        i++;
      } else {
        navigate("/home", { state: { text: "Welcome to KU SHOP" } });
      }
    };
    run();
  }, [navigate]);

  return (
    <div className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center p-8" style={{ background: BG_HOME }}>
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <Orb style={{ width: 580, height: 580, top: "-120px", right: "-100px", background: "radial-gradient(circle,rgba(0,120,60,0.55) 0%,rgba(0,100,50,0.25) 50%,transparent 75%)" }} anim={{ x: [0, 20, 0], y: [0, -16, 0] }} />
        <Orb style={{ width: 420, height: 420, bottom: "-10%", left: "-10%", background: "radial-gradient(circle,rgba(245,197,24,0.55) 0%,rgba(230,176,0,0.25) 50%,transparent 75%)" }} anim={{ x: [0, -12, 0], y: [0, 14, 0] }} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {step === 1 && <BlinkLogo />}
        {step === 2 && <SolidLogo />}
        {step === 3 && <BlinkLogo />}
        {step === 4 && <FlyText />}
      </div>
    </div>
  );
}

function BlinkLogo() {
  return <motion.img src={logo} alt="KU logo" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: [0, 1, 0, 1], scale: 1 }} transition={{ duration: 0.35, repeat: Infinity }} className="w-32 h-32 drop-shadow-2xl" />;
}

function SolidLogo() {
  return <motion.img src={logo} alt="KU logo" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="w-32 h-32 drop-shadow-2xl" />;
}

function FlyText() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <motion.img src={logo} alt="KU logo" initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 0.7, scale: 0.6, y: -20 }} transition={{ duration: 0.4 }} className="w-32 h-32 drop-shadow-2xl" />
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl font-black italic tracking-tighter" style={{ color: PRIMARY_DARK, textShadow: "0 0 40px rgba(0,0,0,0.1)" }}>WELCOME TO KU SHOP</motion.h2>
    </div>
  );
}