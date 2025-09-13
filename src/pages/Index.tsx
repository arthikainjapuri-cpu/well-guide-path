import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { MoodSelector } from "@/components/MoodSelector";
import { MoodChart } from "@/components/MoodChart";
import { WellnessRecommendations } from "@/components/WellnessRecommendations";
import { StatsOverview } from "@/components/StatsOverview";
import { useToast } from "@/hooks/use-toast";

interface MoodEntry {
  date: string;
  mood: number;
  label: string;
  note?: string;
}

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const { toast } = useToast();

  // Load mood entries from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("moodEntries");
    if (stored) {
      setMoodEntries(JSON.parse(stored));
    }
  }, []);

  // Save mood entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
  }, [moodEntries]);

  const handleMoodSubmit = (mood: { value: number; label: string; note: string }) => {
    const newEntry: MoodEntry = {
      date: new Date().toISOString().split('T')[0],
      mood: mood.value,
      label: mood.label,
      note: mood.note
    };

    // Check if there's already an entry for today
    const todayEntry = moodEntries.find(entry => entry.date === newEntry.date);
    
    if (todayEntry) {
      // Update existing entry
      setMoodEntries(prev => 
        prev.map(entry => 
          entry.date === newEntry.date ? newEntry : entry
        )
      );
      toast({
        title: "Mood Updated! 🌟",
        description: `Your mood for today has been updated to ${mood.label}.`,
      });
    } else {
      // Add new entry
      setMoodEntries(prev => [...prev, newEntry]);
      toast({
        title: "Mood Logged! ✨",
        description: `Thanks for checking in! Your mood today: ${mood.label}.`,
      });
    }
    
    setActiveView("dashboard");
  };

  const calculateAverageMood = () => {
    if (moodEntries.length === 0) return 3;
    return moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length;
  };

  const renderContent = () => {
    switch (activeView) {
      case "checkin":
        return (
          <div className="max-w-md mx-auto">
            <MoodSelector onMoodSubmit={handleMoodSubmit} />
          </div>
        );
      case "insights":
        return (
          <div className="max-w-4xl mx-auto space-y-6">
            <MoodChart data={moodEntries} />
          </div>
        );
      case "recommendations":
        return (
          <div className="max-w-2xl mx-auto">
            <WellnessRecommendations averageMood={calculateAverageMood()} />
          </div>
        );
      default:
        return (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-wellness bg-clip-text text-transparent">
                Welcome to Your Wellness Journey
              </h2>
              <p className="text-muted-foreground">
                Track your daily mood and discover personalized insights for better mental health.
              </p>
            </div>
            
            <StatsOverview moodEntries={moodEntries} />
            
            <div className="grid lg:grid-cols-2 gap-6">
              <MoodChart data={moodEntries.slice(-14)} />
              <WellnessRecommendations averageMood={calculateAverageMood()} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Navigation activeView={activeView} onViewChange={setActiveView} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
