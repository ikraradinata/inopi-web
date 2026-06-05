import React from 'react'

interface LogoProps {
  className?: string
  iconOnly?: boolean
  light?: boolean
}

export default function Logo({ className = '', iconOnly = false, light = false }: LogoProps) {
  const strokeColor = light ? '#ffffff' : '#071422'
  const textColor = light ? '#ffffff' : '#071422'
  const circleFillColor = '#0d9488' // Teal brand color

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="w-8 h-8 select-none"
        style={{ overflow: 'visible' }}
      >
        <g
          fill="none"
          stroke={strokeColor}
          strokeWidth="5"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {/* Diamond Outline */}
          <path d="M 15 60 L 50 25 L 85 60 L 50 95 Z" />
          {/* Horizontal dividing line */}
          <line x1="15" y1="60" x2="85" y2="60" />
          {/* Diagonal dividing line */}
          <line x1="40" y1="85" x2="85" y2="60" />
          {/* Top-Right Accent Circle with brand teal fill */}
          <circle
            cx="65"
            cy="15"
            r="8"
            fill={circleFillColor}
            stroke={strokeColor}
            strokeWidth="5"
          />
        </g>
      </svg>
      {!iconOnly && (
        <span
          className="font-display font-extrabold text-[20px] tracking-tight transition-colors duration-200"
          style={{ color: textColor }}
        >
          INOPI
        </span>
      )}
    </div>
  )
}
