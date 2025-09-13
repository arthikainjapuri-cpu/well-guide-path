import { Card, CardContent } from "@/components/ui/card";

interface MoodEntry {
  date: string;
  mood: number;
  label: string;
}

interface StatsOverviewProps {
  moodEntries: MoodEntry[];
}

export function StatsOverview({ moodEntries }: StatsOverviewProps) {
  const calculateStats = () => {
    if (moodEntries.length === 0) {
      return {
        averageMood: 0,
        streak: 0,
        totalEntries: 0,
        trend: "neutral"
      };
    }

    const average = moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length;
    
    // Calculate streak (consecutive days)
    const today = new Date().toDateString();
    let streak = 0;
    const sortedEntries = [...moodEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    for (let i = 0; i < sortedEntries.length; i++) {
      const entryDate = new Date(sortedEntries[i].date).toDateString();
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      
      if (entryDate === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }

    // Calculate trend
    const recentEntries = moodEntries.slice(-7); // Last 7 entries
    const olderEntries = moodEntries.slice(-14, -7); // Previous 7 entries
    
    let trend = "neutral";
    if (recentEntries.length > 0 && olderEntries.length > 0) {
      const recentAvg = recentEntries.reduce((sum, entry) => sum + entry.mood, 0) / recentEntries.length;
      const olderAvg = olderEntries.reduce((sum, entry) => sum + entry.mood, 0) / olderEntries.length;
      
      if (recentAvg > olderAvg + 0.2) trend = "improving";
      else if (recentAvg < olderAvg - 0.2) trend = "declining";
    }

    return {
      averageMood: Math.round(average * 10) / 10,
      streak,
      totalEntries: moodEntries.length,
      trend
    };
  };

  const stats = calculateStats();

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return "📈";
      case "declining": return "📉";
      default: return "➡️";
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving": return "text-wellness-growth";
      case "declining": return "text-wellness-energy";
      default: return "text-wellness-calm";
    }
  };

  const statCards = [
    {
      title: "Average Mood",
      value: stats.averageMood > 0 ? `${stats.averageMood}/5` : "--",
      icon: "😊",
      color: "wellness-calm"
    },
    {
      title: "Current Streak",
      value: `${stats.streak} days`,
      icon: "🔥",
      color: "wellness-energy"
    },
    {
      title: "Total Check-ins",
      value: stats.totalEntries.toString(),
      icon: "📝",
      color: "wellness-growth"
    },
    {
      title: "Trend",
      value: stats.trend.charAt(0).toUpperCase() + stats.trend.slice(1),
      icon: getTrendIcon(stats.trend),
      color: getTrendColor(stats.trend).replace("text-", "")
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card 
          key={stat.title} 
          className="bg-gradient-card shadow-soft border-0 hover:shadow-card transition-all duration-300 animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-4 text-center">
            <div className="text-2xl mb-2 animate-pulse-glow">{stat.icon}</div>
            <div className={`text-2xl font-bold text-${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-xs text-muted-foreground font-medium">{stat.title}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}