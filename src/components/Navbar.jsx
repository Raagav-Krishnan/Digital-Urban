import { motion } from 'framer-motion'
import { ShieldCheck, Wifi, ChevronDown } from 'lucide-react'

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-16 w-full items-center justify-between border-b border-white/[0.06] bg-surface/80 px-6 backdrop-blur-xl"
    >
      {/* Logo + title */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600 shadow-glow">
          <ShieldCheck size={18} className="text-white" strokeWidth={2.25} />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[15px] font-semibold tracking-tight text-text-primary">
            Urban Sentinel
          </span>
          <span className="text-[11px] font-medium text-text-secondary">
            Flood-Aware Route Intelligence
          </span>
        </div>
      </div>

      {/* Center status */}
      <div className="hidden items-center gap-6 md:flex">
        <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="text-[12.5px] font-medium text-text-primary">System Operational</span>
        </div>

        <div className="flex items-center gap-2 text-text-secondary">
          <Wifi size={14} />
          <span className="text-[12.5px] font-medium">
            Last updated{' '}
            <span className="text-text-primary">just now</span>
          </span>
        </div>
      </div>

      {/* User profile */}
      <div className="flex items-center gap-3">
        <button className="hidden items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[12.5px] font-medium text-text-secondary transition-colors duration-200 hover:border-white/10 hover:text-text-primary sm:flex">
          Amsterdam District
          <ChevronDown size={14} />
        </button>

        <button className="group flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.03] py-1 pl-1 pr-3 transition-colors duration-200 hover:border-white/10">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-600 text-[12px] font-semibold text-white">
            OP
          </div>
          <div className="hidden flex-col items-start leading-tight sm:flex">
            <span className="text-[12.5px] font-medium text-text-primary">Operator</span>
            <span className="text-[10.5px] text-text-secondary">Control Room A</span>
          </div>
        </button>
      </div>
    </motion.header>
  )
}
