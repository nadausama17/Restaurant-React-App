import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cart-context";

export default function ProductCard({ image, name, price, id }) {
    const [prodCartQuantity, setProdCartQuantity] = useState(1);
    const navigate = useNavigate();
    const { addItemToCart } = useContext(CartContext);

    // NEW: format price once here (Number() guards against price being a
    // string from JSON, toFixed(2) forces 2 decimals, "EGP" appended).
    // Kept as a display-only value — the raw numeric `price` is still what
    // gets sent to the cart so totals/math elsewhere don't break.
    const formattedPrice = `${Number(price).toFixed(2)} EGP`;

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
        // into the cart — formatting is a display concern only.
        addItemToCart({ id, image, name, price, prodCartQuantity });
    }

    return (
        // w-70 (fixed) -> w-full max-w-70, so the card shrinks on
        // narrow screens instead of overflowing.
        // CHANGED: onClick moved here from the <img> — the whole card now
        // navigates to the product page, not just the image.
        // ADDED: rounded-xl, shadow-sm/hover:shadow-md, hover:-translate-y-0.5,
        // transition-all -> gives clickable-card affordance (lift + shadow on hover).
        // CHANGED: pb-3 -> p-4, so padding is even on all sides, not just bottom.
        <div
            onClick={clickProductHandler}
            className="text-center w-full max-w-70 bg-orange-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer p-4"
        >
            {/* CHANGED: removed onClick from img (moved to wrapper div above).
                CHANGED: w-50 h-50 -> w-full h-40, so image fills card width
                responsively instead of a fixed 50px/50px box.
                ADDED: object-cover, so images with different aspect ratios
                fill the box without stretching/distorting.
                CHANGED: alt="product image" -> alt={name}, better accessibility
                (screen readers announce the actual dish name). */}
            <img
                className="w-full h-40 object-cover rounded-lg mx-auto mb-3"
                src={image}
                alt={name}
            />

            {/* CHANGED: plain <h2> -> added text-lg font-semibold text-gray-900
                truncate, so long product names get real typographic weight
                and don't wrap awkwardly or break the card's height. */}
            <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>

            {/* CHANGED: plain <h3>{price}</h3> -> now renders `formattedPrice`
                (e.g. "45.00 EGP" instead of raw 45), styled with brand color
                (text-bistro-tomato) and font-medium, plus mb-3 spacing before
                the controls row below. */}
            <h3 className="text-bistro-tomato font-medium mb-3">{formattedPrice}</h3>

            {/* CHANGED: no wrapping className before -> now flex items-center
                justify-center gap-2, so the quantity stepper and "Add To Cart"
                button align on one row with consistent spacing instead of
                relying on default block/inline spacing. */}
            <div className="flex items-center justify-center gap-2">
                {/* NEW WRAPPER: grouped the -/input/+ into one bordered pill
                    (border border-bistro-tomato rounded-md overflow-hidden)
                    so it visually reads as a single stepper control instead
                    of three separate floating elements. */}
                <div className="flex items-center border border-bistro-tomato rounded-md overflow-hidden">
                    {/* CHANGED: added fixed w-8 h-8 + flex items-center
                        justify-center so the button is a perfect square with
                        centered "−" (was default button sizing before).
                        ADDED: hover:opacity-90 active:scale-95 transition,
                        for visual press/hover feedback. */}
                    <button
                        onClick={reduceQuantityHandler}
                        className="cursor-pointer bg-bistro-tomato text-bistro-cream w-8 h-8 flex items-center justify-center hover:opacity-90 active:scale-95 transition"
                    >
                        −
                    </button>
                    {/* CHANGED: removed stray `mr-2` (no longer needed since
                        gap-2 on parent + border wrapper handle spacing now).
                        CHANGED: added w-8 h-8 bg-white so the input matches
                        the button height/width and has a visible background
                        inside the bordered pill. */}
                    <input
                        className="outline-none text-center w-8 h-8 bg-white"
                        type="text"
                        value={prodCartQuantity}
                        readOnly
                    />
                    {/* Same sizing/feedback changes as the "−" button above. */}
                    <button
                        onClick={increaseQuantityHandler}
                        className="cursor-pointer bg-bistro-tomato text-bistro-cream w-8 h-8 flex items-center justify-center hover:opacity-90 active:scale-95 transition"
                    >
                        +
                    </button>
                </div>

                {/* CHANGED: removed awkward multi-line className with manual
                    line break -> cleaned into one line.
                    ADDED: text-sm font-medium for consistent button typography.
                    ADDED: hover:opacity-90 active:scale-95 transition, same
                    press/hover feedback as the stepper buttons. */}
                <button
                    onClick={addItemToCartHandler}
                    className="cursor-pointer bg-bistro-tomato text-bistro-cream px-3 py-2 rounded-md text-sm font-medium hover:opacity-90 active:scale-95 transition"
                >
                    Add To Cart
                </button>
            </div>
        </div>
    )
}