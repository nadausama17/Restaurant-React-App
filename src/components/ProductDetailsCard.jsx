import { useContext, useState } from "react";
import { CartContext } from "../context/cart-context";

export default function ProductDetailsCard({ product }) {
    const [prodCartQuantity, setProdCartQuantity] = useState(1);
    const { addItemToCart } = useContext(CartContext);

    // NEW: same price formatting pattern used in ProductCard, kept
    // consistent across the app. Number() guards against price being a
    // string, toFixed(2) forces 2 decimals, "EGP" appended for display only.
    const formattedPrice = `${Number(product.price).toFixed(2)} EGP`;

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
        // CHANGED: w-80 h-120 (fixed) -> w-full max-w-sm, so the card is
        // responsive on mobile instead of a hardcoded 320px/480px box that
        // could overflow small screens. max-w-sm (384px) keeps it from
        // growing too wide on desktop.
        // CHANGED: pb-4 -> p-5, even padding on all sides instead of just bottom.
        // ADDED: hover:shadow-md transition-shadow duration-200, subtle
        // interactive feel since this is likely a focal/clickable element
        // on the product detail page (matches ProductCard's hover language,
        // minus the lift since this isn't itself a "card in a list" you click into).
        <div className="w-full max-w-sm flex flex-col justify-between text-center mx-auto my-4 bg-orange-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
            {/* CHANGED: h-50 -> h-56, slightly taller since this is a detail
                view (more visual real estate than a grid card).
                ADDED: object-cover, so images with different aspect ratios
                fill the box without stretching/distorting.
                CHANGED: p-2 -> removed (padding now handled by parent's p-5),
                added rounded-lg mb-3 for consistent card-internal spacing.
                CHANGED: alt="product image" -> alt={product.name}, better
                accessibility (screen readers announce the actual dish name). */}
            <img
                className="w-full h-56 object-cover rounded-lg mb-3"
                src={product.image}
                alt={product.name}
            />

            {/* CHANGED: plain <h2> -> text-xl font-bold text-gray-900, gives
                the product name real visual hierarchy as the detail page's
                main heading (bigger/bolder than the grid card's h2, since
                there's more room and more emphasis here). */}
            <h2 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>

            {/* CHANGED: plain <h3> (semantically wrong for a description,
                h3 implies a heading) -> <p>, with text-sm text-gray-600 and
                leading-relaxed for readable body text, plus mb-3 spacing.
                Description text is usually longer/paragraph-like, so a
                heading tag wasn't appropriate here. */}
            <p className="text-sm text-gray-600 leading-relaxed mb-3">{product.description}</p>

            {/* CHANGED: {product.price} -> {formattedPrice} (e.g. "45.00 EGP").
                CHANGED: w-20 (fixed, could clip larger formatted values) ->
                inline-block px-3 py-1, so the pill sizes itself to content
                instead of a fixed width that might cut off "XXX.XX EGP".
                ADDED: rounded-full font-semibold, makes it read as a
                price "badge" rather than a plain colored box.
                CHANGED: mx-auto kept, still centers the badge. */}
            <span className="inline-block bg-bistro-cream text-bistro-tomato px-3 py-1 rounded-full font-semibold mx-auto mb-4">
                {formattedPrice}
            </span>

            {/* CHANGED: no wrapping className before -> flex items-center
                justify-center gap-2, aligns stepper + Add To Cart button on
                one row with consistent spacing (matches ProductCard layout). */}
            <div className="flex items-center justify-center gap-2">
                {/* NEW WRAPPER: grouped -/input/+ into one bordered pill,
                    same pattern as ProductCard, so the stepper control looks
                    consistent across both components instead of three loose
                    floating elements with manual mr-2 spacing. */}
                <div className="flex items-center border border-bistro-tomato rounded-md overflow-hidden">
                    {/* CHANGED: px-3 py-2 mr-2 (loose sizing + manual margin)
                        -> fixed w-9 h-9 flex items-center justify-center,
                        so the button is a consistent square (slightly bigger
                        than ProductCard's w-8 h-8, fitting this larger card).
                        REMOVED: mr-2 (spacing now handled by the pill wrapper).
                        ADDED: hover:opacity-90 active:scale-95 transition,
                        for visual press/hover feedback. */}
                    <button
                        onClick={reduceQuantityHandler}
                        className="cursor-pointer bg-bistro-tomato text-bistro-cream w-9 h-9 flex items-center justify-center hover:opacity-90 active:scale-95 transition"
                    >
                        −
                    </button>
                    {/* CHANGED: removed mr-2 (no longer needed, handled by
                        pill wrapper + parent gap-2).
                        ADDED: w-9 h-9 bg-white, matches button height and
                        gives a visible background inside the bordered pill. */}
                    <input
                        className="outline-none text-center w-9 h-9 bg-white"
                        type="text"
                        value={prodCartQuantity}
                        readOnly
                    />
                    {/* Same sizing/feedback changes as the "−" button above. */}
                    <button
                        onClick={increaseQuantityHandler}
                        className="cursor-pointer bg-bistro-tomato text-bistro-cream w-9 h-9 flex items-center justify-center hover:opacity-90 active:scale-95 transition"
                    >
                        +
                    </button>
                </div>

                {/* CHANGED: added text-sm font-medium for consistent button
                    typography, and hover:opacity-90 active:scale-95 transition
                    for press/hover feedback, matching ProductCard's button. */}
                <button
                    onClick={() => addItemToCart({ ...product, prodCartQuantity })}
                    className="cursor-pointer bg-bistro-tomato text-bistro-cream px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 active:scale-95 transition"
                >
                    Add To Cart
                </button>
            </div>
        </div>
    )
}