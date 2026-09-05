import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Products from './pages/Products';
import RootLayout from './components/RootLayout';
import { CartContext } from './context/cart-context';
import { useState } from 'react';
import CheckOutPage from './pages/CheckOutPage';
import { useEffect } from 'react';
import { SearchContext } from './context/search-context';
import OrderHistoryPage from './pages/OrderHistoryPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/', element: <RootLayout />, children: [
        { path: '/', element: <HomePage /> },
        { path: '/products', element: <Products /> },
        { path: '/products/:id', element: <ProductDetailsPage /> },
        { path: '/cart', element: <CartPage /> },
        { path: '/checkout', element: <CheckOutPage /> },
        { path: '/orderhistory', element: <OrderHistoryPage /> }
      ]
    }

  ])

  const [shoppingCart, setShoppingCart] = useState(() => {
    try {
      const cartItems = localStorage.getItem('items') ?
        JSON.parse(localStorage.getItem('items')) : [];

      return cartItems;
    } catch (e) {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  function handleAddItemShoppingCart(product) {
    setShoppingCart((prevState) => {
      const products = [...prevState];
      const index = products.findIndex(prod => prod.id === product.id);

      if (index === -1) {
        return [...prevState, product];
      }

      const addedProduct = { ...products[index] };
      addedProduct.prodCartQuantity += product.prodCartQuantity;
      products[index] = addedProduct;

      return products;
    })
  }

  function handleRemoveItemFromCart(id) {
    setShoppingCart((prevState) => {
      const products = [...prevState];
      const filteredProducts = products.filter((prod) => prod.id !== id);

      return filteredProducts;
    })
  }

  function handleClearCart() {
    setShoppingCart([]);
  }

  function handleSetSearchQuery(queryText) {
    setSearchQuery(queryText);
  }

  function handleAddWholeOrder(items) {
    setShoppingCart((prevState) => {
      const products = [...prevState];

      items.forEach((item) => {
        const index = products.findIndex(prod => prod.id === item.id);

        if (index === -1) {
          products.push({ ...item });
        } else {
          const product = { ...products[index] };
          product.prodCartQuantity += item.prodCartQuantity;
          products[index] = product;
        }
      })

      return products;
    })
  }

  const cartContext = {
    items: shoppingCart,
    addItemToCart: handleAddItemShoppingCart,
    removeItemFromCart: handleRemoveItemFromCart,
    clearCart: handleClearCart,
    addWholeOrder: handleAddWholeOrder
  }

  const searchContext = {
    searchQuery: searchQuery,
    setSearchQuery: handleSetSearchQuery
  }

  return (
    <CartContext.Provider value={cartContext}>
      <SearchContext.Provider value={searchContext}>
        <RouterProvider router={router} />
      </SearchContext.Provider>
    </CartContext.Provider>
  )
}

export default App
