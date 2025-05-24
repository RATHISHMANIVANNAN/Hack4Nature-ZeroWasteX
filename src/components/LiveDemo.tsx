import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import ProductCombinationMatrix, { wasteTypes, productCombinations } from './ProductCombinationMatrix';
import { GlassmorphismCard } from './ui/GlassmorphismCard';

interface WasteItem {
  id: string;
  name: string;
  type: string;
  weight: number;
  count: number;
}

const predefinedWasteItems: WasteItem[] = [
  { id: 'w1', name: 'Plastic Bottle', type: 'Plastic', weight: 0.5, count: 1 },
  { id: 'w2', name: 'Cardboard Box', type: 'Paper', weight: 1.0, count: 1 },
  { id: 'w3', name: 'Glass Jar', type: 'Glass', weight: 0.8, count: 1 },
  { id: 'w4', name: 'Aluminum Can', type: 'Metal', weight: 0.3, count: 1 },
  { id: 'w5', name: 'Fruit Peels', type: 'Organic', weight: 0.7, count: 1 },
  { id: 'w6', name: 'Old Smartphone', type: 'Electronic', weight: 0.4, count: 1 },
  { id: 'w7', name: 'Shopping Bag', type: 'Plastic', weight: 0.2, count: 1 },
  { id: 'w8', name: 'Magazine', type: 'Paper', weight: 0.5, count: 1 },
  { id: 'w9', name: 'Wine Bottle', type: 'Glass', weight: 1.2, count: 1 },
  { id: 'w10', name: 'Steel Utensil', type: 'Metal', weight: 0.6, count: 1 },
  { id: 'w11', name: 'Coffee Grounds', type: 'Organic', weight: 0.4, count: 1 },
  { id: 'w12', name: 'Old Keyboard', type: 'Electronic', weight: 0.9, count: 1 },
];

