import managePolo from "/img/manageshirt.png"
import manageJacket from "/img/manageJacket.png"
import manageCap from "/img/capkums.png"
import engineerPolo from "/img/engineerPolo.png"
import engineerGreen from "/img/engineerGreen.png"
import engineerRed from "/img/engineerRed.png"
import sciencePolo from "/img/sciencePolo.png"
import scienceBlack from "/img/scienceBlack.png"
import scienceJacket from "/img/scienceJacket.png"
import econPolo from "/img/econPolo80.png"
import econSport from "/img/econSport.png"
import engineerCap from "/img/engineerCap.png"

export const facultyItems = [
    { id: "f1",  name: "KU Polo - Management Science",    price: 290, img: managePolo,    badge: "FACULTY", color: "#7c3aed", gradient: ["#7c3aed","#a78bfa"], sizes: ["S","M","L","XL","2XL"], subtitle: "คณะบริหารธุรกิจ", description: "เสื้อโปโลคณะบริหารธุรกิจ ผ้าคุณภาพดี ระบายอากาศได้ดี", tag: "🎓 Faculty" },
    { id: "f2",  name: "KU Jacket - Management Science",  price: 789, img: manageJacket,  badge: "FACULTY", color: "#7c3aed", gradient: ["#5b21b6","#7c3aed"], sizes: ["S","M","L","XL"],      subtitle: "คณะบริหารธุรกิจ", description: "แจ็คเก็ตคณะบริหารธุรกิจ ผ้าหนาอย่างดี", tag: "🔥 Popular" },
    { id: "f3",  name: "KU Cap - Management Science",     price: 199, img: manageCap,     badge: "FACULTY", color: "#7c3aed", gradient: ["#7c3aed","#c4b5fd"], sizes: ["Free Size"],           subtitle: "คณะบริหารธุรกิจ", description: "หมวกแก๊ปคณะบริหารธุรกิจ", tag: "🧢 Accessory" },
    { id: "f4",  name: "KU Official Polo (Yellow/Green)",  price: 299, img: engineerPolo,  badge: "FACULTY", color: "#b45309", gradient: ["#b45309","#f59e0b"], sizes: ["S","M","L","XL","2XL"], subtitle: "มหาวิทยาลัยเกษตรศาสตร์",        description: "เสื้อโปโล KU ลายทางการ สีเหลืองตัดเขียวสง่างาม", tag: "🌿 Official" },
    { id: "f5",  name: "KU Premium Jacket (Forest Green)", price: 799, img: engineerGreen, badge: "FACULTY", color: "#065f46", gradient: ["#065f46","#34d399"], sizes: ["S","M","L","XL"],      subtitle: "มหาวิทยาลัยเกษตรศาสตร์",        description: "แจ็คเก็ต KU สีเขียวฟอเรสต์ พรีเมียมสไตล์นิสิตเกษตร", tag: "🔥 Limited" },
    { id: "f6",  name: "KU Premium Jacket (Crimson Red)",   price: 799, img: engineerRed,   badge: "FACULTY", color: "#991b1b", gradient: ["#991b1b","#ef4444"], sizes: ["S","M","L","XL"],      subtitle: "มหาวิทยาลัยเกษตรศาสตร์",        description: "แจ็คเก็ต KU สีแดงคริมสัน โดดเด่นด้วยดีไซน์ทันสมัย", tag: "🔥 Limited" },
    { id: "f7",  name: "KU University Signature Cap",      price: 199, img: engineerCap,   badge: "FACULTY", color: "#b45309", gradient: ["#b45309","#fbbf24"], sizes: ["Free Size"],           subtitle: "มหาวิทยาลัยเกษตรศาสตร์",        description: "หมวกแก๊ป KU ลายปักประณีต สวมใส่ได้ทุกโอกาส", tag: "🧢 Accessory" },
    { id: "f8",  name: "KU Polo - Science",               price: 299, img: sciencePolo,   badge: "FACULTY",    color: "#0369a1", gradient: ["#0369a1","#38bdf8"], sizes: ["S","M","L","XL","2XL"], subtitle: "คณะวิทยาศาสตร์",            description: "เสื้อโปโลคณะวิทยาศาสตร์ สีฟ้าใสสดชื่น", tag: "🔬 Science" },
    { id: "f9",  name: "KU T-Shirt - Science (Black)",      price: 219, img: scienceBlack,  badge: "FACULTY",    color: "#1e293b", gradient: ["#1e293b","#475569"], sizes: ["S","M","L","XL","2XL"], subtitle: "คณะวิทยาศาสตร์",            description: "เสื้อยืดคณะวิทยาศาสตร์ สีดำเรียบหรู", tag: "⚫ Classic" },
    { id: "f10", name: "KU Jacket - Science",             price: 699, img: scienceJacket, badge: "FACULTY",    color: "#0369a1", gradient: ["#0c4a6e","#0369a1"], sizes: ["S","M","L","XL"],      subtitle: "คณะวิทยาศาสตร์",            description: "แจ็คเก็ตคณะวิทยาศาสตร์", tag: "🎓 Faculty" },
    { id: "f11", name: "KU Polo - Economics",             price: 299, img: econPolo,      badge: "FACULTY",  color: "#166534", gradient: ["#166534","#4ade80"], sizes: ["S","M","L","XL","2XL"], subtitle: "คณะเศรษฐศาสตร์",          description: "เสื้อโปโลคณะเศรษฐศาสตร์", tag: "📊 Econ" },
    { id: "f12", name: "KU Sport Shirt - Economics",      price: 400, img: econSport,     badge: "FACULTY",  color: "#166534", gradient: ["#14532d","#22c55e"], sizes: ["S","M","L","XL"],      subtitle: "คณะเศรษฐศาสตร์",          description: "เสื้อกีฬาคณะเศรษฐศาสตร์", tag: "🏃 Sport" },
];