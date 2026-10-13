import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Check } from 'lucide-react'
import CTABand from '../components/CTABand'
import { BUSINESS } from '../data/constants'

interface FormData {
  name: string
  phone: string
  city: string
  service: string
  bill: string
  message: string
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: '', phone: '', city: '', service: '', bill: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  useEffect(() => {
    document.title = 'Contact Suryodaya Solar | Puttaparthi District'
  }, [])

  const validate = () => {
    const e: Partial<FormData> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter valid 10-digit mobile number'
    if (!form.city.trim()) e.city = 'City is required'
    return e
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }
    // Simulate form submission via WhatsApp
    const msg = encodeURIComponent(
      `Hi! New enquiry from website:\nName: ${form.name}\nPhone: ${form.phone}\nCity: ${form.city}\nService: ${form.service}\nMonthly Bill: ₹${form.bill}\nMessage: ${form.message}`
    )
    window.open(`${BUSINESS.whatsapp}?text=${msg}`, '_blank')
    setSubmitted(true)
  }

  const SERVICES_LIST = [
    'On-Grid Solar', 'Off-Grid Solar', 'Hybrid Solar',
    'Residential', 'Commercial', 'Industrial',
    'Maintenance / AMC', 'Repair & Service',
    'Solar Panels', 'Inverters', 'Batteries',
  ]

  return (
    <>
      {/* Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80"
          alt="Solar home"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d3b1e]/90 to-[#14532D]/70" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#FBBF24] text-xs font-bold uppercase tracking-widest mb-3 font-[Plus_Jakarta_Sans]">Get In Touch</p>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-[Plus_Jakarta_Sans] mb-4">Let's Talk Solar</h1>
          <p className="text-white/80 text-lg">Free advice, free survey, free quote — no commitment.</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-white/60">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </div>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-extrabold text-[#1F2937] font-[Plus_Jakarta_Sans] mb-2">
                Get Your Free Quote
              </h2>
              <p className="text-gray-500 text-sm mb-8">Fill the form below. We'll reply within 2 hours.</p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-3xl p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#14532D] font-[Plus_Jakarta_Sans] mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    WhatsApp opened with your message. Our team will reply within 2 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', city: '', service: '', bill: '', message: '' }) }}
                    className="text-sm text-[#14532D] font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-[#14532D]'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="10-digit mobile"
                        maxLength={10}
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-[#14532D]'
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your City *</label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="e.g. Hyderabad"
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          errors.city ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-[#14532D]'
                        }`}
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Service */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Service Interested In</label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#14532D] bg-white"
                      >
                        <option value="">Select service…</option>
                        {SERVICES_LIST.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>

                    {/* Monthly Bill */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Monthly Electricity Bill (₹)</label>
                      <input
                        type="number"
                        value={form.bill}
                        onChange={(e) => setForm({ ...form, bill: e.target.value })}
                        placeholder="e.g. 3000"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#14532D]"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message (optional)</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={3}
                      placeholder="Any specific questions or requirements…"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#14532D] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#FBBF24] text-gray-900 font-bold py-4 rounded-xl hover:bg-[#F59E0B] hover:shadow-[0_8px_24px_rgba(251,191,36,0.4)] transition-all duration-200 font-[Plus_Jakarta_Sans]"
                  >
                    <Send size={16} />
                    Send via WhatsApp
                  </button>
                  <p className="text-center text-xs text-gray-400">
                    Clicking "Send" opens WhatsApp with your message pre-filled.
                  </p>
                </form>
              )}
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {[
                {
                  Icon: Phone,
                  title: 'Call Us',
                  content: BUSINESS.phone,
                  sub: 'Mon–Fri 8AM–6PM, Sun 8AM–2PM',
                  href: BUSINESS.phoneLink,
                  color: '#14532D',
                },
                {
                  Icon: MessageCircle,
                  title: 'WhatsApp',
                  content: BUSINESS.phone,
                  sub: 'Replies within 2 hours',
                  href: BUSINESS.whatsapp,
                  color: '#25D366',
                },
                {
                  Icon: Mail,
                  title: 'Email Us',
                  content: BUSINESS.email,
                  sub: 'We reply within 24 hours',
                  href: `mailto:${BUSINESS.email}`,
                  color: '#166534',
                },
                {
                  Icon: MapPin,
                  title: 'Visit Our Office',
                  content: 'Main Road, Puttaparthi',
                  sub: 'Sri Sathya Sai District, Andhra Pradesh 515134',
                  href: 'https://maps.google.com/?q=Puttaparthi+Sri+Sathya+Sai+District',
                  color: '#14532D',
                },
                {
                  Icon: Clock,
                  title: 'Working Hours',
                  content: 'Mon–Fri: 8:00 AM – 6:00 PM',
                  sub: 'Sunday: 8:00 AM – 2:00 PM',
                  href: null,
                  color: '#14532D',
                },
              ].map((card) => {
                const Icon = card.Icon
                const content = (
                  <div className="flex items-start gap-4 p-5 bg-[#FAF7F0] rounded-2xl hover:shadow-md transition-shadow">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${card.color}15` }}
                    >
                      <Icon size={20} style={{ color: card.color }} />
                    </div>
                    <div>
                      <p className="font-bold text-[#1F2937] text-sm font-[Plus_Jakarta_Sans]">{card.title}</p>
                      <p className="text-gray-800 text-sm mt-0.5 font-medium">{card.content}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{card.sub}</p>
                    </div>
                  </div>
                )
                return card.href ? (
                  <a key={card.title} href={card.href} target="_blank" rel="noreferrer">
                    {content}
                  </a>
                ) : (
                  <div key={card.title}>{content}</div>
                )
              })}

              {/* Free Survey card */}
              <div className="bg-gradient-to-br from-[#14532D] to-[#166534] rounded-2xl p-6 text-white">
                <p className="text-[#FBBF24] text-xs font-bold uppercase tracking-widest mb-2 font-[Plus_Jakarta_Sans]">
                  No Cost, No Commitment
                </p>
                <h3 className="text-lg font-extrabold font-[Plus_Jakarta_Sans] mb-2">Book a Free Site Survey</h3>
                <p className="text-white/80 text-sm mb-4">
                  Our expert visits your roof, checks for shade, and recommends the perfect solar system in Puttaparthi District.
                </p>
                <a
                  href={`${BUSINESS.whatsapp}?text=${encodeURIComponent("Hi, I'd like to book a free site survey. Please confirm a time.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FBBF24] text-gray-900 font-bold px-5 py-2.5 rounded-full text-sm hover:bg-[#F59E0B] transition-colors font-[Plus_Jakarta_Sans]"
                >
                  <MessageCircle size={14} />
                  Book on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Puttaparthi Map Section */}
      <section className="bg-[#FAF7F0] py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#14532D] font-[Plus_Jakarta_Sans]">Our Location</p>
          <h3 className="text-2xl font-extrabold text-[#1F2937] font-[Plus_Jakarta_Sans]">Visit Our Office in Puttaparthi District</h3>
          <p className="text-sm text-gray-500 mt-1">Main Road, Puttaparthi, Sri Sathya Sai District, Andhra Pradesh 515134</p>
        </div>
        <div className="h-96 w-full shadow-inner overflow-hidden">
          <iframe
            src={BUSINESS.mapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Suryodaya Solar - Puttaparthi District"
          />
        </div>
      </section>

      <CTABand />
    </>
  )
}
