"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/components/GlassCard';
import Navigation from '@/components/Navigation';
import InstallPrompt from '@/components/InstallPrompt';
import { Pill, CheckCircle2, Clock, Plus, Sparkles, Bell, TrendingUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { showSuccess, showError } from '@/utils/toast';

const Index = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [todayMeds, setTodayMeds] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("[Home] Fetching data...");
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Fetch Profile
          const { data: profileData } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();
          setProfile(profileData);

          // Fetch Today's Doses
          const today = new Date().toISOString().split('T')[0];
          const { data: dosesData, error: dosesError } = await supabase
            .from('doses')
            .select(`
              *,
              medications (
                name,
                dosage
              )
            `)
            .eq('user_id', user.id)
            .gte('scheduled_time', `${today}T00:00:00`)
            .lte('scheduled_time', `${today}T23:59:59`)
            .order('scheduled_time', { ascending: true });

          if (dosesError) {
            console.error("[Home] Doses fetch error:", dosesError);
          } else {
            console.log("[Home] Doses loaded:", dosesData);
            setTodayMeds(dosesData || []);
          }
        }
      } catch (err) {
        console.error("[Home] Unexpected error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    // Real-time subscription for profile changes
    const profileChannel = supabase
      .channel('home_profile_changes')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'user_profiles' 
      }, (payload) => {
        console.log("[Home] Profile real-time update:", payload.new);
        setProfile(payload.new);
      })
      .subscribe();

    // Real-time subscription for dose changes
    const dosesChannel = supabase
      .channel('home_doses_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'doses' 
      }, () => {
        console.log("[Home] Doses real-time update triggered");
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(profileChannel);
      supabase.removeChannel(dosesChannel);
    };
  }, []);

  const handleLogDose = async (doseId: string, medName: string) => {
    console.log(`[Home] Logging dose ${doseId}...`);
    try {
      const { error } = await supabase
        .from('doses')
        .update({ 
          status: 'taken', 
          taken_time: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', doseId);

      if (error) throw error;
      showSuccess(`Logged ${medName} as taken!`);
    } catch (error: any) {
      console.error("[Home] Log dose error:", error);
      showError("Failed to log dose");
    }
  };

  const takenCount = todayMeds.filter(m => m.status === 'taken').length;
  const totalCount = todayMeds.length;
  const adherence = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 0;

  // Safer name extraction
  const firstName = profile?.full_name?.split(' ')[0] || 'User';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

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
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {totalCount > 0 
                  ? `You've taken ${takenCount} of ${totalCount} doses today`
                  : "No doses scheduled for today"}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-sm h-12 w-12"
            onClick={() => navigate('/notifications')}
          >
            <Bell size={24} className="text-gray-600 dark:text-gray-400" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full" />
          </Button>
        </header>

        {/* Adherence Progress */}
        <GlassCard 
          className="mb-8 bg-blue-600 text-white border-none cursor-pointer active:scale-[0.98] transition-transform"
          onClick={() => navigate('/insights')}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Daily Adherence</h3>
              <p className="text-blue-100 text-sm">{adherence === 100 ? "Perfect score!" : "Keep it up!"}</p>
            </div>
            <div className="text-3xl font-black">{adherence}%</div>
          </div>
          <Progress value={adherence} className="h-2 bg-blue-400/30" />
          <div className="mt-4 flex items-center gap-2 text-xs text-blue-100">
            <TrendingUp size={14} />
            <span>Your adherence is tracked in real-time</span>
          </div>
        </GlassCard>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <GlassCard 
            className="p-4 flex items-center gap-3 bg-white dark:bg-gray-900 border-none shadow-sm cursor-pointer"
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
            className="p-4 flex items-center gap-3 bg-white dark:bg-gray-900 border-none shadow-sm cursor-pointer"
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

        {/* Today's Schedule */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Today's Schedule</h2>
            <Button 
              variant="ghost" 
              className="text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl"
              onClick={() => navigate('/medications')}
            >
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {todayMeds.length > 0 ? (
              todayMeds.map((dose) => (
                <GlassCard 
                  key={dose.id} 
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-none shadow-sm hover:scale-[1.02] transition-transform cursor-pointer"
                  onClick={() => navigate(`/medications/${dose.medication_id}`)}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-2xl",
                      dose.status === 'taken' ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    )}>
                      <Pill size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{dose.medications?.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {dose.medications?.dosage} • {new Date(dose.scheduled_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  {dose.status === 'taken' ? (
                    <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-full">
                      <CheckCircle2 className="text-green-500 dark:text-green-400" size={24} />
                    </div>
                  ) : (
                    <Button 
                      size="sm" 
                      className="rounded-xl bg-blue-600 hover:bg-blue-700 px-6 font-bold shadow-md shadow-blue-100 dark:shadow-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLogDose(dose.id, dose.medications?.name);
                      }}
                    >
                      Take
                    </Button>
                  )}
                </GlassCard>
              ))
            ) : (
              <div className="text-center py-12 bg-white/50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                <Pill className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 dark:text-gray-400">No doses scheduled for today.</p>
                <Button 
                  variant="link" 
                  className="text-blue-600 mt-2"
                  onClick={() => navigate('/medications/new')}
                >
                  Add a medication
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* FAB */}
        <Button 
          onClick={() => navigate('/camera')}
          className="fixed bottom-24 right-6 w-16 h-16 rounded-[24px] shadow-2xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center p-0 border-4 border-white dark:border-gray-900 z-50"
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