import restaurantLogo from '../assets/restaurantLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { CartContext } from '../context/cart-context';
import { SearchContext } from '../context/search-context';

export default function NavBar() {
    const { items } = useContext(CartContext);
    const navigate = useNavigate();
    const { setSearchQuery } = useContext(SearchContext);
    const searchRef = useRef(null);

    let itemsQty = 0;

    for (let i = 0; i < items.length; i++) {
        itemsQty += items[i].prodCartQuantity;
    }

    function searchHandler() {
        setSearchQuery(searchRef.current.value);
        navigate('/products');
    }

    function clearSearchHandler() {
        searchRef.current.value = "";
        setSearchQuery("");
    }


    return <header className='bg-bistro-terracotta w-full px-2 max-w-full overflow-x-hidden'>
        <nav className='flex justify-between items-center'>
            <div>
                <img className='w-16' src={restaurantLogo}
                    alt='restaurant-logo' />
            </div>
            <div className='flex items-center gap-4'>
                <Link to='/' className='text-bistro-espresso'>Home Page</Link>
                <Link to='/products' className='text-bistro-espresso'>Products</Link>
                <Link to='/orderhistory'>Orders</Link>
            </div>
            <div className='flex gap-3'>
                {/* flex items-stretch on the parent: This ensures that both the input field and the button are mathematically forced to take up $100\%$ of the parent div's layout height */}
                {/* overflow-hidden to cut the child edges after we applied rounded border to the parent div */}
                <div className="flex items-stretch overflow-hidden rounded-md border border-amber-50">
                    {/* The Input Field */}
                    {/* min-w-0 By default, inputs have a large minimum browser width that can break layouts on small mobile screens */}
                    {/* flex-grow: Take up all remaining horizontal space left inside the parent container." This pushes the "X" button neatly to the far right */}
                    <input
                        ref={searchRef}
                        type='text'
                        className='bg-bistro-cream px-3 py-1.5 text-bistro-espresso outline-none min-w-0 grow'
                        placeholder="Search..."
                    />

                    {/* The Button */}
                    {/* When the user hovers over the "X", the background subtly darkens, providing instant visual feedback that the button is interactive. The transition-colors utility smooths out this shift */}
                    <button
                        onClick={clearSearchHandler}
                        className='cursor-pointer text-bistro-espresso bg-bistro-cream hover:bg-amber-100 border-l border-amber-50 px-3 py-1.5 font-medium transition-colors'
                    >
                        X
                    </button>
                </div>
                <button
                    onClick={searchHandler}
                    className='cursor-pointer bg-bistro-espresso text-bistro-cream px-2 py-1 rounded-sm'>
                    Search
                </button>
            </div>
            <div>
                {/* The Link is now 'relative' and 'inline-block' so it becomes a tight bounding box around the icon */}
                <Link to='/cart' className='relative inline-block p-2 group'>
                    <FontAwesomeIcon
                        icon={faCartArrowDown}
                        className='cursor-pointer text-bistro-espresso text-2xl group-hover:opacity-80 transition'
                    />

                    {/* The Badge: Nudged precisely into place with negative top/right utilities */}
                    <span className="absolute -top-1 -right-1 bg-bistro-tomato text-bistro-cream text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                        {itemsQty}
                    </span>
                </Link>
            </div>
        </nav>
    </header>
}