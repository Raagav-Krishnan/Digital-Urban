import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, ChevronDown, Waves, Droplets, Truck, Layers3, Menu, Bell
} from 'lucide-react'

const filters = [
  { key: 'flood', label: 'Flood', color: '#EF4444', icon: Waves },
  { key: 'sewage', label: 'Sewage', color: '#F59E0B', icon: Droplets },
  { key: 'resources', label: 'Resources', color: '#3B82F6', icon: Truck },
  { key: 'traffic', label: 'Traffic', color: '#64748B', icon: Layers3 },
]

const districts = ['All Districts', 'Central', 'North', 'South', 'East', 'West']
const modules = ['Command', 'Planning', 'Operations']

export default function CommandBar({ onMenuClick, onIntelClick, activeAlertsCount = 3 }) {
  const [activeFilters, setActiveFilters] = useState({
    flood: true, sewage: true, resources: true, traffic: false,
  })
  const [activeModule, setActiveModule] = useState('Command')
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts')
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false)

  return (
    <div className="fixed top-4 left-4 right-4 z-20 pointer-events-none flex justify-center md:left-[88px] md:right-6 lg:right-[344px] xl:right-[374px]">
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className="pointer-events-auto w-full max-w-[700px] xl:max-w-[800px] rounded-[24px] lg:rounded-[32px] glass-premium p-2 shadow-float flex items-center justify-between gap-2"
      >
      {/* Mobile Menu Trigger */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onMenuClick}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/60 hover:bg-white text-slate-700 shadow-soft transition lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={18} strokeWidth={2.25} />
      </motion.button>

      {/* Search Field */}
      <label className="flex h-9 min-w-[120px] flex-1 items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-3 shadow-soft transition duration-300 focus-within:border-primary/30 focus-within:shadow-glow lg:h-10 lg:min-w-[180px]">
        <Search size={15} className="shrink-0 text-slate-400" />
        <input
          type="text"
          placeholder="Search locations, units..."
          className="h-full min-w-0 flex-1 bg-transparent text-[11px] font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none lg:text-[13px]"
        />
      </label>

      {/* Filters (Desktop/Tablet) */}
      <div className="hidden md:flex items-center gap-1">
        {filters.map((filter) => {
          const Icon = filter.icon
          const active = activeFilters[filter.key]
          return (
            <motion.button
              key={filter.key}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveFilters(p => ({ ...p, [filter.key]: !p[filter.key] }))}
              className={`flex h-9 items-center gap-1.5 rounded-full border px-2.5 text-[10px] font-bold shadow-soft transition duration-300 lg:h-10 lg:px-3.5 lg:text-[11px] ${
                active
                  ? 'border-white bg-white text-slate-800'
                  : 'border-slate-200/50 bg-white/40 text-slate-500 hover:bg-white/60'
              }`}
            >
              <Icon size={12} style={{ color: active ? filter.color : '#94a3b8' }} />
              <span className="hidden lg:inline">{filter.label}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Modules Selector (Desktop) */}
      <div className="hidden lg:flex items-center rounded-full border border-slate-200/60 bg-white/40 p-0.5 gap-0.5">
        {modules.map(m => {
          const isActive = activeModule === m
          return (
            <button
              key={m}
              onClick={() => setActiveModule(m)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all duration-300 relative ${
                isActive ? 'text-slate-800' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-module-bg"
                  className="absolute inset-0 rounded-full bg-white shadow-sm border border-slate-100"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{m}</span>
            </button>
          )
        })}
      </div>

      {/* District Dropdown Selector */}
      <div className="relative">
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setDistrictDropdownOpen(!districtDropdownOpen)}
          className="flex h-9 items-center gap-1.5 rounded-full border border-white bg-white px-3 text-[10px] font-bold text-slate-700 shadow-soft transition duration-300 lg:h-10 lg:px-4 lg:text-[11px]"
        >
          <span className="max-w-[70px] truncate sm:max-w-none">{selectedDistrict}</span>
          <ChevronDown size={12} className={`text-slate-500 transition-transform duration-200 ${districtDropdownOpen ? 'rotate-180' : ''}`} />
        </motion.button>

        <AnimatePresence>
          {districtDropdownOpen && (
            <>
              {/* Overlay background for closing dropdown */}
              <div className="fixed inset-0 z-10" onClick={() => setDistrictDropdownOpen(false)} />
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-1.5 z-20 w-40 rounded-2xl border border-white bg-white/95 p-1.5 shadow-float backdrop-blur-xl"
              >
                {districts.map(d => (
                  <button
                    key={d}
                    onClick={() => {
                      setSelectedDistrict(d)
                      setDistrictDropdownOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-bold transition ${
                      selectedDistrict === d
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Intel Brief Trigger */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onIntelClick}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/60 hover:bg-white text-slate-700 shadow-soft transition lg:hidden relative"
        aria-label="Open intelligence brief"
      >
        <Bell size={16} strokeWidth={2.25} />
        {activeAlertsCount > 0 && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger animate-pulse" />
        )}
      </motion.button>
      </motion.header>
    </div>
  )
}
