import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Circle,
  ArrowRightLeft,
  Route,
  Clock,
  Droplets,
  Waves,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react'

const riskMeter = (value, color) => (
  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="h-full rounded-full"
      style={{ backgroundColor: color }}
    />
  </div>
)

export default function RoutePlanner() {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [focused, setFocused] = useState(null)

  const handleFindRoute = () => {
    setShowResult(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      className="glass-strong w-full max-w-sm rounded-2xl p-5 shadow-panel"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
            <Route size={14} className="text-primary" />
          </div>
          <h2 className="text-[14px] font-semibold text-text-primary">Route Planner</h2>
        </div>
        <span className="rounded-full bg-success/10 px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-wide text-success ring-1 ring-success/20">
          Live
        </span>
      </div>

      {/* Input fields */}
      <div className="relative flex flex-col gap-2">
        <motion.div
          animate={{
            boxShadow:
              focused === 'source'
                ? '0 0 0 1px rgba(59,130,246,0.5), 0 0 16px rgba(59,130,246,0.25)'
                : '0 0 0 1px rgba(255,255,255,0.06)',
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-3.5 py-3"
        >
          <Circle size={14} className="text-primary" fill="#3B82F6" />
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            onFocus={() => setFocused('source')}
            onBlur={() => setFocused(null)}
            placeholder="Source location"
            className="w-full bg-transparent text-[13px] font-medium text-text-primary placeholder:text-text-secondary focus:outline-none"
          />
        </motion.div>

        {/* Swap icon */}
        <div className="absolute right-3 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.08] bg-surface-secondary shadow-md">
          <ArrowRightLeft size={12} className="text-text-secondary" />
        </div>

        <motion.div
          animate={{
            boxShadow:
              focused === 'destination'
                ? '0 0 0 1px rgba(59,130,246,0.5), 0 0 16px rgba(59,130,246,0.25)'
                : '0 0 0 1px rgba(255,255,255,0.06)',
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-3.5 py-3"
        >
          <MapPin size={14} className="text-danger" />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onFocus={() => setFocused('destination')}
            onBlur={() => setFocused(null)}
            placeholder="Destination location"
            className="w-full bg-transparent text-[13px] font-medium text-text-primary placeholder:text-text-secondary focus:outline-none"
          />
        </motion.div>
      </div>

      {/* Find route button */}
      <motion.button
        onClick={handleFindRoute}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-[13.5px] font-semibold text-white shadow-glow transition-colors duration-200 hover:bg-blue-500"
      >
        <Route size={15} />
        Find Safe Route
      </motion.button>

      {/* Route result panel */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              {/* Route name + time */}
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-[13.5px] font-semibold text-text-primary">
                    Vondelpark Bypass
                  </p>
                  <div className="mt-1 flex items-center gap-1.5 text-text-secondary">
                    <Clock size={12} />
                    <span className="text-[11.5px] font-medium">23 min · 4.8 km</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10.5px] font-medium uppercase tracking-wide text-text-secondary">
                    Risk Score
                  </span>
                  <span className="text-[20px] font-bold leading-tight text-success">32</span>
                </div>
              </div>

              {/* Risk breakdown */}
              <div className="flex flex-col gap-3">
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-text-secondary">
                      <Waves size={12} />
                      <span className="text-[11.5px] font-medium">Flood Risk</span>
                    </div>
                    <span className="text-[11.5px] font-semibold text-text-primary">Low</span>
                  </div>
                  {riskMeter(28, '#10B981')}
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-text-secondary">
                      <Droplets size={12} />
                      <span className="text-[11.5px] font-medium">Waterlogging Risk</span>
                    </div>
                    <span className="text-[11.5px] font-semibold text-text-primary">Moderate</span>
                  </div>
                  {riskMeter(48, '#F59E0B')}
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-text-secondary">
                      <AlertTriangle size={12} />
                      <span className="text-[11.5px] font-medium">Overflow Risk</span>
                    </div>
                    <span className="text-[11.5px] font-semibold text-text-primary">Low</span>
                  </div>
                  {riskMeter(18, '#10B981')}
                </div>
              </div>

              {/* Recommended actions */}
              <div className="mt-4 border-t border-white/[0.06] pt-3">
                <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-wide text-text-secondary">
                  Recommended Actions
                </p>
                <div className="flex flex-col gap-1.5">
                  {[
                    'Avoid Overtoom between 17:00–19:00',
                    'Use elevated route via Stadhouderskade',
                    'Monitor sewage sensor S-04 before departure',
                  ].map((action) => (
                    <div key={action} className="flex items-start gap-2 text-[12px] text-text-secondary">
                      <ChevronRight size={13} className="mt-0.5 flex-shrink-0 text-primary" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
