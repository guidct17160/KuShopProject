import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ShoppingSection() {
    const sectionRef = useRef(null);
    const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });




    const handleMouseMove = (e) => {
        const r = sectionRef.current?.getBoundingClientRect();
        if (!r) return;
        setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };

    // มือ + phone เลื่อนขึ้นลง loop ตลอดเวลา
    const swipeLoop = {
        y: [0, -20, 0, -20, 0],
        transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
    };

    // content ในจอเลื่อนสวนทาง (เร็วกว่า = ดูเหมือน scroll จริง)
    const screenLoop = {
        y: [0, -60, 0, -60, 0],
        transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
    };

    return (
        <div
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative flex items-stretch overflow-hidden"
            style={{ height: 420 }}
        >
            {/* ══ LEFT yellow panel ══ */}
            <motion.div
                className="w-[18%] relative overflow-hidden flex-shrink-0"
                style={{ background: "#F5C518" }}
                animate={{ x: (mouse.x - 0.5) * -28, y: (mouse.y - 0.5) * -18 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <motion.div
                    className="absolute w-52 h-52 rounded-full pointer-events-none"
                    style={{
                        background: "rgba(255,230,60,0.6)", filter: "blur(55px)",
                        top: `${mouse.y * 80}%`, left: `${mouse.x * 60}%`,
                        transform: "translate(-50%,-50%)",
                    }}
                />
                <div className="absolute inset-4 border-2 border-white/30 rounded-2xl pointer-events-none" />
            </motion.div>

            {/* ══ CENTER SVG stage ══ */}
            <div className="flex-1 bg-white flex items-end justify-center relative z-10 overflow-hidden">
                <svg width="480" height="400" viewBox="0 0 480 400" className="overflow-visible">

                    {/* ── PLANT ── */}
                    <motion.g
                        animate={{ rotate: [0, 2, -1.5, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        style={{ originX: "52px", originY: "378px" }}
                    >
                        <ellipse cx="52" cy="378" rx="26" ry="8" fill="#c2824a" />
                        <path d="M26 340 Q24 378 52 378 Q80 378 78 340Z" fill="#d4945a" />
                        <ellipse cx="52" cy="340" rx="26" ry="7" fill="#7a4f2d" />
                        <path d="M52 336 Q50 310 52 272" stroke="#5a9e3a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                        <path d="M52 310 Q28 298 30 272 Q48 282 52 310Z" fill="#5cbf3a" />
                        <path d="M52 295 Q76 283 74 257 Q56 267 52 295Z" fill="#4aaa28" />
                        <path d="M52 325 Q26 318 28 300 Q46 306 52 325Z" fill="#6dd44a" />
                    </motion.g>

                    {/* ── PHONE — loop ขึ้นลงตลอดเวลา ── */}
                    <motion.g >
                        <ellipse cx="200" cy="396" rx="60" ry="7" fill="#00000015" />
                        <rect x="130" y="60" width="140" height="320" rx="22" fill="white" stroke="#1a1a2e" strokeWidth="7" />
                        <rect x="140" y="76" width="120" height="292" rx="12" fill="#f0f4ff" />
                        <rect x="177" y="66" width="46" height="5" rx="3" fill="#1a1a2e" />
                        <rect x="183" y="363" width="34" height="4" rx="2" fill="#1a1a2e" opacity="0.4" />

                        {/* clip content ในจอ */}
                        <clipPath id="screenClip">
                            <rect x="140" y="70" width="120" height="290" rx="10" />
                        </clipPath>
                        <g clipPath="url(#screenClip)">
                            {/* content เลื่อนสวนทาง loop ตลอดเวลา */}
                            <motion.g animate={screenLoop}>
                                {/* search bar */}
                                <rect x="146" y="84" width="108" height="22" rx="11" fill="#f97316" />
                                <circle cx="158" cy="95" r="5" fill="none" stroke="white" strokeWidth="1.5" />
                                <line x1="162" y1="99" x2="165" y2="102" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                <rect x="168" y="92" width="50" height="6" rx="3" fill="white" opacity="0.55" />

                                {/* row 1 — shirt */}
                                <rect x="144" y="114" width="112" height="42" rx="8" fill="white" />
                                <rect x="150" y="120" width="34" height="30" rx="6" fill="#dbeafe" />
                                <path d="M157 127 L160 124 L167 127 L167 144 L157 144Z" fill="#3b82f6" />
                                <path d="M167 127 L174 124 L177 127 L177 144 L167 144Z" fill="#2563eb" />
                                <rect x="190" y="124" width="58" height="7" rx="3" fill="#e5e7eb" />
                                <rect x="190" y="136" width="38" height="6" rx="3" fill="#f97316" />

                                {/* row 2 — shoes */}
                                <rect x="144" y="162" width="112" height="42" rx="8" fill="white" />
                                <rect x="150" y="168" width="34" height="30" rx="6" fill="#fef3c7" />
                                <path d="M153 192 Q158 182 168 184 Q176 185 180 188 L179 192Z" fill="#f97316" />
                                <rect x="153" y="190" width="26" height="4" rx="2" fill="#1a1a2e" />
                                <rect x="190" y="172" width="52" height="7" rx="3" fill="#e5e7eb" />
                                <rect x="190" y="184" width="34" height="6" rx="3" fill="#3b82f6" />

                                {/* row 3 — bag */}
                                <rect x="144" y="210" width="112" height="42" rx="8" fill="white" />
                                <rect x="150" y="216" width="34" height="30" rx="6" fill="#ede9fe" />
                                <path d="M157 232 Q157 220 167 220 Q177 220 177 232 L179 244 L155 244Z" fill="#8b5cf6" />
                                <rect x="190" y="220" width="55" height="7" rx="3" fill="#e5e7eb" />
                                <rect x="190" y="232" width="40" height="6" rx="3" fill="#8b5cf6" />

                                {/* size buttons */}
                                <rect x="148" y="261" width="24" height="24" rx="5" fill="#f97316" />
                                <text x="160" y="277" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">S</text>
                                <rect x="176" y="261" width="24" height="24" rx="5" fill="#3b82f6" />
                                <text x="188" y="277" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">M</text>
                                <rect x="204" y="261" width="24" height="24" rx="5" fill="#f97316" />
                                <text x="216" y="277" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">L</text>

                                {/* add to cart */}
                                <rect x="146" y="294" width="108" height="22" rx="11" fill="#f97316" />
                                <text x="200" y="309" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">ADD TO CART</text>
                            </motion.g>
                        </g>
                    </motion.g>

                    {/* ── WOMAN body (เด้งเบาๆ) ── */}
                    <motion.g
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {/* shoes */}
                        <ellipse cx="310" cy="390" rx="20" ry="6" fill="#2d5fff" />
                        <ellipse cx="352" cy="390" rx="18" ry="6" fill="#2d5fff" />
                        <rect x="300" y="374" width="32" height="16" rx="9" fill="#2d5fff" />
                        <rect x="333" y="376" width="30" height="14" rx="8" fill="#2d5fff" />
                        {/* legs */}
                        <rect x="303" y="292" width="24" height="90" rx="11" fill="#f5c518" />
                        <rect x="335" y="292" width="24" height="90" rx="11" fill="#f5c518" />
                        {/* skirt */}
                        <path d="M300 200 Q288 300 306 300 L356 300 Q372 300 365 200Z" fill="#f5c518" />
                        {/* body */}
                        <rect x="290" y="125" width="82" height="88" rx="16" fill="#7bafd4" />
                        {[302, 318, 334, 350].flatMap(x => [138, 153, 168].map(y => (
                            <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill="#5090b8" opacity="0.65" />
                        )))}
                        {/* neck */}
                        <rect x="322" y="108" width="18" height="22" rx="9" fill="#f2c4a0" />
                        {/* head */}
                        <ellipse cx="331" cy="92" rx="26" ry="28" fill="#f2c4a0" />
                        {/* hair */}
                        <path d="M305 85 Q305 55 331 52 Q357 55 357 85 Q357 66 331 63 Q305 66 305 85Z" fill="#1a1a2e" />
                        <path d="M357 82 Q363 100 358 110 Q353 97 357 82Z" fill="#1a1a2e" />
                        {/* eyes */}
                        <ellipse cx="322" cy="90" rx="3" ry="3.5" fill="#1a1a2e" />
                        <ellipse cx="340" cy="90" rx="3" ry="3.5" fill="#1a1a2e" />
                        <circle cx="323" cy="89" r="1" fill="white" />
                        <circle cx="341" cy="89" r="1" fill="white" />
                        {/* eyebrows */}
                        <path d="M318 82 Q322 79 326 82" fill="none" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M336 82 Q340 79 344 82" fill="none" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" />
                        {/* smile */}
                        <path d="M322 100 Q331 107 340 100" fill="none" stroke="#c0876a" strokeWidth="1.8" strokeLinecap="round" />
                        {/* right arm + basket hand */}
                        <path d="M370 140 Q390 140 400 180" stroke="#7bafd4" strokeWidth="16" fill="none" strokeLinecap="round" />
                        <ellipse cx="400" cy="190" rx="10" ry="9" fill="#f2c4a0" transform="rotate(-15 402 165)" />
                    </motion.g>

                    {/* ── LEFT ARM — loop ขึ้นลงพร้อม phone ── */}
                    <motion.g animate={swipeLoop}>
                        <path d="M290 150 Q260 155 240 120" stroke="#7bafd4" strokeWidth="16" fill="none" strokeLinecap="round" />
                        <ellipse cx="220" cy="120" rx="10" ry="9" fill="#f2c4a0" transform="rotate(15 238 170)" />

                    </motion.g>

                    {/* ── BASKET — แกว่งตาม scroll ── */}
                    <motion.g
                        animate={{ rotate: [0, 0, -1, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        style={{ originX: "1500px", originY: "-550px" }}
                        >
                        <path d="M384 175 Q400 155 416 175" fill="none" stroke="#1a1a2e" strokeWidth="3.5" strokeLinecap="round" />
                        <path d="M378 178 L381 210 L419 210 L422 178Z" fill="#3b82f6" />
                        <line x1="390" y1="178" x2="388" y2="210" stroke="#2563eb" strokeWidth="2" />
                        <line x1="400" y1="178" x2="400" y2="210" stroke="#2563eb" strokeWidth="2" />
                        <line x1="410" y1="178" x2="412" y2="210" stroke="#2563eb" strokeWidth="2" />
                        <rect x="376" y="174" width="48" height="8" rx="4" fill="#1a1a2e" />
                        <circle cx="390" cy="175" r="5" fill="#f97316" opacity="0.9" />
                        <circle cx="402" cy="173" r="4" fill="#22c55e" opacity="0.9" />
                    </motion.g>
                    

                </svg>
            </div>

            {/* ══ RIGHT blue panel ══ */}
            <motion.div
                className="w-[18%] relative overflow-hidden flex-shrink-0"
                style={{ background: "#2323E8" }}
                animate={{ x: (mouse.x - 0.5) * 28, y: (mouse.y - 0.5) * 18 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <motion.div
                    className="absolute w-52 h-52 rounded-full pointer-events-none"
                    style={{
                        background: "rgba(120,140,255,0.55)", filter: "blur(55px)",
                        top: `${mouse.y * 80}%`, left: `${(1 - mouse.x) * 60}%`,
                        transform: "translate(-50%,-50%)",
                    }}
                />
                <div className="absolute inset-4 border-2 border-white/20 rounded-2xl pointer-events-none" />
            </motion.div>
        </div>
    );
}