import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + 1, 100));
      } else {
        onLoadingComplete();
      }
    }, 20);

    return () => clearTimeout(timer);
  }, [progress, onLoadingComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-gray-900 to-black transition-opacity duration-500 ${progress === 100 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center space-y-6 p-8">
        {/* Main animated logo */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 animate-pulse">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="stroke-current text-blue-500"
                cx="50"
                cy="50"
                r="40"
                fill="none"
                strokeWidth="4"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * progress) / 100}
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-500 rounded-lg animate-spin-slow transform rotate-45"></div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-white text-lg font-medium mb-1">Loading your experience</p>
          <p className="text-blue-400 text-sm font-mono">{progress}%</p>
        </div>

        {/* Loading messages */}
        <div className="text-gray-400 text-sm text-center max-w-xs">
          {progress < 33 && "Preparing your personalized experience..."}
          {progress >= 33 && progress < 66 && "Loading portfolio content..."}
          {progress >= 66 && progress < 100 && "Almost there..."}
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen; 