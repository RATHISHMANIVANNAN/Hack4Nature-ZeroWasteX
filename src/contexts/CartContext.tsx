
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  materials: string[];
  quantity: number;
}

interface CartContextType {
  cart: CartProduct[];
  addToCart: (product: Omit<CartProduct, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('zerowastex-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
      }
    }
  }, []);

  // Update localStorage and totals when cart changes
  useEffect(() => {
    localStorage.setItem('zerowastex-cart', JSON.stringify(cart));
    
    // Calculate totals
    let items = 0;
    let price = 0;
    
    cart.forEach((item) => {
      items += item.quantity;
      price += item.price * item.quantity;
    });
    
    setTotalItems(items);
    setTotalPrice(price);
  }, [cart]);

  const addToCart = (product: Omit<CartProduct, 'quantity'>) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingProductIndex >= 0) {
        // Product already in cart, increase quantity
        const newCart = [...prevCart];
        newCart[existingProductIndex] = {
          ...newCart[existingProductIndex],
          quantity: newCart[existingProductIndex].quantity + 1
        };
        return newCart;
      } else {
        // Product not in cart, add it with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
