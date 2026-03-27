import { motion } from "framer-motion";

const PRIMARY = "#006633";
const PRIMARY_DARK = "#003D1F";
const GOLD = "#F5C518";

/* ── Subtle background colors per badge ─────────────────── */
const BADGE_BG = {
  MEN: "linear-gradient(160deg, #f0f7f3 0%, #e2f0e8 50%, #d4e8db 100%)",
  WOMEN: "linear-gradient(160deg, #f7f0f3 0%, #f0e2ea 50%, #e8d4de 100%)",
  FACULTY: "linear-gradient(160deg, #f7f5f0 0%, #f0ece2 50%, #e8e2d4 100%)",
};

const BADGE_COLOR = {
  MEN: { bg: PRIMARY_DARK, text: "#fff" },
  WOMEN: { bg: "#8B2252", text: "#fff" },
  FACULTY: { bg: GOLD, text: PRIMARY_DARK },
};

export default function ProductCard({ img, name, price, stock, badge, variant = "default", onClick, delay = 0 }) {
  const isSoldOut = stock <= 0;
  const isTall = variant === "tall";
  const isStackedTop = variant === "stacked-top";
  const isStackedBottom = variant === "stacked-bottom";
  const isStacked = isStackedTop || isStackedBottom;

  const badgeStyle = BADGE_COLOR[badge] || BADGE_COLOR.MEN;
  const cardBg = BADGE_BG[badge] || BADGE_BG.MEN;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      whileHover={isSoldOut ? {} : { scale: 1.02, y: -4 }}
      whileTap={isSoldOut ? {} : { scale: 0.98 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-[32px] overflow-hidden cursor-pointer group h-full flex flex-col"
      style={{
        background: cardBg,
        border: "1px solid rgba(255,255,255,0.7)",
        boxShadow: "0 4px 24px rgba(0,80,40,0.06), 0 1px 0 rgba(255,255,255,0.8) inset",
        opacity: isSoldOut ? 0.6 : 1,
        filter: isSoldOut ? "grayscale(0.5)" : "none"
      }}
      onClick={isSoldOut ? null : onClick}
    >
      {/* ── Badge ─────────────────────────────────────────── */}
      <div className="absolute top-4 left-4 z-20">
        <div
          className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md"
          style={{ background: badgeStyle.bg, color: badgeStyle.text }}
        >
          {badge === "MEN" ? "MEN" : badge === "WOMEN" ? "WOMEN" : badge}
        </div>
      </div>

      {/* ── Sold Out Overlay ──────────────────────────────── */}
      {isSoldOut && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
          <span className="bg-red-500 text-white font-black text-[10px] px-4 py-2 rounded-full shadow-lg border border-white/20 uppercase tracking-widest">
            Sold Out
          </span>
        </div>
      )}

      {/* ── Product Image ─────────────────────────────────── */}
      <div className={`relative flex-1 flex items-center justify-center z-10 min-h-0 ${isStacked ? "p-4" : "p-6 pt-10"}`}>
        <img
          src={img}
          alt={name}
          className="max-w-full max-h-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
          style={{
            maxHeight: isStacked ? "100%" : "85%",
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))",
          }}
        />
      </div>

      {/* ── Product Info (always visible) ─────────────────── */}
      <div className={`relative z-20 ${isStacked ? "px-4 pb-3" : "px-6 pb-5"}`}>
        <div
          className="rounded-2xl px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.8)",
          }}
        >
          <p className={`font-black leading-tight tracking-tight line-clamp-1 ${isStacked ? "text-xs" : "text-sm"}`} style={{ color: PRIMARY_DARK }}>
            {name}
          </p>
          <div className="flex items-center justify-between mt-1">
            <span className={`font-black ${isStacked ? "text-sm" : "text-lg"}`} style={{ color: PRIMARY }}>
              ฿{price?.toLocaleString()}
            </span>
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[9px] font-bold uppercase tracking-widest"
              style={{ color: PRIMARY, opacity: 0.5 }}
            >
              Explore →
            </motion.span>
          </div>
        </div>
      </div>

      {/* ── Decorative corner accent ──────────────────────── */}
      <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at top right, rgba(0,102,51,0.06) 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}
