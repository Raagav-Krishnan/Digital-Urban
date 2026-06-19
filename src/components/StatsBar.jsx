import { motion } from 'framer-motion'
import { Waves, Droplets, Truck, Siren, TrendingUp, TrendingDown } from 'lucide-react'

const kpis = [
  {
    label: 'Flood Risk',
    value: 78,
    suffix: '%',
    color: '#EF4444',
    trend: '+8%',
    trendUp: true,
    icon: Waves,
  },
  {
    label: 'Sewage Risk',
    value: 42,
    suffix: '%',
    color: '#F59E0B',
    trend: '+3%',
    trendUp: true,
    icon: Droplets,
  },
  {
    label: 'Resources',
    value: 18,
    suffix: '',
    color: '#3B82F6',
    trend: '4 free',
    trendUp: false,
    icon: Truck,
  },
  {
    label: 'Active Incidents',
    value: 11,
    suffix: '',
    color: '#8B5CF6',
    trend: '-2',
    trendUp: false,
    icon: Siren,
  },
]

export default function StatsBar() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
      className="dashboard-stats-bar glass-command fixed z-40 mx-auto grid max-w-[920px] grid-cols-2 gap-2.5 rounded-[28px] p-2.5 shadow-float md:grid-cols-4 md:gap-3 md:p-3"
    >
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon
        const TrendIcon = kpi.trendUp ? TrendingUp : TrendingDown
        return (
          <motion.article
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: 0.08 * index }}
            whileHover={{ y: -3 }}
            className="min-w-0 rounded-3xl border border-white/75 bg-white/64 p-3 shadow-soft transition duration-300 hover:bg-white/90 md:p-3.5"
          >
            <div className="flex items-center justify-between gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${kpi.color}18`, color: kpi.color }}>
                <Icon size={17} strokeWidth={2.4} />
              </div>
              <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-extrabold text-slate-500">
                <TrendIcon size={11} />
                {kpi.trend}
              </div>
            </div>

            <p className="mt-3 truncate text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400 md:text-[11px]">
              {kpi.label}
            </p>
            <div className="mt-1 flex items-end gap-1">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: 0.18 + index * 0.06 }}
                className="tabular-nums text-[27px] font-extrabold leading-none text-slate-950 sm:text-[31px]"
              >
                {kpi.value}
              </motion.span>
              {kpi.suffix && (
                <span className="pb-1 text-[13px] font-extrabold text-slate-400">{kpi.suffix}</span>
              )}
            </div>

            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-200/80">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: kpi.suffix ? `${kpi.value}%` : `${Math.min(kpi.value * 5, 92)}%` }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
                className="h-full rounded-full"
                style={{ backgroundColor: kpi.color }}
              />
            </div>
          </motion.article>
        )
      })}
    </motion.section>
  )
}
