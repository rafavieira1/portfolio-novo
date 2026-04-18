import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'

export function useGsap<T extends HTMLElement = HTMLDivElement>(
  callback: (ctx: gsap.Context) => void,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null)

  const stableCallback = useCallback(callback, deps)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(stableCallback, ref.current)
    return () => ctx.revert()
  }, [stableCallback])

  return ref
}
