import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import CTABand from '../components/CTABand'
import { useReveal } from '../components/Counter'
import { BUSINESS } from '../data/constants'

const INDUSTRIES_DATA = [
  {
    name: 'Residential Homes',
    icon: '🏠',
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&q=80',
    challenge: 'High monthly electricity bills eating into family budgets.',
    solution: 'On-grid or hybrid solar cuts the bill by 70–90% permanently.',
    system: 'On-Grid / Hybrid',
    savings: 'Up to 90% bill reduction',
    msg: 'Hi, I need solar for my home. Please share details.',
  },
  {
    name: 'Apartments & Gated Communities',
    icon: '🏢',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    challenge: 'Common-area electricity (lifts, lights, pumps) is very expensive.',
    solution: 'Rooftop solar powers common areas and charges each flat\'s share.',
    system: 'On-Grid',
    savings: 'Cut maintenance charges significantly',
    msg: 'Hi, I need solar for my apartment/gated community. Please help.',
  },
  {
    name: 'Commercial Offices',
    icon: '🏛️',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80',
    challenge: 'AC and lighting run 8–10 hours a day — bills are massive.',
    solution: 'Solar offsets daytime peak usage. Most offices break even in 3 years.',
    system: 'On-Grid',
    savings: '₹20,000–₹1L+ saved per month',
    msg: 'Hi, I need solar for my office / commercial building. Please share details.',
  },
  {
    name: 'Hotels & Hospitality',
    icon: '🏨',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    challenge: '24/7 operations mean electricity is the biggest operating cost.',
    solution: 'Hybrid solar with battery provides savings AND uninterrupted power.',
    system: 'Hybrid',
    savings: 'Save ₹50,000–₹5L/month',
    msg: 'Hi, I need solar for my hotel. Please share details.',
  },
  {
    name: 'Hospitals & Healthcare',
    icon: '🏥',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
    challenge: 'Power cuts are dangerous. Diesel generator costs are high.',
    solution: 'Hybrid solar ensures 24/7 power with zero outages.',
    system: 'Hybrid',
    savings: 'Reliable power + lower costs',
    msg: 'Hi, I need solar for my hospital/clinic. Please share details.',
  },
  {
    name: 'Schools & Colleges',
    icon: '🎓',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    challenge: 'Educational institutions run on tight budgets.',
    solution: 'Solar can fund its own EMI from electricity savings alone.',
    system: 'On-Grid',
    savings: 'Self-funding from day one',
    msg: 'Hi, I need solar for my school/college. Please share details.',
  },
  {
    name: 'Factories & Manufacturing',
    icon: '🏭',
    image: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&q=80',
    challenge: 'Industrial electricity tariffs are the highest in Telangana.',
    solution: 'Large on-grid solar slashes costs. ROI in under 3 years.',
    system: 'On-Grid / Hybrid',
    savings: 'Save ₹1L–₹10L per month',
    msg: 'Hi, I need solar for my factory. Please share details.',
  },
  {
    name: 'Warehouses & Cold Storage',
    icon: '🏗️',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    challenge: 'Refrigeration and climate control run 24/7 at high costs.',
    solution: 'Hybrid solar with battery keeps compressors running even in outages.',
    system: 'Hybrid',
    savings: 'Up to 70% cooling cost cut',
    msg: 'Hi, I need solar for my warehouse/cold storage. Please share details.',
  },
  {
    name: 'Agriculture & Farms',
    icon: '🌾',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    challenge: 'Grid power unavailable or unreliable. Diesel pump costs are high.',
    solution: 'Off-grid solar powers pumps all day. Zero diesel, zero bills.',
    system: 'Off-Grid',
    savings: 'Eliminate diesel costs entirely',
    msg: 'Hi, I need solar for my farm/agriculture pump. Please share details.',
  },
  {
    name: 'Textile & Garments',
    icon: '🧵',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
    challenge: 'High-power machines run all day on expensive industrial tariffs.',
    solution: 'Rooftop solar offsets daytime industrial load. Quick payback.',
    system: 'On-Grid',
    savings: '3–4 year payback',
    msg: 'Hi, I need solar for my textile factory. Please share details.',
  },
  {
    name: 'IT Parks',
    icon: '💻',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    challenge: 'Server farms and AC systems consume enormous power.',
    solution: 'On-grid solar with monitoring dashboards. Track savings in real time.',
    system: 'On-Grid / Hybrid',
    savings: 'ESG goals + cost savings',
    msg: 'Hi, I need solar for my IT park. Please share details.',
  },
  {
    name: 'Government & Public',
    icon: '🏛️',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    challenge: 'Government buildings waste public money on avoidable electricity bills.',
    solution: 'Subsidized solar installations with zero-cost finance options available.',
    system: 'On-Grid',
    savings: 'Public savings + green goals',
    msg: 'Hi, I need solar for a government / public institution. Please share details.',
  },
]

