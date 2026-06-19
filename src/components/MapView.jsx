import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  ChevronDown,
  Plus,
  Minus,
  Navigation,
  Layers3,
  LocateFixed,
  Maximize2,
  Waves,
  Droplets,
  Truck,
  Building2,
} from 'lucide-react'

const filters = [
  { key: 'flood', label: 'Flood', color: '#EF4444', icon: Waves },
  { key: 'sewage', label: 'Sewage', color: '#F59E0B', icon: Droplets },
  { key: 'resources', label: 'Resources', color: '#3B82F6', icon: Truck },
  { key: 'traffic', label: 'Traffic', color: '#64748B', icon: Layers3 },
]

const districts = ['District', 'Central', 'North', 'West', 'Canal Ring']

const mapLabels = [
  { text: 'WESTPOORT', left: '9%', top: '23%', size: 'text-[13px] sm:text-[16px]' },
  { text: 'SLOTERDIJK', left: '20%', top: '38%', size: 'text-[13px] sm:text-[16px]' },
  { text: 'AMSTERDAM-WEST', left: '24%', top: '48%', size: 'text-[16px] sm:text-[22px]' },
  { text: 'DE WALLEN', left: '56%', top: '60%', size: 'text-[12px] sm:text-[14px]' },
  { text: 'Amsterdam', left: '48%', top: '44%', size: 'text-[30px] sm:text-[42px]', city: true },
  { text: 'AMSTERDAM-ZUID', left: '36%', top: '77%', size: 'text-[15px] sm:text-[20px]' },
  { text: 'Museum Quarter', left: '19%', top: '64%', size: 'text-[13px] sm:text-[17px]', poi: true },
  { text: 'Harbor Grid', left: '35%', top: '18%', size: 'text-[13px] sm:text-[17px]', poi: true },
]

const roads = [
  { label: 'S101', left: '20%', top: '17%' },
  { label: 'S117', left: '70%', top: '17%' },
  { label: 'S116', left: '75%', top: '28%' },
  { label: 'A5', left: '14%', top: '31%', highway: true },
  { label: 'A10', left: '26%', top: '30%', highway: true },
  { label: 'S102', left: '34%', top: '26%' },
  { label: 'S100', left: '42%', top: '52%' },
  { label: 'S108', left: '54%', top: '73%' },
  { label: 'S110', left: '64%', top: '72%' },
  { label: 'S100', left: '74%', top: '55%' },
]

const markers = [
  {
    id: 'flood-01',
    type: 'emergency',
    label: 'Critical Flood Zone',
    sublabel: 'Polder 12 - 92%',
    color: '#EF4444',
    left: '80%',
    top: '34%',
    anchor: 'left',
    pulse: true,
    icon: Waves,
  },
  {
    id: 'sewage-04',
    type: 'sewage',
    label: 'Sewage Surge',
    sublabel: 'Sensor S-04',
    color: '#F59E0B',
    left: '31%',
    top: '59%',
    anchor: 'right',
    pulse: true,
    icon: Droplets,
  },
  {
    id: 'resource-12',
    type: 'resource',
    label: 'Mobile Pump Unit',
    sublabel: 'ETA 7 min',
    color: '#3B82F6',
    left: '48%',
    top: '39%',
    anchor: 'bottom',
    icon: Truck,
  },
  {
    id: 'infra-02',
    type: 'infrastructure',
    label: 'Control Facility',
    sublabel: 'Station ready',
    color: '#8B5CF6',
    left: '44%',
    top: '24%',
    anchor: 'bottom',
    icon: Building2,
  },
  {
    id: 'infra-07',
    type: 'infrastructure',
    label: 'Drainage Hub',
    sublabel: 'Valve open',
    color: '#8B5CF6',
    left: '47%',
    top: '66%',
    anchor: 'top',
    icon: Building2,
  },
]

function CommandBar() {
  const [activeFilters, setActiveFilters] = useState({
    flood: true,
    sewage: true,
    resources: true,
    traffic: false,
  })

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="dashboard-command-bar pointer-events-auto fixed z-40 flex flex-wrap items-center gap-3 rounded-[28px] border border-white/80 bg-white/80 p-2.5 shadow-float backdrop-blur-2xl lg:flex-nowrap lg:gap-2.5"
    >
      <motion.label
        whileFocus={{ scale: 1.005 }}
        className="flex h-11 min-w-[180px] flex-1 items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/90 px-3.5 shadow-soft transition duration-300 focus-within:border-primary/30 focus-within:shadow-glow sm:min-w-[220px] lg:min-w-[240px]"
      >
        <Search size={17} className="shrink-0 text-slate-500" />
        <input
          type="text"
          placeholder="Search assets, incidents, coordinates..."
          className="h-full min-w-0 flex-1 bg-transparent text-[13px] font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none"
        />
      </motion.label>

      <div className="flex min-w-0 flex-wrap items-center gap-2.5 lg:flex-nowrap">
        {filters.map((filter) => {
          const Icon = filter.icon
          const active = activeFilters[filter.key]
          return (
            <motion.button
              key={filter.key}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                setActiveFilters((current) => ({
                  ...current,
                  [filter.key]: !current[filter.key],
                }))
              }
              className={`flex h-11 shrink-0 items-center gap-2 rounded-full border px-3.5 text-[12px] font-bold shadow-soft transition duration-300 lg:px-4 lg:text-[13px] ${
                active
                  ? 'border-white bg-white text-slate-800'
                  : 'border-slate-200/70 bg-white/50 text-slate-500'
              }`}
            >
              <Icon size={14} style={{ color: active ? filter.color : '#94a3b8' }} />
              {filter.label}
            </motion.button>
          )
        })}

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="flex h-11 shrink-0 items-center gap-2 rounded-full border border-white bg-white px-3.5 text-[12px] font-bold text-slate-800 shadow-soft transition duration-300 lg:px-4 lg:text-[13px]"
        >
          {districts[0]}
          <ChevronDown size={14} className="text-slate-500" />
        </motion.button>
      </div>
    </motion.header>
  )
}

