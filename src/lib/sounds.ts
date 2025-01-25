export const sounds = [
  {
    name: "Rain",
    url: "/sounds/rain.mp3",
  },
  {
    name: "Ocean Waves",
    url: "/sounds/ocean-waves.mp3",
  },
  {
    name: "Forest Birds",
    url: "/sounds/forest-birds.mp3",
  },
  {
    name: "Campfire",
    url: "/sounds/campfire.mp3",
  },
  {
    name: "Wind Chimes",
    url: "/sounds/wind-chimes.mp3",
  },
  {
    name: "White Noise",
    url: "/sounds/white-noise.mp3",
  },
] as const;

export type SoundName = (typeof sounds)[number]["name"];
