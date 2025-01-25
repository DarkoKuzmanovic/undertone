import React from "react";
import { Volume } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useAudio } from "@/lib/audio-context";
import TrackControls from "@/components/track-controls";

export function AudioMixer() {
  const { tracks, masterVolume, setMasterVolume } = useAudio();

  return (
    <div className="space-y-8 p-4">
      <Card className="p-4 flex items-center gap-4 max-w-xs mx-auto">
        <Volume className="h-5 w-5" />
        <Slider
          value={[masterVolume]}
          max={1}
          step={0.01}
          onValueChange={(value) => setMasterVolume(value[0])}
          className="w-32"
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((track) => (
          <TrackControls key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}
