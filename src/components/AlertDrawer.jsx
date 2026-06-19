import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, X, Waves, Droplets, ChevronRight } from 'lucide-react'

const alertItems = [
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
    color: '#F59E0B',
    bg: 'bg-warning/15',
    title: 'Road Closure - A10 West',
    body: 'Lane closure due to waterlogging. Expected to clear within 2 hours.',
    time: '21 min ago',
  },
]

export default function AlertDrawer({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: 24, y: 40, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ x: 24, y: 40, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass-command fixed bottom-4 left-4 right-4 z-50 flex max-h-[calc(100dvh-1rem)] flex-col rounded-[28px] p-5 shadow-float sm:left-auto sm:top-4 sm:h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-2rem)] sm:w-full sm:max-w-sm sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-danger/10">
                  <AlertTriangle size={15} className="text-danger" />
                </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
                      Intelligence Brief
                    </p>
                    <h2 className="text-[16px] font-extrabold text-text-primary">Active Alerts</h2>
                  </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors duration-200 hover:bg-slate-100 hover:text-text-primary"
              >
                <X size={16} />
              </motion.button>
            </div>

            <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto">
              {alertItems.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -2 }}
                    className="cursor-pointer rounded-3xl border border-white/70 bg-white/64 p-4 transition-all duration-200 hover:bg-white hover:shadow-card"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${item.bg}`}>
                        <Icon size={16} style={{ color: item.color }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[13px] font-semibold text-text-primary">{item.title}</p>
                          <span className="flex-shrink-0 text-[10.5px] text-text-secondary">{item.time}</span>
                        </div>
                        <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">{item.body}</p>
                        <div className="mt-2 flex items-center gap-1 text-[11.5px] font-medium text-primary">
                          View details
                          <ChevronRight size={12} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
