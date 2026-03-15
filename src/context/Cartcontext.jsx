import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

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
            addToCart,
            updateQty,
            removeItem,
            clearCart,
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