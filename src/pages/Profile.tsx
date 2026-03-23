"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '@/components/Navigation';
import GlassCard from '@/components/GlassCard';
import { 
  Settings as SettingsIcon, 
  LogOut, 
  ChevronRight, 
  Camera, 
  BellRing, 
  ShieldCheck, 
  Loader2, 
  Trash2,
  Upload,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { notifyDoseReminder, requestNotificationPermission } from '@/lib/notificationService';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from "@/integrations/supabase/client";
import { uploadAvatar } from '@/lib/storageService';

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data: profileData } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        setProfile(profileData);
      }
    };
    fetchData();

    // Real-time subscription for this specific profile
    const channel = supabase
      .channel('profile_page_changes')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'user_profiles' 
      }, (payload) => {
        setProfile(payload.new);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showError(error.message);
    } else {
      showSuccess("Logged out successfully");
      navigate('/login');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 2 * 1024 * 1024) {
      showError("File size must be less than 2MB");
      return;
    }

    setIsUploading(true);
    try {
      const publicUrl = await uploadAvatar(user.id, file);
      showSuccess("Profile picture updated!");
    } catch (error: any) {
      showError(error.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    if (!user) return;
    setIsUploading(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ avatar_url: null })
        .eq('user_id', user.id);
      
      if (error) throw error;
      showSuccess("Profile picture removed");
    } catch (error: any) {
      showError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleTestNotification = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      notifyDoseReminder("Test Medication", "Now");
      showSuccess("Test notification sent!");
    } else {
      showSuccess("Notification permission denied.");
    }
  };

  const initials = profile?.full_name 
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : user?.email?.substring(0, 2).toUpperCase() || 'AX';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background pb-32">
      <div className="max-w-md mx-auto px-6 pt-12">
        <header className="flex flex-col items-center mb-8">
          <div className="relative mb-6">
            <div className="relative">
              <Avatar className="w-28 h-28 border-4 border-white dark:border-gray-800 shadow-2xl overflow-hidden">
                <AvatarImage src={profile?.avatar_url} className="object-cover" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {isUploading && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] rounded-full flex items-center justify-center z-10">
                  <Loader2 className="text-white animate-spin" size={32} />
                </div>
              )}
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="icon" 
                  disabled={isUploading}
                  className="absolute bottom-1 right-1 rounded-full bg-blue-600 hover:bg-blue-700 border-4 border-white dark:border-gray-800 w-10 h-10 shadow-lg z-20"
                >
                  <Camera size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl p-2">
                <DropdownMenuItem 
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl gap-2 cursor-pointer"
                >
                  <Upload size={16} />
                  Upload Photo
                </DropdownMenuItem>
                {profile?.avatar_url && (
                  <DropdownMenuItem 
                    onClick={handleRemoveAvatar}
                    className="rounded-xl gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                  >
                    <Trash2 size={16} />
                    Remove Photo
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {profile?.full_name || 'Alex Johnson'}
            </h2>
            <p className="text-gray-500 text-sm">{user?.email || 'alex.j@example.com'}</p>
            
            <div className="mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="rounded-xl h-9 px-4 border-gray-200 dark:border-gray-800"
              >
                <Upload size={14} className="mr-2" /> Change Photo
              </Button>
            </div>
          </div>
        </header>

        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">Account Security</h3>
            <GlassCard className="p-0 bg-white dark:bg-gray-900 border-none shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded-xl text-green-600"><ShieldCheck size={20} /></div>
                  <div>
                    <p className="font-medium">Account Status</p>
                    <p className="text-[10px] text-gray-400">Verified & Secure</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">Active</span>
              </div>
            </GlassCard>
          </section>

          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">System Test</h3>
            <GlassCard className="p-0 bg-white dark:bg-gray-900 border-none shadow-sm overflow-hidden">
              <button 
                onClick={handleTestNotification}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-xl text-purple-600"><BellRing size={20} /></div>
                  <span className="font-medium">Test Push Notification</span>
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
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-xl text-gray-600"><SettingsIcon size={20} /></div>
                  <span className="font-medium">{t('settings')}</span>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </button>
            </GlassCard>
          </section>

          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl h-14 font-bold min-h-[48px]"
          >
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