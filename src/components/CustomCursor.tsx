import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)')
    const updatePointerMode = () => setIsTouch(mediaQuery.matches)

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updatePointerMode)
      return () => mediaQuery.removeEventListener('change', updatePointerMode)
    }

    mediaQuery.addListener(updatePointerMode)
    return () => mediaQuery.removeListener(updatePointerMode)
  }, [])

  useEffect(() => {
    if (isTouch) return

    const dot = dotRef.current
    if (!dot) return

    const xTo = gsap.quickTo(dot, 'left', { duration: 0.15, ease: 'power3.out' })
    const yTo = gsap.quickTo(dot, 'top', { duration: 0.15, ease: 'power3.out' })

    function onMove(e: MouseEvent) {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    function onEnterExpand() {
      gsap.to(dot, { width: 40, height: 40, opacity: 0.5, duration: 0.3, ease: 'power2.out' })
    }

    function onLeaveExpand() {
      gsap.to(dot, { width: 8, height: 8, opacity: 1, duration: 0.3, ease: 'power2.out' })
    }

    function bindExpandTargets() {
      document.querySelectorAll('[data-cursor="expand"], a, button').forEach((element) => {
        if ((element as HTMLElement).dataset.cursorBound === 'true') return

        element.addEventListener('mouseenter', onEnterExpand)
        element.addEventListener('mouseleave', onLeaveExpand)
        ;(element as HTMLElement).dataset.cursorBound = 'true'
      })
    }

    window.addEventListener('mousemove', onMove)

    const observer = new MutationObserver(() => {
      bindExpandTargets()
    })

    bindExpandTargets()
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
      document.querySelectorAll('[data-cursor="expand"], a, button').forEach((element) => {
        element.removeEventListener('mouseenter', onEnterExpand)
        element.removeEventListener('mouseleave', onLeaveExpand)
        delete (element as HTMLElement).dataset.cursorBound
      })
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <div
      ref={dotRef}
      className="fixed z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference pointer-events-none"
      style={{ top: -20, left: -20 }}
    />
  )
}
