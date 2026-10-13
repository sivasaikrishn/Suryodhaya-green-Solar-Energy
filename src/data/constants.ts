// ─── BUSINESS INFO ─────────────────────────────────────────────
export const BUSINESS = {
  name: 'Suryodaya Solar',
  tagline: 'Free Power from the Sun',
  phone: '9701864622',
  phoneLink: 'tel:+919701864622',
  whatsapp: 'https://wa.me/919701864622',
  email: 'suryodayachakri@gmail.com',
  address: 'Main Road, Puttaparthi, Sri Sathya Sai District, Andhra Pradesh 515134',
  hours: 'Mon–Fri: 8:00 AM – 6:00 PM | Sun: 8:00 AM – 2:00 PM',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61993.45663765103!2d77.77098485!3d14.1683395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb167a57a1b4d09%3A0x6b63d9178ad01e2!2sPuttaparthi%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000',
}

// ─── WHATSAPP PRE-FILLED MESSAGES ─────────────────────────────
export const WA_MESSAGES = {
  ongrid: encodeURIComponent("Hi, I'm interested in On-Grid Solar. Please share details."),
  offgrid: encodeURIComponent("Hi, I'm interested in Off-Grid Solar. Please share details."),
  hybrid: encodeURIComponent("Hi, I'm interested in Hybrid Solar. Please share details."),
  survey: encodeURIComponent("Hi, I'd like to book a free site survey. Please confirm a time."),
  quote: encodeURIComponent("Hi, I'd like a detailed quote for a solar system. Please help."),
}

// ─── SERVICES ──────────────────────────────────────────────────
export const SERVICES = [
  {
    slug: 'residential',
    title: 'Residential Solar',
    subtitle: 'Made for your home.',
    icon: '🏠',
    category: 'Rooftop Solutions',
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=900&q=80',
    short: 'Clean power for homes, villas & apartments',
    highlights: ['Cut bills by 70–90%', 'Subsidy up to ₹78,000', 'Installed in 2 days'],
    color: '#14532D',
  },
  {
    slug: 'commercial',
    title: 'Commercial Solar',
    subtitle: 'Cut business electricity costs.',
    icon: '🏢',
    category: 'Rooftop Solutions',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
    short: 'Solar solutions for offices, shops and commercial malls',
    highlights: ['Lower operating costs', 'Accelerated depreciation tax benefits', 'Break-even in 3–4 years'],
    color: '#166534',
  },
  {
    slug: 'industrial',
    title: 'Industrial Solar',
    subtitle: 'Power your factory with sunlight.',
    icon: '🏭',
    category: 'Rooftop Solutions',
    image: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=900&q=80',
    short: 'Large-scale MW & kW solar for factories and warehouses',
    highlights: ['High-tension tariff savings', 'Peak load management', 'Heavy duty structures'],
    color: '#15803D',
  },
  {
    slug: 'on-grid-solar',
    title: 'On-Grid Solar',
    subtitle: 'Lower your bill. Stay connected to the grid.',
    icon: '⚡',
    category: 'Solar Systems',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80',
    short: 'Reduce monthly electricity bills via grid connection',
    highlights: ['Lowest upfront investment', 'Net metering meter runs backwards', 'Zero battery maintenance'],
    color: '#14532D',
  },
  {
    slug: 'off-grid-solar',
    title: 'Off-Grid Solar',
    subtitle: 'Power anywhere. No grid needed.',
    icon: '🔋',
    category: 'Solar Systems',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80',
    short: 'Independent power with battery bank for outages or remote sites',
    highlights: ['100% self-reliant power', 'Deep-cycle battery storage', 'Ideal for agriculture & farms'],
    color: '#166534',
  },
  {
    slug: 'hybrid-solar',
    title: 'Hybrid Solar',
    subtitle: 'Save money AND never lose power.',
    icon: '🌟',
    category: 'Solar Systems',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=80',
    short: 'Grid savings + smart battery backup during blackouts',
    highlights: ['Daytime grid savings', 'Instant power cut backup (<20ms)', 'Lithium storage lifespan 10+ yrs'],
    color: '#15803D',
  },
  {
    slug: 'maintenance',
    title: 'Maintenance & AMC',
    subtitle: 'Keep your system at peak performance.',
    icon: '🔧',
    category: 'Service & Support',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80',
    short: 'Annual maintenance contracts, deep panel cleaning & inspection',
    highlights: ['Quarterly panel washing', 'Wiring & inverter safety tests', '20%+ boost in generation'],
    color: '#14532D',
  },
  {
    slug: 'repair-service',
    title: 'Repair & Rapid Service',
    subtitle: 'Fast fixes. Quick response.',
    icon: '🛠️',
    category: 'Service & Support',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=900&q=80',
    short: 'Inverter repair, fault diagnosis, and emergency onsite support',
    highlights: ['2-hour emergency response in Hyd', 'Genuine OEM replacement parts', 'Comprehensive diagnostic reports'],
    color: '#166534',
  },
  {
    slug: 'solar-panels',
    title: 'Solar Panels',
    subtitle: "India's best panel brands.",
    icon: '☀️',
    category: 'Products',
    image: 'https://images.unsplash.com/photo-1508873696983-2df57046475a?w=900&q=80',
    short: 'Mono PERC and bifacial panels from Tier-1 manufacturers',
    highlights: ['25-Year performance warranty', 'High cell efficiency (>21.5%)', 'MNRE approved & BIS certified'],
    color: '#15803D',
  },
  {
    slug: 'inverters',
    title: 'Solar Inverters',
    subtitle: 'The heart of your solar system.',
    icon: '⚙️',
    category: 'Products',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
    short: 'String, hybrid and micro inverters with smart WiFi telemetry',
    highlights: ['98%+ conversion efficiency', 'Mobile app cloud tracking', 'IP65 weatherproof ratings'],
    color: '#14532D',
  },
  {
    slug: 'batteries',
    title: 'Solar Batteries',
    subtitle: 'Store the sun. Use it at night.',
    icon: '🔋',
    category: 'Products',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=900&q=80',
    short: 'Lithium-ion (LiFePO4) and tubular battery banks',
    highlights: ['6,000+ deep cycles life', 'Safe non-combustible chemistry', 'Compact wall-mount options'],
    color: '#166534',
  },
]

