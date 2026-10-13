import { Link } from 'react-router-dom'
import { Phone, Zap } from 'lucide-react'
import { BUSINESS } from '../data/constants'

interface CTABandProps {
  headline?: string
  sub?: string
  image?: string
}

export default function CTABand({
  headline = 'Ready to Cut Your Bill?',
  sub = 'Join 500+ happy homes and businesses running on clean solar power.',
  image = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1600&q=80',
}: CTABandProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <img
        src={image}
        alt="Solar panels at sunrise"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      {/* Dark green overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d3b1e]/95 via-[#14532D]/90 to-[#1a6b3a]/85" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-[#FBBF24]/20 text-[#FBBF24] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 font-[Plus_Jakarta_Sans]">
          ☀️ Free Site Survey · No Commitment
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-[Plus_Jakarta_Sans] mb-4 leading-tight">
          {headline}
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">{sub}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FBBF24] text-gray-900 font-bold text-base font-[Plus_Jakarta_Sans] px-8 py-4 rounded-full hover:bg-[#F59E0B] hover:shadow-[0_8px_30px_rgba(251,191,36,0.5)] transition-all duration-200 hover:-translate-y-0.5"
          >
            <Zap size={18} />
            Get Free Quote
          </Link>
          <a
            href={BUSINESS.phoneLink}
            className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-white text-white font-bold text-base font-[Plus_Jakarta_Sans] px-8 py-4 rounded-full hover:bg-white hover:text-[#14532D] transition-all duration-200 hover:-translate-y-0.5"
          >
            <Phone size={18} />
            Call {BUSINESS.phone}
          </a>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-6 max-w-md mx-auto">
          {[
            { icon: '🛡️', label: '25-Year Warranty' },
            { icon: '🏠', label: 'Free Survey' },
            { icon: '💰', label: 'Subsidy Help' },
          ].map((b) => (
            <div key={b.label} className="text-center">
              <div className="text-2xl mb-1">{b.icon}</div>
              <p className="text-white/70 text-xs font-semibold">{b.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
