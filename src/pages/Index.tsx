"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Plus, Sparkles, Calendar } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import MedicationCard from '@/components/MedicationCard';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [meds, setMeds] = useState([
    { id: 1, name: 'Advil', dosage: '200mg • Taken', time: '8:00 AM', status: 'taken' as const },
    { id: 2, name: 'Lipitor', dosage: '10mg • Upcoming', time: '10:00 AM', status: 'upcoming' as const },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-blue-500/40"
        >
          <Pill className="text-white w-12 h-12" />
        </motion.div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-3xl font-black text-blue-600 tracking-tighter"
        >
          MediMind
        </motion.h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center">
            <Pill className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-black text-blue-600 tracking-tighter">MediMind</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
            <Bell size={20} className="text-slate-600" />
          </Button>
          <Avatar className="w-10 h-10 border-2 border-white dark:border-slate-800 shadow-sm">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="px-6 space-y-8">
        {/* Greeting */}
        <section>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
            Good morning, <br />
            <span className="text-blue-600">Sarah</span>
          </h2>
          <p className="mt-2 text-slate-500 font-medium leading-relaxed">
            You're doing great today. You've completed most of your morning routine.
          </p>
        </section>

        {/* Adherence Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Adherence</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">Weekly Goal</h3>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              Streak: 5 Days
            </div>
          </div>

          <div className="flex justify-center py-4">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-slate-100 dark:text-slate-800"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * 75) / 100}
                  strokeLinecap="round"
                  className="text-blue-600 transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-4xl font-black text-slate-900 dark:text-white">75%</span>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Monthly Avg</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-3xl p-4 flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
              <Sparkles className="text-red-500 w-4 h-4" />
            </div>
            <p className="text-xs text-red-900/80 dark:text-red-200/80 font-medium leading-relaxed">
              Sarah, taking your meds with breakfast has improved your adherence by 12% this week.
            </p>
          </div>
        </motion.div>

        {/* Today's Schedule */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Today's Schedule</h3>
            <Button variant="link" className="text-blue-600 font-bold text-xs uppercase tracking-widest">View Calendar</Button>
          </div>

          <div className="space-y-1">
            {meds.map((med, index) => (
              <motion.div
                key={med.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MedicationCard 
                  {...med} 
                  onToggle={() => {
                    setMeds(prev => prev.map(m => 
                      m.id === med.id ? { ...m, status: m.status === 'taken' ? 'upcoming' : 'taken' } : m
                    ));
                  }}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI Chat Prompt */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="bg-blue-600 rounded-[2.5rem] p-6 text-white shadow-2xl shadow-blue-500/30 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-lg">Ask MediMind</h4>
              <p className="text-xs text-blue-100 font-medium">Check interactions or side effects</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
            <Plus className="rotate-45" />
          </Button>
        </motion.div>
      </main>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-28 right-6 w-16 h-16 bg-blue-600 text-white rounded-[2rem] shadow-2xl shadow-blue-500/40 flex items-center justify-center z-40"
      >
        <Plus size={32} strokeWidth={3} />
      </motion.button>

      <BottomNav />
    </div>
  );
};

export default Index;