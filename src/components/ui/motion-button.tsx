import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

interface BaseProps {
  label: string
  icon?: ReactNode
  classes?: string
}

type AsAnchor = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as?: 'a'; href: string }
type AsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as: 'button'; href?: never }

type MotionButtonProps = AsAnchor | AsButton

export function MotionButton({ label, icon, classes, as, ...rest }: MotionButtonProps) {
  const inner = (
    <>
      <span
        className="block h-12 w-12 overflow-hidden rounded-full bg-neutral-900 duration-500 group-hover:w-full"
        aria-hidden="true"
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 translate-x-0 duration-500 group-hover:translate-x-[0.4rem]">
        {icon ?? <ArrowRight className="size-5 text-white" />}
      </div>
      <span className="absolute left-1/2 top-1/2 ml-4 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-sm font-medium tracking-tight text-neutral-900 duration-500 group-hover:text-white">
        {label}
      </span>
    </>
  )

  const baseClass = `group relative inline-flex h-14 w-52 max-w-full cursor-pointer items-center overflow-hidden rounded-full border border-neutral-200 bg-white p-1 outline-none ${classes ?? ''}`

  if (as === 'button') {
    const { onClick, type, disabled, ...btnRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>
    return (
      <button className={baseClass} onClick={onClick} type={type} disabled={disabled} {...btnRest}>
        {inner}
      </button>
    )
  }

  const { href, target, rel, onClick, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
  return (
    <a className={baseClass} href={href} target={target} rel={rel} onClick={onClick} {...anchorRest}>
      {inner}
    </a>
  )
}
