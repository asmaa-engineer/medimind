"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import Navigation from '@/components/Navigation';
import GlassCard from '@/components/GlassCard';
import { 
  ChevronLeft, Bell, Moon, Globe, Shield, 
  Download, Trash2, Info, Volume2, Clock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';

const Settings = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background pb-32">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10 px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
          <ChevronLeft size={24} />
        </Button>
        <h1 className="font-bold text-xl">{t('settings')}</h1>
      </header>

      <div className="px-6 py-8 space-y-8">
        {/* Notifications */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 ml-2">{t('notifications')}</h3>
          <GlassCard className="p-0 bg-white dark:bg-gray-900 border-none shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-xl text-blue-600"><Bell size={20} /></div>
                <span className="font-medium">Enable All</span>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="h-px bg-gray-50 dark:bg-gray-800 mx-4" />
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 size={18} className="text-gray-400" />
                  <span className="text-sm">Sound</span>
                </div>
                <Select defaultValue="gentle">
                  <SelectTrigger className="w-32 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="gentle">Gentle</SelectItem>
                    <SelectItem value="loud">Loud</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-gray-400" />
                  <span className="text-sm">Snooze</span>
                </div>
                <Select defaultValue="15">
                  <SelectTrigger className="w-32 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="60">60 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Appearance */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 ml-2">Appearance</h3>
          <GlassCard className="p-0 bg-white dark:bg-gray-900 border-none shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-xl text-indigo-600"><Moon size={20} /></div>
                <span className="font-medium">{t('dark_mode')}</span>
              </div>
              <Switch 
                checked={theme === 'dark'} 
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
              />
            </div>
            <div className="h-px bg-gray-50 dark:bg-gray-800 mx-4" />
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-xl text-green-600"><Globe size={20} /></div>
                <span className="font-medium">{t('language')}</span>
              </div>
              <Select value={i18n.language} onValueChange={toggleLanguage}>
                <SelectTrigger className="w-32 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t('english')}</SelectItem>
                  <SelectItem value="ar">{t('arabic')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </GlassCard>
        </section>

        {/* Data Management */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 ml-2">Data</h3>
          <GlassCard className="p-0 bg-white dark:bg-gray-900 border-none shadow-sm overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-xl text-gray-600"><Download size={20} /></div>
                <span className="font-medium">Export Data (CSV)</span>
              </div>
            </button>
            <div className="h-px bg-gray-50 dark:bg-gray-800 mx-4" />
            <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600">
              <div className="flex items-center gap-3">
                <div className="bg-red-50 dark:bg-red-900/30 p-2 rounded-xl"><Trash2 size={20} /></div>
                <span className="font-medium">Delete Account</span>
              </div>
            </button>
          </GlassCard>
        </section>

        {/* About */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 ml-2">About</h3>
          <GlassCard className="p-0 bg-white dark:bg-gray-900 border-none shadow-sm overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-xl text-gray-600"><Info size={20} /></div>
                <span className="font-medium">Version</span>
              </div>
              <span className="text-sm text-gray-400">1.0.0</span>
            </div>
            <div className="h-px bg-gray-50 dark:bg-gray-800 mx-4" />
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-xl text-gray-600"><Shield size={20} /></div>
                <span className="font-medium">Privacy Policy</span>
              </div>
            </button>
          </GlassCard>
        </section>
      </div>
      <Navigation />
    </div>
  );
};

export default Settings;