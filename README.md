# 🃏 Random TMI Card Generator

A lightweight React app for creating and sharing TMI (Too Much Information) cards with random questions.

## Quick Start

```bash
npm install && npm run dev
```

Open http://localhost:8080 - click "Get Random Question", type your answer, choose a theme, and export/share your card as PNG!

## Features

- Random question generator (avoids repeating previous question)
- 200-character answer limit with counter
- Two themes: Minimal (clean white) and Pastel (gradient background)
- 1080×1920 card export via html2canvas
- Native sharing support with download fallback
- Mobile-first responsive design

Built with React + Vite + TypeScript + TailwindCSS