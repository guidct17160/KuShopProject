import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const MOCK_USERS = [
    { id: 1, firstName: "ผู้ดูแลระบบ", lastName: "สูงสุด", email: "admin@ku.th", password: "password", role: "admin" },
    { id: 2, firstName: "นิสิต", lastName: "เกษตรศาสตร์", email: "user@ku.th", password: "password", role: "user" },
];

export function AuthProvider({ children }) {
    const [users, setUsers] = useState(() => {
        try {
            const saved = localStorage.getItem("kushop_users");
            return saved ? JSON.parse(saved) : MOCK_USERS;
        } catch (e) { return MOCK_USERS; }
    });

    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const saved = localStorage.getItem("kushop_current_user");
            return saved ? JSON.parse(saved) : null;
        } catch (e) { return null; }
    });

    useEffect(() => {
        localStorage.setItem("kushop_users", JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("kushop_current_user", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("kushop_current_user");
        }
    }, [currentUser]);

    const login = (email, password) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setCurrentUser(user);
            return true;
        }
        return false;
    };

    const register = (userData) => {
        if (users.find(u => u.email === userData.email)) throw new Error("อีเมลนี้มีผู้ใช้งานแล้ว");
        const newUser = { ...userData, id: Date.now(), role: "user" };
        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const updateRole = (userId, newRole) => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    };

    const updatePassword = (newPassword) => {
        if (!currentUser) return;
        const updatedUser = { ...currentUser, password: newPassword };
        setCurrentUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    };

    const updateProfile = (profileData) => {
        if (!currentUser) return;
        const updatedUser = { ...currentUser, ...profileData };
        setCurrentUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    };

    return (
        <AuthContext.Provider value={{ users, currentUser, login, register, logout, updateRole, updatePassword, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
