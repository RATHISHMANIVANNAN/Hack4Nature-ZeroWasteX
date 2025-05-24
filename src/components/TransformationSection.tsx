
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { GlassmorphismCard } from './ui/GlassmorphismCard';

interface TransformationItem {
  id: number;
  title: string;
  description: string;
  fromType: string;
  outputType: string;
  efficiency: string;
  impact: string;
  icon: string;
}

const TransformationSection = () => {
  const transformations: TransformationItem[] = [
    {
      id: 1,
      title: "Eco Bricks",
      description: "Durable construction bricks formed from processed plastic waste",
      fromType: "Mixed Plastics",
      outputType: "Construction Materials",
      efficiency: "1 ton waste = 800 bricks",
      impact: "60% less CO₂ than concrete",
      icon: "🧱"
    },
    {
      id: 2,
      title: "Bioenzymes",
      description: "Natural cleaning agents and fertilizers from organic waste fermentation",
      fromType: "Food & Organic Waste",
      outputType: "Agricultural Products",
      efficiency: "90% conversion rate",
      impact: "Reduces chemical fertilizer need by 40%",
      icon: "🧪"
    },
    {
      id: 3,
      title: "Eco-Panels",
      description: "Lightweight composite boards made from processed paper and cardboard",
      fromType: "Paper & Cardboard",
      outputType: "Furniture & Insulation",
      efficiency: "85% material recovery",
      impact: "2x thermal insulation vs. standard materials",
      icon: "📋"
    },
    {
      id: 4,
      title: "Tech Elements",
      description: "Recovered precious metals and components from electronics",
      fromType: "Electronic Waste",
      outputType: "New Electronics & Jewelry",
      efficiency: "Recovers 17 rare elements",
      impact: "98% less mining impact than virgin extraction",
      icon: "💻"
    }
  ];

  return (
    <div className="min-h-screen py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-radial from-futuristic-purple/5 to-transparent opacity-50"></div>
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      <div className="absolute inset-0 noise-bg opacity-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <Badge variant="purple" className="mb-4">TRANSFORMATION</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
            Waste to <span className="text-gradient-purple">Innovation</span>
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Our AI-powered system transforms segregated waste into valuable products and materials
          </p>
        </div>
        
        {/* Transformation cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {transformations.map((item) => (
            <TransformationCard key={item.id} item={item} />
          ))}
        </div>
        
        {/* Stats section */}
        <div className="glass-morphism rounded-xl p-8 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-gradient-neon mb-2">94%</div>
              <div className="text-sm text-gray-400">Waste Recovery</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient-blue mb-2">2.7M</div>
              <div className="text-sm text-gray-400">Tons Processed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient-purple mb-2">86%</div>
              <div className="text-sm text-gray-400">Carbon Reduction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient-neon mb-2">$42M</div>
              <div className="text-sm text-gray-400">Value Created</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TransformationCard = ({ item }: { item: TransformationItem }) => {
  return (
    <GlassmorphismCard className="transform transition-all hover:-translate-y-2">
      <div className="flex flex-col h-full">
        <div className="text-4xl mb-4">{item.icon}</div>
        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
        <p className="text-gray-400 mb-4 flex-grow">{item.description}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-black/20 p-3 rounded">
            <div className="text-xs text-gray-500 mb-1">From</div>
            <div className="text-sm">{item.fromType}</div>
          </div>
          <div className="bg-black/20 p-3 rounded">
            <div className="text-xs text-gray-500 mb-1">To</div>
            <div className="text-sm">{item.outputType}</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-futuristic-neon/10 to-futuristic-blue/10 p-3 rounded">
          <div className="flex flex-col md:flex-row md:justify-between text-sm">
            <div className="mb-1 md:mb-0">⚡ {item.efficiency}</div>
            <div>🌱 {item.impact}</div>
          </div>
        </div>
      </div>
    </GlassmorphismCard>
  );
};

export default TransformationSection;
