'use client'

import { useEffect, useRef, useState } from 'react'

export default function TheShiftPage() {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [shouldFlicker, setShouldFlicker] = useState(true)
  const [isLastHalfSecond, setIsLastHalfSecond] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    let lastTime = 0
    let isNearEnd = false
    
    if (video && container) {
      // Versuche das Video zu laden
      video.load()
      
      // Funktion zum Flackern triggern
      const triggerFlicker = () => {
        if (container) {
          container.classList.remove('animate-flicker-start')
          // Kurz warten, damit die Animation neu starten kann
          void container.offsetWidth // Trigger reflow
          setTimeout(() => {
            container.classList.add('animate-flicker-start')
            setShouldFlicker(true)
            // Nach 2 Sekunden (Animation-Dauer) wieder zurücksetzen
            setTimeout(() => {
              setShouldFlicker(false)
            }, 2000)
          }, 10)
        }
      }
      
      // Event Listener für Video-Loop
      const handleTimeUpdate = () => {
        const currentTime = video.currentTime
        const duration = video.duration
        
        if (duration > 0) {
          const timeUntilEnd = duration - currentTime
          
          // Prüfe ob Video in der letzten halben Sekunde ist - dann komplett schwarz
          if (timeUntilEnd <= 0.5 && timeUntilEnd > 0) {
            setIsLastHalfSecond(true)
          } else {
            setIsLastHalfSecond(false)
          }
          
          // Prüfe ob Video in der letzten Sekunde ist - dann flackern (aber nicht in der letzten halben Sekunde)
          if (timeUntilEnd <= 1 && timeUntilEnd > 0.5 && !isNearEnd) {
            isNearEnd = true
            triggerFlicker()
          }
          
          // Wenn Video zurückgesprungen ist (Loop hat neu gestartet)
          if (isNearEnd && currentTime < 0.5 && lastTime > duration * 0.9) {
            isNearEnd = false
            setIsLastHalfSecond(false)
            triggerFlicker()
          }
        }
        
        lastTime = currentTime
      }
      
      // Event Listener für Debugging
      video.addEventListener('loadeddata', () => {
        console.log('Video geladen')
      })
      
      video.addEventListener('error', (e) => {
        console.error('Video-Fehler:', e)
      })
      
      video.addEventListener('canplay', () => {
        console.log('Video kann abgespielt werden')
        video.play().catch(err => {
          console.error('Autoplay-Fehler:', err)
        })
      })
      
      video.addEventListener('timeupdate', handleTimeUpdate)
      
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Video Container mit Gradients */}
      <div 
        ref={containerRef}
        className={`absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 z-0 ${shouldFlicker ? 'animate-flicker-start' : ''}`}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{
            opacity: isLastHalfSecond ? 0 : 1,
            transition: 'opacity 0.1s ease-out',
          }}
        >
          <source src="/Video_1.mov" type="video/quicktime" />
          <source src="/Video_1.mov" type="video/mp4" />
          Dein Browser unterstützt das Video-Tag nicht.
        </video>
        
        {/* Gradient Overlays direkt über dem Video */}
        {/* Oben */}
        <div 
          className="absolute top-0 left-0 w-full h-64 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>
        {/* Unten */}
        <div 
          className="absolute bottom-0 left-0 w-full h-64 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>
        {/* Links */}
        <div 
          className="absolute top-0 left-0 w-64 h-full pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>
        {/* Rechts */}
        <div 
          className="absolute top-0 right-0 w-64 h-full pointer-events-none"
          style={{
            background: 'linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>
      </div>

      {/* THE SHIFT Titel */}
      <div className="relative z-20 pt-24 px-4">
        <h1 
          className="text-white text-center animate-uneven-pulse"
          style={{
            fontFamily: 'var(--font-macbeth)',
            fontSize: 'clamp(4rem, 15vw, 8rem)',
            fontWeight: 400,
            letterSpacing: '0.05em',
          }}
        >
          THE SHIFT
        </h1>
      </div>
    </div>
  )
}

