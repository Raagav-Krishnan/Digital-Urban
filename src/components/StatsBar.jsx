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
      initial={{ opacity: 0, y: -22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
      className="fixed top-[18px] left-1/2 z-20 -translate-x-1/2 flex items-stretch gap-2 rounded-[20px] glass-premium p-2.5 shadow-float md:gap-3 md:p-3"
    >
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon
        const TrendIcon = kpi.trendUp ? TrendingUp : TrendingDown
        return (
          <motion.article
            key={kpi.label}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: 0.08 * index }}
            whileHover={{ y: -3 }}
            className="min-w-0 flex-1 rounded-2xl border border-white/75 bg-white/64 p-2.5 shadow-soft transition duration-300 hover:bg-white/90 md:p-3.5 md:min-w-[130px]"
          >
            <div className="flex items-center justify-between gap-1.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full md:h-9 md:w-9" style={{ backgroundColor: `${kpi.color}18`, color: kpi.color }}>
                <Icon size={15} strokeWidth={2.4} />
              </div>
              <div className="flex items-center gap-1 rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-extrabold text-slate-500 md:px-2 md:py-1 md:text-[10px]">
                <TrendIcon size={10} />
                {kpi.trend}
              </div>
            </div>

            <p className="mt-2 truncate text-[9px] font-extrabold uppercase tracking-[0.12em] text-slate-400 md:mt-3 md:text-[11px]">
              {kpi.label}
            </p>
            <div className="mt-0.5 flex items-end gap-1 md:mt-1">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: 0.18 + index * 0.06 }}
                className="tabular-nums text-[22px] font-extrabold leading-none text-slate-950 md:text-[27px]"
              >
                {kpi.value}
              </motion.span>
              {kpi.suffix && (
                <span className="pb-0.5 text-[11px] font-extrabold text-slate-400 md:pb-1 md:text-[13px]">{kpi.suffix}</span>
              )}
            </div>

            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-200/80 md:mt-2.5 md:h-1.5">
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
