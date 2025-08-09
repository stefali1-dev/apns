import { useState, useEffect, useRef } from 'react';

// Custom hook for counting animation
const useCountUp = (targetValue: number, isInView: boolean, duration: number = 2000) => {
  const [currentValue, setCurrentValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) {
      setCurrentValue(0);
      startTimeRef.current = null;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(easeOut * targetValue);
      
      setCurrentValue(value);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetValue, isInView, duration]);

  return currentValue;
};

// Component for animated stat card
const AnimatedStatCard = ({ 
  targetValue, 
  suffix = '%', 
  description, 
  bgColor, 
  textColor, 
  borderColor,
  isInView 
}: {
  targetValue: number;
  suffix?: string;
  description: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  isInView: boolean;
}) => {
  const animatedValue = useCountUp(targetValue, isInView, 2000);
  
  return (
    <div className={`p-6 ${bgColor} rounded shadow-sm flex flex-col items-center border-l-4 ${borderColor}`}>
      <div className={`text-5xl font-bold ${textColor} mb-2`}>
        {animatedValue}{suffix}
      </div>
      <p className="text-center text-gray-700">{description}</p>
    </div>
  );
};

const ObesityStatsSection = () => {
  const [isStatsInView, setIsStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer for stats animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsStatsInView(true);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '-50px 0px', // Start animation slightly before element is fully visible
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section id="test-imc" className="bg-white relative pt-16">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Provocările de sănătate din România
        </h2>
        <p className="text-lg text-gray-600 mb-10 text-center">
          Date îngrijorătoare din studiile recente (2022-2024)
        </p>

        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedStatCard
            targetValue={60}
            suffix="%"
            description="dintre adulții români sunt supraponderali sau obezi"
            bgColor="bg-red-50"
            textColor="text-red-600"
            borderColor="border-red-400"
            isInView={isStatsInView}
          />
          <AnimatedStatCard
            targetValue={25}
            suffix="%"
            description="dintre copiii români au probleme de greutate"
            bgColor="bg-orange-50"
            textColor="text-orange-600"
            borderColor="border-orange-400"
            isInView={isStatsInView}
          />
          <AnimatedStatCard
            targetValue={18}
            suffix="%"
            description="risc de deces prematur din cauza bolilor cronice"
            bgColor="bg-red-50"
            textColor="text-red-600"
            borderColor="border-red-400"
            isInView={isStatsInView}
          />
        </div>
        
        {/* Study Sources */}
        <div className="pt-6 pb-6">
          <p className="text-sm text-gray-500 mb-3 text-center">Surse de date verificate:</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <a 
              href="https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Overweight_and_obesity_-_BMI_statistics" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
            >
              Eurostat 2022 - Statistici IMC
            </a>
            <span className="text-gray-300">•</span>
            <a 
              href="https://data.who.int/countries/642" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
            >
              WHO România - Date Sănătate
            </a>
            <span className="text-gray-300">•</span>
            <a 
              href="https://gateway.euro.who.int/en/country-profiles/romania/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
            >
              WHO Europa - Profilul României
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ObesityStatsSection;
