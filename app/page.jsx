'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [pin, setPin] = useState(['', '', '', ''])
  const router = useRouter()

  const handlePinChange = (index, value) => {
    // Nur Zahlen erlauben
    if (value && !/^\d$/.test(value)) return

    const newPin = [...pin]
    newPin[index] = value
    setPin(newPin)

    // Automatisch zum nächsten Feld wechseln
    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handlePinKeyDown = (index, e) => {
    // Backspace: zum vorherigen Feld wechseln, wenn aktuelles Feld leer ist
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handlePinPaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()
    if (/^\d{4}$/.test(pastedData)) {
      const newPin = pastedData.split('')
      setPin(newPin)
      // Fokus auf letztes Feld
      const lastInput = document.getElementById('pin-3')
      if (lastInput) lastInput.focus()
    }
  }

  const handleSubmit = () => {
    const pinString = pin.join('')
    if (pinString.length === 4) {
      // Weiterleitung zur The Shift Seite
      router.push('/theshift4730')
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      {/* Factory Productions Titel - flackernd */}
      <h1 
        className="text-white text-center mb-12 animate-uneven-pulse"
        style={{
          fontFamily: 'var(--font-macbeth)',
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
        }}
      >
        FACTORY PRODUCTIONS
      </h1>

      {/* PIN Eingabefelder */}
      <div className="flex gap-4 justify-center mb-8">
        {pin.map((digit, index) => (
          <input
            key={index}
            id={`pin-${index}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handlePinChange(index, e.target.value)}
            onKeyDown={(e) => handlePinKeyDown(index, e)}
            onPaste={handlePinPaste}
            className="w-16 h-16 sm:w-20 sm:h-20 text-center text-3xl sm:text-4xl font-bold rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-black"
            style={{
              fontFamily: 'var(--font-macbeth)',
              borderColor: '#ffffff',
              focusRingColor: '#ffffff',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#ffffff'
              e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.3)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ffffff'
              e.target.style.boxShadow = 'none'
            }}
          />
        ))}
      </div>

      {/* Enter The Shift Button - weiß */}
      <button
        onClick={handleSubmit}
        disabled={pin.join('').length !== 4}
        className="px-12 py-4 text-lg font-medium rounded-full bg-white text-black transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        style={{
          fontFamily: 'var(--font-macbeth)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
        }}
        onMouseEnter={(e) => {
          if (pin.join('').length === 4) {
            e.target.style.backgroundColor = '#f0f0f0'
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#ffffff'
        }}
      >
        ENTER THE SHIFT
      </button>
    </div>
  )
}
