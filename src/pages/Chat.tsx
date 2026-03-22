"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Bot, User, ChevronLeft, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: "Hi! I'm MediMind AI. Ask me anything about your medications." },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Mock AI response
    setTimeout(() => {
      const aiMsg = { 
        id: Date.now() + 1, 
        role: 'ai', 
        text: "I've checked your profile. Ibuprofen can sometimes interact with blood pressure medications like Lisinopril. It's best to consult your doctor before taking them together." 
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="rounded-2xl">
              <ChevronLeft size={24} />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-black text-blue-600 tracking-tighter">Intelligent</h1>
            <h2 className="text-4xl font-black text-slate-300 dark:text-slate-700 tracking-tighter -mt-2 italic">Care</h2>
          </div>
        </div>
        <p className="mt-4 text-slate-500 font-medium text-sm leading-relaxed">
          Your clinical companion for medication clarity and health safety.
        </p>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 pb-48">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex w-full",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "max-w-[85%] p-5 rounded-[2.5rem] text-sm font-medium leading-relaxed shadow-sm",
                msg.role === 'user' 
                  ? "bg-blue-600 text-white rounded-tr-none" 
                  : "bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800 rounded-tl-none"
              )}>
                {msg.role === 'ai' && (
                  <div className="flex items-center gap-1.5 mb-2 text-[10px] font-black uppercase tracking-widest text-blue-500">
                    <Sparkles size={10} />
                    MediMind AI
                  </div>
                )}
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-24 left-0 right-0 px-6 pb-6">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['What are the side effects?', 'Missed a dose?', 'Take with food?'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="whitespace-nowrap px-4 py-2.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 text-blue-600 text-[10px] font-black uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
          
          <div className="relative flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none">
            <Button variant="ghost" size="icon" className="rounded-full shrink-0 text-slate-400">
              <Mic size={20} />
            </Button>
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask MediMind Assistant..."
              className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 font-medium"
            />
            <Button 
              onClick={handleSend}
              size="icon" 
              className="rounded-full shrink-0 w-10 h-10 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Chat;