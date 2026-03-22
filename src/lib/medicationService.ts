"use client";

import { showSuccess } from "@/utils/toast";

// Mocking a simple store for real-time updates across components
type Listener = (data: any) => void;
const listeners: Listener[] = [];

export const subscribeToMeds = (callback: Listener) => {
  listeners.push(callback);
  return () => {
    const index = listeners.indexOf(callback);
    if (index > -1) listeners.splice(index, 1);
  };
};

const notify = () => {
  const data = getTodayMeds();
  listeners.forEach(l => l(data));
};

// Initial Mock Data
let todayMeds = [
  { id: 1, name: 'Lisinopril', dose: '10mg', time: '08:00 AM', status: 'taken', takenAt: '08:05 AM' },
  { id: 2, name: 'Metformin', dose: '500mg', time: '12:30 PM', status: 'upcoming', takenAt: null },
  { id: 3, name: 'Atorvastatin', dose: '20mg', time: '08:00 PM', status: 'upcoming', takenAt: null },
];

export const getTodayMeds = () => [...todayMeds];

export const logDose = async (medId: number) => {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  todayMeds = todayMeds.map(med => 
    med.id === medId 
      ? { ...med, status: 'taken', takenAt: now } 
      : med
  );

  // In a real app, this would be:
  // await updateDoc(doc(db, "doses", id), { status: "taken", takenTime: serverTimestamp() });
  
  console.log(`Logged dose for med ${medId} at ${now}`);
  
  notify();
  showSuccess(`Logged dose at ${now}`);
  
  return todayMeds.find(m => m.id === medId);
};

export const getRemainingMeds = () => {
  return todayMeds.filter(m => m.status === 'upcoming');
};