import { useContext, useRef, useState } from "react"
import CheckoutModal from "../components/CheckoutModal";
import { CartContext } from "../context/cart-context";
import { Navigate, useNavigate } from "react-router-dom";
import OrderConfirmedModal from "../components/OrderConfirmedModal";

export default function CheckOutPage() {
    const nameRef = useRef(null);
    const addressRef = useRef(null);
    const phoneRef = useRef(null);
    const [isCheckoutModal, setIsCheckoutModal] = useState(false);
    const [isOrderConfirmedModal, setIsOrderConfirmedModal] = useState(false);
    const [completeOrder, setCompleteOrder] = useState(null);
    const { clearCart, items } = useContext(CartContext);
    const navigate = useNavigate();

    // if the checkout page is displayed while there are not items and there is no order confirmation message to check redirect
    if (items.length === 0 && !isOrderConfirmedModal) {
        return <Navigate to="/cart" replace />
    }

    function submitFormHandler(e) {
        e.preventDefault();
        setIsCheckoutModal(true);
    }

    function noConfirmHandler() {
        setIsCheckoutModal(false);
    }

    function yesConfirmHandler() {
        const prevOrders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];

        let orderId;
        while (true) {
            let randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
            orderId = `ORD-${randomId}-${new Date().getTime()}`;

            if (prevOrders.length === 0) {
                break;
            }

            let existed = prevOrders.some((order) => order.id === orderId);

            if (!existed) {
                break;
            }
        }

        const orderTime = getOrderTime();

        localStorage.setItem('orders', JSON.stringify([...prevOrders, {
            id: orderId,
            items: [...items],
            name: nameRef.current.value,
            address: addressRef.current.value,
            phone: phoneRef.current.value,
            time: orderTime
        }]));

        setCompleteOrder({
            id: orderId,
            items: [...items],
            name: nameRef.current.value,
            address: addressRef.current.value,
            phone: phoneRef.current.value,
            time: orderTime
        });


        setIsCheckoutModal(false);
        setIsOrderConfirmedModal(true);
        clearCart();
    }

    function getOrderTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return formattedDate;
    }

    return <div className="max-w-md mx-auto min-h-[75vh] flex flex-col justify-center relative">
        <h2 className="text-center text-2xl">Checkout</h2>
        <form className="bg-bistro-tomato rounded-sm shadow-2xl p-6 h-100 flex flex-col justify-between" onSubmit={submitFormHandler}>
            <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input
                    className="outline-none border h-10 bg-bistro-cream text-bistro-terracotta font-bold p-2"
                    required
                    type="text"
                    ref={nameRef}
                    id="name"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="address">Address</label>
                <input
                    className="outline-none border h-10 bg-bistro-cream text-bistro-terracotta font-bold p-2"
                    required
                    type="text"
                    ref={addressRef}
                    id="address"
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="phone">Phone Number</label>
                <input
                    className="outline-none border h-10 bg-bistro-cream text-bistro-terracotta font-bold p-2"
                    required
                    type="tel"
                    ref={phoneRef}
                    id="phone"
                />
            </div>

            <button className="cursor-pointer block mt-2 bg-bistro-espresso mx-auto p-2 rounded-md text-bistro-cream" type="submit">Confirm</button>
        </form>

        {isCheckoutModal && <CheckoutModal
            onNoConfirm={noConfirmHandler}
            onYesConfirm={yesConfirmHandler} />}

        {isOrderConfirmedModal && <OrderConfirmedModal order={completeOrder} />}
    </div>
}