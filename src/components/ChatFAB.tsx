"use client";

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const ChatFAB = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on splash, onboarding, or the chat page itself
  const hideOn = ['/splash', '/onboarding', '/chat', '/camera'];
  if (hideOn.includes(location.pathname)) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="fixed bottom-28 right-6 z-50"
      >
        <Button
          onClick={() => navigate('/chat')}
          className="w-14 h-14 rounded-full bg-blue-600 dark:bg-primary shadow-2xl flex items-center justify-center p-0 border-4 border-white dark:border-gray-900 hover:scale-110 transition-transform"
        >
          <div className="relative">
            <MessageSquare size={28} className="text-white dark:text-gray-900" />
            <Sparkles size={14} className="absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
          </div>
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatFAB;