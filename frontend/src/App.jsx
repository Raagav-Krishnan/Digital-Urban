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
      .then((data) => {
        setBackendStatus(data.status)
      })
      .catch(() => {
        setBackendStatus('Offline')
      })
  }, [])

  return (
    <main className="dashboard-shell relative min-h-[100dvh] w-full overflow-hidden bg-[#eaf1f6] font-sans text-text-primary">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <MapView />
      </motion.div>

      <Sidebar />
      <InfoPanel />
      <StatsBar />

      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.18 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setDrawerOpen(true)}
        className="glass-command fixed right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full text-slate-700 shadow-float transition duration-300 hover:text-danger lg:hidden"
        aria-label="Open intelligence brief"
      >
        <Bell size={19} strokeWidth={2.25} />
        <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-danger ring-2 ring-white" />
      </motion.button>

      <div className="fixed bottom-6 left-6 z-50 rounded-xl bg-white px-4 py-2 shadow-lg">
        Backend Status: {backendStatus}
      </div>

      <AlertDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </main>
  )
}