import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface ProjectImageProps {
  src: string
  alt: string
  isVisible: boolean
}

export function ProjectImage({ src, alt, isVisible }: ProjectImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const xTo = useRef<gsap.QuickToFunc | null>(null)
  const yTo = useRef<gsap.QuickToFunc | null>(null)

  useEffect(() => {
    if (!ref.current) return
    xTo.current = gsap.quickTo(ref.current, 'left', { duration: 0.4, ease: 'power3.out' })
    yTo.current = gsap.quickTo(ref.current, 'top', { duration: 0.4, ease: 'power3.out' })
  }, [])

  useEffect(() => {
    if (!ref.current) return

    if (isVisible) {
      gsap.to(ref.current, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' })
    } else {
      gsap.to(ref.current, { opacity: 0, scale: 0.8, duration: 0.2, ease: 'power2.in' })
    }
  }, [isVisible])

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (isVisible) {
        xTo.current?.(e.clientX - 175)
        yTo.current?.(e.clientY - 125)
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [isVisible])

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none z-40 w-[350px] h-[250px] overflow-hidden rounded-md opacity-0 scale-80"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  )
}
