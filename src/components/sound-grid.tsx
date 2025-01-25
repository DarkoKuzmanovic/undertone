import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/lib/audio-context";
import { sounds } from "@/lib/sounds";
import { Card } from "@/components/ui/card";

export function SoundGrid() {
  const { addTrack, tracks } = useAudio();

  const handleAddSound = (name: string, url: string) => {
    // Check if track already exists
    if (tracks.some((track) => track.name === name)) {
      return;
    }

    addTrack({
      name,
      url,
      volume: 0.5,
      isPlaying: false,
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {sounds.map(({ name, url }) => (
        <Card key={name} className="p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">{name}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleAddSound(name, url)}
              disabled={tracks.some((track) => track.name === name)}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add {name}</span>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
