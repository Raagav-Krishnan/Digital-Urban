import { AnimatePresence, motion } from 'framer-motion'
import {
  X,
  LayoutDashboard,
  Layers,
  PackageOpen,
  BarChart3,
  Bell,
  Settings,
  ShieldCheck,
  Radio,
  Waves,
  Droplets,
  AlertTriangle,
  Send,
  Route,
  FileText,
  Activity,
  Users
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Layers, label: 'Layers' },
  { icon: PackageOpen, label: 'Resources' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Bell, label: 'Alerts' },
  { icon: Settings, label: 'Settings' },
]

const alerts = [
  {
    icon: Waves,
    color: '#EF4444',
    bg: 'bg-danger/15',
    title: 'Polder 12 Overflow',
    body: 'Water level has crossed the critical threshold (92%). Immediate inspection recommended.',
    time: '2 min ago',
  },
  {
    icon: Droplets,
    color: '#F59E0B',
    bg: 'bg-warning/15',
    title: 'Sewage Surge S-04',
    body: 'Sensor pressure rising steadily over the last 30 minutes near De Wallen.',
    time: '8 min ago',
  },
  {
    icon: AlertTriangle,
    color: '#8B5CF6',
    bg: 'bg-purple/15',
    title: 'A10 Underpass Sensor',
    body: 'Infrastructure telemetry is intermittent after power fluctuation.',
    time: '14 min ago',
  },
]

const risks = [
  { icon: Waves, label: 'Flood Exposure', value: '78%', color: '#EF4444' },
  { icon: Droplets, label: 'Sewage Load', value: '42%', color: '#F59E0B' },
  { icon: Users, label: 'Population at Risk', value: '12.4k', color: '#2563EB' },
  { icon: Activity, label: 'Response SLA', value: '7m', color: '#8B5CF6' },
]

export default function AlertDrawer({ open, onClose, mode = 'intel' }) {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const isMenu = mode === 'menu'

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-950/20 backdrop-blur-sm"
          />

          {/* Slide-out Drawer Panel */}
          <motion.div
            initial={{ x: isMenu ? -280 : 280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isMenu ? -280 : 280, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className={`glass-premium fixed top-4 bottom-4 z-50 flex w-[280px] sm:w-[320px] flex-col rounded-[24px] p-5 shadow-float overflow-y-auto border border-white/60 ${
              isMenu ? 'left-4' : 'right-4'
            }`}
          >
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isMenu ? 'bg-primary/10 text-primary' : 'bg-danger/10 text-danger'}`}>
                  {isMenu ? <ShieldCheck size={16} strokeWidth={2.4} /> : <Radio size={15} strokeWidth={2.4} />}
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                    Urban Sentinel
                  </p>
                  <h2 className="text-[16px] font-extrabold text-slate-900">
                    {isMenu ? 'Operations Menu' : 'Intelligence Brief'}
                  </h2>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-800"
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Content Body */}
            {isMenu ? (
              /* MENU MODE CONTENT */
              <div className="flex flex-col gap-1.5 flex-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeNav === item.label
                  return (
                    <motion.button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setActiveNav(item.label)
                        setTimeout(onClose, 250) // close drawer after selection delay
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex h-12 w-full items-center gap-3.5 rounded-2xl px-4 text-[13px] font-bold transition duration-200 ${
                        isActive
                          ? 'bg-primary/10 text-primary border border-primary/15'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800 border border-transparent'
                      }`}
                    >
                      <Icon size={17} strokeWidth={isActive ? 2.4 : 2} />
                      {item.label}
                    </motion.button>
                  )
                })}
              </div>
            ) : (
              /* INTELLIGENCE MODE CONTENT */
              <div className="flex flex-col gap-5 flex-1">
                {/* Sentinel Status */}
                <div className="rounded-2xl border border-white/80 bg-white/50 p-4 shadow-soft">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        Sentinel Status
                      </p>
                      <p className="mt-0.5 text-[18px] font-extrabold text-slate-900">Optimal</p>
                    </div>
                    <span className="relative flex h-3.5 w-3.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-35" />
                      <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-primary/15" />
                    </span>
                  </div>
                  <p className="mt-2 text-[12px] font-medium leading-relaxed text-slate-500">
                    Live GIS, drainage, traffic, and resource layers are synchronized.
                  </p>
                </div>

                {/* Active Alerts */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                      Active Alerts
                    </p>
                    <span className="rounded-full bg-danger/10 px-2 py-0.5 text-[10px] font-extrabold text-danger">
                      3 Live
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {alerts.map((alert) => {
                      const Icon = alert.icon
                      return (
                        <article
                          key={alert.title}
                          className="rounded-2xl border border-white/80 bg-white/50 p-3 shadow-soft"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${alert.bg}`} style={{ color: alert.color }}>
                              <Icon size={15} strokeWidth={2.4} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <h3 className="truncate text-[12.5px] font-extrabold text-slate-950">{alert.title}</h3>
                                <span className="text-[9.5px] font-bold text-slate-400 whitespace-nowrap">{alert.time}</span>
                              </div>
                              <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{alert.body}</p>
                            </div>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </div>

                {/* risks KPI Summary */}
                <div>
                  <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                    Incident Risks
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {risks.map((risk) => {
                      const Icon = risk.icon
                      return (
                        <div
                          key={risk.label}
                          className="rounded-2xl border border-white/80 bg-white/50 p-3 shadow-soft"
                        >
                          <Icon size={14} style={{ color: risk.color }} />
                          <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.09em] text-slate-400">
                            {risk.label}
                          </p>
                          <p className="mt-0.5 text-[18px] font-extrabold text-slate-900">{risk.value}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-slate-200/40">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-4 text-[13px] font-extrabold text-white shadow-glow transition duration-300 hover:bg-blue-700"
                  >
                    <Send size={14} />
                    Dispatch Field Unit
                  </motion.button>
                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="flex h-10 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white/60 px-3 text-[11.5px] font-extrabold text-slate-700 transition duration-300 hover:bg-white"
                    >
                      <Route size={12} />
                      Reroute
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="flex h-10 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white/60 px-3 text-[11.5px] font-extrabold text-slate-700 transition duration-300 hover:bg-white"
                    >
                      <FileText size={12} />
                      Report
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

