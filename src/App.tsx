import React from "react";
import { AudioProvider } from "@/components/audio-provider";
import { AudioMixer } from "@/components/audio-mixer";
import { SoundGrid } from "@/components/sound-grid";
import { ThemeToggle } from "@/components/theme-toggle";

function App() {
  return (
    <AudioProvider>
      <main className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Undertone Sound Mixer</h1>
          <ThemeToggle />
        </div>
        <SoundGrid />
        <AudioMixer />
      </main>
    </AudioProvider>
  );
}

export default App;
