"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, LogOut, Edit2, Phone, Mail, Calendar, Droplets, Globe, Moon } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      <header className="px-6 pt-12 pb-6">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Profile</h1>
        <p className="mt-2 text-slate-500 font-medium text-sm">Manage your clinical identity and sanctuary preferences.</p>
      </header>

      <main className="px-6 space-y-8">
        {/* Profile Card */}
        <section className="flex flex-col items-center text-center">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white dark:border-slate-800 shadow-2xl">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Button size="icon" className="absolute bottom-0 right-0 rounded-full bg-blue-600 border-4 border-white dark:border-slate-950 w-10 h-10">
              <Edit2 size={16} />
            </Button>
          </div>
          <h2 className="mt-6 text-3xl font-black text-slate-900 dark:text-white">Sarah Mitchell</h2>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Patient ID: #MM-9482</p>
          <Badge className="mt-4 bg-green-100 text-green-600 rounded-full px-4 py-1.5 font-black text-[10px] uppercase tracking-widest">
            <CheckCircle2 className="mr-1.5 w-3 h-3" />
            Verified Patient
          </Badge>
        </section>

        {/* Emergency Contact */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Emergency Contact</h3>
            <Button variant="link" className="text-blue-600 font-bold text-xs uppercase tracking-widest">Add New</Button>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-white">Dr. James Wilson</h4>
                <p className="text-xs font-bold text-slate-400 mt-0.5">Primary Physician • +1 555-0192</p>
              </div>
            </div>
          </div>
        </section>

        {/* Account Info */}
        <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <User className="text-blue-600 w-5 h-5" />
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Account Information</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'Email Address', value: 's.mitchell@outlook.com', icon: Mail },
              { label: 'Phone Number', value: '+1 555-829-1022', icon: Phone },
              { label: 'Blood Type', value: 'A Positive (A+)', icon: Droplets },
              { label: 'Date of Birth', value: 'October 14, 1988', icon: Calendar },
            ].map((item, i) => (
              <div key={i} className="space-y-1.5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 font-bold text-slate-900 dark:text-white text-sm">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Settings */}
        <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="text-blue-600 w-5 h-5" />
            <h3 className="text-xl font-black text-slate-900 dark:text-white">Notifications</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-black text-slate-900 dark:text-white">Reminders</p>
                <p className="text-xs font-medium text-slate-400">Medication & Vitals</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-black text-slate-900 dark:text-white">AI Insights</p>
                <p className="text-xs font-medium text-slate-400">Intelligent health tips</p>
              </div>
              <Switch />
            </div>
          </div>
          
          <Button variant="ghost" className="w-full text-blue-600 font-black text-xs uppercase tracking-widest mt-4">
            Manage Sound & Snooze
          </Button>
        </section>

        <Button variant="ghost" className="w-full h-14 rounded-2xl text-red-500 font-black uppercase tracking-[0.2em] hover:bg-red-50 dark:hover:bg-red-900/10">
          <LogOut className="mr-2 w-5 h-5" />
          Sign Out
        </Button>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;