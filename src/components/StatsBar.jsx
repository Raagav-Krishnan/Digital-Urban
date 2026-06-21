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
    <div className="fixed bottom-4 left-4 right-4 z-30 pointer-events-none flex justify-center md:bottom-6 md:left-[88px] md:right-6 lg:right-[344px] xl:right-[374px]">
      <motion.section
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
        className="pointer-events-auto w-full max-w-[700px] xl:max-w-[800px] flex items-stretch gap-2 rounded-[24px] lg:rounded-[32px] glass-premium p-2 shadow-float overflow-x-auto no-scrollbar md:gap-3 md:p-3"
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
            className="min-w-[130px] flex-1 rounded-[18px] lg:rounded-[24px] border border-white/70 bg-white/60 p-2.5 shadow-soft transition duration-300 hover:bg-white/85 md:p-3.5"
          >
            <div className="flex items-center justify-between gap-1.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full md:h-9 md:w-9" style={{ backgroundColor: `${kpi.color}15`, color: kpi.color }}>
                <Icon size={15} strokeWidth={2.4} />
              </div>
              <div className="flex items-center gap-1 rounded-full bg-slate-100/80 px-1.5 py-0.5 text-[9px] font-extrabold text-slate-500 md:px-2 md:py-1 md:text-[10px]">
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
                className="tabular-nums text-[20px] font-extrabold leading-none text-slate-950 md:text-[25px]"
              >
                {kpi.value}
              </motion.span>
              {kpi.suffix && (
                <span className="pb-0.5 text-[11px] font-extrabold text-slate-400 md:pb-1 md:text-[12px]">{kpi.suffix}</span>
              )}
            </div>

            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-200/50 md:mt-2.5 md:h-1.5">
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
    </div>
  )
}
