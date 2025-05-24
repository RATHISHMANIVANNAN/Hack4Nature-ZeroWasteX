
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  materials: string[];
  efficiency: string;
  costSavings: string;
  environmentalImpact: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [expanded, setExpanded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: '',
      materials: product.materials,
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="bg-black/30 border border-gray-800 rounded-lg overflow-hidden transition-all hover:border-primary/50">
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{product.name}</h3>
        <p className="text-sm text-gray-400 mb-3">
          {expanded ? product.description : `${product.description.substring(0, 100)}${product.description.length > 100 ? '...' : ''}`}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {product.materials.map((material, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {material}
            </Badge>
          ))}
        </div>

        {expanded && (
          <div className="mb-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Efficiency</span>
              <span>{product.efficiency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Cost Savings</span>
              <span>{product.costSavings}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Environmental Impact</span>
              <span className="text-green-400">{product.environmentalImpact}</span>
            </div>
          </div>
        )}

        <button 
          onClick={() => setExpanded(!expanded)} 
          className="text-xs flex items-center text-gray-400 hover:text-white mb-4"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              Show more
            </>
          )}
        </button>

        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
          <Button 
            onClick={handleAddToCart}
            size="sm"
            className="gap-1"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
