import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
    const ticks = 40;
    const highlightSize = 30;
    const [activeIndex, setActiveIndex] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % ticks);
        }, 80);
        return () => clearInterval(interval);
    }, []);

    const getColor = (i) => {
        const distance = (i - activeIndex + ticks) % ticks;
        if (distance < 4) return "#facc15";
        if (distance < highlightSize * 0.3) return "#fde68a";
        if (distance < highlightSize * 0.6) return "#ffffff";
        if (distance < highlightSize) return "#b4b8bd";
        return "rgba(209,213,219,0.25)";
    };

    const handleLogin = async () => {
        setError("");

        // Validate
        if (!email || !password) {
            setError("กรุณากรอกอีเมลและรหัสผ่าน");
            return;
        }
        if (!email.includes("@")) {
            setError("รูปแบบอีเมลไม่ถูกต้อง");
            return;
        }

        setLoading(true);
        try {
            // TODO: เปลี่ยนเป็น API จริง
            // const res = await fetch("http://localhost:3000/api/auth/login", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ email, password }),
            // });
            // const data = await res.json();
            // if (!data.success) throw new Error(data.message);
            // localStorage.setItem("token", data.data.token);
            // localStorage.setItem("user", JSON.stringify(data.data.user));

            navigate("/intro");
        } catch (err) {
            setError(err.message || "เข้าสู่ระบบไม่สำเร็จ");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleLogin();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex items-center justify-center bg-[#1e2a3a]"
        >
            <div className="relative flex items-center justify-center">

                {/* วงแหวนโหลด */}
                <div className="absolute w-[520px] h-[520px]">
                    {Array.from({ length: ticks }).map((_, i) => (
                        <span
                            key={i}
                            className="absolute left-63 top-60 w-[10px] h-[40px] rounded-full transition-colors duration-200"
                            style={{
                                backgroundColor: getColor(i),
                                transform: `rotate(${(360 / ticks) * i}deg) translateY(-240px)`,
                            }}
                        />
                    ))}
                </div>

                {/* กล่อง Login */}
                <div className="relative z-10 w-[320px] text-center">
                    <h1 className="text-3xl font-bold text-yellow-400 mb-6">Login</h1>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full px-4 py-3 mb-4 rounded-full bg-[#243447] text-white outline-none focus:ring-2 focus:ring-yellow-400"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full px-4 py-3 mb-2 rounded-full bg-[#243447] text-white outline-none focus:ring-2 focus:ring-yellow-400"
                    />

                    {/* Error message */}
                    {error && (
                        <p className="text-red-400 text-xs mb-3 bg-red-400/10 border border-red-400/30 rounded-2xl px-3 py-2">
                            {error}
                        </p>
                    )}

                    <p className="text-sm text-gray-400 mb-4 cursor-pointer hover:text-yellow-400">
                        Forgot your password?
                    </p>

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="bg-yellow-400 px-6 py-3 rounded-full font-bold hover:scale-110 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "⏳ กำลังเข้าสู่ระบบ..." : "LOGIN"}
                    </button>

                    <p className="text-gray-400 mt-4 mb-2">log in with</p>
                    <div className="flex justify-center gap-3 mb-4">
                        <button className="bg-blue-600 w-9 h-9 rounded-full text-white font-bold">f</button>
                        <button className="bg-black w-9 h-9 rounded-full text-white font-bold">x</button>
                        <button className="bg-red-500 w-9 h-9 rounded-full text-white font-bold">G</button>
                    </div>

                    <Link to="/register" className="text-yellow-400 hover:underline">
                        Sign Up
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}