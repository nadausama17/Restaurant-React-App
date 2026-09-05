import { useContext, useState } from "react";
import { CartContext } from "../context/cart-context";

export default function ProductDetailsCard({ product }) {
    const [prodCartQuantity, setProdCartQuantity] = useState(1);
    const { addItemToCart } = useContext(CartContext);

    function reduceQuantityHandler() {
        setProdCartQuantity((prevQuantity) => {
            if (prevQuantity > 1) {
                return prevQuantity - 1;
            } else {
                return prevQuantity;
            }
        });
    }

    function increaseQuantityHandler() {
        setProdCartQuantity((prevQuantity) => {
            return prevQuantity + 1;
        })
    }

    return (
        <div className="w-80 h-120 flex flex-col justify-between text-center mx-auto my-4 bg-orange-200 pb-4 rounded-xl shadow-sm overflow-hidden">
            <img className="w-full p-2 h-50 mx-auto" src={product.image} alt="product image" />
            <h2>{product.name}</h2>
            <h3>{product.description}</h3>
            <h3 className="bg-bistro-cream text-bistro-tomato w-20 mx-auto">{product.price}</h3>
            <div>
                <button className="cursor-pointer bg-bistro-tomato text-bistro-cream px-3 py-2 mr-2 rounded-md"
                    onClick={reduceQuantityHandler}>-</button>
                <input className="outline-none text-center mr-2" type="text" value={prodCartQuantity} readOnly />
                <button className="cursor-pointer bg-bistro-tomato text-bistro-cream px-3 py-2 mr-2 rounded-md"
                    onClick={increaseQuantityHandler}>+</button>
                <button onClick={() => addItemToCart({ ...product, prodCartQuantity })} className="cursor-pointer bg-bistro-tomato text-bistro-cream px-3 py-2 rounded-md">Add To Cart</button>
            </div>
        </div>)
}