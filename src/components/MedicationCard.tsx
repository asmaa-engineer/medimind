"use client";

import React from 'react';
import { Pill, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MedicationCardProps {
  name: string;
  dosage: string;
  time: string;
  status: 'taken' | 'upcoming' | 'missed';
  onToggle?: () => void;
}

const MedicationCard = ({ name, dosage, time, status, onToggle }: MedicationCardProps) => {
  const isTaken = status === 'taken';

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative overflow-hidden rounded-[2rem] p-5 mb-4 border transition-all duration-500",
        "bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border-white/40 dark:border-slate-800/40",
        isTaken ? "opacity-60" : "shadow-xl shadow-slate-200/50 dark:shadow-none"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center",
            isTaken ? "bg-green-100 text-green-600" : "bg-blue-50 text-blue-600"
          )}>
            <Pill size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight text-slate-900 dark:text-white">{name}</h3>
            <p className="text-sm text-slate-500 font-medium">{dosage}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full text-slate-600 dark:text-slate-400">
            <Clock size={12} />
            {time}
          </div>
          <button 
            onClick={onToggle}
            className={cn(
              "transition-all duration-300",
              isTaken ? "text-green-500" : "text-slate-300 hover:text-blue-500"
            )}
          >
            {isTaken ? (
              <CheckCircle2 size={32} fill="currentColor" className="text-white dark:text-slate-900" />
            ) : (
              <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center">
                <span className="text-[10px] font-bold">TAKE</span>
              </div>
            )}
          </button>
        </div>
      </div>
      
      {status === 'upcoming' && (
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-r-full" />
      )}
    </motion.div>
  );
};

export default MedicationCard;