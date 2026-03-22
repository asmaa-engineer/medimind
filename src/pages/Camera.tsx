"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Zap, Image as ImageIcon, Sparkles, Camera as CameraIcon, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showSuccess } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';

const Camera = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleCapture = () => {
    setIsProcessing(true);
    setScanProgress(0);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Simulate AI Vision processing
    setTimeout(() => {
      setIsProcessing(false);
      setHasResult(true);
      showSuccess("Medication detected!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      {/* Viewfinder Area */}
      <div className="flex-1 relative flex items-center justify-center">
        <div className="w-72 h-72 border-2 border-white/20 rounded-[40px] relative overflow-hidden">
          {/* Corner Accents */}
          <div className="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-blue-500 rounded-tl-2xl" />
          <div className="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-blue-500 rounded-tr-2xl" />
          <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-blue-500 rounded-bl-2xl" />
          <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-blue-500 rounded-br-2xl" />
          
          {/* Scanning Line */}
          {isProcessing && (
            <motion.div 
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)] z-10"
            />
          )}

          {/* Processing Overlay */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-blue-500/10 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4"
              >
                <Sparkles className="animate-pulse text-blue-400" size={48} />
                <div className="text-center">
                  <p className="text-xs font-black tracking-[0.2em] uppercase mb-1">Analyzing Label</p>
                  <p className="text-[10px] text-blue-300 font-mono">{scanProgress}%</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 pt-12 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-20">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:bg-white/10 rounded-full">
          <X size={24} />
        </Button>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black tracking-widest uppercase">AI Vision Active</span>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
          <ImageIcon size={24} />
        </Button>
      </div>

      {/* Footer Controls */}
      <div className="p-12 pb-20 flex flex-col items-center gap-8 bg-gradient-to-t from-black/90 to-transparent z-20">
        <p className="text-sm text-gray-400 text-center max-w-[240px] font-medium">
          {hasResult ? "Detection complete" : "Align the medication label within the frame"}
        </p>
        
        {hasResult ? (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-xs space-y-4"
          >
            <div className="bg-white/10 backdrop-blur-2xl border border-white/10 p-6 rounded-[32px] space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl">Lisinopril</h3>
                  <p className="text-sm text-gray-400">10mg • Once Daily</p>
                </div>
                <div className="bg-blue-500/20 p-2 rounded-xl">
                  <Sparkles size={16} className="text-blue-400" />
                </div>
              </div>
              <div className="h-px bg-white/5" />
              <p className="text-[10px] text-gray-500 leading-relaxed">
                AI detected this as a blood pressure medication. Please verify the dosage before confirming.
              </p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-12 font-bold mt-2"
                onClick={() => navigate('/medications/new')}
              >
                Confirm & Add
              </Button>
            </div>
            <Button 
              variant="ghost" 
              className="w-full text-gray-400 hover:text-white"
              onClick={() => setHasResult(false)}
            >
              <RefreshCw size={16} className="mr-2" /> Retake Photo
            </Button>
          </motion.div>
        ) : (
          <div className="flex items-center gap-12">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
              <Zap size={20} />
            </div>
            <button 
              onClick={handleCapture}
              disabled={isProcessing}
              className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center p-1.5 hover:scale-105 transition-transform active:scale-95"
            >
              <div className="w-full h-full bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
            </button>
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
              <CameraIcon size={20} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;