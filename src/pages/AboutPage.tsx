import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import CTABand from '../components/CTABand'
import SectionHeading from '../components/SectionHeading'
import { Counter, useReveal } from '../components/Counter'
import { STATS } from '../data/constants'

const TEAM = [
  { name: 'Chakri Reddy', role: 'Founder & CEO', avatar: 'C', color: '#14532D' },
  { name: 'Suresh Kumar', role: 'Lead Engineer', avatar: 'S', color: '#166534' },
  { name: 'Priya Sharma', role: 'Sales Head', avatar: 'P', color: '#15803D' },
  { name: 'Venkat Rao', role: 'Installation Lead', avatar: 'V', color: '#14532D' },
]

const TIMELINE = [
  { year: '2020', event: 'Suryodaya Solar founded with a dream of clean energy for all.' },
  { year: '2021', event: 'Completed first 100 residential installations across Puttaparthi District.' },
  { year: '2022', event: 'Launched commercial solar division. First 100 kW factory installation.' },
  { year: '2023', event: 'Crossed 10,000 kW total installed capacity. Expanded to off-grid solutions.' },
  { year: '2024', event: 'PM Surya Ghar empanelment. 500+ happy customers across the region.' },
]

export default function AboutPage() {
  useReveal()
  useEffect(() => {
    document.title = 'About Suryodaya Solar | Puttaparthi District Solar Company Since 2020'
  }, [])

  return (
    <>
      {/* Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80"
          alt="Suryodaya Solar team"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d3b1e]/90 to-[#14532D]/70" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#FBBF24] text-xs font-bold uppercase tracking-widest mb-3 font-[Plus_Jakarta_Sans]">
            About Us
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-[Plus_Jakarta_Sans] mb-4">
            We Are Suryodaya Solar
          </h1>
          <p className="text-white/80 text-lg">Hyderabad's trusted solar energy company since 2020.</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-white/60">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About</span>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-left">
              <div className="rounded-3xl overflow-hidden aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=900&q=80"
                  alt="Solar installation team"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="reveal-right">
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#FBBF24] mb-3 font-[Plus_Jakarta_Sans]">Our Story</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] font-[Plus_Jakarta_Sans] mb-5 leading-tight">
                Started with a Simple Goal
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                In 2020, we saw families in Hyderabad struggling with rising electricity bills. We knew solar could help — but it was too complicated and expensive. So we built Suryodaya Solar to change that.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Today, we've installed 14,000+ kW of clean energy across 500+ homes and businesses — and we're just getting started.
              </p>
              <ul className="space-y-3">
                {['Free site survey for every customer', 'Transparent pricing, no hidden fees', 'We handle your subsidy paperwork'].map((p, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#14532D] flex items-center justify-center shrink-0">
                      <Check size={12} className="text-white" />
                    </div>
                    <p className="text-gray-700 text-sm">{p}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#FAF7F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Purpose" title="Mission & Vision" />
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: '🎯',
                title: 'Our Mission',
                desc: 'Make solar energy simple, affordable and accessible to every home and business in Hyderabad — and beyond.',
                bg: '#14532D',
              },
              {
                icon: '🌍',
                title: 'Our Vision',
                desc: 'A Hyderabad where every rooftop generates clean energy, and no family pays an electricity bill they can\'t afford.',
                bg: '#FBBF24',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="reveal rounded-3xl p-8 text-white"
                style={{ background: card.bg === '#FBBF24' ? 'linear-gradient(135deg, #FBBF24, #F59E0B)' : 'linear-gradient(135deg, #14532D, #166534)' }}
              >
                <div className="text-5xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-extrabold font-[Plus_Jakarta_Sans] mb-3" style={{ color: card.bg === '#FBBF24' ? '#1F2937' : 'white' }}>
                  {card.title}
                </h3>
                <p style={{ color: card.bg === '#FBBF24' ? '#374151' : 'rgba(255,255,255,0.85)' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#14532D] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <Counter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Values" title="What We Stand For" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🏆', title: 'Quality', desc: 'Only certified, tested products from trusted brands.' },
              { icon: '🤝', title: 'Honesty', desc: 'Clear prices, no hidden costs, ever.' },
              { icon: '❤️', title: 'Service', desc: 'We support you long after installation day.' },
              { icon: '🌱', title: 'Green Future', desc: 'Every panel we install helps the planet.' },
            ].map((v, i) => (
              <div
                key={v.title}
                className="reveal text-center p-6 rounded-2xl bg-[#FAF7F0] hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-extrabold text-[#1F2937] font-[Plus_Jakarta_Sans] mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#FAF7F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Team" title="Meet the People Behind Suryodaya" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                className="reveal text-center"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-black font-[Plus_Jakarta_Sans] shadow-lg"
                  style={{ background: member.color }}
                >
                  {member.avatar}
                </div>
                <p className="font-bold text-[#1F2937] font-[Plus_Jakarta_Sans]">{member.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">⚠️ Placeholder team — replace with real photos and names.</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Journey" title="Our Milestones" />
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#14532D] to-[#FBBF24]" />
            <div className="space-y-8">
              {TIMELINE.map((t, i) => (
                <div
                  key={t.year}
                  className="reveal flex gap-6 items-start"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#14532D] flex items-center justify-center shrink-0 text-[#FBBF24] font-extrabold text-sm font-[Plus_Jakarta_Sans] shadow-lg relative z-10">
                    {t.year}
                  </div>
                  <div className="bg-[#FAF7F0] rounded-2xl p-5 flex-1 mt-1">
                    <p className="text-gray-700 text-sm leading-relaxed">{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 bg-[#FAF7F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 font-[Plus_Jakarta_Sans]">
            ⚠️ Placeholder brand logos — replace with actual partner logos
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['MNRE Approved', 'Tata Solar', 'Waaree', 'Luminous', 'Adani Solar', 'Havells'].map((brand) => (
              <div
                key={brand}
                className="px-5 py-2.5 bg-white rounded-full border border-gray-200 text-sm font-semibold text-gray-600 shadow-sm"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
