import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const dot = dotRef.current!
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

    window.addEventListener('mousemove', onMove)

    const observer = new MutationObserver(() => {
      bindExpandTargets()
    })

    function bindExpandTargets() {
      document.querySelectorAll('[data-cursor="expand"], a, button').forEach((el) => {
        if ((el as HTMLElement).dataset.cursorBound === 'true') return

        el.addEventListener('mouseenter', onEnterExpand)
        el.addEventListener('mouseleave', onLeaveExpand)
        ;(el as HTMLElement).dataset.cursorBound = 'true'
      })
    }

    bindExpandTargets()
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
      document.querySelectorAll('[data-cursor="expand"], a, button').forEach((el) => {
        el.removeEventListener('mouseenter', onEnterExpand)
        el.removeEventListener('mouseleave', onLeaveExpand)
        delete (el as HTMLElement).dataset.cursorBound
      })
    }
  }, [])

  if (isTouch) return null

  return (
    <div
      ref={dotRef}
      className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{ top: -20, left: -20 }}
    />
  )
}
