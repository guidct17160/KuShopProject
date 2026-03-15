import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { motion } from 'framer-motion';
export default function Navbar() {
    return (


        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}


        >
            <div className="bg-stone-700 text-white text-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">

                    {/* Social */}
                    <div className="flex gap-4">
                        <FaInstagram className="cursor-pointer hover:text-yellow-400" />
                        <FaFacebookF className='cursor-pointer hover:text-yellow-400' />
                        <FaTiktok className='cursor-pointer hover:text-yellow-400' />
                    </div>

                    {/* Promo */}
                    <div className="text-yellow-100 flex gap-6 text-xs tracking-wide">
                        <span>🌍 FREE SHIPPING </span>
                        <span>↩️ 15-DAY RETURNS</span>
                        
                    </div>

                    {/* Language */}
                    <div>TH</div>
                </div>

            </div>

        </motion.div>


    );
}