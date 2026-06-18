# Urban Sentinel

A flood-aware route intelligence platform — premium dark-themed command-center UI built with React, Vite, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL in your browser.

## Build

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/
    Navbar.jsx        Top navigation bar (logo, status, profile)
    Sidebar.jsx        Compact left navigation rail
    MapView.jsx        Map placeholder container + layer pills + zoom controls
    RoutePlanner.jsx   Floating glass route search panel + route result
    InfoPanel.jsx      Right sentinel status / alerts / risk summary / layers
    StatsBar.jsx       Bottom status strip with key metrics
    AlertDrawer.jsx    Slide-in alerts drawer
  App.jsx              Main layout composition
  index.css            Tailwind layers + global styles
```

## Map integration

`MapView.jsx` renders a responsive container (`#map-container`) intended to be
populated by a backend-rendered map. No map library (Mapbox/Leaflet/etc.) is
included — only the layout, controls, and placeholder visuals.

## Design tokens

| Token | Value |
| --- | --- |
| Background | `#0B1220` |
| Surface | `#111827` |
| Surface Secondary | `#1E293B` |
| Primary | `#3B82F6` |
| Success | `#10B981` |
| Warning | `#F59E0B` |
| Danger | `#EF4444` |
| Text Primary | `#F8FAFC` |
| Text Secondary | `#94A3B8` |

Font: Inter (loaded via Google Fonts in `index.html`).
