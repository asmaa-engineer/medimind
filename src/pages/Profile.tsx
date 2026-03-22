"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '@/components/Navigation';
import GlassCard from '@/components/GlassCard';
import { User, Settings as SettingsIcon, LogOut, ChevronRight, Camera, Phone, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background pb-32">
      <div className="max-w-md mx-auto px-6 pt-12">
        <header className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800 shadow-xl">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" />
              <AvatarFallback>AX</AvatarFallback>
            </Avatar>
            <Button size="icon" className="absolute bottom-0 right-0 rounded-full bg-blue-600 hover:bg-blue-700 border-2 border-white dark:border-gray-800 w-8 h-8">
              <Camera size={14} />
            </Button>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Alex Johnson</h2>
          <p className="text-gray-500">alex.j@example.com</p>
        </header>

        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">{t('profile')}</h3>
            <GlassCard className="p-0 bg-white dark:bg-gray-900 border-none shadow-sm overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-xl text-blue-600"><User size={20} /></div>
                  <span className="font-medium">Personal Info</span>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </button>
              <div className="h-px bg-gray-50 dark:bg-gray-800 mx-4" />
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-red-50 dark:bg-red-900/30 p-2 rounded-xl text-red-600"><Phone size={20} /></div>
                  <span className="font-medium">Emergency Contact</span>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </button>
            </GlassCard>
          </section>

          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">{t('settings')}</h3>
            <GlassCard className="p-0 bg-white dark:bg-gray-900 border-none shadow-sm overflow-hidden">
              <button 
                onClick={() => navigate('/settings')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-xl text-gray-600"><SettingsIcon size={20} /></div>
                  <span className="font-medium">{t('settings')}</span>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </button>
            </GlassCard>
          </section>

          <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl h-14 font-bold">
            <LogOut size={20} className="mr-2" />
            {t('logout')}
          </Button>
          
          <p className="text-center text-[10px] text-gray-400 pb-8">MediMind v1.0.0 • Made with Care</p>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Profile;