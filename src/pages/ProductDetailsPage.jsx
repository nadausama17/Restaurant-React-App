import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ProductDetailsCard from "../components/ProductDetailsCard";

// NEW: skeleton matching ProductDetailsCard's exact shape/sizing so there's
// no layout shift once the real product loads in. Same pattern as the
// Products page grid skeleton.
function ProductDetailsSkeleton() {
    return (
        <div className="w-full max-w-sm flex flex-col justify-between text-center mx-auto my-4 bg-orange-100 p-5 rounded-xl shadow-sm overflow-hidden animate-pulse">
            <div className="w-full h-56 bg-orange-200 rounded-lg mb-3" />
            <div className="h-6 bg-orange-200 rounded w-3/4 mx-auto mb-2" />
            <div className="h-4 bg-orange-200 rounded w-full mx-auto mb-1.5" />
            <div className="h-4 bg-orange-200 rounded w-5/6 mx-auto mb-3" />
            <div className="h-7 w-24 bg-orange-200 rounded-full mx-auto mb-4" />
            <div className="flex items-center justify-center gap-2">
                <div className="w-28 h-9 bg-orange-200 rounded-md" />
                <div className="w-28 h-9 bg-orange-200 rounded-md" />
            </div>
        </div>
    );
}

export default function ProductDetailsPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        setIsLoading(true);
        // NEW: clear any stale error/product from a previous id when the
        // route param changes (e.g. navigating from one product straight to
        // another) — otherwise an old error or old product could flash
        // briefly before the new fetch resolves.
        setErrorMsg("");
        setProduct(null);

        async function getProduct() {
            try {
                const response = await fetch('/menu.json');
                const contentType = response.headers.get('content-type');

                if (!response.ok || !contentType || !contentType.includes('application/json')) {
                    throw new Error(`We Couldn't load the product, please try again later`);
                }
                const res = await response.json();

                if (res && res.menu && res.menu.length > 0) {
                    const fetchedProduct = res.menu.find((prod) => prod.id === id);

                    if (fetchedProduct) {
                        setProduct(fetchedProduct);
                    }
                    // NEW: if fetchedProduct is undefined (bad/stale id in the
                    // URL), previously nothing was set and the page rendered
                    // blank with zero feedback. Now surface a clear message.
                    else {
                        setErrorMsg("We couldn't find this product.");
                    }
                }
            } catch (e) {
                setErrorMsg(e.message || 'Unexpected Error!!!');
            }
            setIsLoading(false);
        }

        setTimeout(() => {
            getProduct();
        }, 2000);
    }, [id]);

    return (
        <div className="px-4 py-8">
            {/* CHANGED: plain <h1> -> skeleton matching the real card's layout */}
            {isLoading && <ProductDetailsSkeleton />}

            {/* CHANGED: plain <h1> -> centered message card with an icon accent,
                consistent with the Products page's error state styling. */}
            {!isLoading && errorMsg && (
                <div className="max-w-md mx-auto text-center py-16">
                    <p className="text-4xl mb-3">⚠️</p>
                    <h1 className="text-lg font-semibold text-gray-900">{errorMsg}</h1>
                </div>
            )}

            {!isLoading && !errorMsg && product && <ProductDetailsCard product={product} />}
        </div>
    )
}