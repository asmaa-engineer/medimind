"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Filter, ChevronRight, AlertCircle } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Meds = () => {
  const medications = [
    { id: 1, name: 'Amoxicillin', dosage: '500mg • Capsule', schedule: 'Twice daily (8am, 8pm)', status: 'Active', color: 'blue' },
    { id: 2, name: 'Lisinopril', dosage: '10mg • Tablet', schedule: 'Once daily (Morning)', status: 'Refill Soon', color: 'red' },
    { id: 3, name: 'Vitamin D3', dosage: '2000 IU • Softgel', schedule: 'Once daily (Morning)', status: 'Active', color: 'blue' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      <header className="px-6 pt-12 pb-6">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Your</h1>
        <h2 className="text-4xl font-black text-blue-600 tracking-tighter -mt-2">Medications</h2>
        <p className="mt-2 text-slate-500 font-medium text-sm">Manage your prescriptions and daily wellness routine with clinical precision.</p>
      </header>

      <main className="px-6 space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input 
            placeholder="Search medications..." 
            className="pl-12 h-14 rounded-2xl bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm font-medium"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['All', 'Active', 'Completed', 'Archived'].map((tab, i) => (
            <Button 
              key={tab} 
              variant={i === 0 ? 'default' : 'ghost'}
              className={cn(
                "rounded-full px-6 font-bold text-xs uppercase tracking-widest h-10",
                i === 0 ? "bg-blue-600" : "text-slate-500"
              )}
            >
              {tab}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {medications.map((med, index) => (
            <motion.div
              key={med.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center",
                  med.color === 'red' ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-500"
                )}>
                  <Pill size={24} />
                </div>
                <Badge className={cn(
                  "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest",
                  med.status === 'Active' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                )}>
                  {med.status}
                </Badge>
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{med.name}</h3>
              <p className="text-sm text-slate-500 font-bold mt-1">{med.dosage}</p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <Clock size={18} className="text-blue-500" />
                  <span className="text-xs font-bold">{med.schedule}</span>
                </div>
                {med.color === 'red' && (
                  <div className="flex items-center gap-3 text-red-500">
                    <AlertCircle size={18} />
                    <span className="text-xs font-bold">Only 3 doses remaining</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Next Dose</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white mt-1">Today, 8:00 PM</p>
                </div>
                <Button className="bg-blue-600 rounded-full px-6 font-black text-xs uppercase tracking-widest">
                  Log Dose
                </Button>
              </div>
            </motion.div>
          ))}

          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full py-12 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
              <Plus size={24} />
            </div>
            <div className="text-center">
              <p className="font-black text-lg text-slate-900 dark:text-white">New Medication</p>
              <p className="text-xs font-medium">Tap to scan prescription or add manually</p>
            </div>
          </motion.button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Meds;