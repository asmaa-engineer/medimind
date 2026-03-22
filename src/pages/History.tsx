"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Download, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';

const History = () => {
  const days = Array.from({ length: 14 }, (_, i) => ({
    day: i + 5,
    status: i === 6 ? 'missed' : i === 11 ? 'late' : 'on-time',
    active: i === 11
  }));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      <header className="px-6 pt-12 pb-6">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">History</h1>
        <p className="mt-2 text-slate-500 font-medium text-sm">
          Tracking your consistency for <span className="text-green-600 font-black">October 2023</span>.
        </p>
      </header>

      <main className="px-6 space-y-8">
        {/* Calendar View */}
        <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">October 2023</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-xl"><ChevronLeft size={20} /></Button>
              <Button variant="ghost" size="icon" className="rounded-xl"><ChevronRight size={20} /></Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-6 text-center">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
              <span key={d} className="text-[10px] font-black text-slate-400 tracking-widest">{d}</span>
            ))}
            {days.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all",
                  d.active ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "text-slate-900 dark:text-white",
                  d.status === 'on-time' && !d.active && "bg-green-50 dark:bg-green-900/20 text-green-600 border border-green-100 dark:border-green-900/30",
                  d.status === 'missed' && "bg-red-50 dark:bg-red-900/20 text-red-600 border border-red-100 dark:border-red-900/30",
                  d.status === 'late' && !d.active && "bg-blue-50 dark:bg-blue-900/20 text-blue-600 border border-blue-100 dark:border-blue-900/30"
                )}>
                  {d.day}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-800 flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">On Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Late</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Missed</span>
            </div>
          </div>
        </section>

        {/* Daily Log */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Daily Log</h3>
            <span className="text-xs font-bold text-slate-400">Today, Oct 16</span>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Atorvastatin', time: '08:00 AM', status: 'MISSED', color: 'red' },
              { name: 'Metformin', time: '12:45 PM', status: 'ON TIME', color: 'green' },
              { name: 'Vitamin D3', time: '06:15 PM', status: 'LATE', color: 'blue' },
            ].map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 flex items-center justify-between border border-slate-100 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center",
                    log.color === 'red' ? "bg-red-50 text-red-500" : log.color === 'green' ? "bg-green-50 text-green-500" : "bg-blue-50 text-blue-500"
                  )}>
                    {log.color === 'red' ? <XCircle size={24} /> : log.color === 'green' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white">{log.name}</h4>
                    <p className="text-xs font-bold text-slate-400 mt-0.5">{log.time} scheduled</p>
                  </div>
                </div>
                <Badge className={cn(
                  "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest",
                  log.color === 'red' ? "bg-red-100 text-red-600" : log.color === 'green' ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                )}>
                  {log.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        </section>

        <Button className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/30">
          <Download className="mr-2 w-5 h-5" />
          Export Report
        </Button>
      </main>

      <BottomNav />
    </div>
  );
};

export default History;