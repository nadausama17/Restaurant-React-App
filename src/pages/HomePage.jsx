import { Link } from "react-router-dom";

export default function HomePage() {
    // leading-relaxed controls the line height 1.625
    // max-w-xl max-width: 36rem; (which is roughly 576px)
    return <div className="text-center min-h-[80vh] flex flex-col justify-center items-center">
        <h1 className="text-5xl text-bistro-tomato">Welcome to our restaurant</h1>
        <h2 className="text-3xl leading-relaxed max-w-xl text-gray-700">Delicious, chef-crafted meals made with fresh ingredients, delivered straight to your table or doorstep. Your next favorite meal is just a click away.</h2>
        <div className="flex gap-4">
            <Link to='/products' className="bg-bistro-espresso text-bistro-cream p-2 rounded-md">View our Menu</Link>
            <Link to='/cart' className="bg-bistro-tomato text-bistro-cream p-2 rounded-md">View Cart</Link>
        </div>
    </div>
}