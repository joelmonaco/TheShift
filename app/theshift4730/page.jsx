'use client'

import { useEffect, useRef, useState } from 'react'

export default function TheShiftPage() {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [shouldFlicker, setShouldFlicker] = useState(true)
  const [isLastHalfSecond, setIsLastHalfSecond] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const heroTextRef = useRef(null)
  const loglineTextRef = useRef(null)

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

  // Parallax-Effekt für Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-black">
      {/* Hero Section */}
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
      <div 
        ref={heroTextRef}
        className="relative z-20 pt-24 px-4"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <h1 
          className="text-white text-center animate-uneven-pulse"
          style={{
            fontFamily: 'var(--font-macbeth)',
            fontSize: 'clamp(4rem, 15vw, 8rem)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
          }}
        >
          THE SHIFT
        </h1>
        <p 
          className="text-white text-center"
          style={{
            fontFamily: 'var(--font-macbeth)',
            fontSize: 'clamp(0.75rem, 2vw, 1rem)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            opacity: 0.8,
            marginTop: '0.25rem',
          }}
        >
          A LIMITED SERIES
        </p>
      </div>

      {/* Watch Teaser Badge - Fixed unten rechts */}
      <div 
        className="fixed bottom-8 right-8 z-50"
      >
        <div 
          className="bg-white text-black rounded-full px-6 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
          style={{
            fontFamily: 'var(--font-macbeth)',
            fontSize: '0.875rem',
            fontWeight: 400,
            letterSpacing: '0.05em',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          Watch teaser
        </div>
      </div>
      </div>

      {/* Zweiter Abschnitt - Logline (weit unten) */}
      <section className="relative min-h-screen bg-black overflow-hidden">
        {/* Video Hintergrund */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/Intro.mp4" type="video/mp4" />
          Dein Browser unterstützt das Video-Tag nicht.
        </video>

        {/* Dunkler transparenter Layer */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

        {/* Content */}
        <div className="relative z-20 min-h-screen flex items-center justify-center px-4 py-24" style={{ paddingTop: '25vh' }}>
          <div 
            ref={loglineTextRef}
            className="max-w-4xl mx-auto text-center"
            style={{
              transform: `translateY(${scrollY * -0.2}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            {/* Überschrift LOGLINE */}
            <h2 
              className="text-white mb-4"
              style={{
                fontFamily: 'var(--font-macbeth)',
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              LOGLINE
            </h2>

            {/* Text */}
            <p 
              className="text-white text-lg md:text-xl leading-relaxed mb-8"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: '1.8',
              }}
            >
              A shattering medical diagnosis swallows the older sister Hannah into The Shift, a sinister parallel universe shaped by her most haunting fears. Driven by love and grief, her younger sister Emilia steps into the same darkness, seeking the truth on a journey that threatens to consume her as well.
            </p>

            {/* Play Button */}
            <div className="flex justify-center mt-8">
              <button
                className="px-8 py-3 text-base font-medium bg-white text-black hover:bg-gray-100 transition-all duration-200 rounded-xl flex items-center gap-3"
                style={{
                  boxShadow: '0 0 30px rgba(255, 255, 255, 0.2), 0 0 60px rgba(255, 255, 255, 0.15)',
                }}
              >
                {/* Play Icon */}
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  className="flex-shrink-0"
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span style={{ fontFamily: 'var(--font-macbeth)' }}>
                  Play First Minutes
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

