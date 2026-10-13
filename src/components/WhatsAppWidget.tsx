import { useState, useEffect, useRef } from 'react'
import {
  X, ChevronRight,
  Zap, Battery, Star, ClipboardList, CalendarCheck
} from 'lucide-react'
import { BUSINESS } from '../data/constants'

const OPTIONS = [
  {
    icon: Zap,
    title: 'On-Grid Solar',
    desc: 'Reduce monthly electricity bills via grid connection',
    msg: "Hi, I'm interested in On-Grid Solar. Please share details.",
    color: '#14532D',
  },
  {
    icon: Battery,
    title: 'Off-Grid Solar',
    desc: 'Independent power with battery bank for outages / no grid',
    msg: "Hi, I'm interested in Off-Grid Solar. Please share details.",
    color: '#14532D',
  },
  {
    icon: Star,
    title: 'Hybrid Solar',
    desc: 'Grid savings + smart battery backup during blackouts',
    msg: "Hi, I'm interested in Hybrid Solar. Please share details.",
    color: '#14532D',
  },
  {
    icon: CalendarCheck,
    title: 'Book a Site Survey',
    desc: 'Free rooftop assessment and shade analysis',
    msg: "Hi, I'd like to book a free site survey. Please confirm a time.",
    color: '#14532D',
  },
  {
    icon: ClipboardList,
    title: 'Request a Quote',
    desc: 'Itemised pricing estimate for my energy requirement',
    msg: "Hi, I'd like a detailed quote for a solar system. Please help.",
    color: '#14532D',
  },
]

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)

  // Show tooltip after 5 seconds
  useEffect(() => {
    const t = setTimeout(() => {
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 4000)
    }, 5000)
    return () => clearTimeout(t)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Close on outside click (keeps website background 100% visible without blur/dim overlay)
  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleOption = (msg: string) => {
    window.open(`${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div ref={widgetRef}>
      {/* Chat Card (no background blur/dimming on the website) */}
      {open && (
        <div
          className="fixed bottom-[88px] right-4 sm:right-6 z-[999] w-[340px] sm:w-[360px] bg-white rounded-2xl shadow-[0_12px_45px_rgba(0,0,0,0.22)] border border-gray-100 overflow-hidden"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          {/* Header */}
          <div className="bg-[#14532D] px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FBBF24] flex items-center justify-center text-[#14532D] font-black text-lg font-[Plus_Jakarta_Sans]">
              S
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm font-[Plus_Jakarta_Sans]">Suryodaya Solar</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-green-200 text-xs">Online · replies in minutes</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="px-4 py-4">
            <div className="bg-gray-50 rounded-xl p-3 mb-3">
              <p className="text-gray-800 text-sm font-medium">
                👋 Hi there! How can we help you today?
              </p>
            </div>

            <div className="space-y-2">
              {OPTIONS.map((opt) => {
                const Icon = opt.icon
                return (
                  <button
                    key={opt.title}
                    onClick={() => handleOption(opt.msg)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-[#14532D] hover:bg-green-50 transition-all text-left group"
                  >
                    <div className="w-9 h-9 rounded-full bg-green-50 group-hover:bg-[#14532D] flex items-center justify-center shrink-0 transition-colors">
                      <Icon size={16} className="text-[#14532D] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 font-[Plus_Jakarta_Sans] group-hover:text-[#14532D]">
                        {opt.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{opt.desc}</p>
                    </div>
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-[#14532D] shrink-0 transition-colors" />
                  </button>
                )
              })}
            </div>

            <p className="text-center text-[10px] text-gray-400 mt-3">
              Tap an option. WhatsApp opens with your message ready to send.
            </p>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-5 right-4 sm:right-6 z-[999]">
        {/* Tooltip */}
        {showTooltip && !open && (
          <div className="absolute bottom-full mb-2 right-0 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap">
            Chat with us 💬
            <div className="absolute bottom-0 right-4 translate-y-full border-4 border-transparent border-t-gray-900" />
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform"
          style={{ animation: open ? 'none' : 'pulse-green 2s infinite' }}
          aria-label="Open WhatsApp chat"
        >
          {open ? (
            <X size={22} className="text-white" />
          ) : (
            <>
              {/* Unread Notification Badge '1' */}
              <span className="absolute -top-1 -right-1 z-10 flex h-5 w-5 items-center justify-center pointer-events-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-red-500 text-white text-[11px] font-black border-2 border-white shadow-md font-[Plus_Jakarta_Sans]">
                  1
                </span>
              </span>

              <svg viewBox="0 0 24 24" width="26" height="26" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
