import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import MapView from './components/MapView'
import CommandBar from './components/CommandBar'
import Sidebar from './components/Sidebar'
import StatsBar from './components/StatsBar'
import InfoPanel from './components/InfoPanel'
import AlertDrawer from './components/AlertDrawer'
import { getHealthStatus } from './services/api'

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState('intel') // 'menu' | 'intel'
  const [backendStatus, setBackendStatus] = useState('Checking...')

  useEffect(() => {
    getHealthStatus()
      .then((data) => setBackendStatus(data.status))
      .catch(() => setBackendStatus('Offline'))
  }, [])

  const handleOpenMenu = () => {
    setDrawerMode('menu')
    setDrawerOpen(true)
  }

  const handleOpenIntel = () => {
    setDrawerMode('intel')
    setDrawerOpen(true)
  }

  return (
    <main className="h-screen w-screen overflow-hidden bg-slate-900 font-sans text-text-primary">
      {/* Map Layer — z-index 0: full-viewport foundation */}
      <div className="fixed inset-0 z-0">
        <MapView />
      </div>

      {/* Top Command Bar — z-index 20 */}
      <CommandBar onMenuClick={handleOpenMenu} onIntelClick={handleOpenIntel} />

      {/* Left Floating Toolbar — z-index 30 */}
      <Sidebar backendStatus={backendStatus} />

      {/* Bottom Analytics Bar — z-index 30 */}
      <StatsBar />

      {/* Right Intelligence Panel — z-index 40 */}
      <InfoPanel />

      {/* Unified Mobile/Tablet Slide-over Drawers — z-index 50 */}
      <AlertDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} mode={drawerMode} />
    </main>
  )
}

