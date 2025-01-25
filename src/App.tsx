import React from "react";
import { Volume } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import AudioProvider from "@/components/audio-provider";
import TrackControls from "@/components/track-controls";
import { useAudio } from "@/lib/audio-context";

const defaultTracks = [
  {
    name: "Rain",
    url: "https://assets.mixkit.co/sfx/preview/mixkit-light-rain-loop-2393.mp3",
    volume: 0.5,
    isPlaying: false,
  },
  {
    name: "Forest",
    url: "https://assets.mixkit.co/sfx/preview/mixkit-forest-birds-ambiance-1210.mp3",
    volume: 0.5,
    isPlaying: false,
  },
  {
    name: "Waves",
    url: "https://assets.mixkit.co/sfx/preview/mixkit-sea-waves-loop-1196.mp3",
    volume: 0.5,
    isPlaying: false,
  },
];

function AudioMixer() {
  const { tracks, masterVolume, setMasterVolume, addTrack } = useAudio();

  // Add default tracks if none exist
  React.useEffect(() => {
    if (tracks.length === 0) {
      defaultTracks.forEach((track) => addTrack(track));
    }
  }, [tracks.length, addTrack]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Undertone</h1>
          <Card className="p-4 flex items-center gap-4">
            <Volume className="h-5 w-5" />
            <Slider
              value={[masterVolume]}
              max={1}
              step={0.01}
              onValueChange={(value) => setMasterVolume(value[0])}
              className="w-32"
            />
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.map((track) => (
            <TrackControls key={track.id} track={track} />
          ))}
        </div>

        <Button
          onClick={() =>
            addTrack({
              name: "White Noise",
              url: "https://assets.mixkit.co/sfx/preview/mixkit-white-noise-ambiance-loop-1236.mp3",
              volume: 0.5,
              isPlaying: false,
            })
          }
        >
          Add White Noise
        </Button>
      </div>
    </div>
  );
}

function App() {
  return (
    <AudioProvider>
      <AudioMixer />
    </AudioProvider>
  );
}

export default App;
