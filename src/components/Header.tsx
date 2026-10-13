import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Zap } from 'lucide-react'
import { SERVICES, BUSINESS } from '../data/constants'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '#', hasMega: true },
  { label: 'Industries', to: '/industries' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const location = useLocation()
  const megaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMegaOpen(false)
  }, [location.pathname])

  // Close mega menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isHome = location.pathname === '/'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[997] transition-all duration-300 ${
          scrolled || !isHome
            ? 'bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-[#14532D] flex items-center justify-center">
                <span className="text-[#FBBF24] text-lg font-black">S</span>
              </div>
              <div>
                <p className={`font-extrabold text-base leading-tight font-[Plus_Jakarta_Sans] transition-colors ${
                  scrolled || !isHome ? 'text-[#14532D]' : 'text-white'
                }`}>
                  Suryodaya Solar
                </p>
                <p className={`text-[10px] leading-none transition-colors ${
                  scrolled || !isHome ? 'text-gray-400' : 'text-white/70'
                }`}>Puttaparthi District · Since 2020</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                link.hasMega ? (
                  <div key={link.label} className="relative" ref={megaRef}>
                    <button
                      onClick={() => setMegaOpen(!megaOpen)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold font-[Plus_Jakarta_Sans] transition-colors ${
                        scrolled || !isHome
                          ? 'text-gray-700 hover:text-[#14532D] hover:bg-green-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      Services
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${megaOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Mega Menu */}
                    {megaOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-6 z-[1000]">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Our Services</p>
                        <div className="grid grid-cols-3 gap-2">
                          {SERVICES.map((s) => (
                            <Link
                              key={s.slug}
                              to={`/services/${s.slug}`}
                              onClick={() => setMegaOpen(false)}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors group"
                            >
                              <span className="text-xl">{s.icon}</span>
                              <div>
                                <p className="text-sm font-bold text-gray-800 font-[Plus_Jakarta_Sans] group-hover:text-[#14532D]">
                                  {s.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">{s.short}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                          <p className="text-xs text-gray-500">Not sure which system you need?</p>
                          <Link
                            to="/contact"
                            onClick={() => setMegaOpen(false)}
                            className="text-xs font-bold text-[#14532D] hover:underline"
                          >
                            Get Free Advice →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`px-4 py-2 rounded-full text-sm font-semibold font-[Plus_Jakarta_Sans] transition-colors ${
                      location.pathname === link.to
                        ? scrolled || !isHome
                          ? 'text-[#14532D] bg-green-50'
                          : 'text-white bg-white/15'
                        : scrolled || !isHome
                        ? 'text-gray-700 hover:text-[#14532D] hover:bg-green-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={BUSINESS.phoneLink}
                className={`text-sm font-semibold font-[Plus_Jakarta_Sans] transition-colors ${
                  scrolled || !isHome ? 'text-[#14532D]' : 'text-white'
                }`}
              >
                📞 {BUSINESS.phone}
              </a>
              <Link
                to="/contact"
                className="flex items-center gap-2 bg-[#FBBF24] text-gray-900 font-bold text-sm font-[Plus_Jakarta_Sans] px-5 py-2.5 rounded-full hover:bg-[#F59E0B] hover:shadow-[0_4px_16px_rgba(251,191,36,0.45)] transition-all duration-200 -translate-y-0 hover:-translate-y-0.5"
              >
                <Zap size={14} />
                Free Quote
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                scrolled || !isHome ? 'text-gray-700' : 'text-white'
              }`}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[996] bg-white overflow-y-auto pt-20">
          <div className="px-6 py-4 space-y-1">
            {NAV_LINKS.map((link) =>
              link.hasMega ? (
                <div key="services">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between py-3 text-base font-bold text-gray-800 font-[Plus_Jakarta_Sans]"
                  >
                    Services
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {mobileServicesOpen && (
                    <div className="pl-4 space-y-1">
                      {SERVICES.map((s) => (
                        <Link
                          key={s.slug}
                          to={`/services/${s.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 py-2.5 text-sm text-gray-600 hover:text-[#14532D]"
                        >
                          <span>{s.icon}</span>
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-base font-bold text-gray-800 font-[Plus_Jakarta_Sans] hover:text-[#14532D]"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-4 space-y-3">
              <a
                href={BUSINESS.phoneLink}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full border-2 border-[#14532D] text-[#14532D] font-bold font-[Plus_Jakarta_Sans]"
              >
                📞 Call {BUSINESS.phone}
              </a>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#FBBF24] text-gray-900 font-bold font-[Plus_Jakarta_Sans]"
              >
                <Zap size={16} /> Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
