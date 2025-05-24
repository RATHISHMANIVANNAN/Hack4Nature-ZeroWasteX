
import React from 'react';
import { Button } from './ui/button';

const CallToAction = () => {
  return (
    <div className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-futuristic-dark to-black"></div>
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      <div className="absolute inset-0 noise-bg opacity-10"></div>
      
      {/* Animated glow effect */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-futuristic-neon to-transparent"></div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-futuristic-blue to-transparent"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-glow text-futuristic-neon">
          Future is Waste-Free
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Join us in revolutionizing waste management with artificial intelligence and create a sustainable tomorrow
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Button 
            size="lg" 
            className="bg-futuristic-neon text-black hover:bg-futuristic-neon/90 transform hover:scale-105"
          >
            Learn More
          </Button>
          <Button 
            size="lg"
            className="bg-futuristic-blue hover:bg-futuristic-blue/90 transform hover:scale-105"
            onClick={() => {
              const demoSection = document.getElementById('demo');
              if (demoSection) {
                demoSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Try Demo
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transform hover:scale-105 border border-white/20"
          >
            Join Us
          </Button>
        </div>
        
        {/* Footer links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-left">
            <h3 className="text-lg font-medium mb-3 text-futuristic-neon">Technology</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#process" className="hover:text-white transition-colors">AI Vision</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">Classification</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">Processing</a></li>
              <li><a href="#transformation" className="hover:text-white transition-colors">Materials</a></li>
            </ul>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-medium mb-3 text-futuristic-blue">Products</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#transformation" className="hover:text-white transition-colors">Eco Bricks</a></li>
              <li><a href="#transformation" className="hover:text-white transition-colors">Bioenzymes</a></li>
              <li><a href="#transformation" className="hover:text-white transition-colors">Eco-Panels</a></li>
              <li><a href="#transformation" className="hover:text-white transition-colors">Tech Elements</a></li>
            </ul>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-medium mb-3 text-futuristic-purple">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mission</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-medium mb-3 text-white">Connect</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">Demo</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
