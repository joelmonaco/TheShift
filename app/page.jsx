'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FuzzyText from '@/components/FuzzyText'

export default function HomePage() {
  const [pin, setPin] = useState(['', '', '', ''])
  const [showButton, setShowButton] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const router = useRouter()

  const CORRECT_PIN = '4730'

  const handlePinChange = (index, value) => {
    // Nur Zahlen erlauben
    if (value && !/^\d$/.test(value)) return

    const newPin = [...pin]
    newPin[index] = value
    setPin(newPin)
    setIsError(false)

    // Prüfen ob alle 4 Felder ausgefüllt sind
    const pinString = newPin.join('')
    setShowButton(pinString.length === 4)

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
      setIsError(false)
      setShowButton(true)
      // Fokus auf letztes Feld
      const lastInput = document.getElementById('pin-3')
      if (lastInput) lastInput.focus()
    }
  }

  const handleSubmit = () => {
    const pinString = pin.join('')
    if (pinString === CORRECT_PIN) {
      // Weiterleitung zur The Shift Seite
      router.push('/theshift4730')
    } else {
      // Falscher PIN: Fehler anzeigen
      setIsError(true)
      setIsShaking(true)
      setTimeout(() => {
        setIsShaking(false)
      }, 500)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative">
      {/* Factory Productions Titel - mit FuzzyText Effekt */}
      <div className="mb-12 flex justify-center items-center" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ pointerEvents: 'none' }}>
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            fontSize="clamp(2rem, 6vw, 4rem)"
            fontWeight={700}
            fontFamily="var(--font-playfair-display), serif"
            color="#fff"
          >
            FACTORY PRODUCTIONS
          </FuzzyText>
        </div>
      </div>

      {/* PIN Eingabefelder */}
      <div 
        className={`flex gap-4 justify-center mb-8 transition-all duration-300 ${isShaking ? 'animate-shake' : ''}`}
        style={{ position: 'relative', zIndex: 100 }}
      >
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
            className="w-16 h-16 sm:w-20 sm:h-20 text-center text-3xl sm:text-4xl font-bold rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              borderColor: isError ? '#ef4444' : 'rgba(255, 255, 255, 0.5)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              opacity: 1,
              position: 'relative',
              zIndex: 1000,
              pointerEvents: 'auto',
              cursor: 'text',
              WebkitUserSelect: 'text',
              userSelect: 'text',
              focusRingColor: '#ffffff',
            }}
            onFocus={(e) => {
              if (!isError) {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.8)'
                e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.3)'
              }
            }}
            onBlur={(e) => {
              e.target.style.borderColor = isError ? '#ef4444' : 'rgba(255, 255, 255, 0.5)'
              e.target.style.boxShadow = 'none'
            }}
          />
        ))}
      </div>

      {/* Enter Button - Platzhalter mit fester Höhe, damit nichts hochschiebt */}
      <div style={{ height: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 100 }}>
        {showButton && (
          <button
            onClick={handleSubmit}
            className="bg-white text-black rounded-full px-6 py-3 cursor-pointer hover:bg-gray-100 transition-colors flex items-center gap-3"
            style={{
              fontSize: '0.875rem',
              letterSpacing: '0.05em',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              border: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 400,
            }}
          >
            ENTER <span style={{ fontWeight: 700 }}>THE SHIFT</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="flex-shrink-0"
            >
              <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
          </svg>
          </button>
        )}
      </div>

      {/* Shake Animation CSS */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
