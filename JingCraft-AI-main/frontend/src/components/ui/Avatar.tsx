
import { useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size' | 'src'> {
  src?: string
  name: string
  size?: AvatarSize
  fallback?: string
  bordered?: boolean
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

function Avatar({
  src,
  name,
  size = 'md',
  fallback,
  bordered = false,
  alt,
  className = '',
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = useState(false)

  const initials = fallback || getInitials(name)
  const showImage = Boolean(src) && !imageError

  return (
    <span
      role="img"
      aria-label={alt || name}
      className={[
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        'bg-primary/10 font-semibold text-primary',
        sizeStyles[size],
        bordered ? 'border-2 border-white shadow-sm' : '',
        className,
      ].join(' ')}
    >
      {showImage ? (
        <img
          {...props}
          src={src}
          alt=""
          aria-hidden="true"
          onError={() => setImageError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  )
}

export default Avatar
