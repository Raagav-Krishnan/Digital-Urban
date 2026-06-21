import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Activity,
  Waves,
  Droplets,
  Users,
  Radio,
  Route,
  FileText,
  Send,
} from 'lucide-react'

const alerts = [
  {
    icon: Waves,
    color: '#EF4444',
    title: 'Polder 12 Overflow',
    meta: 'Critical - 2 min ago',
    body: 'Water levels crossed 92%. Gate response team has been notified.',
  },
  {
    icon: Droplets,
    color: '#F59E0B',
    title: 'Sewage Surge S-04',
    meta: 'Rising - 8 min ago',
    body: 'Pressure trend increasing near De Wallen collector line.',
  },
  {
    icon: AlertTriangle,
    color: '#8B5CF6',
    title: 'A10 Underpass Sensor',
    meta: 'Watch - 14 min ago',
    body: 'Infrastructure telemetry is intermittent after power fluctuation.',
  },
]

const risks = [
  { icon: Waves, label: 'Flood Exposure', value: '78%', color: '#EF4444' },
  { icon: Droplets, label: 'Sewage Load', value: '42%', color: '#F59E0B' },
  { icon: Users, label: 'Population at Risk', value: '12.4k', color: '#2563EB' },
  { icon: Activity, label: 'Response SLA', value: '7m', color: '#8B5CF6' },
]

export default function InfoPanel() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
      className="fixed right-[18px] top-[18px] z-30 hidden w-[clamp(280px,22vw,340px)] max-h-[calc(100vh-36px)] flex-col overflow-y-auto rounded-[28px] glass-premium p-5 shadow-float lg:flex"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
            Urban Sentinel
          </p>
          <h1 className="mt-1 text-[28px] font-extrabold leading-tight text-slate-950">
            Intelligence Brief
          </h1>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Radio size={18} strokeWidth={2.4} />
        </div>
      </div>

      <section className="mt-6 rounded-3xl border border-white/75 bg-white/62 p-4 shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Sentinel Status
            </p>
            <p className="mt-1 text-[22px] font-extrabold text-slate-950">Optimal</p>
          </div>
          <span className="relative flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-35" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-primary ring-4 ring-primary/15" />
          </span>
        </div>
        <p className="mt-3 text-[13px] font-medium leading-relaxed text-slate-500">
          Live GIS, drainage, traffic, and resource layers are synchronized.
        </p>
      </section>

      <section className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
            Active Alerts
          </p>
          <span className="rounded-full bg-danger/10 px-2.5 py-1 text-[11px] font-extrabold text-danger">
            3 Live
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {alerts.map((alert, index) => {
            const Icon = alert.icon
            return (
              <motion.article
                key={alert.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: 0.08 * index }}
                whileHover={{ y: -2 }}
                className="rounded-3xl border border-white/75 bg-white/68 p-4 shadow-soft transition duration-300 hover:bg-white/90"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${alert.color}18`, color: alert.color }}>
                    <Icon size={18} strokeWidth={2.4} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-[14px] font-extrabold text-slate-900">{alert.title}</h2>
                    <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">
                      {alert.meta}
                    </p>
                    <p className="mt-2 text-[12.5px] font-medium leading-relaxed text-slate-500">
                      {alert.body}
                    </p>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {risks.map((risk) => {
            const Icon = risk.icon
            return (
              <motion.div
                key={risk.label}
                whileHover={{ y: -2 }}
                className="rounded-3xl border border-white/75 bg-white/62 p-4 shadow-soft"
              >
                <Icon size={17} style={{ color: risk.color }} />
                <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.09em] text-slate-400">
                  {risk.label}
                </p>
                <p className="mt-1 text-[23px] font-extrabold text-slate-950">{risk.value}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="mt-6 flex shrink-0 flex-col gap-3">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
          Recommended Actions
        </p>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-4 text-[14px] font-extrabold text-white shadow-glow transition duration-300 hover:bg-blue-700"
        >
          <Send size={16} />
          Dispatch Field Unit
        </motion.button>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 text-[12px] font-extrabold text-slate-700 transition duration-300 hover:bg-white"
          >
            <Route size={14} />
            Reroute
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 text-[12px] font-extrabold text-slate-700 transition duration-300 hover:bg-white"
          >
            <FileText size={14} />
            Report
          </motion.button>
        </div>
      </section>
    </motion.aside>
  )
}
