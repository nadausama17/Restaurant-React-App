import { useContext, useEffect, useState } from "react"
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/cart-context";
import { SearchContext } from "../context/search-context";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const crtContext = useContext(CartContext);
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

    if (isLoading) {
        return <h1 className="text-center">Data is Loading...</h1>
    }

    const filteredProducts = products.filter((item) => {
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return <>
        {!isLoading && filteredProducts.length > 0 && <div>
            <h1 className="text-center">Menu</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => {
                    return <ProductCard key={prod.id} image={prod.image}
                        name={prod.name}
                        price={prod.price} id={prod.id} />
                })}
            </div>
        </div>}
        {errorMsg && <h1 className="text-center">{errorMsg}</h1>}
    </>
}