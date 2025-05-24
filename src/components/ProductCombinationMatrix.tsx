import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { GlassmorphismCard } from './ui/GlassmorphismCard';
import ProductCard from '@/components/ProductCard';

export const wasteTypes = [
  { type: 'Plastic', color: 'blue' },
  { type: 'Paper', color: 'yellow' },
  { type: 'Glass', color: 'red' },
  { type: 'Metal', color: 'gray' },
  { type: 'Organic', color: 'green' },
  { type: 'Electronic', color: 'purple' },
];

// Update productCombinations to include prices
export const productCombinations = [
  {
    id: "p1",
    product: "Multi-material Furniture",
    description: "Blend different waste materials to create functional and aesthetic furniture pieces like chairs, tables, and shelving units.",
    materials: ["Plastic", "Metal", "Wood"],
    efficiency: "85% material utilization",
    costSavings: "$120 per piece vs new furniture",
    environmentalImpact: "Diverts 15kg waste from landfill per item",
    minWeight: 5,
    idealWeight: 15,
    price: 149.99
  },
  {
    id: "p2",
    product: "Eco-Friendly Planters",
    description: "Transform waste containers into beautiful and functional planters for indoor and outdoor use.",
    materials: ["Plastic", "Glass"],
    efficiency: "90% material utilization",
    costSavings: "$30 per planter set",
    environmentalImpact: "Extends material lifecycle by 3+ years",
    minWeight: 0.5,
    idealWeight: 2,
    price: 34.99
  },
  {
    id: "p3",
    product: "Decorative Wall Art",
    description: "Create stunning wall art pieces by repurposing and arranging waste materials into beautiful patterns and designs.",
    materials: ["Metal", "Plastic", "Glass"],
    efficiency: "75% material utilization",
    costSavings: "$85 per art piece",
    environmentalImpact: "100% waste diversion from landfill",
    minWeight: 1,
    idealWeight: 3,
    price: 89.99
  },
  {
    id: "p4",
    product: "Outdoor Garden Edging",
    description: "Repurpose materials into attractive and durable garden edging to define flower beds and walkways.",
    materials: ["Glass", "Metal"],
    efficiency: "95% material utilization",
    costSavings: "$45 per garden section",
    environmentalImpact: "Prevents soil erosion and adds structure",
    minWeight: 3,
    idealWeight: 10,
    price: 59.99
  },
  {
    id: "p5",
    product: "Kitchen Utensil Holders",
    description: "Functional and stylish containers for organizing kitchen utensils, made from upcycled waste materials.",
    materials: ["Metal", "Glass"],
    efficiency: "80% material utilization",
    costSavings: "$25 per holder",
    environmentalImpact: "Reduces demand for new plastic products",
    minWeight: 0.5,
    idealWeight: 1.5,
    price: 29.99
  },
  {
    id: "p6",
    product: "Desk Organizers",
    description: "Modular desk organizer units made from various waste materials to help keep workspaces tidy.",
    materials: ["Paper", "Metal"],
    efficiency: "85% material utilization",
    costSavings: "$35 per organizer set",
    environmentalImpact: "Extends material lifecycle by 4+ years",
    minWeight: 0.5,
    idealWeight: 2,
    price: 39.99
  },
  {
    id: "p7",
    product: "Insulation Material",
    description: "Convert processed paper and plastic waste into effective insulation for buildings and containers.",
    materials: ["Paper", "Plastic"],
    efficiency: "98% material utilization",
    costSavings: "$3.50 per square foot vs commercial insulation",
    environmentalImpact: "Reduces energy consumption in buildings",
    minWeight: 5,
    idealWeight: 20,
    price: 49.99
  },
  {
    id: "p8",
    product: "Decorative Light Fixtures",
    description: "Create unique and artistic light fixtures from glass and metal waste materials.",
    materials: ["Glass", "Metal"],
    efficiency: "70% material utilization",
    costSavings: "$110 per fixture vs designer lighting",
    environmentalImpact: "Transforms waste into functional art",
    minWeight: 1,
    idealWeight: 3,
    price: 119.99
  },
  {
    id: "p9",
    product: "Patio Paving Stones",
    description: "Create durable and attractive paving stones for patios and walkways using mixed waste materials.",
    materials: ["Glass", "Plastic"],
    efficiency: "95% material utilization",
    costSavings: "$4.25 per square foot",
    environmentalImpact: "Long-lasting outdoor use, 10+ year lifespan",
    minWeight: 10,
    idealWeight: 50,
    price: 79.99
  },
  {
    id: "p10",
    product: "Composting Bin",
    description: "Build functional composting systems using upcycled containers and materials.",
    materials: ["Organic", "Plastic"],
    efficiency: "90% material utilization",
    costSavings: "$75 per composting system",
    environmentalImpact: "Enables ongoing waste reduction",
    minWeight: 2,
    idealWeight: 5,
    price: 69.99
  },
  {
    id: "p11",
    product: "Jewelry Collection",
    description: "Crafted jewelry items made from small pieces of repurposed waste, including pendants, earrings, and bracelets.",
    materials: ["Glass", "Metal", "Plastic"],
    efficiency: "60% material utilization",
    costSavings: "$45 per jewelry set",
    environmentalImpact: "Creates value from very small waste items",
    minWeight: 0.1,
    idealWeight: 0.5,
    price: 49.99
  },
  {
    id: "p12",
    product: "Sound Absorption Panels",
    description: "Transform waste materials into effective sound absorption panels for home studios, offices, or media rooms.",
    materials: ["Paper", "Fabric"],
    efficiency: "95% material utilization",
    costSavings: "$65 per panel vs commercial options",
    environmentalImpact: "Improves acoustic environments without new resources",
    minWeight: 1,
    idealWeight: 3,
    price: 79.99
  },
  {
    id: "p13", 
    product: "Home Decor Set",
    description: "Collection of coordinated home decor items made from various waste materials, including vases, trays, and decorative objects.",
    materials: ["Glass", "Metal", "Plastic"],
    efficiency: "80% material utilization",
    costSavings: "$95 per set vs retail decor",
    environmentalImpact: "Creates lasting items from mixed waste",
    minWeight: 2,
    idealWeight: 5,
    price: 99.99
  },
  {
    id: "p14",
    product: "Office Supplies Organizer",
    description: "Custom organizer for office supplies made from repurposed waste materials.",
    materials: ["Paper", "Plastic"],
    efficiency: "85% material utilization",
    costSavings: "$40 vs commercial organizers",
    environmentalImpact: "Reduces new plastic consumption",
    minWeight: 0.5,
    idealWeight: 2,
    price: 44.99
  },
  {
    id: "p15",
    product: "Garden Tool Storage",
    description: "Durable outdoor storage solution for garden tools made from upcycled waste materials.",
    materials: ["Plastic", "Metal"],
    efficiency: "90% material utilization",
    costSavings: "$85 vs commercial storage",
    environmentalImpact: "Weather-resistant and long-lasting",
    minWeight: 4,
    idealWeight: 10,
    price: 89.99
  }
];

