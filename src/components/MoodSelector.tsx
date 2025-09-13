import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const moods = [
  { emoji: "😄", label: "Great", value: 5, color: "wellness-energy" },
  { emoji: "🙂", label: "Good", value: 4, color: "wellness-growth" },
  { emoji: "😐", label: "Okay", value: 3, color: "wellness-calm" },
  { emoji: "😔", label: "Down", value: 2, color: "wellness-peace" },
  { emoji: "😞", label: "Low", value: 1, color: "muted" },
];

interface MoodSelectorProps {
  onMoodSubmit: (mood: { value: number; label: string; note: string }) => void;
}

export function MoodSelector({ onMoodSubmit }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (selectedMood !== null) {
      const mood = moods.find(m => m.value === selectedMood);
      onMoodSubmit({
        value: selectedMood,
        label: mood?.label || "",
        note
      });
      setSelectedMood(null);
      setNote("");
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card border-0 animate-slide-up">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl bg-gradient-wellness bg-clip-text text-transparent">
          How are you feeling today?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-5 gap-3">
          {moods.map((mood) => (
            <Button
              key={mood.value}
              variant="outline"
              size="lg"
              onClick={() => setSelectedMood(mood.value)}
              className={`h-20 flex-col gap-2 border-2 transition-all duration-300 hover:scale-105 ${
                selectedMood === mood.value
                  ? `border-${mood.color} bg-${mood.color}/10 shadow-glow`
                  : "border-border hover:border-wellness-calm"
              }`}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs font-medium">{mood.label}</span>
            </Button>
          ))}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mood-note" className="text-sm font-medium">
            Add a note (optional)
          </Label>
          <Textarea
            id="mood-note"
            placeholder="What's on your mind today?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="resize-none border-border focus:border-wellness-calm"
            rows={3}
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={selectedMood === null}
          className="w-full bg-gradient-wellness hover:opacity-90 text-white shadow-soft"
          size="lg"
        >
          Log My Mood
        </Button>
      </CardContent>
    </Card>
  );
}