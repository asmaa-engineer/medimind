"use client";

import React, { useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { Pill } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

const Login = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'sign_in' | 'sign_up'>('sign_in');

  React.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/');
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col items-center justify-center p-6">
      <div className="mb-8 text-center text-white">
        <div className="bg-white/10 backdrop-blur-xl p-4 rounded-[32px] border border-white/20 inline-block mb-4">
          <Pill size={48} className="rotate-45" />
        </div>
        <h1 className="text-3xl font-bold">MediMind</h1>
        <p className="text-blue-100">Your AI Health Companion</p>
      </div>

      <GlassCard className="w-full max-w-md bg-white p-8 border-none shadow-2xl">
        <Auth
          supabaseClient={supabase}
          view={view}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#2563eb',
                  brandAccent: '#1d4ed8',
                },
                radii: {
                  buttonRadius: '12px',
                  inputRadius: '12px',
                }
              }
            }
          }}
          providers={[]}
          theme="light"
        />
        
        <div className="mt-6 text-center">
          <button 
            onClick={() => setView(view === 'sign_in' ? 'sign_up' : 'sign_in')}
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            {view === 'sign_in' ? "Don't have an account? Create one" : "Already have an account? Sign in"}
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default Login;