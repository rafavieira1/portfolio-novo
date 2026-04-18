import { useRef, useEffect, type ReactNode } from 'react'
import gsap from 'gsap'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  radius?: number
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  radius = 100,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const xTo = useRef<gsap.QuickToFunc | null>(null)
  const yTo = useRef<gsap.QuickToFunc | null>(null)

  useEffect(() => {
    if (!ref.current) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    xTo.current = gsap.quickTo(ref.current, 'x', { duration: 0.4, ease: 'power3.out' })
    yTo.current = gsap.quickTo(ref.current, 'y', { duration: 0.4, ease: 'power3.out' })

    const el = ref.current

    function onMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < radius) {
        xTo.current!(dx * strength)
        yTo.current!(dy * strength)
      }
    }

    function onLeave() {
      xTo.current!(0)
      yTo.current!(0)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength, radius])

  return (
    <div ref={ref} className={`inline-block ${className}`} data-cursor="expand">
      {children}
    </div>
  )
}