// ─── INDUSTRIES ────────────────────────────────────────────────
export const INDUSTRIES = [
  { name: 'Homes', icon: '🏠', image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&q=80', system: 'On-Grid / Hybrid' },
  { name: 'Offices', icon: '🏢', image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80', system: 'On-Grid' },
  { name: 'Factories', icon: '🏭', image: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600&q=80', system: 'On-Grid / Hybrid' },
  { name: 'Hotels', icon: '🏨', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', system: 'Hybrid' },
  { name: 'Hospitals', icon: '🏥', image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80', system: 'Hybrid' },
  { name: 'Farms', icon: '🌾', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80', system: 'Off-Grid' },
]

// ─── PRICING TABLE ─────────────────────────────────────────────
// ⚠️ PLACEHOLDER PRICES — Replace with actual quotes
export const PRICING = [
  { size: '1 kW', price: '₹65,000', savings: '₹800/mo', payback: '4–5 yrs', units: '100–120 units/mo' },
  { size: '2 kW', price: '₹1,15,000', savings: '₹1,600/mo', payback: '4–5 yrs', units: '200–240 units/mo' },
  { size: '3 kW', price: '₹1,65,000', savings: '₹2,400/mo', payback: '4–5 yrs', units: '300–360 units/mo' },
  { size: '5 kW', price: '₹2,50,000', savings: '₹4,000/mo', payback: '4–5 yrs', units: '500–600 units/mo' },
  { size: '10 kW', price: '₹4,50,000', savings: '₹8,000/mo', payback: '4–5 yrs', units: '1000–1200 units/mo' },
]

// ─── FAQ ────────────────────────────────────────────────────────
export const HOME_FAQ = [
  { q: 'How much does a solar system cost?', a: '⚠️ A 3 kW system costs approximately ₹1,65,000 after subsidy. Final price depends on your roof and usage. We give a free quote after a site visit.' },
  { q: 'Will I get a government subsidy?', a: 'Yes! Under PM Surya Ghar scheme, you can get up to ₹78,000 subsidy for a 3 kW residential system. We handle all the paperwork for you.' },
  { q: 'How much roof space do I need?', a: 'Each kW needs about 10 sq ft of shade-free roof space. A 3 kW system needs roughly 30 sq ft — smaller than one room.' },
  { q: 'Does solar work on cloudy days?', a: 'Yes, panels still generate power on cloudy days — just at lower efficiency. India gets enough sun year-round for great results.' },
  { q: 'What maintenance is needed?', a: 'Very little. A quick panel cleaning every 2–3 months keeps output high. We offer annual maintenance contracts for peace of mind.' },
  { q: 'How long until I get my money back?', a: '⚠️ Most homes recover their investment in 4–5 years. After that, power is essentially free for 20+ years.' },
]

// ─── STATS ─────────────────────────────────────────────────────
// ⚠️ PLACEHOLDER — Replace [XXX] with real numbers
export const STATS = [
  { value: 14000, suffix: '+ kW', label: 'Installed Capacity' },
  { value: 4, suffix: '+ Years', label: 'In Business' },
  { value: 500, suffix: '+', label: 'Happy Homes' },   // ⚠️ PLACEHOLDER
  { value: 25, suffix: '-Year', label: 'Panel Warranty' },
]
