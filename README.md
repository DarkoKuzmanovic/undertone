# Undertone 🎵

Undertone is a modern, elegant ambient sound mixer built with React, TypeScript, and the Web Audio API. Create your perfect soundscape by mixing different ambient sounds with customizable volume controls.

## Features

- 🎚️ Mix multiple ambient sounds
- 🌓 Dark/Light theme support
- 🔊 Individual and master volume controls
- 💾 Persistent theme preferences
- 🎯 Responsive design
- 🎵 High-quality, loopable ambient sounds

## Tech Stack

- React 18
- TypeScript
- Vite
- Electron
- Web Audio API
- Tailwind CSS
- shadcn/ui
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/undertone.git
cd undertone
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. For Electron development:

```bash
npm run electron:dev
# or
yarn electron:dev
```

### Building

To build for production:

```bash
npm run build
# or
yarn build
```

For Electron builds:

```bash
npm run electron:build
# or
yarn electron:build
```

## Project Structure

undertone/
├── src/
│ ├── components/ # React components
│ ├── hooks/ # Custom React hooks
│ ├── lib/ # Utilities and contexts
│ └── sounds/ # Audio files
├── public/ # Static assets
└── electron/ # Electron main process

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Sound effects from [source]
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)