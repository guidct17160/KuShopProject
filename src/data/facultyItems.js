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
    { id: "f1",  name: "Faculty of Management Science Polo",    price: 290, img: managePolo,    badge: "Management", color: "#7c3aed", gradient: ["#7c3aed","#a78bfa"], sizes: ["S","M","L","XL","2XL"], subtitle: "Faculty of Management Science", description: "เสื้อโปโลคณะบริหารธุรกิจ ผ้าคุณภาพดี ระบายอากาศได้ดี", tag: "🎓 Faculty" },
    { id: "f2",  name: "Faculty of Management Science Jacket",  price: 789, img: manageJacket,  badge: "Management", color: "#7c3aed", gradient: ["#5b21b6","#7c3aed"], sizes: ["S","M","L","XL"],      subtitle: "Faculty of Management Science", description: "แจ็คเก็ตคณะบริหารธุรกิจ ผ้าหนาอย่างดี", tag: "🔥 Popular" },
    { id: "f3",  name: "Faculty of Management Science Cap",     price: 199, img: manageCap,     badge: "Management", color: "#7c3aed", gradient: ["#7c3aed","#c4b5fd"], sizes: ["Free Size"],           subtitle: "Faculty of Management Science", description: "หมวกแก๊ปคณะบริหารธุรกิจ", tag: "🧢 Accessory" },
    { id: "f4",  name: "Faculty of Engineering Polo",           price: 299, img: engineerPolo,  badge: "Engineering",color: "#b45309", gradient: ["#b45309","#f59e0b"], sizes: ["S","M","L","XL","2XL"], subtitle: "Faculty of Engineering",        description: "เสื้อโปโลคณะวิศวกรรมศาสตร์ สีส้มเหลืองสัญลักษณ์วิศวะ", tag: "⚙️ Engineer" },
    { id: "f5",  name: "Faculty of Engineering Jacket Green",   price: 799, img: engineerGreen, badge: "Engineering",color: "#065f46", gradient: ["#065f46","#34d399"], sizes: ["S","M","L","XL"],      subtitle: "Faculty of Engineering",        description: "แจ็คเก็ตวิศวะสีเขียว Limited Edition", tag: "🔥 Limited" },
    { id: "f6",  name: "Faculty of Engineering Jacket Red",     price: 799, img: engineerRed,   badge: "Engineering",color: "#991b1b", gradient: ["#991b1b","#ef4444"], sizes: ["S","M","L","XL"],      subtitle: "Faculty of Engineering",        description: "แจ็คเก็ตวิศวะสีแดง Limited Edition", tag: "🔥 Limited" },
    { id: "f7",  name: "Faculty of Engineering Cap",            price: 199, img: engineerCap,   badge: "Engineering",color: "#b45309", gradient: ["#b45309","#fbbf24"], sizes: ["Free Size"],           subtitle: "Faculty of Engineering",        description: "หมวกแก๊ปคณะวิศวกรรมศาสตร์", tag: "🧢 Accessory" },
    { id: "f8",  name: "Faculty of Science Polo",               price: 299, img: sciencePolo,   badge: "Science",    color: "#0369a1", gradient: ["#0369a1","#38bdf8"], sizes: ["S","M","L","XL","2XL"], subtitle: "Faculty of Science",            description: "เสื้อโปโลคณะวิทยาศาสตร์ สีฟ้าใสสดชื่น", tag: "🔬 Science" },
    { id: "f9",  name: "Faculty of Science T-Shirt Black",      price: 219, img: scienceBlack,  badge: "Science",    color: "#1e293b", gradient: ["#1e293b","#475569"], sizes: ["S","M","L","XL","2XL"], subtitle: "Faculty of Science",            description: "เสื้อยืดคณะวิทยาศาสตร์ สีดำเรียบหรู", tag: "⚫ Classic" },
    { id: "f10", name: "Faculty of Science Jacket",             price: 699, img: scienceJacket, badge: "Science",    color: "#0369a1", gradient: ["#0c4a6e","#0369a1"], sizes: ["S","M","L","XL"],      subtitle: "Faculty of Science",            description: "แจ็คเก็ตคณะวิทยาศาสตร์", tag: "🎓 Faculty" },
    { id: "f11", name: "Faculty of Economics Polo",             price: 299, img: econPolo,      badge: "Economics",  color: "#166534", gradient: ["#166534","#4ade80"], sizes: ["S","M","L","XL","2XL"], subtitle: "Faculty of Economics",          description: "เสื้อโปโลคณะเศรษฐศาสตร์", tag: "📊 Econ" },
    { id: "f12", name: "Faculty of Economics Sport",            price: 400, img: econSport,     badge: "Economics",  color: "#166534", gradient: ["#14532d","#22c55e"], sizes: ["S","M","L","XL"],      subtitle: "Faculty of Economics",          description: "เสื้อกีฬาคณะเศรษฐศาสตร์", tag: "🏃 Sport" },
];