'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { productAPI } from '@/lib/api';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (productId, size, quantity) => {
    try {
      // Fetch product details using productAPI
      const product = await productAPI.getProductById(productId);

      // Check if product exists in cart
      const existingItem = cart.find(
        item => item._id === productId && item.size === size
      );

      if (existingItem) {
        // Update quantity if product exists
        setCart(prevCart =>
          prevCart.map(item =>
            item._id === productId && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
      } else {
        // Add new item to cart
        setCart(prevCart => [
          ...prevCart,
          {
            _id: productId,
            name: product.name,
            image: product.images && product.images[0] ? product.images[0] : '/images/placeholder.jpg',
            price: product.price,
            size,
            quantity
          }
        ]);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const removeFromCart = (productId, size) => {
    setCart(prevCart =>
      prevCart.filter(
        item => !(item._id === productId && item.size === size)
      )
    );
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity < 1) return;

    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 