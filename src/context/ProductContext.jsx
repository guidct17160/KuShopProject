import { createContext, useContext, useState, useEffect } from "react";
import { menProducts, womenProducts } from "../data/products";
import { facultyItems } from "../data/facultyItems";

const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [products, setProducts] = useState(() => {
        try {
            const saved = localStorage.getItem("kushop_products_v4");
            if (saved) {
                let parsed = JSON.parse(saved);
                // Wipe deleted hero items
                parsed = parsed.filter(p => !["male", "female"].includes(p.id));
                
                // Force sync the specific 'w4' unisex jersey back into the active store
                const w4Model = womenProducts.find(p => p.id === "w4");
                if (w4Model) {
                    const existingW4Index = parsed.findIndex(p => p.id === "w4");
                    const readyW4 = { ...w4Model, badge: "WOMEN", stock: parsed[existingW4Index]?.stock ?? 20 };
                    if (existingW4Index >= 0) {
                        parsed[existingW4Index] = readyW4;
                    } else {
                        parsed.push(readyW4);
                    }
                }
                
                return parsed;
            }
            
            // Initial load from static data with normalized badges
            const initialList = [
                ...menProducts.map(p => ({ ...p, badge: "MEN" })),
                ...womenProducts.map(p => ({ ...p, badge: "WOMEN" })),
                ...facultyItems.map(p => ({ ...p, badge: "FACULTY" }))
            ];
            // Add default stock to initial data if not present
            return initialList.map(p => ({ ...p, stock: p.stock ?? 20 }));
        } catch (e) {
            console.error("Error loading products:", e);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("kushop_products_v4", JSON.stringify(products));
    }, [products]);

    const addProduct = (newProduct) => {
        const productWithId = { ...newProduct, id: Date.now().toString() };
        setProducts(prev => [...prev, productWithId]);
    };

    const updateProduct = (updatedProduct) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProducts = () => useContext(ProductContext);
