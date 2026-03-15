import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "/img/KULOGOpng.png";

export default function Intro() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const steps = [1,2,3,4];
    const delays = [1000,500,500,1000];

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
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      {/* 🔆 STEP 1: โลโก้กระพริบ */}
      {step === 1 && <BlinkLogo />}
      {step === 2 && <NonBlinkLogo />}
      {step === 3 && <BlinkLogo />}

      {/* 🔥 STEP 2: ข้อความกระพริบ */}
      {step === 4 && <BlinkText />}
    </div>
  );
}

function BlinkLogo() {
  return (
    <motion.img
      src={logo}
      alt="logo"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0, 1] }}
      transition={{ duration: 0.3, repeat: Infinity }}
      className="w-32 h-32"
    />
  );
}
function NonBlinkLogo() {
  return (
    <motion.img
      src={logo}
      alt="logo"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, repeat: Infinity }}
      className="w-32 h-32"
    />
  );
}

function BlinkText() {
  return (
    <motion.h2
      layoutId="shopTitle"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0,1,0,1,0,1,0,1]}}
      transition={{ duration: 0.5 }}
      layout="position"
      className="text-5xl md:text-7xl font-bold text-stone-800 text-center font-['Bitcount_Prop_Double_Ink']"
    >
      Welcome to KU SHOP
    </motion.h2>
  );
}