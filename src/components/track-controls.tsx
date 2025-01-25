import React from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { useAudio } from '@/lib/audio-context';
import type { AudioTrack } from '@/lib/audio-context';

interface TrackControlsProps {
  track: AudioTrack;
}

const TrackControls: React.FC<TrackControlsProps> = ({ track }) => {
  const { toggleTrack, updateTrack } = useAudio();

  const handleVolumeChange = (value: number[]) => {
    updateTrack(track.id, { volume: value[0] });
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{track.name}</h3>
        <Button
          variant="outline"
          size="icon"
          onClick={() => toggleTrack(track.id)}
        >
          {track.isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Volume2 className="h-4 w-4" />
        <Slider
          value={[track.volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="flex-1"
        />
      </div>
    </Card>
  );
};

export default TrackControls;