'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FuzzyText from '@/components/FuzzyText'

export default function HomePage() {
  const router = useRouter()
  const [code, setCode] = useState(['', '', '', ''])
  const [hasError, setHasError] = useState(false)
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  // Prüfe ob alle 4 Ziffern eingegeben sind
  const isComplete = code.every(digit => digit !== '')

  // Handler für Eingabe
  const handleChange = (index, value) => {
    // Nur Zahlen erlauben
    if (value !== '' && !/^\d$/.test(value)) {
      return
    }

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-Focus auf nächstes Feld
    if (value !== '' && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  // Handler für Backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  // Handler für Paste
  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 4)
    const newCode = ['', '', '', '']
    
    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i]
      }
    }
    
    setCode(newCode)
    
    // Focus auf letztes ausgefülltes Feld oder erstes leeres
    const lastFilledIndex = newCode.findIndex(d => d === '') - 1
    const focusIndex = lastFilledIndex >= 0 ? lastFilledIndex : Math.min(pastedData.length, 3)
    inputRefs[focusIndex].current?.focus()
  }

  // Handler für Enter-Button
  const handleEnter = () => {
    if (isComplete) {
      const fullCode = code.join('')
      // Wenn der Code 4730 ist, navigiere zu /theshift4730
      if (fullCode === '4730') {
        router.push('/theshift4730')
      } else {
        // Falscher Code - Fehler anzeigen
        setHasError(true)
        // Nach 1 Sekunde Fehler zurücksetzen
        setTimeout(() => {
          setHasError(false)
        }, 1000)
      }
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
      `}</style>
      <div className="w-full max-w-md">
        {/* Factory Productions Titel mit FuzzyText Effekt */}
        <div className="flex justify-center mb-12">
          <FuzzyText
            fontSize="clamp(1.5rem, 6vw, 3rem)"
            fontWeight={700}
            fontFamily="'Playfair Display', serif"
            color="#ffffff"
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
          >
            Factory Productions
          </FuzzyText>
        </div>

        {/* Code-Eingabefelder */}
        <div className={`flex gap-3 justify-center mb-8 ${hasError ? 'animate-shake' : ''}`}>
          {code.map((digit, index) => (
            <Input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-16 h-16 text-center text-2xl font-semibold bg-gray-900 border-2 text-white focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors rounded-xl ${
                hasError 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-700 focus:border-white'
              }`}
            />
          ))}
        </div>

        {/* Enter Button - Container reserviert immer Platz, Button wird nur sichtbar wenn vollständig */}
        <div className="flex justify-center h-14 items-center">
          {isComplete && (
            <Button
              onClick={handleEnter}
              className="px-8 py-3 text-base font-medium bg-white text-black hover:bg-gray-100 transition-all duration-200 rounded-xl animate-fade-in"
              style={{
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.2), 0 0 60px rgba(255, 255, 255, 0.15)',
              }}
            >
              Enter <strong>The Shift</strong> -&gt;
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
