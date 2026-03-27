import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem("kushop_cart");
            return saved ? JSON.parse(saved) : [];
        } catch(e) { return []; }
    });
    
    const [orders, setOrders] = useState(() => {
        try {
            const savedOrders = localStorage.getItem("kushop_orders");
            if (savedOrders) {
                let parsed = JSON.parse(savedOrders);
                const savedUsers = localStorage.getItem("kushop_users");
                const users = savedUsers ? JSON.parse(savedUsers) : [];
                
                parsed = parsed.filter(o => {
                    if (o.customerName) return true; // new snapshot format
                    if (o.userId === "guest") return true; // legacy guest
                    return users.some(u => u.id === o.userId); // legacy user check
                });
                return parsed;
            }
            return [];
        } catch(e) { return []; }
    });

    useEffect(() => {
        localStorage.setItem("kushop_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("kushop_orders", JSON.stringify(orders));
    }, [orders]);

    const addOrder = (orderItems, orderTotal, user) => {
        const newOrder = {
            id: "ORD-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000),
            date: new Date().toLocaleDateString("th-TH", { day: 'numeric', month: 'short', year: 'numeric' }),
            total: orderTotal,
            status: "processing",
            userId: user?.id || "guest",
            customerName: user ? `${user.firstName} ${user.lastName}` : "Guest User",
            customerEmail: user?.email || "No Account",
            items: orderItems,
        };
        setOrders(prev => [newOrder, ...prev]);
    };

    const addToCart = (product, size, qty = 1) => {
        setCartItems(prev => {
            const existing = prev.find(
                item => item.id === product.id && item.size === size
            );
            if (existing) {
                return prev.map(item =>
                    item.id === product.id && item.size === size
                        ? { ...item, qty: item.qty + qty }
                        : item
                );
            }
            return [...prev, {
                id: product.id,
                name: product.name,
                subtitle: product.subtitle,
                size,
                price: product.price,
                qty,
                color: product.color,
                gradient: product.gradient,
                badge: product.badge,
                img: product.img || null,
            }];
        });
    };

    const updateQty = (id, size, delta) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id && item.size === size
                    ? { ...item, qty: Math.max(1, item.qty + delta) }
                    : item
            )
        );
    };

    const removeItem = (id, size) => {
        setCartItems(prev => prev.filter(
            item => !(item.id === id && item.size === size)
        ));
    };

    const clearCart = () => setCartItems([]);

    const totalQty = cartItems.reduce((s, i) => s + i.qty, 0);
    const totalPrice = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            orders,
            addToCart,
            updateQty,
            removeItem,
            clearCart,
            addOrder,
            totalQty,
            totalPrice,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}