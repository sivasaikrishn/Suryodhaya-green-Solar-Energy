interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  center?: boolean
  light?: boolean
}

export default function SectionHeading({ label, title, subtitle, center = true, light = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {label && (
        <p className="text-xs font-bold uppercase tracking-[3px] text-[#FBBF24] mb-3 font-[Plus_Jakarta_Sans]">
          {label}
        </p>
      )}
      <h2
        className={`text-3xl sm:text-4xl font-extrabold font-[Plus_Jakarta_Sans] leading-tight mb-4 ${
          light ? 'text-white' : 'text-[#1F2937]'
        }`}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p
          className={`text-base sm:text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${
            light ? 'text-white/75' : 'text-gray-500'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
