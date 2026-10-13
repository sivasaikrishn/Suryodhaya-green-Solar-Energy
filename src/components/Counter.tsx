import { useEffect, useRef, useState } from 'react'

interface CounterProps {
  value: number
  suffix: string
  label: string
  duration?: number
}

export function Counter({ value, suffix, label, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.05, rootMargin: '100px 0px 100px 0px' }
    )
    observer.observe(ref.current)

    // Fallback: trigger after 1.5s if not already started
    const fallbackTimer = setTimeout(() => {
      setStarted(true)
    }, 1500)

    return () => {
      observer.disconnect()
      clearTimeout(fallbackTimer)
    }
  }, [started])

  useEffect(() => {
    if (!started) return
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, value, duration])

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl sm:text-5xl font-extrabold font-[Plus_Jakarta_Sans] text-white">
        {count.toLocaleString()}
        <span className="text-[#FBBF24]">{suffix}</span>
      </p>
      <p className="text-white/70 text-sm mt-2 font-medium">{label}</p>
    </div>
  )
}

// Scroll-reveal hook
export function useReveal() {
  useEffect(() => {
    // Run on next tick to ensure DOM is fully rendered
    const timeout = setTimeout(() => {
      const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
            }
          })
        },
        { threshold: 0.05, rootMargin: '150px 0px 150px 0px' }
      )
      els.forEach((el) => {
        const rect = el.getBoundingClientRect()
        // If element is already in or near viewport, make visible immediately
        if (rect.top < window.innerHeight + 150) {
          el.classList.add('visible')
        }
        observer.observe(el)
      })

      // Fallback: make all visible after 2.5s so nothing ever stays hidden
      const fallback = setTimeout(() => {
        els.forEach((el) => el.classList.add('visible'))
      }, 2500)

      return () => {
        observer.disconnect()
        clearTimeout(fallback)
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [])
}
