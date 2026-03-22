"use client";

import React, { useState, useEffect } from 'react';
import { X, Download, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const InstallPrompt = () => {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) return;

    // Detect iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);

    // Show prompt after a short delay
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem('installPromptDismissed');
      if (!dismissed) setShow(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem('installPromptDismissed', 'true');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-24 left-4 right-4 z-[60]"
        >
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-2xl border border-blue-100 dark:border-gray-800 flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-2xl text-white shrink-0">
              <Download size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm dark:text-white">Install MediMind</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isIOS 
                  ? "Tap 'Share' then 'Add to Home Screen'" 
                  : "Add to your home screen for a better experience"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isIOS && <Share size={18} className="text-blue-600 animate-bounce" />}
              <Button variant="ghost" size="icon" onClick={handleDismiss} className="rounded-full">
                <X size={18} />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPrompt;