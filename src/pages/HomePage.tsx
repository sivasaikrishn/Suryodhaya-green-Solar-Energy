import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Leaf, Wrench, Shield, DollarSign, CreditCard,
  ChevronRight, Play, Zap, Check, Star,
  ArrowRight, TrendingDown
} from 'lucide-react'
import CTABand from '../components/CTABand'
import SectionHeading from '../components/SectionHeading'
import FAQ from '../components/FAQ'
import { Counter, useReveal } from '../components/Counter'
import { SERVICES, BUSINESS, PRICING, HOME_FAQ, STATS, INDUSTRIES } from '../data/constants'

const SERVICE_CATEGORIES = ['All Services', 'Rooftop Solutions', 'Solar Systems', 'Service & Support', 'Products']

// ─── SAVINGS CALCULATOR ────────────────────────────────────────
function SavingsCalculator() {
  const [bill, setBill] = useState(2000)

  const getRecommendation = (b: number) => {
    if (b < 1500) return { size: '1–2 kW', savings: Math.round(b * 0.7), payback: '4–5 years' }
    if (b < 3000) return { size: '3 kW', savings: Math.round(b * 0.75), payback: '4–5 years' }
    if (b < 6000) return { size: '5 kW', savings: Math.round(b * 0.8), payback: '4–5 years' }
    return { size: '10 kW+', savings: Math.round(b * 0.85), payback: '4–5 years' }
  }

  const rec = getRecommendation(bill)

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.1)] p-8 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#FBBF24]/20 flex items-center justify-center">
          <TrendingDown size={20} className="text-[#FBBF24]" />
        </div>
        <div>
          <p className="font-extrabold text-[#1F2937] font-[Plus_Jakarta_Sans]">Savings Calculator</p>
          <p className="text-xs text-gray-400">⚠️ Estimates only — get exact figures after free survey</p>
        </div>
      </div>

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Your monthly electricity bill
      </label>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl font-extrabold text-[#14532D] font-[Plus_Jakarta_Sans]">
          ₹{bill.toLocaleString()}
        </span>
      </div>
      <input
        type="range"
        min={500}
        max={20000}
        step={500}
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
        className="w-full accent-[#14532D] mb-6"
      />
      <div className="flex gap-2 mb-6">
        {[1000, 2000, 5000, 10000].map((v) => (
          <button
            key={v}
            onClick={() => setBill(v)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              bill === v ? 'bg-[#14532D] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ₹{(v / 1000).toFixed(0)}k
          </button>
        ))}
      </div>

      <div className="bg-green-50 rounded-2xl p-5 space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">Recommended system</p>
          <p className="font-extrabold text-[#14532D] font-[Plus_Jakarta_Sans]">{rec.size}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">Estimated monthly savings</p>
          <p className="font-extrabold text-green-600 font-[Plus_Jakarta_Sans]">₹{rec.savings.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">Money back in</p>
          <p className="font-extrabold text-[#14532D] font-[Plus_Jakarta_Sans]">{rec.payback}</p>
        </div>
        <div className="flex justify-between items-center border-t border-green-200 pt-3">
          <p className="text-sm text-gray-600">Yearly savings</p>
          <p className="font-extrabold text-2xl text-green-600 font-[Plus_Jakarta_Sans]">
            ₹{(rec.savings * 12).toLocaleString()}
          </p>
        </div>
      </div>

      <Link
        to="/contact"
        className="mt-4 w-full flex items-center justify-center gap-2 bg-[#FBBF24] text-gray-900 font-bold py-3.5 rounded-xl hover:bg-[#F59E0B] transition-colors font-[Plus_Jakarta_Sans]"
      >
        Get Exact Quote <ArrowRight size={16} />
      </Link>
    </div>
  )
}

// ─── REVIEW CARD ───────────────────────────────────────────────
const REVIEWS = [
  {
    name: 'Ramesh K.',
    location: 'Puttaparthi',
    rating: 5,
    quote: 'Bill dropped from ₹4,500 to ₹300. Best investment ever!',
    avatar: 'R',
    color: '#14532D',
  },
  {
    name: 'Priya S.',
    location: 'Miyapur',
    rating: 5,
    quote: 'Installation was done in 2 days. Very professional team.',
    avatar: 'P',
    color: '#166534',
  },
  {
    name: 'Venkat R.',
    location: 'Kukatpally',
    rating: 5,
    quote: 'Got full subsidy support. Suryodaya handled all paperwork.',
    avatar: 'V',
    color: '#15803D',
  },
  {
    name: 'Anitha M.',
    location: 'Bachupally',
    rating: 5,
    quote: 'Hybrid system — no power cuts ever. Night or day!',
    avatar: 'A',
    color: '#14532D',
  },
]

export default function HomePage() {
  useReveal()
  const [selectedCategory, setSelectedCategory] = useState('All Services')
  const heroRef = useRef<HTMLDivElement>(null)

  const filteredServices = selectedCategory === 'All Services'
    ? SERVICES
    : SERVICES.filter((s) => s.category === selectedCategory)

  // Parallax on hero
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.title = 'Suryodaya Solar | #1 Solar Installation in Puttaparthi District'
  }, [])

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Parallax background */}
        <div className="absolute inset-0 overflow-hidden">
          <div ref={heroRef} className="absolute inset-0 scale-110">
            <img
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=90"
              alt="Solar panels on rooftop at sunrise"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d3b1e]/90 via-[#14532D]/75 to-transparent" />
          {/* Sun glow animation */}
          <div
            className="absolute top-16 right-1/3 w-80 h-80 rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, #FBBF24 0%, transparent 70%)',
              animation: 'pulse 4s ease-in-out infinite',
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-20">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 bg-[#FBBF24]/20 text-[#FBBF24] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 font-[Plus_Jakarta_Sans]"
              style={{ animation: 'fadeInUp 0.6s ease-out' }}
            >
              ☀️ Puttaparthi District's Trusted Solar Company
            </div>
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white font-[Plus_Jakarta_Sans] leading-[1.05] mb-6"
              style={{ animation: 'fadeInUp 0.6s 0.1s ease-out both' }}
            >
              Free Power<br />
              <span className="text-[#FBBF24]">from the Sun.</span>
            </h1>
            <p
              className="text-white/85 text-xl mb-10 leading-relaxed max-w-lg"
              style={{ animation: 'fadeInUp 0.6s 0.2s ease-out both' }}
            >
              Cut your electricity bill by up to <strong className="text-white">90%.</strong><br />
              Installation in just 2 days.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              style={{ animation: 'fadeInUp 0.6s 0.3s ease-out both' }}
            >
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 bg-[#FBBF24] text-gray-900 font-bold text-base font-[Plus_Jakarta_Sans] px-8 py-4 rounded-full hover:bg-[#F59E0B] hover:shadow-[0_8px_30px_rgba(251,191,36,0.5)] transition-all duration-200 hover:-translate-y-0.5"
              >
                <Zap size={18} /> Get Free Quote
              </Link>
              <button
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 border-2 border-white text-white font-bold text-base font-[Plus_Jakarta_Sans] px-8 py-4 rounded-full hover:bg-white hover:text-[#14532D] transition-all duration-200 hover:-translate-y-0.5"
              >
                Calculate Savings
              </button>
            </div>

            {/* Floating glass stat card */}
            <div
              className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4"
              style={{ animation: 'fadeInUp 0.6s 0.4s ease-out both' }}
            >
              <div className="text-center">
                <p className="text-2xl font-extrabold text-[#FBBF24] font-[Plus_Jakarta_Sans]">₹0</p>
                <p className="text-white/70 text-xs">Electricity Bill*</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-extrabold text-white font-[Plus_Jakarta_Sans]">14,000+</p>
                <p className="text-white/70 text-xs">kW Installed</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-extrabold text-white font-[Plus_Jakarta_Sans]">500+</p>
                <p className="text-white/70 text-xs">Happy Homes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <p className="text-xs uppercase tracking-widest">Scroll</p>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      {/* ── TRUST BADGES ─────────────────────────────────────── */}
      <section className="bg-[#14532D] py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { icon: '🛡️', text: '25-Year Panel Warranty' },
              { icon: '🏠', text: 'Free Site Survey' },
              { icon: '💳', text: 'Easy Finance Available' },
              { icon: '🏛️', text: 'Subsidy Support' },
              { icon: '⚡', text: '2-Day Installation' },
            ].map((b) => (
              <div key={b.text} className="flex items-center justify-center gap-2 text-white/90 text-sm font-semibold text-center">
                <span className="text-xl">{b.icon}</span>
                <span className="text-xs">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK BENEFITS ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Why Solar?"
            title="5 Reasons to Switch Today"
            subtitle="Simple, clean, affordable energy for your home and business."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { Icon: Leaf, title: 'Eco Friendly', desc: 'Zero carbon, zero guilt.', color: '#14532D' },
              { Icon: Wrench, title: 'Easy Install', desc: 'Done in just 2 days.', color: '#166534' },
              { Icon: Shield, title: 'Low Maintenance', desc: 'Clean panels twice a year.', color: '#15803D' },
              { Icon: DollarSign, title: 'Fair Price', desc: 'Transparent, no hidden costs.', color: '#14532D' },
              { Icon: CreditCard, title: 'Easy Finance', desc: 'EMI from ₹1,500/month.', color: '#166534' },
            ].map(({ Icon, title, desc, color }, i) => (
              <div
                key={title}
                className="reveal text-center p-6 rounded-2xl border border-gray-100 hover:border-[#14532D]/30 hover:shadow-[0_8px_30px_rgba(20,83,45,0.1)] transition-all duration-300 group cursor-default"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${color}15` }}
                >
                  <Icon size={24} style={{ color }} />
                </div>
                <p className="font-bold text-[#1F2937] font-[Plus_Jakarta_Sans] mb-1">{title}</p>
                <p className="text-gray-500 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAND ───────────────────────────────────────── */}
      <section className="bg-[#14532D] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <Counter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ────────────────────────────────────── */}
      <section className="py-20 bg-[#FAF7F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="reveal-left relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80"
                  alt="Suryodaya Solar team installing panels on rooftop"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              {/* Play button overlay */}
              <button className="absolute inset-0 flex items-center justify-center group">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Play size={22} className="text-[#14532D] ml-1" fill="#14532D" />
                </div>
              </button>
              {/* Stat badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl px-5 py-4">
                <p className="text-3xl font-extrabold text-[#14532D] font-[Plus_Jakarta_Sans]">4+</p>
                <p className="text-xs text-gray-500 font-medium">Years of Excellence</p>
              </div>
            </div>

            {/* Content */}
            <div className="reveal-right">
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#FBBF24] mb-3 font-[Plus_Jakarta_Sans]">
                About Us
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] font-[Plus_Jakarta_Sans] mb-4 leading-tight">
                Making Solar Easy<br />for Everyone
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Suryodaya Solar was founded with one mission — make clean, affordable energy accessible to every home and business in Hyderabad. From free site surveys to after-sales service, we handle everything.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Free rooftop survey — we come to you, no charge.',
                  'Certified panels with 25-year performance warranty.',
                  'Full subsidy application support — zero paperwork stress.',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#14532D] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-white" />
                    </div>
                    <p className="text-gray-700 text-sm">{point}</p>
                  </li>
                ))}
              </ul>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-[#14532D] text-white font-bold px-6 py-3 rounded-full hover:bg-[#166534] hover:shadow-[0_8px_24px_rgba(20,83,45,0.3)] transition-all duration-200 hover:-translate-y-0.5 font-[Plus_Jakarta_Sans] text-sm"
              >
                Our Story <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR COMPLETE SERVICES & SOLUTIONS ──────────────────── */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="What We Offer"
            title="Our Solar Services & Products"
            subtitle="Complete end-to-end solar solutions for homes, commercial establishments, industries, and farms."
          />

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {SERVICE_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 font-[Plus_Jakarta_Sans] ${
                    active
                      ? 'bg-[#14532D] text-white shadow-[0_6px_20px_rgba(20,83,45,0.25)] scale-105'
                      : 'bg-[#FAF7F0] text-gray-700 hover:bg-gray-200 border border-gray-200/60'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Services Grid with Photos */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((srv, i) => (
              <div
                key={srv.slug}
                className="reveal group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(20,83,45,0.14)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
              >
                {/* Image Header with Badge and Icon */}
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Category Pill */}
                  <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-[#14532D] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm font-[Plus_Jakarta_Sans]">
                    {srv.category}
                  </span>

                  {/* Icon badge */}
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center text-2xl">
                    {srv.icon}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#1F2937] font-[Plus_Jakarta_Sans] mb-1 group-hover:text-[#14532D] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#166534] mb-3">
                      {srv.subtitle}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">
                      {srv.short}
                    </p>

                    {/* Highlights */}
                    {srv.highlights && (
                      <div className="space-y-2 mb-6 bg-[#FAF7F0] rounded-2xl p-4">
                        {srv.highlights.map((h) => (
                          <div key={h} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                            <span className="w-4 h-4 rounded-full bg-[#14532D] text-white flex items-center justify-center shrink-0 text-[10px]">✓</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <Link
                      to={`/services/${srv.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#14532D] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl hover:bg-[#166534] transition-colors font-[Plus_Jakarta_Sans]"
                    >
                      Learn More <ArrowRight size={14} />
                    </Link>
                    <a
                      href={`${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in ${srv.title}. Please share details.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-[#25D366]/10 text-[#14532D] hover:bg-[#25D366] hover:text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-colors font-[Plus_Jakarta_Sans]"
                      title="Quote on WhatsApp"
                    >
                      💬 Quote
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner inside Services */}
          <div className="mt-14 bg-gradient-to-r from-[#FAF7F0] via-white to-[#FAF7F0] border border-gray-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FBBF24]/20 flex items-center justify-center text-3xl shrink-0">
                ⚡
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-[#1F2937] font-[Plus_Jakarta_Sans]">
                  Not sure which system is right for your rooftop?
                </h4>
                <p className="text-sm text-gray-500">
                  Book a free site survey. We visit your roof, assess shading, and give an exact ROI proposal.
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="shrink-0 bg-[#FBBF24] text-gray-900 font-bold px-7 py-3.5 rounded-full hover:bg-[#F59E0B] hover:shadow-lg transition-all font-[Plus_Jakarta_Sans] text-sm"
            >
              Book Free Site Survey
            </Link>
          </div>
        </div>
      </section>

      {/* ── OUR SOLAR SYSTEMS ────────────────────────────────── */}
      <section className="py-20 bg-[#FAF7F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Our Systems"
            title="Which Solar is Right for You?"
            subtitle="Three systems. One will perfectly fit your home or business."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                slug: 'on-grid-solar',
                title: 'On-Grid Solar',
                tag: 'Best for: Lower bills',
                desc: 'Connected to the electricity grid. Your meter runs backwards when you produce more power.',
                img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&q=80',
                pros: ['Lowest cost', 'Net metering savings', 'No battery needed'],
                note: '⚡ Stops in a power cut',
                color: '#14532D',
              },
              {
                slug: 'off-grid-solar',
                title: 'Off-Grid Solar',
                tag: 'Best for: No grid areas',
                desc: 'Fully independent with a battery bank. Works even in areas with no electricity connection.',
                img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
                pros: ['100% independent', 'Battery backup', 'Works remotely'],
                note: '🔋 Needs more batteries',
                color: '#166534',
              },
              {
                slug: 'hybrid-solar',
                title: 'Hybrid Solar',
                tag: 'Best for: Always-on power',
                desc: 'Gets the best of both worlds — grid savings during the day, battery backup during power cuts.',
                img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=700&q=80',
                pros: ['Save on bills', 'Never lose power', 'Smart monitoring'],
                note: '⭐ Most popular choice',
                color: '#15803D',
              },
            ].map((sys, i) => (
              <div
                key={sys.slug}
                className="reveal group rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 bg-white"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Image */}
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={sys.img}
                    alt={sys.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full text-white"
                      style={{ background: sys.color }}
                    >
                      {sys.tag}
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-extrabold text-[#1F2937] font-[Plus_Jakarta_Sans] mb-2">{sys.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{sys.desc}</p>
                  <ul className="space-y-2 mb-4">
                    {sys.pros.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-gray-700">
                        <Check size={13} className="text-[#14532D]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-400 mb-4">{sys.note}</p>
                  <Link
                    to={`/services/${sys.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#14532D] hover:gap-3 transition-all font-[Plus_Jakarta_Sans]"
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-20 bg-[#FAF7F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="The Process"
            title="4 Simple Steps to Solar"
            subtitle="We handle everything. You just enjoy the savings."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line on desktop */}
            <div className="hidden lg:block absolute top-10 left-[14%] right-[14%] h-0.5 bg-gradient-to-r from-[#14532D] via-[#FBBF24] to-[#14532D]" />
            {[
              { step: '01', icon: '🗓️', title: 'Free Survey', desc: 'We visit your roof, check shade and measure.' },
              { step: '02', icon: '📐', title: 'Custom Design', desc: 'We design the perfect system for your needs.' },
              { step: '03', icon: '🔧', title: 'Installation', desc: 'Expert team installs in just 1–2 days.' },
              { step: '04', icon: '☀️', title: 'Enjoy Savings', desc: 'Watch your electricity bill drop every month.' },
            ].map((step, i) => (
              <div
                key={step.step}
                className="reveal text-center relative z-10"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="w-20 h-20 rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center justify-center mx-auto mb-5 text-3xl border-2 border-[#14532D]/10">
                  {step.icon}
                </div>
                <span className="text-[#FBBF24] text-xs font-black font-[Plus_Jakarta_Sans]">{step.step}</span>
                <h3 className="text-lg font-extrabold text-[#1F2937] font-[Plus_Jakarta_Sans] mt-1 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING AND CALCULATOR ───────────────────────────── */}
      <section id="calculator" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Pricing"
            title="How Much Does Solar Cost?"
            subtitle="⚠️ Approximate prices. Exact cost is shared after your free site survey."
          />

          {/* Pricing Table */}
          <div className="overflow-x-auto mb-16 rounded-2xl shadow-sm border border-gray-100">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-[#14532D] text-white">
                  {['System Size', 'Approx. Price*', 'Monthly Units', 'Monthly Savings*', 'Payback'].map((h) => (
                    <th key={h} className="py-4 px-5 text-left text-sm font-bold font-[Plus_Jakarta_Sans]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRICING.map((row, i) => (
                  <tr key={row.size} className={i % 2 === 1 ? 'bg-[#FAF7F0]' : 'bg-white'}>
                    <td className="py-4 px-5 font-bold text-[#14532D] font-[Plus_Jakarta_Sans]">{row.size}</td>
                    <td className="py-4 px-5 font-semibold text-gray-800">{row.price}</td>
                    <td className="py-4 px-5 text-gray-600">{row.units}</td>
                    <td className="py-4 px-5 text-green-600 font-semibold">{row.savings}</td>
                    <td className="py-4 px-5 text-gray-600">{row.payback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Savings Calculator */}
            <SavingsCalculator />

            {/* Subsidy card */}
            <div>
              <div className="bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] rounded-3xl p-8 text-gray-900 shadow-[0_8px_40px_rgba(251,191,36,0.3)]">
                <div className="text-5xl mb-4">🏛️</div>
                <h3 className="text-2xl font-extrabold font-[Plus_Jakarta_Sans] mb-2">Get Government Subsidy</h3>
                <p className="text-gray-800 mb-4">
                  Under the <strong>PM Surya Ghar</strong> scheme, residential customers can get up to:
                </p>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { kw: '1–2 kW', amount: '₹30,000' },
                    { kw: '3 kW', amount: '₹78,000' },
                    { kw: '4+ kW', amount: '₹78,000' },
                  ].map((s) => (
                    <div key={s.kw} className="bg-white/50 rounded-xl p-3 text-center">
                      <p className="text-lg font-black font-[Plus_Jakarta_Sans]">{s.amount}</p>
                      <p className="text-xs text-gray-700 mt-0.5">for {s.kw} system</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white/70 rounded-xl p-4 mb-5">
                  <p className="font-bold text-sm mb-1">✅ We Handle All Paperwork</p>
                  <p className="text-xs text-gray-700">
                    Application, inspection, approval — we manage the entire subsidy process for you. No stress.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#14532D] text-white font-bold px-6 py-3 rounded-full hover:bg-[#166534] transition-colors font-[Plus_Jakarta_Sans] text-sm"
                >
                  Check My Subsidy <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────── */}
      <section className="py-20 bg-[#FAF7F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Why Us"
            title="6 Reasons Customers Choose Suryodaya"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '🏠', title: 'Free Site Survey', desc: 'We visit your home and design the perfect system — zero charge.' },
              { icon: '🏆', title: 'Certified Products', desc: 'We use MNRE-approved panels from trusted brands only.' },
              { icon: '👷', title: 'Expert Team', desc: 'Trained, certified installers with 4+ years of experience.' },
              { icon: '📞', title: 'After-Sales Support', desc: '24/7 support, fast response, AMC plans available.' },
              { icon: '💬', title: 'Transparent Pricing', desc: 'What we quote is what you pay. No hidden fees, ever.' },
              { icon: '🏛️', title: 'Subsidy & Loan Help', desc: 'We handle government subsidy and easy EMI options.' },
            ].map((item, i) => (
              <div
                key={item.title}
                className="reveal flex gap-5 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0 text-2xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#1F2937] font-[Plus_Jakarta_Sans] mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Industries"
            title="Solar Works for Everyone"
            subtitle="Homes, offices, factories, farms — we've done it all."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {INDUSTRIES.map((ind, i) => (
              <Link
                key={ind.name}
                to="/industries"
                className="reveal group rounded-2xl overflow-hidden relative aspect-square shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <img
                  src={ind.image}
                  alt={ind.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-white font-bold text-sm font-[Plus_Jakarta_Sans]">{ind.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 border-2 border-[#14532D] text-[#14532D] font-bold px-6 py-3 rounded-full hover:bg-[#14532D] hover:text-white transition-all duration-200 font-[Plus_Jakarta_Sans] text-sm"
            >
              View All Industries <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SUCCESS STORIES ──────────────────────────────────── */}
      <section className="py-20 bg-[#FAF7F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Stories"
            title="Real Savings. Real Customers."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
                name: 'Ramesh K.',
                location: 'Puttaparthi District',
                system: '5 kW Hybrid',
                before: '₹4,500',
                after: '₹300',
                quote: '"My electricity bill dropped by 93% in the very first month!"',
              },
              {
                img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80',
                name: 'Sri Sai Textiles',
                location: 'Sri Sathya Sai District',
                system: '50 kW On-Grid',
                before: '₹65,000',
                after: '₹8,000',
                quote: '"We recover the cost in under 4 years. Amazing ROI."',
              },
              {
                img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
                name: 'Green Farm Co.',
                location: 'Medchal',
                system: '3 kW Off-Grid',
                before: 'No power',
                after: '24/7 power',
                quote: '"Our pump now runs all day. No diesel, no bills."',
              },
            ].map((story, i) => (
              <div
                key={story.name}
                className="reveal bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="h-44 overflow-hidden">
                  <img src={story.img} alt={story.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-bold text-[#1F2937] font-[Plus_Jakarta_Sans]">{story.name}</p>
                      <p className="text-xs text-gray-400">{story.location} · {story.system}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 mb-4 bg-green-50 rounded-xl p-3">
                    <div className="text-center flex-1">
                      <p className="text-xs text-gray-400">Was paying</p>
                      <p className="font-bold text-red-500 font-[Plus_Jakarta_Sans]">{story.before}</p>
                    </div>
                    <div className="text-gray-300">→</div>
                    <div className="text-center flex-1">
                      <p className="text-xs text-gray-400">Now pays</p>
                      <p className="font-bold text-green-600 font-[Plus_Jakarta_Sans]">{story.after}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic">{story.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Reviews" title="What Our Customers Say" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((rev, i) => (
              <div
                key={rev.name}
                className="reveal bg-[#FAF7F0] p-6 rounded-2xl hover:shadow-md transition-shadow"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black font-[Plus_Jakarta_Sans]"
                    style={{ background: rev.color }}
                  >
                    {rev.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#1F2937] font-[Plus_Jakarta_Sans]">{rev.name}</p>
                    <p className="text-xs text-gray-400">{rev.location}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {Array.from({ length: rev.rating }).map((_, j) => (
                    <Star key={j} size={13} className="text-[#FBBF24] fill-[#FBBF24]" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic">"{rev.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-20 bg-[#FAF7F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading label="FAQ" title="Common Questions" />
          <FAQ items={HOME_FAQ} />
        </div>
      </section>

      <CTABand />
    </>
  )
}