// Add more generic products for combinations without specific matches
const genericProducts = [
  {
    id: "g1",
    product: "Multi-material Art Installation",
    description: "Creative art installation that can be adapted to use any combination of waste materials. Perfect for homes, offices, or public spaces.",
    materials: ["Mixed Materials"],
    efficiency: "75% material utilization",
    costSavings: "$120 per installation vs commercial art",
    environmentalImpact: "100% waste diversion from landfill",
    price: 129.99
  },
  {
    id: "g2",
    product: "Upcycled Storage Solutions",
    description: "Functional storage containers and organizers that can be made from virtually any combination of waste materials.",
    materials: ["Mixed Materials"],
    efficiency: "80% material utilization",
    costSavings: "$65 per storage set",
    environmentalImpact: "Extends material lifecycle by 5+ years",
    price: 69.99
  },
  {
    id: "g3",
    product: "Educational Waste Kit",
    description: "Educational material showcasing waste transformation processes. Ideal for schools, museums, or sustainability education.",
    materials: ["Mixed Materials"],
    efficiency: "95% material utilization",
    costSavings: "$50 per educational kit",
    environmentalImpact: "Raises awareness and teaches recycling",
    price: 54.99
  },
  {
    id: "g4",
    product: "Modular Room Divider",
    description: "Customizable room divider panels that can be arranged to create privacy or define spaces within a room.",
    materials: ["Mixed Materials"],
    efficiency: "85% material utilization",
    costSavings: "$200 vs commercial room dividers",
    environmentalImpact: "Creates functional, long-lasting furniture",
    price: 219.99
  },
  {
    id: "g5",
    product: "Decorative Mosaic Kit",
    description: "Create your own mosaic art pieces using provided templates and adhesives with your waste materials.",
    materials: ["Mixed Materials"],
    efficiency: "70% material utilization",
    costSavings: "$45 vs retail craft kits",
    environmentalImpact: "Transforms small waste pieces into art",
    price: 49.99
  }
];

