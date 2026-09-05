import { createContext } from "react";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearCart: () => { },
    addWholeOrder: () => { }
});