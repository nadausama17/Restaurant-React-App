import { Link } from "react-router-dom";

export default function OrderConfirmedModal({ order }) {
    let itemsPrice = 0;

    for (let i = 0; i < order.items.length; i++) {
        itemsPrice = itemsPrice + (order.items[i].prodCartQuantity * order.items[i].price);
    }

    {/* when you combine fixed with inset-0, it calculates top: 0, bottom: 0, left: 0, right: 0 relative to the edges of your monitor glass, not the edges of the form container. */ }
    {/* z-40 so it will be below the window the higher the more it will be on the top */ }
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">

            {/* ARCHITECTURE NOTE: Removed hardcoded 'h-130' to allow card to dynamically respond to screen height. */}
            {/* 'max-h-[90vh]' locks modal proportions on small viewports, 'overflow-hidden' pins children layers */}
            <div className="flex flex-col w-full max-w-xl max-h-[90vh] bg-linear-to-b from-orange-200 to-bistro-terracotta rounded-xl shadow-2xl z-50 animate-fade-in text-bistro-espresso overflow-hidden">

                {/* Header Area ('shrink-0' protects this header box from compressing when tables expand) */}
                <div className="p-6 pb-2 text-center shrink-0">
                    <div className="w-16 h-16 bg-linear-to-b from-orange-100 to-orange-200 text-bistro-tomato rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold mb-1">Order Confirmed!</h1>
                    <h2 className="text-sm opacity-90">Thank you for dining with our restaurant</h2>
                </div>

                {/* ARCHITECTURE NOTE: This is our overflow scroll container layer. */}
                {/* 'flex-1' expanding properties combined with 'overflow-y-auto' creates smooth scroll behaviors for massive receipts */}
                {/* flex-1: This forces this specific middle container to expand and fill up all the remaining empty vertical space */}
                {/* overflow-y-auto: is responsible for scrollbar */}
                {/* space-y-4 is a Tailwind utility class used on a parent element to automatically add uniform vertical spacing between its child elements instead of using mt or mb*/}
                <div className="flex-1 overflow-y-auto px-6 py-2 space-y-4">

                    {/* Order Status Tracker */}
                    <div className="bg-bistro-cream p-4 w-full rounded-lg shadow-inner border border-orange-200 text-sm space-y-2">
                        <h3 className="w-full text-center font-bold border-b border-orange-200 pb-1.5 text-base">
                            ORDER: <span className="text-orange-600">#{order.id}</span>
                        </h3>
                        <div className="flex justify-between text-xs py-1 font-semibold border-b border-orange-100">
                            <span className="text-green-600 font-bold">● Ordered</span>
                            <span className="opacity-40">➔ Preparing</span>
                            <span className="opacity-40">➔ On the way</span>
                            <span className="opacity-40">➔ Arrived</span>
                        </div>
                        <div className="space-y-1 text-xs pt-1 opacity-90">
                            <p><strong>Order Submitted at:</strong> {order.time}</p>
                            <p><strong>Delivery To:</strong> {order.address}</p>
                            <p><strong>Estimated Delivery Time:</strong> 25-35 Minutes</p>
                        </div>
                    </div>

                    {/* Receipt Table */}
                    <table className="w-full border-collapse rounded-lg overflow-hidden border border-bistro-espresso/20">
                        {/* Corrected Header Structure */}
                        <thead>
                            <tr className="bg-bistro-espresso text-xs tracking-wider">
                                {/* text-left puts ITEM at the very start, text-right puts PRICE at the very end */}
                                <th className="text-left p-2.5 font-bold text-bistro-cream">ITEM</th>
                                <th className="text-right p-2.5 font-bold text-bistro-cream">PRICE</th>
                            </tr>
                        </thead>

                        <tbody className="bg-orange-50/50 divide-y divide-orange-200/40">
                            {/* Item Row */}
                            {order.items.map((item) => (
                                <tr key={item.id} className="text-sm">
                                    <td className="text-left p-2.5 font-medium text-bistro-espresso">{item.prodCartQuantity}x {item.name}</td>
                                    <td className="text-right p-2.5 tabular-nums text-bistro-espresso">{item.price.toFixed(2)} EGP</td>
                                </tr>
                            ))}

                            {/* Total Row */}
                            <tr className="font-bold bg-orange-100/60 border-t-2 border-bistro-espresso">
                                <td className="text-left p-3 text-bistro-espresso">TOTAL:</td>
                                <td className="text-right p-3 text-bistro-tomato text-lg tabular-nums">{itemsPrice.toFixed(2)} EGP</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Footer Actions Area ('flex-shrink-0' keeps buttons sticky at the base profile plane) */}
                <div className="p-6 pt-2 bg-linear-to-t from-bistro-terracotta to-transparent flex flex-col gap-2 shrink-0 w-full text-center">
                    <Link className="bg-bistro-espresso text-bistro-cream py-2.5 rounded-lg font-semibold hover:opacity-95 transition" to="/products">
                        Back To Menu
                    </Link>
                    <Link className="text-bistro-tomato font-bold text-sm hover:underline py-1" to="/orderhistory">
                        View Order History
                    </Link>
                </div>

            </div>
        </div>
    );
}