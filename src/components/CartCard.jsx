import { useContext } from "react"
import { CartContext } from "../context/cart-context"
import { useNavigate } from "react-router-dom";

export default function CartCard({ product }) {
    const { removeItemFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    function clickCartItemHandler() {
        navigate(`/products/${product.id}`);
    }

    return <div className="flex flex-col bg-orange-200 p-3">
        <h2>{product.name}</h2>
        <div className="flex justify-between">
            <div onClick={clickCartItemHandler} className="cursor-pointer flex">
                <img className="w-20 h-20" src={product.image} alt="" />
                <div className="flex flex-col">
                    <h3>X{product.prodCartQuantity}</h3>
                    <h3>{product.price}</h3>
                </div>
            </div>
            <div>
                <button className="cursor-pointer" onClick={() => removeItemFromCart(product.id)}>Delete</button>
            </div>
        </div>
    </div>
}