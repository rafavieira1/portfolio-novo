import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Layer = {
  src?: string
  content?: ReactNode
  yPercent: number
  className?: string
}

type ParallaxScrollingProps = {
  layers: Layer[]
  className?: string
  heightClass?: string
}

export function ParallaxScrolling({
  layers,
  className = '',
  heightClass = 'h-[100vh]',
}: ParallaxScrollingProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const trigger = rootRef.current?.querySelector('[data-parallax-layers]')
    if (!trigger) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0,
        },
      })

      layers.forEach((layer, idx) => {
        tl.to(
          trigger.querySelectorAll(`[data-parallax-layer="${idx}"]`),
          { yPercent: layer.yPercent, ease: 'none' },
          idx === 0 ? undefined : '<'
        )
      })
    }, rootRef)

    return () => ctx.revert()
  }, [layers])

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <section className={`relative w-full overflow-hidden ${heightClass}`}>
        <div data-parallax-layers className="absolute inset-0">
          {layers.map((layer, idx) => (
            <div
              key={idx}
              data-parallax-layer={idx}
              className={`absolute inset-0 flex items-center justify-center will-change-transform ${layer.className ?? ''}`}
            >
              {layer.src ? (
                <img
                  src={layer.src}
                  alt=""
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              ) : (
                layer.content
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