const LiveDemo = () => {
  const [selectedWasteItems, setSelectedWasteItems] = useState<WasteItem[]>([]);
  const [availableWasteItems, setAvailableWasteItems] = useState<WasteItem[]>(predefinedWasteItems);
  const [customItemName, setCustomItemName] = useState('');
  const [customItemType, setCustomItemType] = useState('Plastic');
  const [customItemWeight, setCustomItemWeight] = useState('1.0');
  const [currentStep, setCurrentStep] = useState(0);
  const [showCombinations, setShowCombinations] = useState(false);
  
  // Format selectedWasteItems for the ProductCombinationMatrix
  const selectedItems = selectedWasteItems.map(item => ({
    name: item.name,
    type: item.type,
    weight: item.weight * item.count
  }));

  const handleAddCustomItem = () => {
    if (customItemName.trim() === '') return;
    
    const weight = parseFloat(customItemWeight);
    if (isNaN(weight) || weight <= 0) return;
    
    const newItem: WasteItem = {
      id: `custom-${Date.now()}`,
      name: customItemName,
      type: customItemType,
      weight: weight,
      count: 1
    };
    
    setAvailableWasteItems(prev => [...prev, newItem]);
    setCustomItemName('');
    setCustomItemWeight('1.0');
  };
  
  const toggleItemSelection = (item: WasteItem) => {
    const existingItemIndex = selectedWasteItems.findIndex(
      selectedItem => selectedItem.id === item.id
    );
    
    if (existingItemIndex >= 0) {
      // Item already selected, increase count
      const updatedItems = [...selectedWasteItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        count: updatedItems[existingItemIndex].count + 1
      };
      setSelectedWasteItems(updatedItems);
    } else {
      // Add new item
      setSelectedWasteItems(prev => [...prev, { ...item, count: 1 }]);
    }
  };
  
  const decreaseItemCount = (item: WasteItem) => {
    const existingItemIndex = selectedWasteItems.findIndex(
      selectedItem => selectedItem.id === item.id
    );
    
    if (existingItemIndex >= 0) {
      const updatedItems = [...selectedWasteItems];
      if (updatedItems[existingItemIndex].count > 1) {
        // Decrease count
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          count: updatedItems[existingItemIndex].count - 1
        };
        setSelectedWasteItems(updatedItems);
      } else {
        // Remove item
        setSelectedWasteItems(
          updatedItems.filter((_, index) => index !== existingItemIndex)
        );
      }
    }
  };
  
  const removeItem = (item: WasteItem) => {
    setSelectedWasteItems(
      selectedWasteItems.filter(selectedItem => selectedItem.id !== item.id)
    );
  };
  
  const totalWeight = selectedWasteItems.reduce(
    (sum, item) => sum + (item.weight * item.count), 
    0
  );

  const startSimulation = () => {
    if (selectedWasteItems.length > 0) {
      setCurrentStep(1);
    }
  };

  const resetDemo = () => {
    setSelectedWasteItems([]);
    setCurrentStep(0);
    setShowCombinations(false);
  };

  const advanceStep = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowCombinations(true);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (currentStep > 0 && currentStep < 5) {
      timeout = setTimeout(() => {
        advanceStep();
      }, 3000);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [currentStep]);

  const renderWasteSelector = () => {
    return (
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Select Waste Materials for Processing
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Available waste items */}
          <div>
            <h3 className="text-xl font-bold mb-4">Available Waste Items</h3>
            <div className="bg-black/20 p-4 rounded-lg">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableWasteItems.map((item) => {
                  const isSelected = selectedWasteItems.some(
                    selectedItem => selectedItem.id === item.id
                  );
                  const selectedItem = selectedWasteItems.find(
                    selectedItem => selectedItem.id === item.id
                  );
                  const count = selectedItem ? selectedItem.count : 0;
                  
                  return (
                    <div 
                      key={item.id} 
                      className={`waste-item-badge relative py-3 px-4 rounded-lg border ${
                        isSelected ? 'border-2 border-primary selected' : 'border border-gray-700'
                      }`}
                      onClick={() => toggleItemSelection(item)}
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="flex justify-between text-sm mt-1">
                        <Badge 
                          variant={
                            wasteTypes.find(w => w.type === item.type)?.color as any || 'default'
                          }
                        >
                          {item.type}
                        </Badge>
                        <span className="text-gray-400">{item.weight}kg</span>
                      </div>
                      {count > 0 && (
                        <div className="item-counter">{count}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Add custom waste item */}
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-3">Add Custom Waste Item</h3>
              <div className="bg-black/20 p-4 rounded-lg">
                <div className="grid grid-cols-1 gap-3">
                  <input
                    type="text"
                    value={customItemName}
                    onChange={(e) => setCustomItemName(e.target.value)}
                    placeholder="Item name"
                    className="w-full px-3 py-2 bg-black/30 rounded border border-gray-700 text-white"
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={customItemType}
                      onChange={(e) => setCustomItemType(e.target.value)}
                      className="px-3 py-2 bg-black/30 rounded border border-gray-700 text-white"
                    >
                      {wasteTypes.map((type) => (
                        <option key={type.type} value={type.type}>
                          {type.type}
                        </option>
                      ))}
                    </select>
                    
                    <input
                      type="number"
                      value={customItemWeight}
                      onChange={(e) => setCustomItemWeight(e.target.value)}
                      placeholder="Weight (kg)"
                      min="0.1"
                      step="0.1"
                      className="px-3 py-2 bg-black/30 rounded border border-gray-700 text-white"
                    />
                  </div>
                  
                  <button
                    onClick={handleAddCustomItem}
                    className="mt-2 py-2 px-4 bg-primary hover:bg-primary/80 text-white rounded transition-colors"
                  >
                    Add Item
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Selected waste items */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Selected Items ({selectedWasteItems.length > 0 
                ? `${selectedWasteItems.reduce((sum, item) => sum + item.count, 0)} items, ${totalWeight.toFixed(1)}kg total`
                : "None"}
              )
            </h3>
            <div className="bg-black/20 p-4 rounded-lg min-h-[200px]">
              {selectedWasteItems.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  Select waste items to process
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedWasteItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-black/30 p-3 rounded">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge 
                            variant={
                              wasteTypes.find(w => w.type === item.type)?.color as any || 'default'
                            }
                          >
                            {item.type}
                          </Badge>
                          <span className="text-gray-400">{(item.weight * item.count).toFixed(1)}kg</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-gray-600 rounded">
                          <button
                            onClick={() => decreaseItemCount(item)}
                            className="px-2 py-1 text-gray-300 hover:bg-gray-700 rounded-l"
                          >
                            -
                          </button>
                          <span className="px-3 py-1">{item.count}</span>
                          <button
                            onClick={() => toggleItemSelection(item)}
                            className="px-2 py-1 text-gray-300 hover:bg-gray-700 rounded-r"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item)}
                          className="p-1 text-red-500 hover:text-red-400"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <button
                onClick={startSimulation}
                disabled={selectedWasteItems.length === 0}
                className={`w-full py-3 rounded text-white font-bold transition-colors ${
                  selectedWasteItems.length === 0 
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'bg-futuristic-neon hover:bg-futuristic-neon/80'
                }`}
              >
                Start AI Processing Simulation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProcessingStep = () => {
    let content;
    
    switch (currentStep) {
      case 1:
        content = (
          <>
            <h3 className="text-xl font-bold mb-4">Step 1: AI Detection & Categorization</h3>
            <div className="bg-black/20 p-6 rounded-lg relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2">
                  <div className="relative border-2 border-futuristic-blue rounded-lg p-4 min-h-[200px]">
                    <div className="flex flex-wrap gap-3 mb-4">
                      {selectedWasteItems.map((item) => (
                        <Badge 
                          key={item.id}
                          variant={
                            wasteTypes.find(w => w.type === item.type)?.color as any || 'default'
                          }
                          className="animate-pulse"
                        >
                          {item.name} ({item.count}x)
                        </Badge>
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-futuristic-blue/10">
                      <div className="absolute left-0 top-0 w-full h-1 bg-futuristic-blue/50 animate-scanning"></div>
                      <div className="absolute left-0 top-0 w-1 h-full bg-futuristic-blue/50 animate-scanning-vertical"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-black/40 h-full p-4 rounded-lg">
                    <h4 className="text-futuristic-blue font-bold mb-2">AI Processing...</h4>
                    <div className="text-sm space-y-2">
                      <p className="text-gray-300">• Scanning waste composition</p>
                      <p className="text-gray-300">• Analyzing material properties</p>
                      <p className="text-gray-300">• Identifying contaminants</p>
                      <p className="text-gray-300">• Calculating recycling potential</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
        break;
        
      case 2:
        content = (
          <>
            <h3 className="text-xl font-bold mb-4">Step 2: Material Classification</h3>
            <div className="bg-black/20 p-6 rounded-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Array.from(new Set(selectedWasteItems.map(item => item.type))).map((type) => {
                  const typeItems = selectedWasteItems.filter(item => item.type === type);
                  const typeWeight = typeItems.reduce((sum, item) => sum + (item.weight * item.count), 0);
                  const typeColor = wasteTypes.find(w => w.type === type)?.color as any || 'default';
                  
                  return (
                    <div key={type} className={`border-l-4 border-${typeColor}-500 bg-black/30 p-4 rounded-lg`}>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <Badge variant={typeColor} className="mr-2">{type}</Badge>
                          <span className="font-bold">{typeWeight.toFixed(1)}kg</span>
                        </div>
                        <span className="text-sm text-gray-400">
                          {Math.round((typeWeight / totalWeight) * 100)}% of total
                        </span>
                      </div>
                      <div className="space-y-2">
                        {typeItems.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm bg-black/20 p-2 rounded">
                            <span>{item.name}</span>
                            <span>{item.count > 1 ? `${item.count}x (${(item.weight * item.count).toFixed(1)}kg)` : `${item.weight}kg`}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        );
        break;
        
      case 3:
        content = (
          <>
            <h3 className="text-xl font-bold mb-4">Step 3: Segregation Analysis</h3>
            <div className="bg-black/20 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2">
                  <div className="relative rounded-lg overflow-hidden border border-gray-700 min-h-[250px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black/90"></div>
                    <div className="absolute inset-0 p-4">
                      <div className="grid grid-cols-3 gap-3 h-full">
                        {wasteTypes.map((type) => {
                          const typeItems = selectedWasteItems.filter(item => item.type === type.type);
                          const hasItems = typeItems.length > 0;
                          
                          return (
                            <div 
                              key={type.type}
                              className={`border rounded-lg p-3 flex flex-col ${
                                hasItems 
                                  ? `border-${type.color}-500/50 bg-${type.color}-500/10` 
                                  : 'border-gray-800 bg-black/20'
                              }`}
                            >
                              <div className="text-center mb-2">
                                <Badge variant={type.color as any}>
                                  {type.type}
                                </Badge>
                              </div>
                              <div className="flex-1 overflow-auto text-xs scrollbar-thin">
                                {hasItems ? (
                                  <div className="space-y-1">
                                    {typeItems.map((item) => (
                                      <div 
                                        key={item.id} 
                                        className={`p-1 rounded bg-${type.color}-500/20 text-center animate-pulse`}
                                      >
                                        {item.name} {item.count > 1 && `(${item.count})`}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-gray-500 text-center">No items</div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-black/40 p-4 rounded-lg">
                  <h4 className="text-futuristic-blue font-bold mb-2">Segregation Metrics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Purity Score</div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                      <div className="text-right text-sm mt-1">95%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Processing Efficiency</div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <div className="text-right text-sm mt-1">92%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Material Recovery</div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                      </div>
                      <div className="text-right text-sm mt-1">98%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
        break;
        
      case 4:
        content = (
          <>
            <h3 className="text-xl font-bold mb-4">Step 4: Compatibility Analysis</h3>
            <div className="bg-black/20 p-6 rounded-lg">
              <div className="overflow-x-auto pb-4">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 border border-gray-700 bg-gray-800">Material Types</th>
                      {wasteTypes.map((type) => (
                        <th key={type.type} className="p-2 border border-gray-700 bg-gray-800">
                          <Badge variant={type.color as any}>{type.type}</Badge>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {wasteTypes.map((rowType) => {
                      const rowTypePresent = selectedWasteItems.some(item => item.type === rowType.type);
                      
                      return (
                        <tr key={rowType.type}>
                          <td className={`p-2 border border-gray-700 ${rowTypePresent ? 'bg-gray-800' : 'bg-gray-900'}`}>
                            <Badge variant={rowType.color as any}>{rowType.type}</Badge>
                          </td>
                          {wasteTypes.map((colType) => {
                            const colTypePresent = selectedWasteItems.some(item => item.type === colType.type);
                            
                            // Check if both material types are present
                            const bothPresent = rowTypePresent && colTypePresent;
                            
                            // Check if there's a product combination for these materials
                            const hasCombo = productCombinations.some(
                              combo => 
                                combo.materials.includes(rowType.type) && 
                                combo.materials.includes(colType.type)
                            );
                            
                            let cellColor = 'bg-gray-900';
                            let compatText = 'N/A';
                            
                            if (bothPresent) {
                              if (rowType.type === colType.type) {
                                cellColor = 'bg-green-900/30';
                                compatText = 'High';
                              } else if (hasCombo) {
                                cellColor = 'bg-blue-900/30';
                                compatText = 'Good';
                              } else {
                                cellColor = 'bg-red-900/30';
                                compatText = 'Low';
                              }
                            }
                            
                            return (
                              <td 
                                key={colType.type} 
                                className={`p-2 border border-gray-700 text-center ${cellColor}`}
                              >
                                <div className={`text-xs ${
                                  compatText === 'High' ? 'text-green-400' : 
                                  compatText === 'Good' ? 'text-blue-400' : 
                                  compatText === 'Low' ? 'text-red-400' : 'text-gray-500'
                                }`}>
                                  {compatText}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-900/30 rounded mr-2"></div>
                  <span className="text-sm">High Compatibility</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-900/30 rounded mr-2"></div>
                  <span className="text-sm">Good Compatibility</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-900/30 rounded mr-2"></div>
                  <span className="text-sm">Low Compatibility</span>
                </div>
              </div>
            </div>
          </>
        );
        break;
        
      case 5:
        content = (
          <>
            <h3 className="text-xl font-bold mb-4">Step 5: Transformation Opportunities</h3>
            <div className="bg-black/20 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-bold mb-3">Material Statistics</h4>
                  <div className="space-y-3">
                    {Array.from(new Set(selectedWasteItems.map(item => item.type))).map((type) => {
                      const typeItems = selectedWasteItems.filter(item => item.type === type);
                      const typeWeight = typeItems.reduce((sum, item) => sum + (item.weight * item.count), 0);
                      const typePercentage = (typeWeight / totalWeight) * 100;
                      
                      return (
                        <div key={type}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{type}</span>
                            <span>{typeWeight.toFixed(1)}kg ({typePercentage.toFixed(1)}%)</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`bg-${wasteTypes.find(w => w.type === type)?.color || 'blue'}-500 h-2 rounded-full`}
                              style={{ width: `${typePercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-lg font-bold mb-3">Environmental Impact</h4>
                    <div className="bg-black/30 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">
                            {Math.round(totalWeight * 2.5)}kg
                          </div>
                          <div className="text-xs text-gray-400">CO₂ Avoided</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">
                            {Math.round(totalWeight * 1.8)}L
                          </div>
                          <div className="text-xs text-gray-400">Water Saved</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">
                            {Math.round(totalWeight * 3.2)}kWh
                          </div>
                          <div className="text-xs text-gray-400">Energy Saved</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-400">
                            ${Math.round(totalWeight * 12)}
                          </div>
                          <div className="text-xs text-gray-400">Economic Value</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold mb-3">Potential Products</h4>
                  <div className="bg-black/30 p-4 rounded-lg flex flex-col h-full">
                    <div className="flex-grow space-y-3">
                      {/* Show a preview of possible products */}
                      {(() => {
                        // Filter products that can be made from our waste materials
                        const possibleProducts = productCombinations
                          .filter(combo => {
                            // Check if we have all materials for this combo
                            const materialCounts: Record<string, number> = {};
                            combo.materials.forEach(material => {
                              if (!materialCounts[material]) materialCounts[material] = 0;
                              materialCounts[material]++;
                            });
                            
                            // Check if we have enough of each material
                            for (const material in materialCounts) {
                              const requiredCount = materialCounts[material];
                              const availableWeight = selectedWasteItems
                                .filter(item => item.type === material)
                                .reduce((sum, item) => sum + (item.weight * item.count), 0);
                              
                              if (availableWeight < requiredCount) {
                                return false;
                              }
                            }
                            
                            return true;
                          })
                          .slice(0, 3);
                        
                        // If no compatible products are found, use our generic products
                        const productsToShow = possibleProducts.length > 0 ? possibleProducts : ensureProducts();
                        
                        return productsToShow.map((combo, index) => (
                          <div key={index} className="bg-black/20 p-3 rounded-lg">
                            <div className="font-bold">{combo.product}</div>
                            <div className="text-sm text-gray-400">{combo.description}</div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {combo.materials.map((material, mIdx) => (
                                <Badge 
                                  key={mIdx}
                                  variant={
                                    wasteTypes.find(w => w.type === material)?.color as any || 'default'
                                  }
                                  className="text-xs"
                                >
                                  {material}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                    
                    <button
                      onClick={() => setShowCombinations(true)}
                      className="mt-4 w-full py-2 bg-primary hover:bg-primary/80 text-white rounded transition-colors"
                    >
                      View All Possible Products
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
        break;
        
      default:
        content = null;
    }
    
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            AI Waste Processing Simulation
          </h2>
          <div className="flex gap-3">
            <button
              onClick={advanceStep}
              className="py-2 px-4 bg-futuristic-blue hover:bg-futuristic-blue/80 text-white rounded transition-colors"
            >
              {currentStep < 5 ? "Skip to Next Step" : "View Product Combinations"}
            </button>
            <button
              onClick={resetDemo}
              className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
            >
              Reset Demo
            </button>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center relative">
            {[1, 2, 3, 4, 5].map((step) => (
              <div 
                key={step}
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step 
                    ? 'bg-futuristic-neon text-black' 
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                {step}
              </div>
            ))}
            <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-700">
              <div 
                className="h-0.5 bg-futuristic-neon transition-all duration-500" 
                style={{ width: `${(currentStep - 1) * 25}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          {content}
        </div>
      </div>
    );
  };

  const renderProductCombinations = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Product Combinations
          </h2>
          <button
            onClick={resetDemo}
            className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
          >
            Start Over
          </button>
        </div>
        
        <div className="mb-8">
          <GlassmorphismCard>
            <div className="p-2">
              <h3 className="text-xl font-bold mb-4">Waste Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
                {Array.from(new Set(selectedWasteItems.map(item => item.type))).map((type) => {
                  const typeItems = selectedWasteItems.filter(item => item.type === type);
                  const typeCount = typeItems.reduce((sum, item) => sum + item.count, 0);
                  const typeWeight = typeItems.reduce((sum, item) => sum + (item.weight * item.count), 0);
                  
                  return (
                    <div key={type} className="bg-black/20 p-3 rounded-lg text-center">
                      <Badge variant={
                        wasteTypes.find(w => w.type === type)?.color as any || 'default'
                      }>
                        {type}
                      </Badge>
                      <div className="mt-2 text-xl font-bold">{typeCount}</div>
                      <div className="text-xs text-gray-400">items</div>
                      <div className="mt-1 font-medium">{typeWeight.toFixed(1)}kg</div>
                    </div>
                  );
                })}
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-3 rounded-lg text-center">
                  <Badge variant="purple">Total</Badge>
                  <div className="mt-2 text-xl font-bold">
                    {selectedWasteItems.reduce((sum, item) => sum + item.count, 0)}
                  </div>
                  <div className="text-xs text-gray-400">items</div>
                  <div className="mt-1 font-medium">{totalWeight.toFixed(1)}kg</div>
                </div>
              </div>
            </div>
          </GlassmorphismCard>
        </div>
        
        <ProductCombinationMatrix selectedWasteItems={selectedItems} />
      </div>
    );
  };

  const ensureProducts = () => {
    // If no compatible products are found based on the selected waste materials,
    // we'll suggest generic products that can be made from common waste materials
    const genericProducts = [
      {
        product: "Multi-material Art Installation",
        description: "Creative art installation using diverse waste materials",
        materials: Array.from(new Set(selectedWasteItems.map(item => item.type))),
        efficiency: "75% material utilization",
        costSavings: "$85 per installation",
        environmentalImpact: "100% waste diversion from landfill",
        minWeight: 1,
        idealWeight: 5
      },
      {
        product: "Upcycled Furniture",
        description: "Functional furniture pieces made from mixed waste materials",
        materials: Array.from(new Set(selectedWasteItems.map(item => item.type))),
        efficiency: "80% material utilization",
        costSavings: "$120 per piece vs new furniture",
        environmentalImpact: "Extends material lifecycle by 5+ years",
        minWeight: 2,
        idealWeight: 10
      },
      {
        product: "Educational Waste Kit",
        description: "Educational material showcasing waste transformation",
        materials: Array.from(new Set(selectedWasteItems.map(item => item.type))),
        efficiency: "95% material utilization",
        costSavings: "$50 per educational kit",
        environmentalImpact: "Raises awareness and teaches recycling",
        minWeight: 0.5,
        idealWeight: 3
      }
    ];
    
    return genericProducts;
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      <div className="absolute inset-0 noise-bg opacity-5"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {!currentStep && !showCombinations && renderWasteSelector()}
          {currentStep > 0 && !showCombinations && renderProcessingStep()}
          {showCombinations && renderProductCombinations()}
        </div>
      </div>
    </div>
  );
};

export default LiveDemo;
