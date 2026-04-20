import { type ReactNode, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '../../hooks/useGsap'

gsap.registerPlugin(ScrollTrigger)

interface RevealProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
  className?: string
}

export function Reveal({ children, delay = 0, direction = 'up', className = '' }: RevealProps) {
  const animation = useCallback((element: HTMLDivElement) => {
    const from: gsap.TweenVars = { opacity: 0 }

    if (direction === 'up') from.y = 30
    else if (direction === 'left') from.x = -30
    else if (direction === 'right') from.x = 30

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(element, { opacity: 1, x: 0, y: 0 })
      return
    }

    gsap.fromTo(element, from, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      overwrite: 'auto',
      clearProps: 'opacity,transform',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }, [delay, direction])

  const ref = useGsap<HTMLDivElement>(animation)

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
