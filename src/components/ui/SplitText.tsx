import { useRef, useEffect, type ElementType } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SplitTextProps {
  children: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
  scrollTriggered?: boolean
}

export function SplitText({
  children,
  as: Tag = 'h1',
  className = '',
  delay = 0.3,
  stagger = 0.04,
  scrollTriggered = false,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.split-word')
      if (!words.length) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(words, { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        words,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: scrollTriggered ? 0 : delay,
          stagger,
          ease: 'power3.out',
          overwrite: 'auto',
          clearProps: 'opacity,transform',
          scrollTrigger: scrollTriggered
            ? {
                trigger: containerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            : undefined,
        }
      )
    }, containerRef)

    return () => {
      ctx.revert()
    }
  }, [delay, stagger, scrollTriggered])

  const words = children.split(' ')

  return (
    <Tag ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className="split-word inline-block">
            {word}
            {i < words.length - 1 && '\u00A0'}
          </span>
        </span>
      ))}
    </Tag>
  )
}