export default function IndustriesPage() {
  useReveal()
  useEffect(() => {
    document.title = 'Industries We Serve | Suryodaya Solar Hyderabad'
  }, [])

  return (
    <>
      {/* Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1600&q=80"
          alt="Solar for every industry"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d3b1e]/90 to-[#14532D]/70" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#FBBF24] text-xs font-bold uppercase tracking-widest mb-3 font-[Plus_Jakarta_Sans]">
            Every Sector. Every Size.
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-[Plus_Jakarta_Sans] mb-4">
            Solar for Every Industry
          </h1>
          <p className="text-white/80 text-lg">If you pay an electricity bill, we can cut it.</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-white/60">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Industries</span>
          </div>
        </div>
      </section>

      {/* Industry Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20">
          {INDUSTRIES_DATA.map((ind, i) => (
            <div
              key={ind.name}
              className={`reveal grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
            >
              {/* Image */}
              <div className={`rounded-3xl overflow-hidden aspect-[16/9] ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <img
                  src={ind.image}
                  alt={ind.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{ind.icon}</span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#FBBF24] font-[Plus_Jakarta_Sans]">
                      Solar for
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] font-[Plus_Jakarta_Sans]">
                      {ind.name}
                    </h2>
                  </div>
                </div>

                <div className="space-y-4 mb-5">
                  <div className="flex gap-3 bg-red-50 rounded-xl p-3">
                    <span className="text-lg">⚠️</span>
                    <div>
                      <p className="text-xs font-bold text-red-600 font-[Plus_Jakarta_Sans] mb-0.5">The Challenge</p>
                      <p className="text-gray-700 text-sm">{ind.challenge}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 bg-green-50 rounded-xl p-3">
                    <span className="text-lg">✅</span>
                    <div>
                      <p className="text-xs font-bold text-green-700 font-[Plus_Jakarta_Sans] mb-0.5">How Solar Helps</p>
                      <p className="text-gray-700 text-sm">{ind.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="px-3 py-1 bg-[#14532D] text-white text-xs font-bold rounded-full font-[Plus_Jakarta_Sans]">
                    {ind.system}
                  </span>
                  <span className="px-3 py-1 bg-[#FBBF24]/20 text-gray-800 text-xs font-bold rounded-full">
                    {ind.savings}
                  </span>
                </div>

                <a
                  href={`${BUSINESS.whatsapp}?text=${encodeURIComponent(ind.msg)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FBBF24] text-gray-900 font-bold px-6 py-3 rounded-full hover:bg-[#F59E0B] hover:shadow-[0_8px_24px_rgba(251,191,36,0.4)] transition-all duration-200 hover:-translate-y-0.5 font-[Plus_Jakarta_Sans] text-sm"
                >
                  Get Quote for {ind.name.split(' ')[0]} <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Results strip */}
      <section className="bg-[#14532D] py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { val: '12+', label: 'Industries Served' },
            { val: '500+', label: 'Projects Completed' },
            { val: '90%', label: 'Average Bill Reduction' },
            { val: '4 yrs', label: 'Average Payback' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold text-[#FBBF24] font-[Plus_Jakarta_Sans]">{s.val}</p>
              <p className="text-white/70 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  )
}
