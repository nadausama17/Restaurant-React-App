import { useContext, useEffect, useState } from "react"
import { CartContext } from "../context/cart-context"
import CartCard from "../components/CartCard";
import NoCartItems from "../components/NoCartItems";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
    const { items } = useContext(CartContext);
    const navigate = useNavigate();

    // items are already a state no need for extra state the component will render
    // better to use reduce
    let itemsPrice = 0;

    for (let i = 0; i < items.length; i++) {
        itemsPrice = itemsPrice + (items[i].prodCartQuantity * items[i].price);
    }

    function checkoutHandler() {
        navigate(`/checkout`);
    }

    if (items.length === 0) {
        return <NoCartItems />
    }

    return <>
        <div className="flex flex-col gap-6 p-4 justify-center">
            {items.map((item) => {
                return <CartCard key={item.id} product={item} />
            })}
        </div>
        <div className="text-center">
            <p className="text-2xl">Total Price: {itemsPrice.toFixed(2)} EGP</p>
            <button
                onClick={checkoutHandler}
                className="cursor-pointer bg-bistro-tomato text-bistro-cream mt-2 p-2 rounded-l">
                Checkout</button>
        </div>
    </>
}