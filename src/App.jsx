import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import Sidebar from './components/Sidebar'
import MapView from './components/MapView'
import InfoPanel from './components/InfoPanel'
import StatsBar from './components/StatsBar'
import AlertDrawer from './components/AlertDrawer'
import { getHealthStatus } from './services/api'

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [backendStatus, setBackendStatus] = useState('Checking...')

  useEffect(() => {
    getHealthStatus()
      .then((data) => setBackendStatus(data.status))
      .catch(() => setBackendStatus('Offline'))
  }, [])

  return (
    <main className="h-screen w-screen overflow-hidden bg-slate-900 font-sans text-text-primary">
      {/* Map Layer - z-index 0: full viewport background */}
      <div className="fixed inset-0 z-0">
        <MapView />
      </div>

      {/* Stats Bar - z-index 20: top center */}
      <StatsBar />

      {/* Sidebar - z-index 30: left side */}
      <Sidebar />

      {/* Info Panel - z-index 30: right side */}
      <InfoPanel />

      {/* Backend Status - z-index 40: bottom-left pill */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3.5 py-2 text-[11px] font-bold text-slate-700 shadow-soft backdrop-blur-xl">
        <span
          className={`h-2 w-2 rounded-full ${
            backendStatus === 'Online' ? 'bg-success' : backendStatus === 'Checking...' ? 'bg-warning' : 'bg-danger'
          }`}
        />
        Backend {backendStatus}
      </div>

      {/* Mobile Bell Button - z-index 50 */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.18 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setDrawerOpen(true)}
        className="glass-premium fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full text-slate-700 shadow-float transition duration-300 hover:text-danger lg:hidden"
        aria-label="Open alerts"
      >
        <Bell size={19} strokeWidth={2.25} />
        <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-danger ring-2 ring-white" />
      </motion.button>

      {/* Alert Drawer - z-index 60+: slides above all */}
      <AlertDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </main>
  )
}
