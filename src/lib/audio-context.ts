import { createContext, useContext } from 'react';

export interface AudioTrack {
  id: string;
  name: string;
  url: string;
  volume: number;
  isPlaying: boolean;
  audioNode?: AudioBufferSourceNode;
  gainNode?: GainNode;
}

interface AudioContextType {
  audioContext: AudioContext | null;
  tracks: AudioTrack[];
  masterVolume: number;
  addTrack: (track: Omit<AudioTrack, 'id'>) => void;
  removeTrack: (id: string) => void;
  updateTrack: (id: string, updates: Partial<AudioTrack>) => void;
  setMasterVolume: (volume: number) => void;
  toggleTrack: (id: string) => void;
}

export const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};