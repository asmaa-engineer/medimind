"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/components/GlassCard';
import Navigation from '@/components/Navigation';
import InstallPrompt from '@/components/InstallPrompt';
import { Pill, CheckCircle2, Clock, Plus, Sparkles, Bell, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { subscribeToMeds, getTodayMeds, logDose } from '@/lib/medicationService';
import { requestNotificationPermission } from '@/lib/notificationService';
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Index = () => {
  const navigate = useNavigate();
  const [todayMeds, setTodayMeds] = useState(getTodayMeds());
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    requestNotificationPermission();

    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        setProfile(data);
      }
    };
    fetchData();

    // Real-time subscription for profile changes
    const channel = supabase
      .channel('home_profile_changes')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'user_profiles' 
      }, (payload) => {
        setProfile(payload.new);
      })
      .subscribe();

    const unsubscribeMeds = subscribeToMeds((updatedMeds) => {
      setTodayMeds(updatedMeds);
    });

    return () => {
      unsubscribeMeds();
      supabase.removeChannel(channel);
    };
  }, []);

  const takenCount = todayMeds.filter(m => m.status === 'taken').length;
  const totalCount = todayMeds.length;
  const adherence = Math.round((takenCount / totalCount) * 100) || 0;

  const firstName = profile?.full_name?.split(' ')[0] || 'Alex';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pb-32">
      <div className="max-w-md mx-auto px-6 pt-12">
        {/* Header */}
        <header className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <Avatar 
              className="w-12 h-12 border-2 border-white dark:border-gray-800 shadow-md cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              <AvatarImage src={profile?.avatar_url} className="object-cover" />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
                {firstName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hello, {firstName}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">You've taken {takenCount} of {totalCount} doses today</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-sm h-12 w-12 min-h-[48px] min-w-[48px]"
            onClick={() => navigate('/notifications')}
          >
            <Bell size={24} className="text-gray-600 dark:text-gray-400" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full" />
          </Button>
        </header>

        {/* Adherence Progress */}
        <GlassCard 
          className="mb-8 bg-blue-600 text-white border-none cursor-pointer active:scale-[0.98] transition-transform min-h-[120px]"
          onClick={() => navigate('/insights')}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Daily Adherence</h3>
              <p className="text-blue-100 text-sm">Keep it up!</p>
            </div>
            <div className="text-3xl font-black">{adherence}%</div>
          </div>
          <Progress value={adherence} className="h-2 bg-blue-400/30" />
          <div className="mt-4 flex items-center gap-2 text-xs text-blue-100">
            <TrendingUp size={14} />
            <span>Your adherence is up 12% from last week</span>
          </div>
        </GlassCard>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <GlassCard 
            className="p-4 flex items-center gap-3 bg-white dark:bg-gray-900 border-none shadow-sm cursor-pointer min-h-[80px]"
            onClick={() => navigate('/history')}
          >
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-xl">
              <CheckCircle2 className="text-green-600 dark:text-green-400" size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Taken</p>
              <p className="text-lg font-black dark:text-white">{takenCount}</p>
            </div>
          </GlassCard>
          <GlassCard 
            className="p-4 flex items-center gap-3 bg-white dark:bg-gray-900 border-none shadow-sm cursor-pointer min-h-[80px]"
            onClick={() => navigate('/remaining')}
          >
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-xl">
              <Clock className="text-orange-600 dark:text-orange-400" size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Remaining</p>
              <p className="text-lg font-black dark:text-white">{totalCount - takenCount}</p>
            </div>
          </GlassCard>
        </div>

        {/* AI Insight Card */}
        <GlassCard 
          className="mb-8 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-900/30 p-4 flex items-center gap-4 cursor-pointer min-h-[80px]"
          onClick={() => navigate('/chat')}
        >
          <div className="bg-indigo-600 p-3 rounded-2xl text-white">
            <Sparkles size={20} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">AI Insight</p>
            <p className="text-sm text-indigo-900 dark:text-indigo-100 font-medium">"You're doing great! Don't forget your Metformin at 12:30 PM."</p>
          </div>
        </GlassCard>

        {/* Today's Schedule */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Today's Schedule</h2>
            <Button 
              variant="ghost" 
              className="text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl h-12 min-h-[48px]"
              onClick={() => navigate('/medications')}
            >
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {todayMeds.map((med) => (
              <GlassCard 
                key={med.id} 
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-none shadow-sm hover:scale-[1.02] transition-transform cursor-pointer min-h-[80px]"
                onClick={() => navigate(`/medications/${med.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-2xl",
                    med.status === 'taken' ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  )}>
                    <Pill size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{med.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{med.dose} • {med.time}</p>
                  </div>
                </div>
                {med.status === 'taken' ? (
                  <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-full min-h-[48px] min-w-[48px] flex items-center justify-center">
                    <CheckCircle2 className="text-green-500 dark:text-green-400" size={24} />
                  </div>
                ) : (
                  <Button 
                    size="sm" 
                    className="rounded-xl bg-blue-600 hover:bg-blue-700 px-6 font-bold shadow-md shadow-blue-100 dark:shadow-none h-12 min-h-[48px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      logDose(med.id);
                    }}
                  >
                    Take
                  </Button>
                )}
              </GlassCard>
            ))}
          </div>
        </section>

        {/* FAB */}
        <Button 
          onClick={() => navigate('/camera')}
          className="fixed bottom-24 right-6 w-16 h-16 rounded-[24px] shadow-2xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center p-0 border-4 border-white dark:border-gray-900 z-50 min-h-[64px] min-w-[64px]"
        >
          <Plus size={32} className="text-white" />
        </Button>
      </div>
      <InstallPrompt />
      <Navigation />
    </div>
  );
};

export default Index;