import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Layers,
  PackageOpen,
  BarChart3,
  Bell,
  Settings,
  ShieldCheck,
} from 'lucide-react'

const items = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Layers, label: 'Layers' },
  { icon: PackageOpen, label: 'Resources' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Bell, label: 'Alerts' },
  { icon: Settings, label: 'Settings' },
]

export default function Sidebar({ backendStatus = 'Checking...' }) {
  const [active, setActive] = useState('Dashboard')
  const [hovered, setHovered] = useState(null)

  return (
    <aside className="hidden md:flex fixed left-6 top-1/2 z-30 -translate-y-1/2 w-16 flex-col items-center gap-4 rounded-[32px] glass-premium py-4 px-2 shadow-float border border-white/60">
      <motion.div
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className="flex flex-col items-center gap-4 w-full"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-glow">
          <ShieldCheck size={20} strokeWidth={2.4} />
        </div>

        <div className="h-[1px] w-8 bg-slate-200/50" />

        <div className="flex flex-col items-center gap-2.5 w-full">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = active === item.label

            return (
              <motion.button
                key={item.label}
                type="button"
                onClick={() => setActive(item.label)}
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                className={`group relative flex h-11 w-11 items-center justify-center rounded-2xl transition duration-300 ${
                  isActive ? 'text-primary' : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-label={item.label}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-2xl bg-primary/10 ring-1 ring-primary/20"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <span className="absolute inset-0 rounded-2xl bg-white/60 opacity-0 transition duration-300 group-hover:opacity-100 shadow-sm" />
                )}
                <Icon className="relative z-10" size={18} strokeWidth={2.2} />

                <AnimatePresence>
                  {hovered === item.label && (
                    <motion.span
                      initial={{ opacity: 0, x: -4, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -4, scale: 0.98 }}
                      transition={{ duration: 0.16 }}
                      className="pointer-events-none absolute left-[calc(100%+14px)] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-[12px] font-bold text-slate-700 shadow-soft backdrop-blur-xl"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </div>

        <div className="h-[1px] w-8 bg-slate-200/50" />

        {/* Integrated Backend Status dot */}
        <div 
          className="group relative flex h-8 w-8 items-center justify-center rounded-full cursor-help"
          onMouseEnter={() => setHovered('BackendStatus')}
          onMouseLeave={() => setHovered(null)}
        >
          <span className={`relative flex h-2.5 w-2.5`}>
            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
              backendStatus === 'Online' ? 'bg-success' : backendStatus === 'Checking...' ? 'bg-warning' : 'bg-danger'
            }`} />
            <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
              backendStatus === 'Online' ? 'bg-success' : backendStatus === 'Checking...' ? 'bg-warning' : 'bg-danger'
            }`} />
          </span>

          <AnimatePresence>
            {hovered === 'BackendStatus' && (
              <motion.span
                initial={{ opacity: 0, x: -4, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -4, scale: 0.98 }}
                transition={{ duration: 0.16 }}
                className="pointer-events-none absolute left-[calc(100%+14px)] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-[11px] font-bold text-slate-700 shadow-soft backdrop-blur-xl"
              >
                Backend: {backendStatus}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </aside>
  )
}

