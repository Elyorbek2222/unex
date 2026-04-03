'use client'

import { useState, useMemo } from 'react'
import { MapPin, Clock, Phone, Search } from 'lucide-react'
import { branches, regions } from '@/lib/locations'
import type { Dictionary } from '@/lib/dictionary'

// Uzbekistan approximate bounding box: lat 37.1-42.5, lng 56.0-73.2
// We map lat/lng to SVG coordinates
function latLngToSVG(lat: number, lng: number): [number, number] {
  const minLat = 37.1, maxLat = 42.5
  const minLng = 56.0, maxLng = 73.2
  const svgW = 800, svgH = 400
  const x = ((lng - minLng) / (maxLng - minLng)) * svgW
  const y = ((maxLat - lat) / (maxLat - minLat)) * svgH
  return [Math.round(x), Math.round(y)]
}

interface MapSectionProps {
  dict: Dictionary
}

export default function UzbekistanMap({ dict }: MapSectionProps) {
  const m = dict.map
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [hoveredBranch, setHoveredBranch] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  const filteredBranches = useMemo(() => {
    let list = branches
    if (selectedRegion !== 'all') {
      list = list.filter((b) => b.region === selectedRegion)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (b) => b.name.toLowerCase().includes(q) || b.region.toLowerCase().includes(q) || b.address.toLowerCase().includes(q)
      )
    }
    return list
  }, [selectedRegion, search])

  const hovered = hoveredBranch !== null ? branches.find((b) => b.id === hoveredBranch) : null

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    branches.forEach((b) => {
      counts[b.region] = (counts[b.region] ?? 0) + 1
    })
    return counts
  }, [])

  return (
    <section id="map" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-red-50 text-[#D32F2F] text-xs font-bold uppercase tracking-wider rounded-full border border-red-100 mb-3">
            {m.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {m.title}{' '}
            <span className="text-[#D32F2F]">{m.title_accent}</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{m.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-4 overflow-hidden relative" style={{ minHeight: 380 }}>
              {/* SVG Map */}
              <svg
                viewBox="0 0 800 400"
                className="w-full h-full"
                style={{ minHeight: 300 }}
              >
                {/* Uzbekistan rough outline */}
                <defs>
                  <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF5F5" />
                    <stop offset="100%" stopColor="#FAFAFA" />
                  </linearGradient>
                </defs>
                <rect width="800" height="400" fill="url(#mapBg)" rx="12" />
                {/* Uzbekistan outline path (simplified) */}
                <path
                  d="M 120,80 L 180,60 L 260,55 L 330,40 L 420,30 L 500,45 L 580,60 L 640,80 L 680,120 L 700,160 L 690,200 L 660,240 L 620,270 L 580,290 L 540,310 L 500,330 L 450,340 L 400,345 L 360,340 L 310,330 L 270,310 L 230,290 L 190,270 L 160,240 L 130,210 L 105,180 L 100,150 Z"
                  fill="#FFE8E8"
                  stroke="#D32F2F"
                  strokeWidth="2"
                  opacity="0.5"
                />

                {/* Grid lines */}
                {[100, 200, 300].map((y) => (
                  <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#f0f0f0" strokeWidth="1" />
                ))}
                {[200, 400, 600].map((x) => (
                  <line key={x} x1={x} y1="0" x2={x} y2="400" stroke="#f0f0f0" strokeWidth="1" />
                ))}

                {/* Branch pins */}
                {filteredBranches.map((branch) => {
                  const [x, y] = latLngToSVG(branch.lat, branch.lng)
                  const isHovered = hoveredBranch === branch.id
                  const isRegionSelected = selectedRegion === branch.region || selectedRegion === 'all'

                  return (
                    <g
                      key={branch.id}
                      transform={`translate(${x}, ${y})`}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredBranch(branch.id)}
                      onMouseLeave={() => setHoveredBranch(null)}
                      style={{ opacity: isRegionSelected ? 1 : 0.3 }}
                    >
                      {/* Pulse ring */}
                      {isHovered && (
                        <circle r="16" fill="none" stroke="#D32F2F" strokeWidth="2" opacity="0.4">
                          <animate attributeName="r" values="10;20;10" dur="1.5s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                      )}
                      {/* Pin */}
                      <circle
                        r={isHovered ? 8 : 5}
                        fill={isHovered ? '#D32F2F' : (selectedRegion === branch.region ? '#B71C1C' : '#EF5350')}
                        stroke="white"
                        strokeWidth="2"
                        style={{ transition: 'all 0.2s' }}
                      />
                      {/* Branch number for hovered */}
                      {isHovered && (
                        <text
                          x="12"
                          y="4"
                          fontSize="11"
                          fill="#1a1a1a"
                          fontWeight="600"
                          className="pointer-events-none"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {branch.name.replace('Unex — ', '')}
                        </text>
                      )}
                    </g>
                  )
                })}

                {/* Legend */}
                <g transform="translate(20, 360)">
                  <circle cx="8" cy="8" r="5" fill="#EF5350" stroke="white" strokeWidth="1.5" />
                  <text x="18" y="12" fontSize="11" fill="#666">Filial</text>
                </g>
              </svg>

              {/* Hover tooltip */}
              {hovered && (
                <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 max-w-[220px] text-sm z-10">
                  <div className="font-bold text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {hovered.name}
                  </div>
                  <div className="flex items-start gap-1.5 text-gray-500 text-xs mb-1">
                    <MapPin size={11} className="mt-0.5 flex-shrink-0 text-[#D32F2F]" />
                    {hovered.address}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
                    <Clock size={11} className="text-[#D32F2F]" />
                    {hovered.hours}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <Phone size={11} className="text-[#D32F2F]" />
                    {hovered.phone}
                  </div>
                </div>
              )}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-[#D32F2F]" style={{ fontFamily: 'Poppins, sans-serif' }}>60+</div>
                <div className="text-xs text-gray-500 mt-0.5">Filiallar</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-[#D32F2F]" style={{ fontFamily: 'Poppins, sans-serif' }}>12</div>
                <div className="text-xs text-gray-500 mt-0.5">Viloyatlar</div>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-[#D32F2F]" style={{ fontFamily: 'Poppins, sans-serif' }}>24/7</div>
                <div className="text-xs text-gray-500 mt-0.5">Qo'llab-quvvatlash</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Filial qidirish..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/30 focus:border-[#D32F2F] bg-white"
              />
            </div>

            {/* Region filter */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h4 className="font-bold text-sm text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Viloyat bo'yicha
                </h4>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <button
                  onClick={() => setSelectedRegion('all')}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    selectedRegion === 'all' ? 'bg-red-50 text-[#D32F2F] font-semibold' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{m.all_regions}</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{branches.length}</span>
                </button>
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors border-t border-gray-50 ${
                      selectedRegion === region ? 'bg-red-50 text-[#D32F2F] font-semibold' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-left truncate pr-2">{region}</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">
                      {regionCounts[region]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Branch list */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1">
              <div className="p-4 border-b border-gray-100">
                <h4 className="font-bold text-sm text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Filiallar ({filteredBranches.length})
                </h4>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                {filteredBranches.slice(0, 20).map((branch) => (
                  <div
                    key={branch.id}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    onMouseEnter={() => setHoveredBranch(branch.id)}
                    onMouseLeave={() => setHoveredBranch(null)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#D32F2F] flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-800 truncate">{branch.name}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5 pl-4 truncate">{branch.address}</div>
                  </div>
                ))}
                {filteredBranches.length > 20 && (
                  <div className="px-4 py-3 text-xs text-gray-400 text-center">
                    +{filteredBranches.length - 20} ta filial ko'rsatilmadi
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
