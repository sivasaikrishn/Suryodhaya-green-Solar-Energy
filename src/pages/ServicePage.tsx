import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Check, ChevronRight } from 'lucide-react'
import CTABand from '../components/CTABand'
import SectionHeading from '../components/SectionHeading'
import FAQ from '../components/FAQ'
import { useReveal } from '../components/Counter'
import { SERVICES, BUSINESS } from '../data/constants'

// ─── Per-service content ────────────────────────────────────────
const SERVICE_CONTENT: Record<string, {
  tagline: string
  about: string
  howWorks: string[]
  benefits: { icon: string; title: string; desc: string }[]
  features: string[]
  specs: { label: string; value: string }[]
  forWho: { icon: string; name: string }[]
  useCases: { img: string; caption: string }[]
  packages: { name: string; kw: string; price: string; items: string[]; popular?: boolean }[]
  faq: { q: string; a: string }[]
  whatPowers: { icon: string; name: string }[]
}> = {
  'on-grid-solar': {
    tagline: 'Connected to the grid. Lowest cost. Maximum savings.',
    about: 'On-grid solar is the most popular and affordable solar system. Your panels generate power during the day. When you produce more than you use, the extra goes back to the electricity grid — and your meter literally runs backwards. This is called "net metering." When it\'s night or cloudy, you use grid power as usual.',
    howWorks: ['Sun hits your panels and generates DC power', 'The inverter converts it to AC — the kind your home uses', 'Extra power is exported to the grid, earning you credits'],
    benefits: [
      { icon: '💰', title: 'Lowest Cost', desc: 'No battery needed — cheapest system type.' },
      { icon: '📉', title: 'Net Metering', desc: 'Earn credits when you produce extra power.' },
      { icon: '🛡️', title: '25-Year Warranty', desc: 'Panels last 25+ years with minimal care.' },
      { icon: '🌱', title: 'Eco Friendly', desc: 'Zero carbon emissions from your home.' },
      { icon: '🏛️', title: 'Subsidy Eligible', desc: 'PM Surya Ghar subsidy up to ₹78,000.' },
      { icon: '📲', title: 'Smart Monitoring', desc: 'Track your production on your phone.' },
    ],
    features: [
      'Grid-tied inverter with anti-islanding protection',
      'Remote monitoring via mobile app',
      'Automatic net metering connection',
      'MNRE-approved panels with 25-year output warranty',
      'MC4 connectors and UV-stable cables',
      'Surge protection and lightning arrester',
    ],
    specs: [
      { label: 'Capacity Range', value: '1 kW – 500 kW' },
      { label: 'Panel Type', value: 'Mono PERC / Bifacial' },
      { label: 'Inverter Type', value: 'String / Micro inverter' },
      { label: 'Battery', value: 'Not required' },
      { label: 'Panel Warranty', value: '25 years output' },
      { label: 'Inverter Warranty', value: '5–10 years' },
      { label: 'Works in power cut?', value: '❌ No — shuts off' },
    ],
    forWho: [
      { icon: '🏠', name: 'Homes' }, { icon: '🏢', name: 'Offices' },
      { icon: '🏭', name: 'Factories' }, { icon: '🏫', name: 'Schools' },
      { icon: '🏪', name: 'Shops' }, { icon: '🏨', name: 'Hotels' },
    ],
    useCases: [
      { img: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&q=80', caption: 'Home rooftop — reduces monthly bill by 80%' },
      { img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80', caption: 'Office building — daytime power from the sun' },
      { img: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600&q=80', caption: 'Factory roof — cuts industrial tariff cost' },
    ],
    packages: [
      { name: 'Basic', kw: '1–2 kW', price: '₹65,000–1,15,000*', items: ['Mono PERC panels', 'String inverter', 'Basic monitoring', '1-year free AMC'] },
      { name: 'Popular', kw: '3–5 kW', price: '₹1,65,000–2,50,000*', items: ['Bifacial panels', 'Smart inverter', 'App monitoring', 'Subsidy assistance', '2-year free AMC'], popular: true },
      { name: 'Premium', kw: '10 kW+', price: '₹4,50,000+*', items: ['Premium bifacial panels', 'Hybrid-ready inverter', 'Advanced monitoring', 'Full subsidy support', '5-year AMC'] },
    ],
    faq: [
      { q: 'Will it work when there\'s a power cut?', a: 'No. On-grid systems shut off during a power cut for safety reasons. If you want backup power, choose Hybrid Solar.' },
      { q: 'What is net metering?', a: 'Net metering = your electricity meter runs backwards when you produce more power than you use. The extra is credited to your account by TSSPDCL.' },
      { q: 'How long does installation take?', a: 'Most residential systems are installed in 1–2 days. Net metering connection from DISCOM takes 4–6 weeks.' },
      { q: 'Do I need to maintain it?', a: 'Very little. Clean the panels with water every 2–3 months. We also offer Annual Maintenance Contracts (AMC).' },
      { q: 'What subsidy will I get?', a: 'Under PM Surya Ghar, you can get ₹30,000 for 1–2 kW or ₹78,000 for 3 kW systems. We handle the application for you.' },
    ],
    whatPowers: [
      { icon: '💡', name: 'Lights' }, { icon: '🌀', name: 'Fans' },
      { icon: '❄️', name: 'AC' }, { icon: '🍎', name: 'Fridge' },
      { icon: '📺', name: 'TV' }, { icon: '🚿', name: 'Geyser' },
      { icon: '🚗', name: 'EV Charging' }, { icon: '⚙️', name: 'Machines' },
    ],
  },

  'off-grid-solar': {
    tagline: 'No grid needed. Power anywhere, anytime.',
    about: 'Off-grid solar is completely independent of the electricity grid. Your panels charge a battery bank during the day. Your home or farm runs on stored battery power at night or when it\'s cloudy. It\'s the perfect solution for remote areas, farms, or places with very frequent power cuts.',
    howWorks: ['Panels charge the battery bank during the day', 'Battery stores the energy for use anytime', 'Your home runs entirely on stored solar power'],
    benefits: [
      { icon: '🔋', title: 'Full Independence', desc: 'No grid connection needed at all.' },
      { icon: '🌾', title: 'Works Remotely', desc: 'Farms, hilltops, no-grid areas — all covered.' },
      { icon: '⚡', title: 'Always On', desc: 'Power available 24/7 from the battery bank.' },
      { icon: '💸', title: 'No EB Bills', desc: 'Zero electricity bills forever.' },
      { icon: '🌱', title: 'Zero Emissions', desc: 'Clean energy with no diesel or carbon.' },
      { icon: '🛠️', title: 'Low Maintenance', desc: 'Simple system, easy to maintain.' },
    ],
    features: [
      'MPPT solar charge controller for maximum efficiency',
      'Deep-cycle tubular or lithium-ion battery bank',
      'Off-grid inverter with auto battery protection',
      'Adjustable charging voltage settings',
      'LED battery status indicator',
      'Overload and short-circuit protection',
    ],
    specs: [
      { label: 'Capacity Range', value: '1 kW – 100 kW' },
      { label: 'Panel Type', value: 'Mono PERC' },
      { label: 'Inverter Type', value: 'Off-grid inverter' },
      { label: 'Battery Type', value: 'Tubular / Lithium-ion' },
      { label: 'Battery Backup', value: '8–24 hours depending on size' },
      { label: 'Works in power cut?', value: '✅ Yes — always on' },
      { label: 'Grid Connection', value: '❌ Not needed' },
    ],
    forWho: [
      { icon: '🌾', name: 'Farms' }, { icon: '🏘️', name: 'Remote Homes' },
      { icon: '🏗️', name: 'Construction Sites' }, { icon: '⛺', name: 'Resorts' },
      { icon: '🔭', name: 'Remote Offices' }, { icon: '💧', name: 'Water Pumps' },
    ],
    useCases: [
      { img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80', caption: 'Farm pump running all day on solar' },
      { img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80', caption: 'Remote home with 24/7 solar power' },
      { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', caption: 'Small business with no grid connection' },
    ],
    packages: [
      { name: 'Basic', kw: '1 kW + Battery', price: '₹90,000*', items: ['Mono PERC panels', 'Off-grid inverter', 'Tubular battery bank', '1-year AMC'] },
      { name: 'Popular', kw: '3 kW + Battery', price: '₹2,20,000*', items: ['Mono PERC panels', 'MPPT controller', 'Lithium battery bank', 'App monitoring', '2-year AMC'], popular: true },
      { name: 'Premium', kw: '5 kW + Battery', price: '₹3,80,000*', items: ['Bifacial panels', 'Premium MPPT controller', 'Large lithium bank', 'Full monitoring', '5-year AMC'] },
    ],
    faq: [
      { q: 'How many days of backup do I get?', a: 'It depends on your usage. A well-designed system gives 1–2 cloudy days of backup. We size the battery bank to match your needs.' },
      { q: 'What type of battery is best?', a: 'Lithium-ion batteries last 10+ years and are maintenance-free. Tubular batteries cost less but need water top-up every few months.' },
      { q: 'Can I add grid connection later?', a: 'Yes. An off-grid system can be upgraded to hybrid later if grid power becomes available in your area.' },
      { q: 'How does it work at night?', a: 'The battery bank stores excess solar energy during the day and supplies it at night or during low-sun periods.' },
      { q: 'Is it suitable for a water pump?', a: 'Absolutely — this is one of the most popular uses. We design systems specifically for pump loads in agriculture.' },
    ],
    whatPowers: [
      { icon: '💡', name: 'Lights' }, { icon: '🌀', name: 'Fans' },
      { icon: '📺', name: 'TV' }, { icon: '🍎', name: 'Fridge' },
      { icon: '💧', name: 'Water Pump' }, { icon: '📡', name: 'Internet' },
      { icon: '🔌', name: 'Charging Points' }, { icon: '⚙️', name: 'Small Machines' },
    ],
  },

  'hybrid-solar': {
    tagline: 'Save on bills. Never lose power. Best of both worlds.',
    about: 'Hybrid solar combines the savings of on-grid with the security of a battery. During the day your panels power your home and charge the battery. At night or in a power cut, the battery takes over — seamlessly, in milliseconds. You never notice. Most popular for homes and businesses in Hyderabad.',
    howWorks: ['Panels generate power and charge the battery during the day', 'Grid connection saves money via net metering', 'During power cuts, battery kicks in automatically in milliseconds'],
    benefits: [
      { icon: '⭐', title: 'Best of Both', desc: 'Grid savings + battery backup in one system.' },
      { icon: '⚡', title: 'Instant Switchover', desc: 'Battery takes over in under 20 milliseconds.' },
      { icon: '📉', title: 'Net Metering', desc: 'Export extra power and earn credits.' },
      { icon: '🔋', title: 'Smart Battery', desc: 'Lithium battery lasts 10+ years.' },
      { icon: '📱', title: 'App Control', desc: 'Monitor and control from your smartphone.' },
      { icon: '🏛️', title: 'Subsidy Eligible', desc: 'Residential systems qualify for subsidy.' },
    ],
    features: [
      'Hybrid inverter — works both on-grid and off-grid',
      'Built-in MPPT solar charge controller',
      'Automatic grid/battery switchover in <20ms',
      'Time-of-use scheduling (store during off-peak, use at peak)',
      'Remote app monitoring and control',
      'Battery management system (BMS) built-in',
    ],
    specs: [
      { label: 'Capacity Range', value: '2 kW – 100 kW' },
      { label: 'Panel Type', value: 'Mono PERC / Bifacial' },
      { label: 'Inverter Type', value: 'Hybrid inverter' },
      { label: 'Battery Type', value: 'Lithium-ion (LiFePO4)' },
      { label: 'Switchover Time', value: '<20 milliseconds' },
      { label: 'Works in power cut?', value: '✅ Yes — battery backup' },
      { label: 'Grid Connection', value: '✅ Yes — for savings' },
    ],
    forWho: [
      { icon: '🏠', name: 'Homes' }, { icon: '🏥', name: 'Hospitals' },
      { icon: '🏨', name: 'Hotels' }, { icon: '🏢', name: 'Offices' },
      { icon: '🏗️', name: 'Cold Storage' }, { icon: '🏪', name: 'Shops' },
    ],
    useCases: [
      { img: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&q=80', caption: 'Home with hybrid — 24/7 power, 85% bill reduction' },
      { img: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80', caption: 'Hospital — critical systems always powered' },
      { img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', caption: 'Hotel — uninterrupted power for guests' },
    ],
    packages: [
      { name: 'Basic', kw: '2 kW + 5 kWh Battery', price: '₹1,80,000*', items: ['Mono PERC panels', 'Hybrid inverter', 'Lithium 5 kWh battery', '1-year AMC'] },
      { name: 'Popular', kw: '5 kW + 10 kWh Battery', price: '₹3,50,000*', items: ['Bifacial panels', 'Premium hybrid inverter', 'Lithium 10 kWh battery', 'App monitoring', '3-year AMC'], popular: true },
      { name: 'Premium', kw: '10 kW + 20 kWh Battery', price: '₹6,80,000*', items: ['Premium bifacial panels', 'Advanced hybrid inverter', 'Lithium 20 kWh battery', 'Full monitoring', '5-year AMC'] },
    ],
    faq: [
      { q: 'What makes it different from on-grid?', a: 'Hybrid has a battery. So when the grid goes off, your home keeps running — lights, fans, fridge, all of it. On-grid shuts off.' },
      { q: 'How long does battery backup last?', a: 'It depends on your usage. A 10 kWh battery runs an average 3 BHK home (fan, lights, TV, fridge, no AC) for about 8 hours.' },
      { q: 'Can I add more battery later?', a: 'Yes! Most hybrid systems allow battery expansion. We\'ll design the system to be easily expandable.' },
      { q: 'What happens if sun is low for many days?', a: 'The grid charges the battery as backup, so you never run out. The system is always intelligent and self-managing.' },
      { q: 'Is the lithium battery safe?', a: 'Yes. LiFePO4 lithium batteries are the safest chemistry available. They cannot catch fire and last 10+ years.' },
    ],
    whatPowers: [
      { icon: '💡', name: 'Lights' }, { icon: '🌀', name: 'Fans' },
      { icon: '❄️', name: 'AC' }, { icon: '🍎', name: 'Fridge' },
      { icon: '📺', name: 'TV' }, { icon: '💧', name: 'Pump' },
      { icon: '🚗', name: 'EV Charging' }, { icon: '⚙️', name: 'Machines' },
    ],
  },
}

// Fallback content for service pages that share similar structure
function getFallbackContent(service: typeof SERVICES[0]) {
  const baseContent = SERVICE_CONTENT['on-grid-solar']
  return {
    ...baseContent,
    tagline: service.subtitle,
    about: `${service.title} from Suryodaya Solar is designed to meet the specific energy needs of our customers in Hyderabad. We offer professional installation, quality products, and full after-sales support.`,
    packages: [
      { name: 'Basic', kw: 'Small System', price: 'Get Quote*', items: ['Quality products', 'Professional installation', 'Warranty support', '1-year AMC'] },
      { name: 'Popular', kw: 'Medium System', price: 'Get Quote*', items: ['Premium products', 'Expert installation', 'Extended warranty', 'App monitoring', '2-year AMC'], popular: true },
      { name: 'Premium', kw: 'Large System', price: 'Get Quote*', items: ['Best-in-class products', 'Master installer', 'Full warranty', 'Advanced monitoring', '5-year AMC'] },
    ],
  }
}

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  useReveal()

  const service = SERVICES.find((s) => s.slug === slug)

  useEffect(() => {
    if (!service) navigate('/404', { replace: true })
  }, [service, navigate])

  if (!service) return null

  const content = SERVICE_CONTENT[slug!] || getFallbackContent(service)
  const whatsappMsg = `Hi, I'm interested in ${service.title}. Please share details.`

  useEffect(() => {
    document.title = `${service.title} | Suryodaya Solar Hyderabad`
  }, [service.title])

  const otherServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Banner */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d3b1e]/92 via-[#14532D]/80 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-xs mb-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={12} />
            <Link to="/services" className="hover:text-white">Services</Link>
            <ChevronRight size={12} />
            <span className="text-white">{service.title}</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#FBBF24]/20 text-[#FBBF24] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5 font-[Plus_Jakarta_Sans]">
            {service.icon} {service.title}
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-[Plus_Jakarta_Sans] leading-tight mb-4">
            {content.tagline}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#FBBF24] text-gray-900 font-bold px-8 py-4 rounded-full hover:bg-[#F59E0B] hover:shadow-[0_8px_24px_rgba(251,191,36,0.4)] transition-all font-[Plus_Jakarta_Sans]"
            >
              Get Free Quote
            </Link>
            <a
              href={`${BUSINESS.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-[#14532D] transition-all font-[Plus_Jakarta_Sans]"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* About the Product */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-left">
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#FBBF24] mb-3 font-[Plus_Jakarta_Sans]">What Is It?</p>
              <h2 className="text-3xl font-extrabold text-[#1F2937] font-[Plus_Jakarta_Sans] mb-5 leading-tight">
                {service.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">{content.about}</p>

              {/* How it works flow */}
              <div className="bg-green-50 rounded-2xl p-5">
                <p className="text-xs font-bold text-[#14532D] uppercase tracking-widest mb-3 font-[Plus_Jakarta_Sans]">
                  How It Works
                </p>
                <div className="space-y-3">
                  {content.howWorks.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#14532D] text-white text-xs font-bold flex items-center justify-center shrink-0 font-[Plus_Jakarta_Sans]">
                        {i + 1}
                      </div>
                      <p className="text-gray-700 text-sm mt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="reveal-right rounded-3xl overflow-hidden aspect-[4/3]">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>

          {/* Visual flow strip */}
          <div className="mt-12 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            {[
              { icon: '☀️', label: 'Sun' },
              { icon: '⬛', label: 'Panels' },
              { icon: '⚡', label: 'Inverter' },
              { icon: '🏠', label: 'Your Home' },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 sm:gap-4">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-2xl mx-auto mb-1">
                    {step.icon}
                  </div>
                  <p className="text-xs font-semibold text-gray-600">{step.label}</p>
                </div>
                {i < 3 && <ArrowRight size={20} className="text-[#14532D] shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[#FAF7F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Benefits" title={`Why Choose ${service.title}?`} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {content.benefits.map((b, i) => (
              <div
                key={b.title}
                className="reveal bg-white p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-bold text-[#1F2937] font-[Plus_Jakarta_Sans] mb-1">{b.title}</h3>
                <p className="text-gray-500 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features + Spec Table */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Specifications" title="Features & Technical Details" />
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Features list */}
            <div>
              <h3 className="font-extrabold text-[#1F2937] font-[Plus_Jakarta_Sans] mb-5">What's Included</h3>
              <ul className="space-y-3">
                {content.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#14532D] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} className="text-white" />
                    </div>
                    <p className="text-gray-700 text-sm">{f}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Spec table */}
            <div className="rounded-2xl overflow-hidden border border-gray-100">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#14532D] text-white">
                    <th className="py-3 px-4 text-left text-sm font-bold font-[Plus_Jakarta_Sans]">Specification</th>
                    <th className="py-3 px-4 text-left text-sm font-bold font-[Plus_Jakarta_Sans]">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {content.specs.map((spec, i) => (
                    <tr key={spec.label} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FAF7F0]'}>
                      <td className="py-3 px-4 text-sm text-gray-600 font-medium">{spec.label}</td>
                      <td className="py-3 px-4 text-sm text-gray-800 font-semibold">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 bg-[#FAF7F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Perfect For" title="Who We Install For" />
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {content.forWho.map((item, i) => (
              <div
                key={item.name}
                className="reveal text-center bg-white p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-xs font-bold text-gray-700 font-[Plus_Jakarta_Sans]">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Real Projects" title="Where We've Installed It" />
          <div className="grid md:grid-cols-3 gap-6">
            {content.useCases.map((uc, i) => (
              <div
                key={i}
                className="reveal rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={uc.img}
                    alt={uc.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-4 left-4 right-4 text-white text-sm font-semibold font-[Plus_Jakarta_Sans]">
                    {uc.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-20 bg-[#FAF7F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Packages"
            title="Choose Your Package"
            subtitle="⚠️ Approximate prices. Final quote shared after free site survey."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {content.packages.map((pkg, i) => (
              <div
                key={pkg.name}
                className={`reveal rounded-3xl p-6 ${
                  pkg.popular
                    ? 'bg-[#14532D] text-white shadow-[0_8px_40px_rgba(20,83,45,0.3)] scale-105'
                    : 'bg-white shadow-sm'
                }`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {pkg.popular && (
                  <div className="inline-flex items-center gap-1 bg-[#FBBF24] text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-4 font-[Plus_Jakarta_Sans]">
                    ⭐ Most Popular
                  </div>
                )}
                <p className={`text-sm font-bold uppercase tracking-wider mb-1 font-[Plus_Jakarta_Sans] ${pkg.popular ? 'text-white/70' : 'text-gray-400'}`}>
                  {pkg.name}
                </p>
                <p className={`text-2xl font-extrabold font-[Plus_Jakarta_Sans] mb-1 ${pkg.popular ? 'text-white' : 'text-[#1F2937]'}`}>
                  {pkg.kw}
                </p>
                <p className={`text-lg font-bold mb-5 ${pkg.popular ? 'text-[#FBBF24]' : 'text-[#14532D]'}`}>
                  {pkg.price}
                </p>
                <ul className="space-y-2.5 mb-6">
                  {pkg.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check size={14} className={`mt-0.5 shrink-0 ${pkg.popular ? 'text-[#FBBF24]' : 'text-[#14532D]'}`} />
                      <p className={`text-sm ${pkg.popular ? 'text-white/85' : 'text-gray-700'}`}>{item}</p>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all font-[Plus_Jakarta_Sans] ${
                    pkg.popular
                      ? 'bg-[#FBBF24] text-gray-900 hover:bg-[#F59E0B]'
                      : 'border-2 border-[#14532D] text-[#14532D] hover:bg-[#14532D] hover:text-white'
                  }`}
                >
                  Get Exact Quote <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subsidy & Finance */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-[#FBBF24]/20 to-[#FBBF24]/5 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="text-5xl">🏛️</div>
            <div className="flex-1">
              <h3 className="text-xl font-extrabold text-[#1F2937] font-[Plus_Jakarta_Sans] mb-2">
                Government Subsidy + Easy Finance
              </h3>
              <p className="text-gray-600 text-sm">
                Get up to <strong>₹78,000 subsidy</strong> under PM Surya Ghar. We handle all paperwork.
                EMI options starting from <strong>₹1,500/month.</strong> Zero-cost loans available.
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 bg-[#14532D] text-white font-bold px-6 py-3 rounded-full hover:bg-[#166534] transition-colors font-[Plus_Jakarta_Sans] text-sm"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* What Solar Powers */}
      <section className="py-16 bg-[#FAF7F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Appliances" title="What Solar Power Runs" />
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
            {content.whatPowers.map((item, i) => (
              <div
                key={item.name}
                className="reveal text-center"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl mx-auto mb-2 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                  {item.icon}
                </div>
                <p className="text-xs text-gray-600 font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Process" title="How We Install" />
          <div className="space-y-4">
            {[
              { step: '01', title: 'Free Site Survey', desc: 'Our expert visits and assesses your roof, shade, and energy needs.' },
              { step: '02', title: 'Custom System Design', desc: 'We create a system design tailored exactly to your consumption.' },
              { step: '03', title: 'Proposal & Approval', desc: 'We share a detailed quote. You approve. Subsidy application starts.' },
              { step: '04', title: 'Professional Installation', desc: 'Certified team installs the system in 1–2 days.' },
              { step: '05', title: 'Testing & Handover', desc: 'We test everything, show you how to monitor, and hand over documentation.' },
            ].map((step, i) => (
              <div
                key={step.step}
                className="reveal flex gap-5 items-start bg-[#FAF7F0] rounded-2xl p-5"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-[#14532D] text-[#FBBF24] font-extrabold text-sm flex items-center justify-center shrink-0 font-[Plus_Jakarta_Sans]">
                  {step.step}
                </div>
                <div>
                  <p className="font-bold text-[#1F2937] font-[Plus_Jakarta_Sans]">{step.title}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-12 bg-[#14532D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🛡️', val: '25-Year', label: 'Panel Warranty' },
              { icon: '🏆', val: 'MNRE', label: 'Certified Products' },
              { icon: '👷', val: '10+', label: 'Certified Installers' },
              { icon: '📞', val: '24/7', label: 'After-Sales Support' },
            ].map((t) => (
              <div key={t.label}>
                <div className="text-3xl mb-1">{t.icon}</div>
                <p className="text-xl font-extrabold text-[#FBBF24] font-[Plus_Jakarta_Sans]">{t.val}</p>
                <p className="text-white/70 text-xs mt-0.5">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading label="FAQ" title="Common Questions" />
          <FAQ items={content.faq} />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-[#FAF7F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Explore More" title="Related Services" />
          <div className="grid md:grid-cols-3 gap-5">
            {otherServices.map((s, i) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="reveal group flex gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                </div>
                <div>
                  <p className="font-bold text-[#1F2937] font-[Plus_Jakarta_Sans] group-hover:text-[#14532D] transition-colors">
                    {s.title}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">{s.short}</p>
                  <p className="text-[#14532D] text-xs font-bold mt-2 group-hover:gap-3 flex items-center gap-1 transition-all">
                    Learn More <ArrowRight size={12} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
