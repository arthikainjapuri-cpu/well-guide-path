import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "checkin", label: "Check-in", icon: "💭" },
  { id: "insights", label: "Insights", icon: "📊" },
  { id: "recommendations", label: "Wellness", icon: "💡" },
];

export function Navigation({ activeView, onViewChange }: NavigationProps) {
  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌸</span>
            <h1 className="text-xl font-bold bg-gradient-wellness bg-clip-text text-transparent">
              MindfulSpace
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeView === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange(item.id)}
                className={`gap-2 ${
                  activeView === item.id 
                    ? "bg-gradient-wellness text-white shadow-soft" 
                    : "hover:bg-secondary"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Button>
            ))}
          </div>

          <div className="flex md:hidden">
            <Button variant="ghost" size="sm">
              <span className="text-xl">☰</span>
            </Button>
          </div>
        </div>
        
        {/* Mobile navigation */}
        <div className="md:hidden grid grid-cols-4 gap-1 pb-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeView === item.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange(item.id)}
              className={`flex-col gap-1 h-12 text-xs ${
                activeView === item.id 
                  ? "bg-gradient-wellness text-white" 
                  : "hover:bg-secondary"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}