function MarkerCallout({ marker }) {
  const Icon = marker.icon
  const anchorClass = {
    left: 'left-7 top-1/2 -translate-y-1/2',
    right: 'right-7 top-1/2 -translate-y-1/2',
    top: 'left-1/2 bottom-8 -translate-x-1/2',
    bottom: 'left-1/2 top-8 -translate-x-1/2',
  }[marker.anchor]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.16 }}
      className="absolute z-30"
      style={{ left: marker.left, top: marker.top }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        {marker.pulse && (
          <span
            className="absolute inset-0 rounded-full opacity-40 marker-pulse"
            style={{ backgroundColor: marker.color }}
          />
        )}
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white text-white shadow-marker"
          style={{ backgroundColor: marker.color }}
        >
          <Icon size={18} strokeWidth={2.3} />
        </motion.div>
        <div
          className={`pointer-events-none absolute ${anchorClass} z-20 hidden min-w-[142px] whitespace-nowrap rounded-2xl border border-white/80 bg-white/88 px-3 py-2 shadow-soft backdrop-blur-xl md:block`}
        >
          <p className="text-[11px] font-extrabold uppercase tracking-[0.08em]" style={{ color: marker.color }}>
            {marker.label}
          </p>
          <p className="mt-0.5 text-[11px] font-semibold text-slate-500">{marker.sublabel}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function MapView() {
  return (
    <section className="relative h-full w-full overflow-hidden">
      <CommandBar />

      <div id="map-container" className="map-canvas absolute inset-0 h-full w-full overflow-hidden">
        <div className="water-channel left-[42%] top-[-8%] h-[120%] w-[13%] rotate-[17deg]" />
        <div className="water-channel left-[62%] top-[19%] h-[74%] w-[8%] rotate-[72deg]" />
        <div className="water-channel left-[16%] top-[62%] h-[65%] w-[9%] rotate-[101deg]" />

        <div className="map-road left-[4%] top-[30%] h-3 w-[88%] rotate-[-4deg]" />
        <div className="map-road left-[18%] top-[10%] h-3 w-[80%] rotate-[51deg]" />
        <div className="map-road left-[8%] top-[75%] h-3 w-[90%] rotate-[-15deg]" />
        <div className="map-road left-[55%] top-[15%] h-3 w-[66%] rotate-[97deg]" />
        <div className="map-road left-[-2%] top-[55%] h-2.5 w-[64%] rotate-[10deg]" />
        <div className="map-road-secondary left-[12%] top-[42%] h-2 w-[80%] rotate-[22deg]" />
        <div className="map-road-secondary left-[26%] top-[14%] h-2 w-[67%] rotate-[118deg]" />
        <div className="map-road-secondary left-[36%] top-[83%] h-2 w-[52%] rotate-[-38deg]" />

        {mapLabels.map((label) => (
          <div
            key={label.text}
            className={`pointer-events-none absolute z-10 select-none whitespace-nowrap font-extrabold ${
              label.city
                ? 'normal-case text-slate-900/70'
                : label.poi
                  ? 'text-violet-500/70'
                  : 'uppercase tracking-[0.14em] text-slate-600/45'
            } ${label.size}`}
            style={{ left: label.left, top: label.top }}
          >
            {label.text}
          </div>
        ))}

        {roads.map((road) => (
          <div
            key={`${road.label}-${road.left}-${road.top}`}
            className="absolute z-20 rounded-md border border-slate-300/80 bg-white/85 px-2 py-0.5 text-[12px] font-extrabold text-slate-600 shadow-sm backdrop-blur"
            style={{ left: road.left, top: road.top, color: road.highway ? '#EF4444' : undefined }}
          >
            {road.label}
          </div>
        ))}

        {markers.map((marker) => (
          <MarkerCallout key={marker.id} marker={marker} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="dashboard-map-controls fixed z-40 flex flex-col gap-2.5"
      >
        {[
          { icon: Plus, label: 'Zoom in' },
          { icon: Minus, label: 'Zoom out' },
          { icon: LocateFixed, label: 'Locate' },
          { icon: Navigation, label: 'Recenter' },
          { icon: Maximize2, label: 'Fullscreen' },
        ].map((control) => {
          const Icon = control.icon
          return (
            <motion.button
              key={control.label}
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="glass-command flex h-10 w-10 items-center justify-center rounded-full text-slate-700 shadow-float transition duration-300 hover:text-primary sm:h-11 sm:w-11 lg:h-12 lg:w-12"
              aria-label={control.label}
              title={control.label}
            >
              <Icon size={17} strokeWidth={2.3} />
            </motion.button>
          )
        })}
      </motion.div>
    </section>
  )
}
