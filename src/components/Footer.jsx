import { motion } from "framer-motion";
import { FiInstagram, FiTwitter, FiFacebook, FiMail } from "react-icons/fi";
import logo from "/img/KULOGOpng.png";

const links = {
    Shop: ["Men", "Women", "Faculty", "Other"],
    Support: ["FAQ", "Shipping", "Returns", "Size Guide"],
    About: ["Our Story", "Careers", "Press", "Contact"],
};

const socials = [
    { icon: <FiInstagram size={18} />, label: "Instagram" },
    { icon: <FiTwitter size={18} />, label: "Twitter" },
    { icon: <FiFacebook size={18} />, label: "Facebook" },
    { icon: <FiMail size={18} />, label: "Email" },
];

export default function Footer() {
    return (
        <footer style={{ background: "#f5f5e8" }} className="px-12 pt-14 pb-8">

            {/* ── Top row ── */}
            <div className="max-w-6xl mx-auto grid grid-cols-5 gap-10 pb-12 border-b border-gray-300/50">

                {/* Logo + tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="col-span-2"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <img src={logo} alt="KU Logo" className="w-12 h-12" />
                        <div>
                            <p className="font-black text-lg text-[#3b2f36] tracking-tight leading-none">KU SHOP</p>
                            <p className="text-xs text-gray-400 mt-0.5">Kasetsart University</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                        Kasetsart University gear, apparel, and books,
                        designed for the most convenient shopping experience.
                    </p>

                    {/* Social icons */}
                    <div className="flex gap-3 mt-6">
                        {socials.map((s, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.15, y: -2 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-pink-500 hover:border-pink-300 transition-colors duration-200 shadow-sm"
                                aria-label={s.label}
                            >
                                {s.icon}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Link columns */}
                {Object.entries(links).map(([title, items], ci) => (
                    <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (ci + 1) * 0.1 }}
                    >
                        <p className="text-xs font-extrabold text-gray-900 tracking-widest uppercase mb-4">{title}</p>
                        <ul className="space-y-2.5">
                            {items.map(item => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            {/* ── Bottom row ── */}
            <div className="max-w-6xl mx-auto flex justify-between items-center pt-6 text-xs text-gray-400">
                <p>© Copyright {new Date().getFullYear()} KU Shop. All rights reserved.</p>
                <div className="flex gap-5">
                    <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-gray-700 transition-colors">Cookies</a>
                </div>
            </div>

        </footer>
    );
}