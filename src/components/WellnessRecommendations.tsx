import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Recommendation {
  title: string;
  description: string;
  icon: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Advanced";
}

interface WellnessRecommendationsProps {
  averageMood: number;
}

const getRecommendations = (averageMood: number): Recommendation[] => {
  if (averageMood >= 4) {
    return [
      {
        title: "Maintain Your Momentum",
        description: "Keep up your positive habits! Try setting new wellness goals to continue growing.",
        icon: "🌟",
        category: "Growth",
        difficulty: "Easy"
      },
      {
        title: "Share Your Joy",
        description: "Connect with friends or family. Your positive energy can lift others too.",
        icon: "🤝",
        category: "Social",
        difficulty: "Easy"
      },
      {
        title: "Practice Gratitude",
        description: "Write down three things you're grateful for to reinforce positive thinking.",
        icon: "🙏",
        category: "Mindfulness",
        difficulty: "Easy"
      }
    ];
  } else if (averageMood >= 3) {
    return [
      {
        title: "Gentle Movement",
        description: "Try a 10-minute walk or light stretching to boost your energy naturally.",
        icon: "🚶‍♀️",
        category: "Physical",
        difficulty: "Easy"
      },
      {
        title: "Breathing Exercise",
        description: "Practice 4-7-8 breathing: inhale for 4, hold for 7, exhale for 8 seconds.",
        icon: "🌬️",
        category: "Mindfulness",
        difficulty: "Easy"
      },
      {
        title: "Listen to Music",
        description: "Create a playlist of songs that make you feel good and listen mindfully.",
        icon: "🎵",
        category: "Self-care",
        difficulty: "Easy"
      }
    ];
  } else {
    return [
      {
        title: "Reach Out for Support",
        description: "Consider talking to a friend, family member, or mental health professional.",
        icon: "💬",
        category: "Support",
        difficulty: "Medium"
      },
      {
        title: "Basic Self-Care",
        description: "Focus on fundamentals: drink water, eat a nourishing meal, and get rest.",
        icon: "💧",
        category: "Self-care",
        difficulty: "Easy"
      },
      {
        title: "Grounding Technique",
        description: "Try the 5-4-3-2-1 method: 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.",
        icon: "🌱",
        category: "Mindfulness",
        difficulty: "Easy"
      }
    ];
  }
};

export function WellnessRecommendations({ averageMood }: WellnessRecommendationsProps) {
  const recommendations = getRecommendations(averageMood);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-wellness-growth/20 text-wellness-growth";
      case "Medium": return "bg-wellness-calm/20 text-wellness-calm";
      case "Advanced": return "bg-wellness-peace/20 text-wellness-peace";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Personalized Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-border bg-card/50 hover:shadow-soft transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                {rec.icon}
              </span>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-foreground">{rec.title}</h3>
                  <Badge variant="secondary" className={getDifficultyColor(rec.difficulty)}>
                    {rec.difficulty}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {rec.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
                <Button variant="outline" size="sm" className="text-xs">
                  Try This
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}