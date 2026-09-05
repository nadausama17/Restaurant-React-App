import { useContext, useState } from "react";
import { CartContext } from "../context/cart-context";

export default function OrderHistoryCard({ order, onSelectOrder }) {
    const { addWholeOrder } = useContext(CartContext);

    // move the items price calculation out of the map as best practice
    let itemsPrice = 0;
    for (let i = 0; i < order.items.length; i++) {
        itemsPrice = itemsPrice + (order.items[i].prodCartQuantity * order.items[i].price);
    }


    const items = order.items.map((item) => {
        return `${item.prodCartQuantity}X ${item.name}`;
    })

    function reorderHandler(e) {
        e.stopPropagation();
        addWholeOrder(order.items);
    }

    function orderDetailsHandler() {
        onSelectOrder(order);
    }

    return (
        <div onClick={orderDetailsHandler} className="cursor-pointer flex flex-col w-120 bg-orange-200 p-4 rounded-xl shadow-sm text-bistro-espresso max-w-xl mx-auto my-3">

            {/* Top Row: Order ID and Re-order Button */}
            <div className="flex justify-between items-center border-b border-orange-300 pb-2 mb-3">
                <h2 className="font-bold text-sm text-orange-600">Order ID: #{order.id}</h2>
                <button onClick={reorderHandler} className="cursor-pointer bg-bistro-espresso text-bistro-cream px-4 py-1.5 rounded-md text-sm font-semibold hover:opacity-90 active:scale-95 transition">
                    Re-order
                </button>
            </div>

            {/* Middle Row: Items purchased list */}
            {/* line-clamp-2 If the text is longer than two lines, it gracefully cuts it off and appends a clean ellipsis (...) */}
            <div className="mb-4">
                <h3 className="font-medium text-base line-clamp-2">
                    {items.join(', ')}
                </h3>
            </div>

            {/* Bottom Row - Pushes Order Time to the left and Total Price to the right on the same line, items-baseline do this it makes them at the same line when they are different font sizes */}
            <div className="flex flex-row justify-between items-baseline pt-2 border-t border-dashed border-orange-300">
                <h3 className="text-sm opacity-80">
                    Order Time: <span className="font-medium">{order.time}</span>
                </h3>
                <h3 className="text-lg font-bold">
                    Total Price: <span className="text-bistro-tomato">{itemsPrice.toFixed(2)} EGP</span>
                </h3>
            </div>
        </div>
    )
}