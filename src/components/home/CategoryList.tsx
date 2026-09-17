import React from 'react';
import { CUISINES_LIST } from '../../data/mockData';
import { useView } from '../../context/ViewContext';

export const CategoryList: React.FC = () => {
  const { selectedCuisine, setSelectedCuisine, setCurrentView } = useView();

  const handleSelect = (cuisineId: string) => {
    setSelectedCuisine(cuisineId);
    if (cuisineId !== 'all') {
      setCurrentView('search');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Explore Cuisines 🍕
        </h2>
        <button
          onClick={() => {
            setSelectedCuisine('all');
            setCurrentView('search');
          }}
          className="text-xs font-bold text-[#FF4D00] hover:underline"
        >
          View All Cuisines →
        </button>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide py-2">
        {CUISINES_LIST.map(c => {
          const isSelected = selectedCuisine === c.id;
          return (
            <button
              key={c.id}
              onClick={() => handleSelect(c.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap text-xs font-extrabold transition-all border shrink-0 ${
                isSelected
                  ? 'bg-[#FF4D00] text-white border-[#FF4D00] shadow-md scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300 hover:bg-orange-50/50 shadow-xs'
              }`}
            >
              <span className="text-base">{c.icon}</span>
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
