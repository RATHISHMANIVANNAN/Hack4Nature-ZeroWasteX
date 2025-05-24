
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import ProcessSection from '@/components/ProcessSection';
import TransformationSection from '@/components/TransformationSection';
import CallToAction from '@/components/CallToAction';
import LiveDemo from '@/components/LiveDemo';
import Navbar from '@/components/Navbar';

const Index = () => {
  useEffect(() => {
    // Update the title
    document.title = "ZeroWasteX - AI Waste Segregation";
    
    // Smooth scroll handler for section navigation
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.hash && target.hash.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY,
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleSmoothScroll);
    
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);
  
  return (
    <div className="relative">
      <Navbar />
      
      <section id="hero">
        <Hero />
      </section>
      
      <section id="process">
        <ProcessSection />
      </section>
      
      <section id="demo">
        <LiveDemo />
      </section>
      
      <section id="transformation">
        <TransformationSection />
      </section>
      
      <section id="cta">
        <CallToAction />
      </section>
    </div>
  );
};

export default Index;