interface ProductCombinationMatrixProps {
  selectedWasteItems: {
    name: string;
    type: string;
    weight: number;
  }[];
}

const ProductCombinationMatrix = ({ selectedWasteItems }: ProductCombinationMatrixProps) => {
  const [selectedMaterialType, setSelectedMaterialType] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const materialTypes = ['All', ...wasteTypes.map(w => w.type)];

  const materialTypeButtons = materialTypes.map(type => (
    <button
      key={type}
      className={`px-4 py-2 rounded-full ${
        selectedMaterialType === type
          ? 'bg-primary text-white'
          : 'bg-gray-800 hover:bg-gray-700 text-white'
      }`}
      onClick={() => setSelectedMaterialType(type)}
    >
      {type}
    </button>
  ));

  // Modify getCompatibleProducts to ensure at least 3 products
  const getCompatibleProducts = () => {
    let selectedTypes = selectedWasteItems.map(item => item.type);
    selectedTypes = [...new Set(selectedTypes)]; // Remove duplicates
    
    let filteredProducts = [];
    
    // Filter products by selectedMaterialType if it's not "All"
    const productsToFilter = selectedMaterialType === 'All' 
      ? productCombinations 
      : productCombinations.filter(p => p.materials.includes(selectedMaterialType));
    
    if (selectedTypes.length === 0) {
      // No items selected, show all products
      filteredProducts = productsToFilter;
    } else {
      // Find products with matching materials
      filteredProducts = productsToFilter.filter(product => {
        // For a product to match, at least one of the selected waste types must be in its materials
        return selectedTypes.some(type => product.materials.includes(type));
      });

      // Sort products by compatibility - more matches = higher priority
      filteredProducts.sort((a, b) => {
        const aMatches = a.materials.filter(m => selectedTypes.includes(m)).length;
        const bMatches = b.materials.filter(m => selectedTypes.includes(m)).length;
        return bMatches - aMatches;
      });
    }

    // If we don't have at least 3 products, add generic products
    if (filteredProducts.length < 3) {
      // Add generic products but customize them with selected material types
      const customizedGenerics = genericProducts.map(product => ({
        ...product,
        id: `${product.id}-${Date.now()}`, // Ensure unique ID
        materials: selectedTypes.length > 0 ? selectedTypes : ['Mixed Materials'],
      }));
      
      // Add enough generic products to have at least 3 total products
      const neededGenerics = Math.max(3 - filteredProducts.length, 0);
      filteredProducts = [
        ...filteredProducts,
        ...customizedGenerics.slice(0, neededGenerics)
      ];
    }

    return filteredProducts;
  };

  const compatibleProducts = getCompatibleProducts();
  
  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = compatibleProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(compatibleProducts.length / productsPerPage);

  // Add pagination controls
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Update the render with ProductCard components and pagination
  return (
    <div className="mt-8">
      <GlassmorphismCard>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Potential Products from Your Waste</h2>
          
          <div className="mb-6 flex flex-wrap gap-2">
            {materialTypeButtons}
          </div>
          
          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded ${
                        currentPage === 1 
                          ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                          : 'bg-gray-800 hover:bg-gray-700 text-white'
                      }`}
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-3 py-1 rounded ${
                          currentPage === number
                            ? 'bg-primary text-white'
                            : 'bg-gray-800 hover:bg-gray-700 text-white'
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded ${
                        currentPage === totalPages
                          ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-800 hover:bg-gray-700 text-white'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No compatible products found for the selected material type.</p>
            </div>
          )}
        </div>
      </GlassmorphismCard>
    </div>
  );
};

export default ProductCombinationMatrix;
