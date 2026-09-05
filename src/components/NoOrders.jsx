import noItemsCart from '../assets/noItemsCart.png';

export default function NoOrders() {
    return <div className='text-center'>
        <img className='w-100 h-100 mx-auto' src={noItemsCart} alt="No Previous Orders" />
        <p className='font-bold text-2xl text-bistro-tomato'>No Previous Orders</p>
    </div>
}