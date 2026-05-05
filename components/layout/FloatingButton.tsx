'use client'

import { Phone } from 'lucide-react'
import { useState } from 'react'

export default function FloatingButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href="tel:054-763-5988"
      aria-label="전화 상담"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-7 right-7 z-50 flex items-center gap-2.5 rounded-full transition-all duration-300"
      style={{
        background: hovered ? '#1A2E4A' : '#1A56A0',
        padding: hovered ? '13px 22px' : '15px',
        boxShadow: '0 4px 20px rgba(196,168,79,0.45)',
      }}
    >
      <Phone size={19} color="#FFFFFF" strokeWidth={2.2} />
      <span
        className="text-[#FFFFFF] text-sm font-semibold whitespace-nowrap overflow-hidden transition-all duration-300"
        style={{
          maxWidth: hovered ? '110px' : '0px',
          opacity: hovered ? 1 : 0,
        }}
      >
        전화 상담
      </span>
    </a>
  )
}
