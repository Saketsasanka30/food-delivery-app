import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User as UserIcon } from 'lucide-react';
import { useView } from '../../context/ViewContext';
import { processAiQuery } from '../../data/aiPrompts';
import type { AiResponse } from '../../data/aiPrompts';
import { RestaurantCard } from '../home/RestaurantCard';
import { FoodCard } from '../home/FoodCard';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  data?: AiResponse;
}

export const AiAssistantModal: React.FC = () => {
  const { isAiAssistantOpen, setIsAiAssistantOpen } = useView();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_welcome',
      sender: 'ai',
      text: "Hello! I am Feastly's AI Food Assistant powered by Gemini. Ask me anything like 'Find vegetarian food under ₹500' or 'Suggest something spicy for dinner'!"
    }
  ]);

  if (!isAiAssistantOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiRes = processAiQuery(query);
      const aiMsg: Message = {
        id: 'msg_ai_' + Date.now(),
        sender: 'ai',
        text: aiRes.message,
        data: aiRes
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  const samplePrompts = [
    "What should I eat?",
    "Find vegetarian food under ₹500",
    "Suggest something spicy",
    "Which restaurant delivers fastest?",
    "Recommend food for four people"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full h-[85vh] flex flex-col shadow-2xl border border-slate-100 animate-slide-up">
        {/* AI Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-indigo-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-lg ring-2 ring-purple-400/30">
              <Sparkles className="w-5 h-5 fill-amber-300 stroke-none" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg tracking-tight">Feastly AI Assistant</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 uppercase tracking-widest">
                  Gemini Powered
                </span>
              </div>
              <p className="text-xs text-indigo-200/80 font-medium">Smart food search & personalized dining recommendations</p>
            </div>
          </div>

          <button
            onClick={() => setIsAiAssistantOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                  msg.sender === 'user' ? 'bg-[#FF4D00] text-white' : 'bg-indigo-600 text-white shadow-md'
                }`}
              >
                {msg.sender === 'user' ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-3 flex-1">
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#FF4D00] text-white rounded-tr-none'
                      : 'bg-white text-slate-900 border border-slate-200/80 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Embedded Cards inside AI response */}
                {msg.data?.recommendedRestaurants && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {msg.data.recommendedRestaurants.map(rest => (
                      <RestaurantCard key={rest.id} restaurant={rest} />
                    ))}
                  </div>
                )}

                {msg.data?.recommendedItems && (
                  <div className="space-y-2 pt-2">
                    {msg.data.recommendedItems.map(({ item, restaurant }) => (
                      <FoodCard key={item.id} item={item} restaurant={restaurant} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Suggestion Chips */}
        <div className="p-3 bg-white border-t border-slate-100 overflow-x-auto scrollbar-hide flex gap-2">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-[#FF4D00] border border-slate-200 hover:border-orange-300 text-xs font-semibold whitespace-nowrap transition-colors"
            >
              ✨ {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask AI anything (e.g. Best pizza under ₹400)..."
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-2xl shadow-md transition-all hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
