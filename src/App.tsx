import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Medications from "./pages/Medications";
import Chat from "./pages/Chat";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Camera from "./pages/Camera";
import Notifications from "./pages/Notifications";
import Insights from "./pages/Insights";
import Refills from "./pages/Refills";
import MedicationDetail from "./pages/MedicationDetail";
import MissedDoses from "./pages/MissedDoses";
import Remaining from "./pages/Remaining";
import Settings from "./pages/Settings";
import ChatFAB from "./components/ChatFAB";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/splash" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/" element={<Index />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/medications/:id" element={<MedicationDetail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/refills" element={<Refills />} />
          <Route path="/missed" element={<MissedDoses />} />
          <Route path="/remaining" element={<Remaining />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatFAB />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;