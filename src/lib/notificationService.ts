"use client";

import { showError, showSuccess } from "@/utils/toast";

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.warn("This browser does not support desktop notification");
    return false;
  }

  if (Notification.permission === "granted") return true;

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

export const scheduleNotification = (title: string, body: string, delayMs: number) => {
  if (Notification.permission !== "granted") return;

  setTimeout(() => {
    new Notification(title, {
      body,
      icon: "/placeholder.svg",
      badge: "/placeholder.svg",
    });
  }, delayMs);
};

export const notifyDoseReminder = (medName: string, time: string) => {
  const title = `Time for ${medName}`;
  const body = `It's ${time}. Please take your scheduled dose.`;
  
  if (Notification.permission === "granted") {
    new Notification(title, { body, icon: "/placeholder.svg" });
  } else {
    showSuccess(`${title}: ${body}`);
  }
};