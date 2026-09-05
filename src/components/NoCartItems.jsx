import noItemsCart from '../assets/noItemsCart.png';

export default function NoCartItems() {
    return <div className='text-center'>
        <img className='w-100 h-100 mx-auto' src={noItemsCart} alt="No Items in the cart" />
        <p className='font-bold text-2xl text-bistro-tomato'>No Items Selected</p>
    </div>
}