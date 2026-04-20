import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useGsap<T extends HTMLElement = HTMLDivElement>(callback: (element: T) => void) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      callback(element)
    }, element)

    return () => ctx.revert()
  }, [callback])

  return ref
}
