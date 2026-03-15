import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const ticks = 40;
    const highlightSize = 30;
    const [activeIndex, setActiveIndex] = useState(0);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
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

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegister = async () => {
        setError("");

        if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword) {
            setError("กรุณากรอกข้อมูลให้ครบทุกช่อง");
            return;
        }
        if (!form.email.includes("@")) {
            setError("รูปแบบอีเมลไม่ถูกต้อง");
            return;
        }
        if (form.password.length < 6) {
            setError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError("รหัสผ่านไม่ตรงกัน");
            return;
        }

        setLoading(true);
        try {
            // TODO: เปลี่ยนเป็น API จริง
            // const res = await fetch("http://localhost:3000/api/auth/register", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({
            //         firstName: form.firstName,
            //         lastName: form.lastName,
            //         email: form.email,
            //         password: form.password,
            //     }),
            // });
            // const data = await res.json();
            // if (!data.success) throw new Error(data.message);

            navigate("/");
        } catch (err) {
            setError(err.message || "สมัครสมาชิกไม่สำเร็จ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1e2a3a]">
            <div className="relative flex items-center justify-center">

                {/* วงแหวนโหลด */}
                <div className="absolute w-[700px] h-[700px]">
                    {Array.from({ length: ticks }).map((_, i) => (
                        <span
                            key={i}
                            className="absolute left-[50%] top-[47%] w-[10px] h-[40px] rounded-full transition-colors duration-200"
                            style={{
                                backgroundColor: getColor(i),
                                transform: `rotate(${(360 / ticks) * i}deg) translateY(-280px)`,
                            }}
                        />
                    ))}
                </div>

                {/* กล่อง Register */}
                <div className="relative z-10 w-[320px] text-center">
                    <h1 className="text-3xl font-bold text-yellow-400 mb-6">Register</h1>

                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="ชื่อ"
                            value={form.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-full bg-[#243447] text-white outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="นามสกุล"
                            value={form.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-full bg-[#243447] text-white outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 mb-4 rounded-full bg-[#243447] text-white outline-none focus:ring-2 focus:ring-yellow-400"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 mb-4 rounded-full bg-[#243447] text-white outline-none focus:ring-2 focus:ring-yellow-400"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 mb-3 rounded-full bg-[#243447] text-white outline-none focus:ring-2 focus:ring-yellow-400"
                    />

                    {/* Error message */}
                    {error && (
                        <p className="text-red-400 text-xs mb-3 bg-red-400/10 border border-red-400/30 rounded-2xl px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="block text-center w-full py-3 rounded-full bg-yellow-400 text-black font-bold shadow-lg shadow-yellow-400/40 hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "⏳ กำลังสมัคร..." : "Create Account"}
                    </button>
                    
                    
                    <Link to="/" className=" text-yellow-400 hover:underline text-sm">
                        มีบัญชีแล้ว? Login
                    </Link>
                </div>
            </div>
        </div>
    );
}