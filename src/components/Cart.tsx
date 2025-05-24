
import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';
import { GlassmorphismCard } from './ui/GlassmorphismCard';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isDispatched, setIsDispatched] = useState(false);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some products to your cart before checking out.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);

      // Simulate order processing
      setTimeout(() => {
        setIsDispatched(true);
        
        // Reset after showing success message
        setTimeout(() => {
          clearCart();
          setIsPaid(false);
          setIsDispatched(false);
          onClose();
          
          toast({
            title: "Order Complete!",
            description: "Thank you for your purchase. Your items are on the way!",
            variant: "default"
          });
        }, 2000);
      }, 2000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end">
      <div className="w-full max-w-md bg-gradient-to-b from-gray-900 to-black p-6 overflow-y-auto flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <ShoppingCart className="mr-2" />
            Your Cart
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <X />
          </button>
        </div>

        {/* Cart content */}
        {isPaid ? (
          <div className="flex-grow flex flex-col items-center justify-center">
            <GlassmorphismCard>
              <div className="p-8 text-center space-y-6">
                {isDispatched ? (
                  <>
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">Order Dispatched!</h3>
                    <p className="text-gray-300">Your products are on their way.</p>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-futuristic-neon rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-10 h-10 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold">Payment Successful!</h3>
                    <p className="text-gray-300">Processing your order...</p>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-4">
                      <div className="bg-futuristic-neon h-full animate-pulse"></div>
                    </div>
                  </>
                )}
              </div>
            </GlassmorphismCard>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <ShoppingCart className="w-16 h-16 text-gray-500 mb-4" />
            <h3 className="text-xl font-medium text-gray-300">Your cart is empty</h3>
            <p className="mt-2 text-gray-400">Add some upcycled products to get started!</p>
            <Button onClick={onClose} className="mt-6">Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="flex-grow">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="mb-4 bg-black/30 rounded-lg p-4 border border-gray-800"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-black/50 rounded-md overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-gray-700/50 to-gray-900/50 flex items-center justify-center text-gray-400">
                        Product
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-sm text-gray-400 mb-2">
                        {item.description.substring(0, 60)}
                        {item.description.length > 60 ? '...' : ''}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.materials.map((material, idx) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className="text-xs"
                          >
                            {material}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-700 rounded">
                          <button 
                            className="px-2 py-1 text-gray-300 hover:bg-gray-800"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 text-gray-300 hover:bg-gray-800"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-800 pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-400">Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <Button 
                className="w-full py-6 text-lg" 
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Checkout'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
