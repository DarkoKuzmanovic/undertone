import React, { useState, useEffect, useCallback } from "react";
import { AudioContext, AudioTrack } from "@/lib/audio-context";
import { nanoid } from "nanoid";

// Add this declaration to handle Safari's WebKit prefix
declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [masterVolume, setMasterVolume] = useState(1);

  useEffect(() => {
    // Create AudioContext only in browser environment and handle Safari
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(ctx);
    return () => {
      ctx.close();
    };
  }, []);

  const addTrack = useCallback((track: Omit<AudioTrack, "id">) => {
    setTracks((prev) => [...prev, { ...track, id: nanoid() }]);
  }, []);

  const removeTrack = useCallback((id: string) => {
    setTracks((prev) => {
      const track = prev.find((t) => t.id === id);
      if (track?.isPlaying) {
        track.audioNode?.stop();
        track.audioNode?.disconnect();
        track.gainNode?.disconnect();
      }
      return prev.filter((track) => track.id !== id);
    });
  }, []);

  const updateTrack = useCallback((id: string, updates: Partial<AudioTrack>) => {
    setTracks((prev) => prev.map((track) => (track.id === id ? { ...track, ...updates } : track)));
  }, []);

  const toggleTrack = useCallback(
    async (id: string) => {
      if (!audioContext) return;

      const track = tracks.find((t) => t.id === id);
      if (!track) return;

      if (track.isPlaying) {
        track.audioNode?.stop();
        track.audioNode?.disconnect();
        updateTrack(id, { isPlaying: false, audioNode: undefined });
      } else {
        try {
          const response = await fetch(track.url);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

          const sourceNode = audioContext.createBufferSource();
          sourceNode.buffer = audioBuffer;
          sourceNode.loop = true;

          const gainNode = audioContext.createGain();
          gainNode.gain.value = track.volume * masterVolume;

          sourceNode.connect(gainNode);
          gainNode.connect(audioContext.destination);
          sourceNode.start();

          updateTrack(id, {
            isPlaying: true,
            audioNode: sourceNode,
            gainNode: gainNode,
          });
        } catch (error) {
          console.error("Error loading audio:", error);
        }
      }
    },
    [audioContext, tracks, masterVolume, updateTrack]
  );

  useEffect(() => {
    tracks.forEach((track) => {
      if (track.gainNode) {
        track.gainNode.gain.value = track.volume * masterVolume;
      }
    });
  }, [masterVolume, tracks]);

  return (
    <AudioContext.Provider
      value={{
        audioContext,
        tracks,
        masterVolume,
        addTrack,
        removeTrack,
        updateTrack,
        setMasterVolume,
        toggleTrack,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
