import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { motion } from 'framer-motion'
import { Plus, Minus, LocateFixed } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

function ZoomControls() {
  const map = useMap()

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="absolute bottom-6 left-6 z-[10] flex flex-col gap-2 md:bottom-6 md:left-[96px]"
    >
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => map.zoomIn()}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 backdrop-blur-md border border-white/60 shadow-float text-slate-700 transition duration-200 hover:text-primary lg:h-11 lg:w-11"
        aria-label="Zoom in"
      >
        <Plus size={17} strokeWidth={2.3} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => map.zoomOut()}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 backdrop-blur-md border border-white/60 shadow-float text-slate-700 transition duration-200 hover:text-primary lg:h-11 lg:w-11"
        aria-label="Zoom out"
      >
        <Minus size={17} strokeWidth={2.3} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => map.setView([12.9716, 77.5946], 13)}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 backdrop-blur-md border border-white/60 shadow-float text-slate-700 transition duration-200 hover:text-primary lg:h-11 lg:w-11"
        aria-label="Recenter"
      >
        <LocateFixed size={16} strokeWidth={2.3} />
      </motion.button>
    </motion.div>
  )
}

export default function MapView() {
  return (
    <MapContainer
      center={[12.9716, 77.5946]}
      zoom={13}
      minZoom={11}
      maxZoom={18}
      scrollWheelZoom={true}
      zoomControl={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControls />
    </MapContainer>
  )
}

