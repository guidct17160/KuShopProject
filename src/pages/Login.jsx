import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Orb from "../components/Orb";
import {
  PRIMARY_DARK, PRIMARY, GOLD, GOLD_DARK, inputStyle, BG_HOME
} from "../styles/tokens";
import logo from "/img/KULOGOpng.png";

/* ── tiny inline SVG icons ──────────────────────────────── */
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="4" width="20" height="16" rx="3"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="11" width="18" height="11" rx="3"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>
    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>
    <path d="m2 2 20 20"/>
  </svg>
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setError("");
    if (!email || !password) { setError("กรุณากรอกอีเมลและรหัสผ่าน"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    if (login(email, password)) navigate("/intro");
    else setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง (ลอง admin@ku.th / password)");
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  /* ── shared input wrapper style ────────────────────────── */
  const fieldWrap = (isFocused) => ({
    ...inputStyle(isFocused),
    display: "flex",
    alignItems: "center",
    gap: 12,
    borderRadius: 18,
    padding: "14px 20px",
    transition: "all .25s ease",
  });

  return (
    <div className="fixed inset-0 overflow-hidden flex items-center justify-center" style={{ background: BG_HOME }}>
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <Orb style={{ width: 580, height: 580, top: "-120px", right: "-100px", background: "radial-gradient(circle,rgba(0,120,60,0.55) 0%,rgba(0,100,50,0.25) 50%,transparent 75%)" }} anim={{ x: [0, 20, 0], y: [0, -16, 0] }} />
        <Orb style={{ width: 420, height: 420, bottom: "-5%", left: "-5%", background: "radial-gradient(circle,rgba(245,197,24,0.55) 0%,rgba(230,176,0,0.25) 50%,transparent 75%)" }} anim={{ x: [0, -12, 0], y: [0, 14, 0] }} />
        <Orb style={{ width: 300, height: 300, top: "50%", left: "60%", background: "radial-gradient(circle,rgba(0,102,51,0.3) 0%,transparent 70%)" }} anim={{ x: [0, -18, 0], y: [0, 10, 0] }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .6, ease: [.22, 1, .36, 1] }}
        className="relative z-10 w-full max-w-[460px] mx-4"
      >
        {/* ── decorative shimmer line ─────────────────────── */}
        <div className="absolute -top-[1px] left-[10%] right-[10%] h-[2px] rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, ${PRIMARY}, ${GOLD}, transparent)` }} />

        <div
          className="rounded-[36px] overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(50px)",
            WebkitBackdropFilter: "blur(50px)",
            border: "1.5px solid rgba(255,255,255,0.55)",
            boxShadow: "0 32px 80px rgba(0,80,40,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          <div className="px-10 pt-10 pb-10 md:px-12 md:pt-12 md:pb-12">
            {/* ── Logo + Brand ────────────────────────────── */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <motion.img
                src={logo}
                alt="KU Logo"
                className="w-14 h-14 drop-shadow-lg"
                initial={{ rotate: -8 }}
                animate={{ rotate: 0 }}
                transition={{ duration: .5 }}
              />
              <div className="text-left font-black tracking-tighter" style={{ color: PRIMARY_DARK }}>
                <p className="text-2xl leading-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>KU SHOP</p>
                <p className="text-[10px] uppercase tracking-[0.15em]" style={{ color: PRIMARY, opacity: .55 }}>Nisit Official Store</p>
              </div>
            </div>

            {/* ── Title ───────────────────────────────────── */}
            <h1
              className="text-center text-[2.2rem] font-black italic tracking-tight mb-2"
              style={{ color: PRIMARY_DARK, fontFamily: "'Montserrat', sans-serif" }}
            >
              WELCOME BACK
            </h1>
            <p className="text-center text-xs font-semibold tracking-[0.18em] uppercase mb-10" style={{ color: PRIMARY_DARK, opacity: .3 }}>
              Sign in to your Nisit account
            </p>

            {/* ── Fields ──────────────────────────────────── */}
            <div className="space-y-5 mb-8 text-left">
              {/* Email */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase ml-2 mb-2 tracking-widest" style={{ color: PRIMARY_DARK, opacity: .35 }}>Email Address</label>
                <div style={fieldWrap(focused === "email")}>
                  <span style={{ color: focused === "email" ? PRIMARY : PRIMARY_DARK, opacity: focused === "email" ? 1 : .35, transition: "all .25s" }}><MailIcon /></span>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    onKeyDown={handleKeyDown}
                    placeholder="nisit@ku.th"
                    className="flex-1 bg-transparent outline-none text-sm font-bold placeholder:font-medium"
                    style={{ color: PRIMARY_DARK, fontFamily: "'Nunito', sans-serif" }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase ml-2 mb-2 tracking-widest" style={{ color: PRIMARY_DARK, opacity: .35 }}>Password</label>
                <div style={fieldWrap(focused === "pass")}>
                  <span style={{ color: focused === "pass" ? PRIMARY : PRIMARY_DARK, opacity: focused === "pass" ? 1 : .35, transition: "all .25s" }}><LockIcon /></span>
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setFocused("pass")}
                    onBlur={() => setFocused(null)}
                    onKeyDown={handleKeyDown}
                    placeholder="••••••••"
                    className="flex-1 bg-transparent outline-none text-sm font-bold placeholder:font-medium"
                    style={{ color: PRIMARY_DARK, fontFamily: "'Nunito', sans-serif" }}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="cursor-pointer" style={{ color: PRIMARY_DARK, opacity: .35, transition: "opacity .2s" }} onMouseEnter={e => e.currentTarget.style.opacity = .7} onMouseLeave={e => e.currentTarget.style.opacity = .35}>
                    {showPw ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>
            </div>

            {/* ── Error ───────────────────────────────────── */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: .96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: .96 }}
                  className="mb-6 rounded-2xl px-4 py-3 flex items-center gap-2"
                  style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.15)" }}
                >
                  <svg className="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
                  <p className="text-xs font-bold text-red-600">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Button ──────────────────────────────────── */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: `0 12px 40px rgba(245,197,24,0.45)` }}
              whileTap={{ scale: .97 }}
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-4 font-black rounded-2xl tracking-[0.2em] text-xs cursor-pointer transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DARK} 100%)`,
                color: PRIMARY_DARK,
                boxShadow: `0 8px 32px rgba(245,197,24,0.35)`,
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" /></svg>
                  SIGNING IN...
                </span>
              ) : "SIGN IN NOW"}
            </motion.button>

            {/* ── Divider ─────────────────────────────────── */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,61,31,0.12), transparent)" }} />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: PRIMARY_DARK, opacity: .2 }}>or</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,61,31,0.12), transparent)" }} />
            </div>

            {/* ── Footer link ─────────────────────────────── */}
            <p className="text-center text-xs font-semibold" style={{ color: PRIMARY_DARK, opacity: .4 }}>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-black ml-1 transition-all duration-200"
                style={{ color: PRIMARY }}
                onMouseEnter={e => { e.currentTarget.style.color = GOLD_DARK; e.currentTarget.style.textDecoration = "underline"; }}
                onMouseLeave={e => { e.currentTarget.style.color = PRIMARY; e.currentTarget.style.textDecoration = "none"; }}
              >
                SIGN UP
              </Link>
            </p>
          </div>
        </div>

        {/* ── bottom shimmer line ─────────────────────────── */}
        <div className="absolute -bottom-[1px] left-[15%] right-[15%] h-[1px] rounded-full" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)" }} />
      </motion.div>
    </div>
  );
}