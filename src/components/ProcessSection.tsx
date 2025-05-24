
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { GlassmorphismCard } from './ui/GlassmorphismCard';

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  
  const steps = [
    { 
      id: 1, 
      title: "Detection", 
      description: "Computer vision identifies individual waste items from the mixed stream",
      icon: "🔍",
      color: "blue" 
    },
    { 
      id: 2, 
      title: "Classification", 
      description: "AI algorithms categorize each item by material, composition, and recyclability",
      icon: "🧠",
      color: "purple" 
    },
    { 
      id: 3, 
      title: "Analysis", 
      description: "Deep learning assesses condition, contamination level, and processing requirements",
      icon: "📊",
      color: "blue" 
    },
    { 
      id: 4, 
      title: "Scoring", 
      description: "Each item receives a sustainability score based on reuse potential and value",
      icon: "⭐",
      color: "green" 
    }
  ];

  return (
    <div className="min-h-screen py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      <div className="absolute inset-0 noise-bg opacity-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <Badge variant="green" className="mb-4">PROCESS</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
            How Our <span className="text-gradient-blue">AI Vision</span> Works
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Our advanced computer vision system breaks down waste processing into four intelligent steps
          </p>
        </div>
        
        {/* Process steps visualization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 mb-20">
          {steps.map((step) => (
            <GlassmorphismCard
              key={step.id}
              className={`transition-all duration-500 ${
                activeStep === step.id ? 'scale-105 shadow-xl shadow-futuristic-blue/20' : 'opacity-80'
              }`}
              onClick={() => setActiveStep(step.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`
                  flex items-center justify-center h-12 w-12 rounded-full text-xl
                  ${step.color === 'blue' ? 'bg-futuristic-blue/20 text-futuristic-blue' : ''}
                  ${step.color === 'purple' ? 'bg-futuristic-purple/20 text-futuristic-purple' : ''}
                  ${step.color === 'green' ? 'bg-futuristic-neon/20 text-futuristic-neon' : ''}
                `}>
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    <span className="mr-2 opacity-50">0{step.id}</span> 
                    {step.title}
                  </h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            </GlassmorphismCard>
          ))}
        </div>
        
        {/* Interactive visualization */}
        <div className="rounded-xl overflow-hidden glass-morphism p-6 md:p-10 relative">
          <div className="absolute top-0 right-0 p-4">
            <Badge 
              variant={activeStep === 1 ? "blue" : activeStep === 2 ? "purple" : activeStep === 4 ? "green" : "blue"}
            >
              Step {activeStep}: {steps.find(s => s.id === activeStep)?.title}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold mb-4">Waste Analysis</h3>
              <p className="text-gray-400 mb-4">
                {activeStep === 1 && "Our cameras capture 60 frames per second, identifying individual items even in mixed waste streams."}
                {activeStep === 2 && "Machine learning classifies items with 99.7% accuracy into categories like plastic, paper, metal, and organic matter."}
                {activeStep === 3 && "Each item is analyzed for composition, damage level, and processing requirements based on our database of 100,000+ items."}
                {activeStep === 4 && "Items receive a sustainability score that determines optimal processing path and potential value."}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="default">Real-time Processing</Badge>
                <Badge variant="default">94% Accuracy</Badge>
                <Badge variant="default">Multispectral Vision</Badge>
              </div>
            </div>
            
            <div className="md:col-span-2 h-64 md:h-80 relative rounded-lg overflow-hidden bg-black/20 border border-white/10">
              {/* Visual representation changes based on active step */}
              {activeStep === 1 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <DetectionVisual />
                </div>
              )}
              {activeStep === 2 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ClassificationVisual />
                </div>
              )}
              {activeStep === 3 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <AnalysisVisual />
                </div>
              )}
              {activeStep === 4 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ScoringVisual />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Visual components for each step
const DetectionVisual = () => (
  <div className="relative w-full h-full overflow-hidden">
    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-4">
      {Array.from({ length: 16 }).map((_, i) => (
        <div 
          key={i} 
          className="relative bg-black/40 rounded-sm overflow-hidden"
        >
          <div 
            className={`absolute inset-0 opacity-0 border-2 animate-pulse ${
              i % 3 === 0 ? 'border-futuristic-blue opacity-100' : ''
            }`}
          />
        </div>
      ))}
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-32 h-32 rounded-full border-2 border-futuristic-blue animate-pulse flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border-2 border-futuristic-blue/70 animate-pulse" />
      </div>
    </div>
    <div className="absolute bottom-2 left-2 right-2 h-8 bg-black/50 rounded flex items-center px-3">
      <div className="w-full bg-gray-700/50 h-2 rounded-full overflow-hidden">
        <div className="h-full w-3/4 bg-futuristic-blue rounded-full" />
      </div>
    </div>
  </div>
);

const ClassificationVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <div className="h-24 flex flex-col items-center justify-center bg-blue-500/20 rounded-lg border border-blue-500/40">
          <div className="text-lg">Plastic</div>
          <div className="text-sm text-blue-300">37%</div>
        </div>
        <div className="h-24 flex flex-col items-center justify-center bg-green-500/20 rounded-lg border border-green-500/40">
          <div className="text-lg">Organic</div>
          <div className="text-sm text-green-300">28%</div>
        </div>
        <div className="h-24 flex flex-col items-center justify-center bg-yellow-500/20 rounded-lg border border-yellow-500/40">
          <div className="text-lg">Paper</div>
          <div className="text-sm text-yellow-300">22%</div>
        </div>
        <div className="h-24 flex flex-col items-center justify-center bg-gray-500/20 rounded-lg border border-gray-500/40">
          <div className="text-lg">Metal</div>
          <div className="text-sm text-gray-300">13%</div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-2 left-2 right-2 h-8 bg-black/50 rounded flex items-center px-3">
      <div className="text-xs text-futuristic-purple mr-2">Classification:</div>
      <div className="text-xs text-white">PET-1 Plastic | 99.7% Confidence</div>
    </div>
  </div>
);

const AnalysisVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 grid-bg opacity-40" />
    <div className="absolute top-4 left-4 right-4 flex justify-between text-xs">
      <span className="text-gray-400">Analysis in progress...</span>
      <span className="text-futuristic-blue">Scanning...</span>
    </div>
    
    <div className="relative h-40 w-40 flex items-center justify-center">
      <div className="absolute w-full h-full rounded-full border-2 border-futuristic-blue/30 animate-pulse" />
      <div className="absolute w-3/4 h-3/4 rounded-full border border-futuristic-blue/40" />
      <div className="absolute w-1/2 h-1/2 rounded-full border border-futuristic-blue/60" />
      
      <div className="z-10 p-4 rounded-lg bg-black/60 text-center">
        <div className="text-futuristic-blue font-bold">Analyzing</div>
        <div className="text-xs text-gray-400">Components • Structure • Composition</div>
      </div>
    </div>
    
    <div className="absolute bottom-4 left-4 right-4">
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-black/40 p-2 rounded">
          <div className="text-xs text-gray-400">Polymer</div>
          <div className="text-sm">PET Type-1</div>
        </div>
        <div className="bg-black/40 p-2 rounded">
          <div className="text-xs text-gray-400">Condition</div>
          <div className="text-sm">87% Intact</div>
        </div>
        <div className="bg-black/40 p-2 rounded">
          <div className="text-xs text-gray-400">Process</div>
          <div className="text-sm">Melt-Ready</div>
        </div>
      </div>
    </div>
  </div>
);

const ScoringVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-56 h-56 rounded-full flex items-center justify-center bg-black/40 border border-white/10 relative">
        <div className="absolute inset-0 rounded-full" style={{ 
          background: "conic-gradient(#39FF14 85%, transparent 85%)",
          clipPath: "circle(50% at center)"
        }} />
        <div className="w-48 h-48 rounded-full bg-black/80 flex flex-col items-center justify-center">
          <div className="text-futuristic-neon text-5xl font-bold">85</div>
          <div className="text-sm text-gray-300">Sustainability Score</div>
        </div>
      </div>
    </div>
    
    <div className="absolute bottom-4 left-4 right-4 bg-black/40 rounded p-3">
      <div className="flex justify-between text-sm mb-1">
        <div>Recyclability</div>
        <div className="text-futuristic-neon">High</div>
      </div>
      <div className="flex justify-between text-sm mb-1">
        <div>Energy Savings</div>
        <div className="text-futuristic-neon">91%</div>
      </div>
      <div className="flex justify-between text-sm">
        <div>Value Recovery</div>
        <div className="text-futuristic-neon">$0.12/unit</div>
      </div>
    </div>
  </div>
);

export default ProcessSection;
