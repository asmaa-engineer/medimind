import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "app_name": "MediMind",
      "hello": "Hello, Alex",
      "taken_count": "You've taken {{taken}} of {{total}} doses today",
      "daily_adherence": "Daily Adherence",
      "keep_it_up": "Keep it up!",
      "taken": "Taken",
      "remaining": "Remaining",
      "ai_insight": "AI Insight",
      "todays_schedule": "Today's Schedule",
      "view_all": "View All",
      "take": "Take",
      "settings": "Settings",
      "profile": "Profile",
      "language": "Language",
      "theme": "Theme",
      "dark_mode": "Dark Mode",
      "light_mode": "Light Mode",
      "notifications": "Notifications",
      "logout": "Logout",
      "arabic": "العربية",
      "english": "English",
      "ask_anything": "Ask anything...",
      "analyzing": "Analyzing...",
      "med_detected": "Medication Detected",
      "confirm_add": "Confirm & Add",
      "weekly_trend": "Weekly Trend",
      "refill_prediction": "Refill Prediction",
      "days_left": "{{days}} days left"
    }
  },
  ar: {
    translation: {
      "app_name": "ميدي مايند",
      "hello": "مرحباً، أليكس",
      "taken_count": "لقد تناولت {{taken}} من أصل {{total}} جرعات اليوم",
      "daily_adherence": "الالتزام اليومي",
      "keep_it_up": "استمر في ذلك!",
      "taken": "تم التناول",
      "remaining": "متبقي",
      "ai_insight": "رؤية الذكاء الاصطناعي",
      "todays_schedule": "جدول اليوم",
      "view_all": "عرض الكل",
      "take": "تناول",
      "settings": "الإعدادات",
      "profile": "الملف الشخصي",
      "language": "اللغة",
      "theme": "المظهر",
      "dark_mode": "الوضع الداكن",
      "light_mode": "الوضع الفاتح",
      "notifications": "التنبيهات",
      "logout": "تسجيل الخروج",
      "arabic": "العربية",
      "english": "English",
      "ask_anything": "اسأل أي شيء...",
      "analyzing": "جاري التحليل...",
      "med_detected": "تم اكتشاف الدواء",
      "confirm_add": "تأكيد وإضافة",
      "weekly_trend": "الاتجاه الأسبوعي",
      "refill_prediction": "توقعات إعادة التعبئة",
      "days_left": "متبقي {{days}} أيام"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;