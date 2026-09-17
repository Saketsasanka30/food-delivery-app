import React, { useState, useEffect } from 'react';
import { Navigation, Bike, Home } from 'lucide-react';

interface MapViewProps {
  restaurantName?: string;
  deliveryAddressName?: string;
  driverName?: string;
  status?: string;
  height?: string;
}

export const MapView: React.FC<MapViewProps> = ({
  restaurantName = 'Spice Route',
  deliveryAddressName = 'Home (Green Avenue)',
  driverName = 'Vikram Singh',
  status = 'On the way',
  height = 'h-64'
}) => {
  // Simulated progress along line (0 to 100)
  const [driverProgress, setDriverProgress] = useState(65);

  useEffect(() => {
    const interval = setInterval(() => {
      setDriverProgress(prev => (prev >= 95 ? 20 : prev + 1.5));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate position along curved route
  const pathX = 80 + (320 - 80) * (driverProgress / 100);
  const pathY = 180 - Math.sin((driverProgress / 100) * Math.PI) * 70;

  return (
    <div className={`relative w-full ${height} rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner group`}>
      {/* Map Grid Background Canvas */}
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#475569" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Stylized Simulated Map Roads */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 240" preserveAspectRatio="none">
        {/* Background road network */}
        <path d="M0 120 Q200 40 400 120" stroke="#334155" strokeWidth="12" fill="none" />
        <path d="M80 200 L80 40 M320 200 L320 40" stroke="#1E293B" strokeWidth="10" fill="none" />

        {/* Delivery Route Path */}
        <path
          d="M 80 180 Q 200 40 320 180"
          stroke="#FF4D00"
          strokeWidth="4"
          fill="none"
          strokeDasharray="6 6"
          className="animate-pulse"
        />
      </svg>

      {/* Map Pin 1: Restaurant Pin */}
      <div className="absolute top-[150px] left-[60px] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/pin">
        <div className="bg-red-500 text-white p-2.5 rounded-full shadow-lg border-2 border-white flex items-center justify-center animate-bounce">
          <Navigation className="w-5 h-5 fill-white stroke-none" />
        </div>
        <span className="mt-1 bg-slate-900/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-700 whitespace-nowrap shadow-md">
          🏬 {restaurantName}
        </span>
      </div>

      {/* Map Pin 2: User Address Pin */}
      <div className="absolute top-[150px] right-[40px] transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="bg-emerald-500 text-white p-2.5 rounded-full shadow-lg border-2 border-white flex items-center justify-center">
          <Home className="w-5 h-5 fill-white stroke-none" />
        </div>
        <span className="mt-1 bg-slate-900/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-700 whitespace-nowrap shadow-md">
          📍 {deliveryAddressName}
        </span>
      </div>

      {/* Animated Live Driver Icon Pin */}
      <div
        className="absolute transition-all duration-1000 ease-linear transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
        style={{
          left: `${(pathX / 400) * 100}%`,
          top: `${(pathY / 240) * 100}%`
        }}
      >
        <div className="bg-amber-500 text-white p-2.5 rounded-full shadow-xl ring-4 ring-amber-500/30 border-2 border-white flex items-center justify-center">
          <Bike className="w-5 h-5 stroke-[2.5]" />
        </div>
        <span className="mt-1 bg-amber-500 text-slate-950 font-bold text-[11px] px-2 py-0.5 rounded-full shadow-md whitespace-nowrap">
          🛵 {driverName} ({status})
        </span>
      </div>

      {/* Map Control Overlay Pill */}
      <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-slate-300 text-xs px-3 py-1.5 rounded-full border border-slate-700 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        Live GPS Tracking Active
      </div>
    </div>
  );
};
