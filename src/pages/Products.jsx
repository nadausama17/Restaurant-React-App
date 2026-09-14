import { useContext, useEffect, useState } from "react"
import ProductCard from "../components/ProductCard";
import { SearchContext } from "../context/search-context";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { searchQuery } = useContext(SearchContext);

    useEffect(() => {
        setIsLoading(true);
        async function getProducts() {
            try {
                const response = await fetch('/menu.json');
                const contentType = response.headers.get('content-type');

                if (!response.ok || !contentType || !contentType.includes('application/json')) {
                    throw new Error(`We Couldn't load the menu, please try again later`);
                }
                const res = await response.json();

                setProducts(res.menu);
            } catch (e) {
                setErrorMsg(e.message || "Unexpected Error!!!");
            }

            setIsLoading(false);
        }

        setTimeout(() => {
            getProducts();
        }, 2000);
    }, []);

    // Loading state: skeleton grid matching the final layout shape instead of
    // bare text, so there's no jarring layout shift once data arrives.
    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-center text-2xl font-bold text-gray-900 mb-8">Menu</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="animate-pulse bg-orange-100 rounded-xl h-64" />
                    ))}
                </div>
            </div>
        );
    }

    const filteredProducts = products.filter((item) => {
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Error state: centered message card instead of a raw <h1>.
    if (errorMsg) {
        return (
            <div className="max-w-md mx-auto text-center py-16 px-4">
                <p className="text-4xl mb-3">⚠️</p>
                <h1 className="text-lg font-semibold text-gray-900">{errorMsg}</h1>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-center text-2xl font-bold text-gray-900 mb-8">Menu</h1>

            {filteredProducts.length > 0 ? (
                // - default (mobile):        1 column
                // - md (tablet, ≥768px):     3 columns
                // - lg (desktop, ≥1024px):   4 columns
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                    {filteredProducts.map((prod) => (
                        <ProductCard
                            key={prod.id}
                            image={prod.image}
                            name={prod.name}
                            price={prod.price}
                            id={prod.id}
                        />
                    ))}
                </div>
            ) : (
                // Empty state: feedback when search matches nothing, instead of a blank page.
                <div className="text-center py-16">
                    <p className="text-4xl mb-3">🍽️</p>
                    <p className="text-gray-500">No dishes match your search.</p>
                </div>
            )}
        </div>
    );
}