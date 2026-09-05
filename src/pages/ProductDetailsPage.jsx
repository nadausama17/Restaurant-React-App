import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ProductDetailsCard from "../components/ProductDetailsCard";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        setIsLoading(true);

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
        <>
            {isLoading && <h1 className="text-center">Data is Loading...</h1>}
            {errorMsg && <h1 className="text-center">{errorMsg}</h1>}
            {!isLoading && product && <ProductDetailsCard product={product} />}
        </>
    )
}