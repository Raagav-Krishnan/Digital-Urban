import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  PackageOpen,
  Siren,
  Bell,
  Settings,
  ShieldCheck,
} from 'lucide-react'

const items = [
  { icon: LayoutDashboard, label: 'Overview' },
  { icon: PackageOpen, label: 'Assets' },
  { icon: Siren, label: 'Incidents' },
  { icon: Bell, label: 'Alerts' },
  { icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const [active, setActive] = useState('Overview')
  const [hovered, setHovered] = useState(null)

  return (
    <aside className="dashboard-sidebar glass-command fixed z-50 w-16 rounded-[28px] p-2.5 shadow-float">
      <motion.div
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className="flex flex-col items-center gap-5"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-glow">
          <ShieldCheck size={20} strokeWidth={2.4} />
        </div>

        <div className="flex flex-col items-center gap-3">
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
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.94 }}
                className={`group relative flex h-11 w-11 items-center justify-center rounded-full transition duration-300 ${
                  isActive ? 'text-primary' : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-label={item.label}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-primary/12 ring-1 ring-primary/15"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                  />
                )}
                <span className="absolute inset-0 rounded-full bg-slate-100/80 opacity-0 transition duration-300 group-hover:opacity-100" />
                <Icon className="relative z-10" size={19} strokeWidth={2.2} />

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
      </motion.div>
    </aside>
  )
}
