import { useContext } from "react";
import { CartContext } from "../context/cart-context";
import { useNavigate } from "react-router-dom";

export default function OrderHistoryDetailsModal({ order, onCloseModal }) {
    const { addWholeOrder } = useContext(CartContext);
    const navigate = useNavigate();

    let itemsPrice = 0;

    for (let i = 0; i < order.items.length; i++) {
        itemsPrice = itemsPrice + (order.items[i].prodCartQuantity * order.items[i].price);
    }

    function reorderHandler() {
        addWholeOrder(order.items);
        navigate('/cart');
    }
    // e.currentTarget refers to the component that the onClick is on
    // e.target refers to the component that the mouse clicked on
    return <div onClick={(e) => e.target === e.currentTarget && onCloseModal()}
        className="fixed inset-0 backdrop-blur-sm z-40 bg-black/50 flex justify-center items-center">
        <div className="max-w-xl w-full p-3 flex flex-col justify-between bg-bistro-terracotta z-50 max-h-[90vh] bg-linear-to-b from-orange-200 to-bistro-terracotta rounded-xl shadow-2xl animate-fade-in text-bistro-espresso overflow-hidden">
            <div className="shrink-0 border-b-2 pb-3 border-bistro-terracotta">
                <h2 className="text-xl font-bold">Order #{order.id}</h2>
                <span className="text-black/50">Placed on: </span><span className="font-bold text-black/60">{order.time}</span>
            </div>

            <div className="bg-gray-200/90 p-3 mt-3 rounded-xl shadow-2xl">
                <h3 className="font-bold">Status: </h3>
                <h3 className="font-bold">Delivered To: {order.address}</h3>
            </div>

            <div className="flex-1 overflow-y-auto mt-3">
                <h3>Order Items</h3>
                {order.items.map((item) => {
                    return <div key={item.id} className="flex justify-between p-2">
                        <div>
                            <div className="flex">
                                <div className="mr-2">
                                    <img src={item.image} alt="item image" className="w-16 h-16" />
                                </div>
                                <div>
                                    <h3>{item.prodCartQuantity}x {item.name}</h3>
                                    <h3>Price: {item.price.toFixed(2)} EGP</h3>
                                </div>
                            </div>
                        </div>
                        <div>
                            {(item.prodCartQuantity * item.price).toFixed(2)} EGP
                        </div>
                    </div>
                })}
            </div>

            <div className="text-right">
                <p>Total Price: {itemsPrice.toFixed(2)} EGP</p>
            </div>

            <div className="shrink-0 mt-3">
                <div className="flex justify-between">
                    <button className="cursor-pointer" onClick={onCloseModal}>Close</button>
                    <button
                        onClick={reorderHandler}
                        className="cursor-pointer bg-bistro-espresso text-bistro-cream px-4 py-1.5 rounded-md text-sm font-semibold hover:opacity-90 active:scale-95 transition">Re-order</button>
                </div>
            </div>
        </div>

    </div>
}