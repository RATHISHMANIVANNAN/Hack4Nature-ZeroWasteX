
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

interface CartIconProps {
  onClick?: () => void;
}

const CartIcon = ({ onClick }: CartIconProps) => {
  const { totalItems } = useCart();
  
  return (
    <button 
      className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors"
      onClick={onClick}
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <Badge 
          variant="green" 
          className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center rounded-full"
        >
          {totalItems > 99 ? '99+' : totalItems}
        </Badge>
      )}
    </button>
  );
};

export default CartIcon;
