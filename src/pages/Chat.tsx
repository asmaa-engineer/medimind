"use client";

import React, { useState, useRef, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, Sparkles, User, Bot, Check, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRemainingMeds, logDose } from '@/lib/medicationService';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: "Hello! I'm your MediMind AI assistant. How can I help you with your medications today?" }
  ]);
  const [input, setInput] = useState('');
  const [isSelectingMed, setIsSelectingMed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "What medications do I take?",
    "I missed my dose",
    "Side effects of Lisinopril?",
    "Log my dose"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (textOverride?: string) => {
    const text = textOverride || input;
    if (!text.trim()) return;
    
    const userMsg = { id: Date.now(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Logic for "Yes" or "Log my dose"
    if (text.toLowerCase().includes('yes') || text.toLowerCase().includes('log')) {
      setTimeout(() => {
        const remaining = getRemainingMeds();
        if (remaining.length === 0) {
          setMessages(prev => [...prev, { 
            id: Date.now() + 1, 
            role: 'ai', 
            text: "You've already taken all your scheduled doses for today! Great job." 
          }]);
        } else {
          setIsSelectingMed(true);
          setMessages(prev => [...prev, { 
            id: Date.now() + 1, 
            role: 'ai', 
            text: "Which medication would you like to log?" 
          }]);
        }
      }, 600);
      return;
    }

    // Default AI response
    setTimeout(() => {
      const aiMsg = { 
        id: Date.now() + 1, 
        role: 'ai', 
        text: "I've processed your request. Based on your schedule, you have doses remaining today. Would you like me to log one now?" 
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  const handleLogMed = async (medId: number, medName: string) => {
    const result = await logDose(medId);
    setIsSelectingMed(false);
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      role: 'ai',
      text: `✅ Logged ${medName} at ${result?.takenAt}. Would you like to log another one?`
    }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background pb-32">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10 px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-xl">
          <Sparkles className="text-white" size={20} />
        </div>
        <div>
          <h1 className="font-bold text-lg">MediMind AI</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </div>
      </header>

      <div ref={scrollRef} className="px-6 py-6 space-y-6 overflow-y-auto max-h-[calc(100vh-220px)]">
        {messages.map((msg) => (
          <div key={msg.id} className={cn(
            "flex gap-3 max-w-[85%]",
            msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
          )}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
              msg.role === 'ai' ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-600"
            )}>
              {msg.role === 'ai' ? <Bot size={18} /> : <User size={18} />}
            </div>
            <div className={cn(
              "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
              msg.role === 'ai' ? "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none" : "bg-blue-600 text-white rounded-tr-none"
            )}>
              {msg.text}
            </div>
          </div>
        ))}

        {isSelectingMed && (
          <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2">
            {getRemainingMeds().map(med => (
              <Button 
                key={med.id}
                variant="outline"
                className="justify-start h-12 rounded-xl bg-white dark:bg-gray-800 border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400"
                onClick={() => handleLogMed(med.id, med.name)}
              >
                <Plus size={16} className="mr-2" /> {med.name} ({med.time})
              </Button>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400"
              onClick={() => setIsSelectingMed(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="fixed bottom-24 left-0 right-0 px-6 space-y-4">
        {!isSelectingMed && (
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {suggestions.map((s) => (
              <button 
                key={s}
                onClick={() => handleSend(s)}
                className="whitespace-nowrap px-4 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 transition-colors shadow-sm"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="h-14 pl-6 pr-12 rounded-2xl border-none shadow-xl bg-white dark:bg-gray-800"
            />
            <Button 
              size="icon" 
              variant="ghost" 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <Mic size={20} />
            </Button>
          </div>
          <Button 
            onClick={() => handleSend()}
            className="h-14 w-14 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 dark:shadow-none"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Chat;