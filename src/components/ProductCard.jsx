import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cart-context";

export default function ProductCard({ image, name, price, id }) {
    const [prodCartQuantity, setProdCartQuantity] = useState(1);
    const navigate = useNavigate();
    const { addItemToCart } = useContext(CartContext);

    function reduceQuantityHandler(e) {
        e.stopPropagation(); // to prevent executing on click for parent div
        setProdCartQuantity((prevQuantity) => {
            if (prevQuantity > 1) {
                return prevQuantity - 1;
            } else {
                return prevQuantity;
            }
        });
    }

    function increaseQuantityHandler(e) {
        e.stopPropagation(); // to prevent executing on click for parent div
        setProdCartQuantity((prevQuantity) => {
            return prevQuantity + 1;
        })
    }

    function clickProductHandler() {
        navigate(`/products/${id}`)
    }

    function addItemToCartHandler(e) {
        e.stopPropagation();
        addItemToCart({ id, image, name, price, prodCartQuantity });
    }

    return (
        <div className="text-center mx-4 my-2 bg-orange-200 pb-3">
            <img onClick={clickProductHandler} className="cursor-pointer w-full h-50 mx-auto" src={image} alt="product image" />
            <h2>{name}</h2>
            <h3>{price}</h3>
            <div>
                <button className="cursor-pointer bg-bistro-tomato text-bistro-cream px-3 py-2 mr-2 rounded-md"
                    onClick={reduceQuantityHandler}>-</button>
                <input className="outline-none text-center mr-2" type="text" value={prodCartQuantity} readOnly />
                <button className="cursor-pointer bg-bistro-tomato text-bistro-cream px-3 py-2 mr-2 rounded-md"
                    onClick={increaseQuantityHandler}>+</button>
                <button
                    onClick={addItemToCartHandler}
                    className="cursor-pointer bg-bistro-tomato text-bistro-cream px-3 py-2 
            rounded-md">Add To Cart</button>
            </div>
        </div>)
}