
import React, { useRef } from 'react';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const conveyor = useRef<HTMLDivElement>(null);
  
  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      <div className="absolute inset-0 noise-bg opacity-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient">
            <span className="text-gradient-neon">ZeroWasteX</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Transforming tomorrow's waste management with intelligent computer vision
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg"
              className="bg-futuristic-neon/20 text-futuristic-neon hover:bg-futuristic-neon/30 w-full sm:w-auto"
              onClick={() => {
                const processSection = document.getElementById('process');
                if (processSection) {
                  processSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Explore Technology
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="bg-white/5 hover:bg-white/10 w-full sm:w-auto"
              onClick={scrollToDemo}
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
      
      {/* Animated conveyor belt */}
      <div className="w-full h-32 md:h-48 relative overflow-hidden bg-black/40 border-t border-b border-white/10">
        {/* Conveyor track lines */}
        <div className="absolute inset-0 flex items-center">
          <div className="h-2 w-full bg-gradient-to-r from-futuristic-neon/30 to-futuristic-blue/30"></div>
        </div>
        
        {/* Conveyor Items */}
        <div ref={conveyor} className="absolute inset-0 whitespace-nowrap">
          <div className="inline-flex animate-conveyor">
            <ConveyorItem type="bottle" />
            <ConveyorItem type="can" />
            <ConveyorItem type="paper" />
            <ConveyorItem type="organic" />
            <ConveyorItem type="electronic" />
            <ConveyorItem type="bottle" />
            <ConveyorItem type="can" />
            <ConveyorItem type="paper" />
            <ConveyorItem type="organic" />
            <ConveyorItem type="electronic" />
          </div>
          <div className="inline-flex animate-conveyor">
            <ConveyorItem type="bottle" />
            <ConveyorItem type="can" />
            <ConveyorItem type="paper" />
            <ConveyorItem type="organic" />
            <ConveyorItem type="electronic" />
            <ConveyorItem type="bottle" />
            <ConveyorItem type="can" />
            <ConveyorItem type="paper" />
            <ConveyorItem type="organic" />
            <ConveyorItem type="electronic" />
          </div>
        </div>
        
        {/* Scanning effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-1 bg-futuristic-neon/80 blur-sm absolute left-1/2 transform -translate-x-1/2 animate-scanning"></div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center cursor-pointer" onClick={() => {
          const processSection = document.getElementById('process');
          if (processSection) {
            processSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}>
          <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
          <ChevronDown className="text-futuristic-neon" />
        </div>
      </div>
    </div>
  );
};

const ConveyorItem = ({ type }: { type: 'bottle' | 'can' | 'paper' | 'organic' | 'electronic' }) => {
  const getItemStyles = () => {
    switch(type) {
      case 'bottle':
        return "bg-blue-500/40";
      case 'can':
        return "bg-gray-400/40";
      case 'paper':
        return "bg-yellow-700/40";
      case 'organic':
        return "bg-green-600/40";
      case 'electronic':
        return "bg-red-500/40";
    }
  };
  
  const getItemShape = () => {
    switch(type) {
      case 'bottle':
        return "h-16 w-6 rounded-full";
      case 'can':
        return "h-10 w-10 rounded-md";
      case 'paper':
        return "h-8 w-12 rounded-sm";
      case 'organic':
        return "h-8 w-8 rounded-full";
      case 'electronic':
        return "h-12 w-16 rounded";
    }
  };
  
  return (
    <div className="inline-block mx-6 my-4">
      <div className={`${getItemShape()} ${getItemStyles()} border border-white/20 shadow-lg`}></div>
    </div>
  );
};

export default Hero;
