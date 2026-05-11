import React, { useState } from "react";
import { MapPin, Search, ChevronRight } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";
import { Input } from "./ui/input";

export const AreaSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState("Select your area");

  const popularAreas = [
    "Indiranagar, Bangalore",
    "Koramangala, Bangalore",
    "HSR Layout, Bangalore",
    "Whitefield, Bangalore",
    "Jayanagar, Bangalore"
  ];

  return (
    <div className="relative w-full max-w-md mx-auto">
      <GlassCard 
        className="p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/20 text-primary">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Your Location</p>
            <p className="font-semibold text-lg truncate">{selectedArea}</p>
          </div>
          <ChevronRight className={cn("h-5 w-5 transition-transform", isOpen && "rotate-90")} />
        </div>
      </GlassCard>

      {isOpen && (
        <GlassCard className="absolute top-full left-0 right-0 mt-2 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for your area..." 
              className="pl-10 bg-white/5 border-white/10"
              autoFocus
            />
          </div>
          
          <div className="space-y-1">
            <p className="text-xs font-bold text-muted-foreground mb-2 px-2 uppercase tracking-tighter">Popular Areas</p>
            {popularAreas.map((area) => (
              <button
                key={area}
                className="w-full text-left px-3 py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-3"
                onClick={() => {
                  setSelectedArea(area);
                  setIsOpen(false);
                }}
              >
                <MapPin className="h-4 w-4 text-primary/60" />
                <span className="font-medium">{area}</span>
              </button>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
};

// Helper function if cn is not imported correctly in this environment context
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
