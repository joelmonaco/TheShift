'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import Image from 'next/image'
import TextType from '@/components/TextType'
import FuzzyText from '@/components/FuzzyText'

export default function TheShiftPage() {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const introVideoRef = useRef(null)
  const video2Ref = useRef(null)
  const container2Ref = useRef(null)
  const video3Ref = useRef(null)
  const video4Ref = useRef(null)
  const video5Ref = useRef(null)
  const container5Ref = useRef(null)
  const video6Ref = useRef(null)
  const container6Ref = useRef(null)
  const [shouldFlicker, setShouldFlicker] = useState(true)
  const [isLastHalfSecond, setIsLastHalfSecond] = useState(false)
  const [shouldFlicker2, setShouldFlicker2] = useState(true)
  const [isLastHalfSecond2, setIsLastHalfSecond2] = useState(false)
  const [shouldFlicker5, setShouldFlicker5] = useState(false)
  const [isLastHalfSecond5, setIsLastHalfSecond5] = useState(false)
  const [shouldFlicker6, setShouldFlicker6] = useState(false)
  const [isLastHalfSecond6, setIsLastHalfSecond6] = useState(false)
  const [hoveredImage, setHoveredImage] = useState(null)
  const [isHoveringHannah, setIsHoveringHannah] = useState(false)
  const [typewriterText, setTypewriterText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isHoveringEmilia, setIsHoveringEmilia] = useState(false)
  const [hasHovered, setHasHovered] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const heroTextRef = useRef(null)
  const loglineTextRef = useRef(null)
  const synopsisTextRef = useRef(null)
  const mysteryTextRef = useRef(null)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showTeaserModal, setShowTeaserModal] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const controlsTimeoutRef = useRef(null)
  const [isLandscape, setIsLandscape] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [showCodeLayer, setShowCodeLayer] = useState(true)
  const [codeInput, setCodeInput] = useState(['', '', '', ''])
  const [codeError, setCodeError] = useState(false)
  const codeInputRef0 = useRef(null)
  const codeInputRef1 = useRef(null)
  const codeInputRef2 = useRef(null)
  const codeInputRef3 = useRef(null)
  const codeInputRefs = [codeInputRef0, codeInputRef1, codeInputRef2, codeInputRef3]

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

  // Video 2 Flackern-Effekt (wie Video 1)
  useEffect(() => {
    const video = video2Ref.current
    if (video) {
      let lastTime = 0
      let isNearEnd = false
      
      const triggerFlicker = () => {
        if (container2Ref.current) {
          setShouldFlicker2(true)
          // Nach 2 Sekunden (Animation-Dauer) wieder zurücksetzen
          setTimeout(() => {
            setShouldFlicker2(false)
          }, 2000)
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
            setIsLastHalfSecond2(true)
          } else {
            setIsLastHalfSecond2(false)
          }
          
          // Prüfe ob Video in der letzten Sekunde ist - dann flackern (aber nicht in der letzten halben Sekunde)
          if (timeUntilEnd <= 1 && timeUntilEnd > 0.5 && !isNearEnd) {
            isNearEnd = true
            triggerFlicker()
          }
          
          // Wenn Video zurückgesprungen ist (Loop hat neu gestartet)
          if (isNearEnd && currentTime < 0.5 && lastTime > duration * 0.9) {
            isNearEnd = false
            setIsLastHalfSecond2(false)
            triggerFlicker()
          }
        }
        
        lastTime = currentTime
      }
      
      video.addEventListener('timeupdate', handleTimeUpdate)
      
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [])

  // Video 5 Flackern-Effekt (wie Video 1 und 2)
  useEffect(() => {
    const video = video5Ref.current
    const container = container5Ref.current
    if (video && container) {
      let lastTime = 0
      let isNearEnd = false
      
      const triggerFlicker = () => {
        if (container) {
          container.classList.remove('animate-flicker-start')
          void container.offsetWidth // Trigger reflow
          setTimeout(() => {
            container.classList.add('animate-flicker-start')
            setShouldFlicker5(true)
            setTimeout(() => {
              setShouldFlicker5(false)
            }, 2000)
          }, 10)
        }
      }
      
      // Intersection Observer für erstes Erscheinen
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
              // Section ist sichtbar geworden - Flackern triggern
              triggerFlicker()
              observer.disconnect() // Nur einmal triggern
            }
          })
        },
        { threshold: 0.1 }
      )
      
      if (container) {
        observer.observe(container)
      }
      
      // Event Listener für Video-Loop
      const handleTimeUpdate = () => {
        const currentTime = video.currentTime
        const duration = video.duration
        
        if (duration > 0) {
          const timeUntilEnd = duration - currentTime
          
          // Prüfe ob Video in der letzten halben Sekunde ist - dann komplett schwarz
          if (timeUntilEnd <= 0.5 && timeUntilEnd > 0) {
            setIsLastHalfSecond5(true)
          } else {
            setIsLastHalfSecond5(false)
          }
          
          // Prüfe ob Video in der letzten Sekunde ist - dann flackern (aber nicht in der letzten halben Sekunde)
          if (timeUntilEnd <= 1 && timeUntilEnd > 0.5 && !isNearEnd) {
            isNearEnd = true
            triggerFlicker()
          }
          
          // Wenn Video zurückgesprungen ist (Loop hat neu gestartet)
          if (isNearEnd && currentTime < 0.5 && lastTime > duration * 0.9) {
            isNearEnd = false
            setIsLastHalfSecond5(false)
            triggerFlicker()
          }
        }
        
        lastTime = currentTime
      }
      
      video.addEventListener('timeupdate', handleTimeUpdate)
      video.addEventListener('canplay', () => {
        video.play().catch(err => {
          console.error('Video 5 Autoplay-Fehler:', err)
        })
      })
      
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate)
        observer.disconnect()
      }
    }
  }, [])

  // Video 6 Flackern-Effekt (wie Video 5)
  useEffect(() => {
    const video = video6Ref.current
    const container = container6Ref.current
    if (video && container) {
      let lastTime = 0
      let isNearEnd = false
      
      const triggerFlicker = () => {
        if (container) {
          container.classList.remove('animate-flicker-start')
          void container.offsetWidth // Trigger reflow
          setTimeout(() => {
            container.classList.add('animate-flicker-start')
            setShouldFlicker6(true)
            setTimeout(() => {
              setShouldFlicker6(false)
            }, 2000)
          }, 10)
        }
      }
      
      // Intersection Observer für erstes Erscheinen
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
              // Section ist sichtbar geworden - Flackern triggern
              triggerFlicker()
              observer.disconnect() // Nur einmal triggern
            }
          })
        },
        { threshold: 0.1 }
      )
      
      if (container) {
        observer.observe(container)
      }
      
      // Event Listener für Video-Loop
      const handleTimeUpdate = () => {
        const currentTime = video.currentTime
        const duration = video.duration
        
        if (duration > 0) {
          const timeUntilEnd = duration - currentTime
          
          // Prüfe ob Video in der letzten halben Sekunde ist - dann komplett schwarz
          if (timeUntilEnd <= 0.5 && timeUntilEnd > 0) {
            setIsLastHalfSecond6(true)
          } else {
            setIsLastHalfSecond6(false)
          }
          
          // Prüfe ob Video in der letzten Sekunde ist - dann flackern (aber nicht in der letzten halben Sekunde)
          if (timeUntilEnd <= 1 && timeUntilEnd > 0.5 && !isNearEnd) {
            isNearEnd = true
            triggerFlicker()
          }
          
          // Wenn Video zurückgesprungen ist (Loop hat neu gestartet)
          if (isNearEnd && currentTime < 0.5 && lastTime > duration * 0.9) {
            isNearEnd = false
            setIsLastHalfSecond6(false)
            triggerFlicker()
          }
        }
        
        lastTime = currentTime
      }
      
      video.addEventListener('timeupdate', handleTimeUpdate)
      video.addEventListener('canplay', () => {
        video.play().catch(err => {
          console.error('Video 6 Autoplay-Fehler:', err)
        })
      })
      
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate)
        observer.disconnect()
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

  // Bildschirmausrichtung überwachen (für Mobile Video)
  useEffect(() => {
    const checkOrientation = () => {
      const width = window.innerWidth
      const mobile = width < 768
      const tablet = width >= 768 && width < 1024
      setIsMobile(mobile)
      setIsTablet(tablet)
      if (mobile) {
        setIsLandscape(window.innerHeight < window.innerWidth)
      } else {
        setIsLandscape(true) // Desktop immer als Landscape behandeln
      }
    }

    checkOrientation()
    window.addEventListener('resize', checkOrientation)
    window.addEventListener('orientationchange', checkOrientation)

    return () => {
      window.removeEventListener('resize', checkOrientation)
      window.removeEventListener('orientationchange', checkOrientation)
    }
  }, [])

  // Videos im Hintergrund laden, auch wenn Code-Layer sichtbar ist
  useEffect(() => {
    // Alle Video-Refs sammeln und laden
    const videos = [
      videoRef.current,
      video2Ref.current,
      video3Ref.current,
      video4Ref.current,
      video5Ref.current,
      video6Ref.current,
      introVideoRef.current,
    ].filter(Boolean)

    videos.forEach((video) => {
      if (video && video.readyState < 2) {
        // Video noch nicht geladen, also laden
        video.load()
      }
    })
  }, [])

  // Handler für Watch Teaser Button
  const handleWatchTeaser = () => {
    setIsFading(true)
    setTimeout(() => {
      setIsFading(false)
      setShowTeaserModal(true)
    }, 1500)
  }

  // Handler für Teaser Video schließen
  const handleCloseTeaser = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setShowTeaserModal(false)
  }

  // Handler für Play First Minutes Button
  const handlePlayFirstMinutes = () => {
    setIsFading(true)
    // Langsam zu schwarz faden, dann Video
    setTimeout(() => {
      setIsFading(false)
      setShowVideoModal(true)
      setShowControls(true) // Controls initial anzeigen
      // Scroll zur Logline-Sektion
      const loglineSection = document.querySelector('section')
      if (loglineSection) {
        loglineSection.scrollIntoView({ behavior: 'smooth' })
      }
      // Video nach kurzer Verzögerung starten
      setTimeout(() => {
        if (introVideoRef.current) {
          introVideoRef.current.volume = 1.0 // Volle Lautstärke
          introVideoRef.current.muted = false // Sound aktivieren
          introVideoRef.current.play().catch(err => {
            console.error('Video play error:', err)
          })
          setIsPlaying(true)
        }
        // Nach 3 Sekunden Controls ausblenden
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false)
        }, 3000)
      }, 300)
    }, 1500) // Fade-to-Black Dauer
  }

  // Handler für Video schließen
  const handleCloseVideo = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (introVideoRef.current) {
      introVideoRef.current.pause()
      introVideoRef.current.currentTime = 0
      introVideoRef.current.muted = true
    }
    setIsPlaying(false)
    setShowVideoModal(false)
    setShowControls(true)
    // Zurück zur Logline-Sektion (Section 2) scrollen
    setTimeout(() => {
      const sections = document.querySelectorAll('section')
      if (sections.length > 0) {
        sections[0].scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  // Handler für Play/Pause Toggle
  const handlePlayPause = () => {
    if (introVideoRef.current) {
      if (isPlaying) {
        introVideoRef.current.pause()
        setIsPlaying(false)
      } else {
        introVideoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  // Video Event Handler
  useEffect(() => {
    const video = introVideoRef.current
    if (video) {
      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)
      const handleEnded = () => {
        setIsPlaying(false)
        // Video automatisch schließen und zur Section 2 scrollen
        handleCloseVideo()
      }

      video.addEventListener('play', handlePlay)
      video.addEventListener('pause', handlePause)
      video.addEventListener('ended', handleEnded)

      return () => {
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
        video.removeEventListener('ended', handleEnded)
      }
    }
  }, [showVideoModal])

  // Handler für Code-Eingabe
  const handleCodeSubmit = () => {
    const codeString = codeInput.join('')
    if (codeString === '4730') {
      setShowCodeLayer(false)
    } else {
      // Falscher Code: Fehlerzustand setzen und nach Animation zurücksetzen
      setCodeError(true)
      setTimeout(() => {
        setCodeError(false)
      }, 600) // Animation dauert ~600ms
    }
  }

  const handleCodeChange = (index, value) => {
    // Nur Zahlen erlauben
    const digit = value.replace(/\D/g, '').slice(0, 1)
    const newCode = [...codeInput]
    newCode[index] = digit
    setCodeInput(newCode)

    // Automatisch zum nächsten Feld wechseln, wenn eine Ziffer eingegeben wurde
    if (digit && index < 3) {
      codeInputRefs[index + 1].current?.focus()
    }
  }

  const handleCodeKeyDown = (index, e) => {
    // Backspace: zum vorherigen Feld wechseln, wenn aktuelles Feld leer ist
    if (e.key === 'Backspace' && !codeInput[index] && index > 0) {
      codeInputRefs[index - 1].current?.focus()
    }
    // Enter: Code prüfen
    if (e.key === 'Enter') {
      handleCodeSubmit()
    }
  }

  const handleCodePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    const newCode = ['', '', '', '']
    for (let i = 0; i < pastedData.length && i < 4; i++) {
      newCode[i] = pastedData[i]
    }
    setCodeInput(newCode)
    // Fokus auf letztes ausgefülltes Feld oder erstes leeres Feld
    const nextIndex = Math.min(pastedData.length, 3)
    codeInputRefs[nextIndex].current?.focus()
  }

  return (
    <div className="bg-black">
      {/* Code Layer Overlay */}
      {showCodeLayer && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <div className="flex flex-col items-center gap-6 px-4">
            {/* Factory Productions Text */}
            <div className="mb-2 flex justify-center">
              <FuzzyText
                baseIntensity={0.2}
                hoverIntensity={0.5}
                enableHover={true}
                fontSize="clamp(1.75rem, 5vw, 3.5rem)"
                fontWeight={400}
                fontFamily="var(--font-playfair-display), serif"
                color="#fff"
              >
                Factory Productions
              </FuzzyText>
            </div>
            
            {/* Code Input - Vier einzelne Felder */}
            <div className="flex items-center gap-3 md:gap-4">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  ref={codeInputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  value={codeInput[index]}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleCodeKeyDown(index, e)}
                  onPaste={handleCodePaste}
                  maxLength={1}
                  className={`bg-transparent border-2 text-white text-center text-4xl md:text-6xl w-16 md:w-20 h-20 md:h-24 focus:outline-none transition-all duration-300 ${
                    codeError 
                      ? 'border-red-500 animate-shake' 
                      : 'border-white focus:border-gray-400'
                  }`}
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                  autoFocus={index === 0}
                />
              ))}
            </div>
            
            {/* Enter Button - immer gerendert, aber unsichtbar wenn nicht alle Felder ausgefüllt */}
            <button
              onClick={handleCodeSubmit}
              className={`px-8 py-3 text-base font-medium transition-all duration-200 rounded-full flex items-center gap-3 ${
                codeInput.every(d => d !== '')
                  ? 'bg-white text-black hover:bg-gray-100 cursor-pointer opacity-100'
                  : 'opacity-0 pointer-events-none'
              }`}
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                minHeight: '48px',
              }}
            >
              Enter <span style={{ fontWeight: 700 }}>The Shift</span>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="ml-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Video Container mit Gradients */}
      <div 
        ref={containerRef}
        className={`absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-3/4 h-3/4 z-0 ${shouldFlicker ? 'animate-flicker-start' : ''}`}
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
        {/* Links - nur Desktop */}
        <div 
          className="absolute top-0 left-0 w-64 h-full pointer-events-none hidden md:block"
          style={{
            background: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>
        {/* Rechts - nur Desktop */}
        <div 
          className="absolute top-0 right-0 w-64 h-full pointer-events-none hidden md:block"
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
            fontSize: 'clamp(5rem, 15vw, 8rem)',
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
            fontSize: 'clamp(1rem, 2vw, 1rem)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            opacity: 0.8,
            marginTop: '0.25rem',
          }}
        >
          A LIMITED SERIES
        </p>
      </div>

      {/* Explore mit Pfeil - Ganz unten in Hero Section */}
      <div 
        className="absolute bottom-32 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group hover:opacity-80 transition-opacity" 
        onClick={() => {
          // Finde die zweite Section (Logline-Sektion) - das erste <section> Element
          const sections = document.querySelectorAll('section')
          if (sections.length > 0) {
            sections[0].scrollIntoView({ behavior: 'smooth' })
          }
        }}
      >
        <p 
          className="text-white text-sm"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 400,
          }}
        >
          Explore
        </p>
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          className="text-white animate-bounce-arrow"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {/* Watch Teaser Badge - Fixed unten rechts (Desktop) / unten zentriert (Mobile) */}
      <div 
        className="fixed bottom-8 right-8 md:right-8 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 z-50 flex flex-row md:flex-col gap-3 md:gap-3 items-center justify-center md:items-stretch md:justify-start"
      >
        {/* Desktop: Buttons untereinander mit Icons */}
        <button
          onClick={handleWatchTeaser}
          className="bg-white text-black rounded-full px-6 py-3 cursor-pointer hover:bg-gray-100 transition-colors hidden md:flex items-center gap-3"
          style={{
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            border: 'none',
          }}
        >
          {/* Play Icon */}
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="flex-shrink-0"
          >
            <path d="M8 5v14l11-7z"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 900 }}>
            Watch teaser
          </span>
        </button>
        <a
          href="https://drive.google.com/file/d/1SbwY-9aU8uy3AaMJrhdXJGdmTu-F_O9A/view"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black rounded-full px-6 py-3 cursor-pointer hover:bg-gray-100 transition-colors hidden md:flex items-center gap-3"
          style={{
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            textDecoration: 'none',
          }}
        >
          {/* Book Icon */}
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="flex-shrink-0"
          >
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 900 }}>
            Read Script
          </span>
        </a>
        <a
          href="https://untitled.stream/library/project/ZG2YSP1XQd4Off0kgF4ro"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black rounded-full px-6 py-3 cursor-pointer hover:bg-gray-100 transition-colors hidden md:flex items-center gap-3"
          style={{
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            textDecoration: 'none',
          }}
        >
          {/* Music Icon */}
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="flex-shrink-0"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 900 }}>
            Explore Soundtrack
          </span>
        </a>

        {/* Mobile: Buttons nebeneinander mit Icons */}
        <button
          onClick={handleWatchTeaser}
          className="bg-white text-black rounded-full px-5 py-3 cursor-pointer hover:bg-gray-100 transition-colors flex md:hidden items-center gap-2"
          style={{
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            border: 'none',
          }}
        >
          {/* Play Icon */}
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="flex-shrink-0"
          >
            <path d="M8 5v14l11-7z"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 900 }}>
            Teaser
          </span>
        </button>
        <a
          href="https://drive.google.com/file/d/1SbwY-9aU8uy3AaMJrhdXJGdmTu-F_O9A/view"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black rounded-full px-5 py-3 cursor-pointer hover:bg-gray-100 transition-colors flex md:hidden items-center gap-2"
          style={{
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            textDecoration: 'none',
          }}
        >
          {/* Book Icon */}
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="flex-shrink-0"
          >
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 900 }}>
            Script
          </span>
        </a>
        <a
          href="https://untitled.stream/library/project/ZG2YSP1XQd4Off0kgF4ro"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black rounded-full px-5 py-3 cursor-pointer hover:bg-gray-100 transition-colors flex md:hidden items-center gap-2"
          style={{
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            textDecoration: 'none',
          }}
        >
          {/* Music Icon */}
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="flex-shrink-0"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 900 }}>
            Music
          </span>
        </a>
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

        {/* Gradient Verlauf zu schwarz unten */}
        <div 
          className="absolute bottom-0 left-0 w-full h-96 pointer-events-none z-15"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>

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
              className="text-white mb-4 animate-uneven-pulse"
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
                fontWeight: 600,
                letterSpacing: '0.01em',
                lineHeight: '1.8',
              }}
            >
              A shattering medical diagnosis swallows the older sister Hannah into <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 700 }}>The Shift</span>, a sinister parallel universe shaped by her most haunting fears. Driven by love and grief, her younger sister Emilia steps into the same darkness, seeking the truth on a journey that threatens to consume her as well.
            </p>

            {/* Play Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handlePlayFirstMinutes}
                className="px-8 py-3 text-base font-medium bg-white text-black hover:bg-gray-100 transition-all duration-200 rounded-full flex items-center gap-3"
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
                <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 900 }}>
                  Play First Minutes
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dritter Abschnitt - Synopsis */}
      <section className="relative min-h-screen bg-black overflow-hidden">
        {/* Video Hintergrund */}
        <div 
          ref={container2Ref}
          className={`absolute top-0 left-0 w-full h-full z-0 ${shouldFlicker2 ? 'animate-flicker-start' : ''}`}
        >
          <video
            ref={video2Ref}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{
              opacity: isLastHalfSecond2 ? 0 : 1,
              transition: 'opacity 0.1s ease-out',
            }}
          >
            <source src="/Video_2.mov" type="video/quicktime" />
            <source src="/Video_2.mov" type="video/mp4" />
            Dein Browser unterstützt das Video-Tag nicht.
          </video>
        </div>

        {/* Gradient Verlauf zu schwarz oben */}
        <div 
          className="absolute top-0 left-0 w-full h-32 pointer-events-none z-15"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>

        {/* Gradient Verlauf zu schwarz unten */}
        <div 
          className="absolute bottom-0 left-0 w-full h-96 pointer-events-none z-15"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>

        {/* Content */}
        <div className="relative z-20 min-h-screen flex items-center justify-center px-4" style={{ paddingTop: '65vh', paddingBottom: '35vh' }}>
          <div 
            ref={synopsisTextRef}
            className="max-w-4xl mx-auto text-center"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            {/* Überschrift SYNOPSIS */}
            <h2 
              className="text-white mb-4 animate-uneven-pulse"
              style={{
                fontFamily: 'var(--font-macbeth)',
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              SYNOPSIS
            </h2>

            {/* Text */}
            <p 
              className="text-white text-lg md:text-xl leading-relaxed mb-8"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.01em',
                lineHeight: '1.8',
              }}
            >
              <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 700 }}>Hannah (28) and Emilia (21)</span> are sisters bound by a deep, lifelong connection—yet they couldn&apos;t be more different. Hannah, the confident and charismatic rising film producer on the brink of her big breakthrough, has always pulled her quiet, introverted sister Emilia along in her wake. But when Hannah receives a devastating cancer diagnosis, a trauma she once endured as a child resurfaces, shattering the stability she worked so hard to build.
              <br /><br />
              As overwhelming fear, buried memories, and old wounds resurface, Hannah is suddenly dragged into <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 700 }}>The Shift</span>: a dark parallel universe where every suppressed terror takes physical form. Though she manages to escape once, the second time she is pulled in, she never returns. In the real world, her body is found—her death ruled a suicide. But Emilia refuses to believe it. Grieving the loss of the sister, Emilia begins searching for answers—and is soon swallowed by <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 700 }}>The Shift</span> herself.
            </p>
          </div>
        </div>
      </section>

      {/* CHARACTERS Banner */}
      <div className="relative w-full bg-black flex flex-col items-center justify-center" style={{ minHeight: '30vh', marginTop: '20vh' }}>
        <h2 
          className="text-white text-center animate-uneven-pulse"
          style={{
            fontFamily: 'var(--font-macbeth)',
            fontSize: 'clamp(0.75rem, 14vw, 12rem)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
          }}
        >
          CHARACTERS
        </h2>
        <p 
          className="text-white text-center mt-4"
          style={{
            fontFamily: 'var(--font-macbeth)',
            fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            opacity: 0.8,
          }}
        >
          THE KESSLER SISTERS
        </p>
      </div>

      {/* Vierter Abschnitt - Characters */}
      <section className="relative min-h-screen bg-black overflow-hidden">
        {/* Gradient Verlauf zu schwarz oben */}
        <div 
          className="absolute top-0 left-0 w-full h-32 pointer-events-none z-15"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>
        
        {/* Gradient Verlauf zu schwarz unten */}
        <div 
          className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-15"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>
        <div className="flex flex-col md:flex-row min-h-screen md:h-screen relative">
          {/* HOVER HERE Text - nur sichtbar wenn noch nicht gehovert wurde, nicht auf Mobile */}
          {!hasHovered && (
            <div className="absolute inset-0 hidden md:flex items-center justify-center z-30 pointer-events-none">
              <p 
                className="text-white text-center animate-uneven-pulse"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  letterSpacing: '0.1em',
                  opacity: 0.9,
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)',
                }}
              >
                HOVER HERE
              </p>
            </div>
          )}
          
          {/* Linke Seite - Hannah */}
          <div 
            className="relative w-full md:w-1/2 h-[100vh] md:h-full overflow-hidden cursor-pointer group"
            onMouseEnter={() => {
              if (!isMobile) {
                setIsHoveringHannah(true)
                setHasHovered(true)
                if (video3Ref.current) {
                  video3Ref.current.play().catch(err => console.error('Video play error:', err))
                }
              }
            }}
            onMouseLeave={() => {
              if (!isMobile) {
                setIsHoveringHannah(false)
                if (video3Ref.current) {
                  video3Ref.current.pause()
                }
              }
            }}
            onClick={() => {
              if (isMobile) {
                const newState = !isHoveringHannah
                setIsHoveringHannah(newState)
                setIsHoveringEmilia(false) // Schließe den anderen Bereich
                setHasHovered(true)
                if (video3Ref.current) {
                  if (newState) {
                    video3Ref.current.play().catch(err => console.error('Video play error:', err))
                  } else {
                    video3Ref.current.pause()
                  }
                }
                if (video4Ref.current) {
                  video4Ref.current.pause()
                }
              }
            }}
          >
            {/* Video Hintergrund */}
            <video
              ref={video3Ref}
              loop
              muted
              playsInline
              preload="auto"
              className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 ${
                isHoveringHannah ? 'grayscale-0' : 'grayscale'
              }`}
              style={{
                filter: isHoveringHannah ? 'grayscale(0%)' : 'grayscale(100%)',
              }}
            >
              <source src="/Video_3.mov" type="video/quicktime" />
              <source src="/Video_3.mov" type="video/mp4" />
              Dein Browser unterstützt das Video-Tag nicht.
            </video>

            {/* Dunkler Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-10"></div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center px-8 text-center py-8 md:py-0">
              <h2 
                className={`text-white mb-8 animate-uneven-pulse transition-all duration-500 ${
                  isHoveringHannah ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  fontFamily: 'var(--font-macbeth)',
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  pointerEvents: isHoveringHannah ? 'auto' : 'none',
                }}
              >
                HANNAH KESSLER
              </h2>
              
              {/* Text - erscheint beim Hover (Desktop) oder beim Klick (Mobile) */}
              <div 
                className={`max-w-2xl mx-auto transition-all duration-500 ${
                  isHoveringHannah ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  pointerEvents: isHoveringHannah ? 'auto' : 'none',
                }}
              >
                <p 
                  className="text-white text-base md:text-lg leading-relaxed"
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontWeight: 400,
                    lineHeight: '1.8',
                  }}
                >
                  Hannah, 28, is charismatic, magnetic, and effortlessly confident—the kind of woman who commands any room. With her blonde hair, sharp style, and warm, open energy, she&apos;s a rising film producer on the verge of major success. Behind her polished exterior, however, lies a vulnerability shaped by a serious childhood illness she&apos;s long tried to bury.
                  <br /><br />
                  She projects strength, yet quietly carries <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 700 }}>fears she never reveals</span>—especially to her younger sister, Emilia, whom she has always fiercely protected. Hannah&apos;s defining tension lies in this contrast: a woman who appears unstoppable, but privately battles the shadows of her past.
                  <br /><br />
                  Played by Eli Riccardi, known from <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 700 }}>Maxton Hall</span>, Mandy und die Mächte des Bösen, and more.
                </p>
              </div>
            </div>
          </div>

          {/* Rechte Seite - Emilia */}
          <div 
            className="relative w-full md:w-1/2 h-[100vh] md:h-full overflow-hidden cursor-pointer group"
            onMouseEnter={() => {
              if (!isMobile) {
                setIsHoveringEmilia(true)
                setHasHovered(true)
                if (video4Ref.current) {
                  video4Ref.current.play().catch(err => console.error('Video play error:', err))
                }
              }
            }}
            onMouseLeave={() => {
              if (!isMobile) {
                setIsHoveringEmilia(false)
                if (video4Ref.current) {
                  video4Ref.current.pause()
                }
              }
            }}
            onClick={() => {
              if (isMobile) {
                const newState = !isHoveringEmilia
                setIsHoveringEmilia(newState)
                setIsHoveringHannah(false) // Schließe den anderen Bereich
                setHasHovered(true)
                if (video4Ref.current) {
                  if (newState) {
                    video4Ref.current.play().catch(err => console.error('Video play error:', err))
                  } else {
                    video4Ref.current.pause()
                  }
                }
                if (video3Ref.current) {
                  video3Ref.current.pause()
                }
              }
            }}
          >
            {/* Video Hintergrund */}
            <video
              ref={video4Ref}
              loop
              muted
              playsInline
              preload="auto"
              className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 ${
                isHoveringEmilia ? 'grayscale-0' : 'grayscale'
              }`}
              style={{
                filter: isHoveringEmilia ? 'grayscale(0%)' : 'grayscale(100%)',
              }}
            >
              <source src="/Video_4.mov" type="video/quicktime" />
              <source src="/Video_4.mov" type="video/mp4" />
              Dein Browser unterstützt das Video-Tag nicht.
            </video>

            {/* Dunkler Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-10"></div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center px-8 text-center py-8 md:py-0">
              <h2 
                className={`text-white mb-8 animate-uneven-pulse transition-all duration-500 ${
                  isHoveringEmilia ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  fontFamily: 'var(--font-macbeth)',
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  pointerEvents: isHoveringEmilia ? 'auto' : 'none',
                }}
              >
                EMILIA KESSLER
              </h2>
              
              {/* Text - erscheint beim Hover (Desktop) oder beim Klick (Mobile) */}
              <div 
                className={`max-w-2xl mx-auto transition-all duration-500 ${
                  isHoveringEmilia ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  pointerEvents: isHoveringEmilia ? 'auto' : 'none',
                }}
              >
                <p 
                  className="text-white text-base md:text-lg leading-relaxed"
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontWeight: 400,
                    lineHeight: '1.8',
                  }}
                >
                  Emilia, 21, is quiet, quirky, and deeply introverted—<span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 700 }}>a true wallflower</span>. With her soft brown hair and gentle eyes, she carries a natural shyness that makes her blend into the background. She still lives in her small hometown, recently starting medical school more out of safety than ambition.
                  <br /><br />
                  Overshadowed her whole life by her confident older sister, Hannah, Emilia relied on her as both protector and anchor. That dependence left Emilia sheltered, with few friends, a strained relationship with her mother, and little sense of her own identity. Defined by her sensitivity and hesitation, Emilia is someone who has never learned to stand on her own—now forced to confront a world, and fears, she&apos;s long avoided.
                  <br /><br />
                  Played by Lina Hüesker, known from <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 700 }}>Hilfe, ich hab meine Lehrerin geschrumpft</span>, Vaterfreuden and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fünfter Abschnitt - The Mystery of The Shift */}
      <section className="relative min-h-screen bg-black overflow-hidden">
        {/* Video Hintergrund - Mobile: volle Breite, Desktop: rechte Hälfte */}
        <div 
          ref={container5Ref}
          className={`absolute top-0 left-0 w-full md:w-1/2 md:left-1/2 h-full z-0 ${shouldFlicker5 ? 'animate-flicker-start' : ''}`}
        >
          <video
            ref={video5Ref}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{
              opacity: isLastHalfSecond5 ? 0 : 1,
              transition: 'opacity 0.1s ease-out',
            }}
          >
            <source src="/Video_5.mov" type="video/quicktime" />
            <source src="/Video_5.mov" type="video/mp4" />
            Dein Browser unterstützt das Video-Tag nicht.
          </video>
        </div>

        {/* Dunkler transparenter Layer - nur Mobile */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10 md:hidden"></div>

        {/* Gradient Verlauf zu schwarz oben */}
        <div 
          className="absolute top-0 left-0 w-full h-32 pointer-events-none z-15"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>

        {/* Gradient Verlauf zu schwarz unten */}
        <div 
          className="absolute bottom-0 left-0 w-full h-96 pointer-events-none z-15"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>

        {/* Content - Mobile: zentriert, Desktop: links */}
        <div className="relative z-20 min-h-screen flex items-center justify-center md:justify-start px-4 py-24 md:py-0" style={{ paddingTop: '25vh' }}>
          <div 
            ref={mysteryTextRef}
            className="max-w-4xl mx-auto text-center md:text-left md:max-w-2xl md:mx-0 md:absolute md:left-0 md:top-0 md:h-full md:flex md:flex-col md:justify-center md:px-0" 
            style={{ 
              paddingLeft: '0',
              paddingRight: '0',
            }}
          >
            <div className="md:pl-24 md:pr-8">
              <h2 
                className="text-white mb-8 animate-uneven-pulse"
                style={{
                  fontFamily: 'var(--font-macbeth)',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                }}
              >
                THE MYSTERY<br />OF THE SHIFT
              </h2>
              
              <div className="max-w-2xl mx-auto md:mx-0">
                <p 
                  className="text-white text-lg md:text-lg leading-relaxed"
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontWeight: 400,
                    lineHeight: '1.8',
                  }}
                >
                  The Shift is a supernatural, distorted reflection of reality—a <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 700 }}>parallel dimension</span> where a person&apos;s deepest fears and hidden traumas physically manifest. It cannot be entered by choice; it pulls people in when their inner world begins to collapse.
                  <br /><br />
                  Fueled by raw emotion, The Shift grows stronger with fear and pain, twisting memories and playing with its victims like a predator. Though it feels like a nightmare, everything that happens inside it has real and often devastating consequences in the real world.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Gradient Verlauf zu schwarz links (nur am linken Rand) */}
        <div 
          className="hidden md:block absolute top-0 left-1/2 pointer-events-none z-10"
          style={{
            width: '30%',
            height: '100%',
            background: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>
      </section>

      {/* Sechster Abschnitt - Visual Concept */}
      <section className="relative min-h-screen bg-black overflow-hidden">
        {/* Video Hintergrund mit Flackern */}
        <div 
          ref={container6Ref}
          className={`absolute top-0 left-0 w-full h-full z-0 ${shouldFlicker6 ? 'animate-flicker-start' : ''}`}
        >
          <video
            ref={video6Ref}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{
              opacity: isLastHalfSecond6 ? 0 : 1,
              transition: 'opacity 0.1s ease-out',
              objectPosition: (isMobile || isTablet) ? 'right center' : 'center center',
            }}
          >
            <source src="/Video_6.mov" type="video/quicktime" />
            <source src="/Video_6.mov" type="video/mp4" />
            Dein Browser unterstützt das Video-Tag nicht.
          </video>
        </div>

        {/* Dunkler transparenter Layer */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10"></div>

        {/* Gradient Verlauf zu schwarz unten */}
        <div 
          className="absolute bottom-0 left-0 w-full h-96 pointer-events-none z-15"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>

        {/* Content */}
        <div className="relative z-20 min-h-screen flex items-center justify-center px-4 py-24" style={{ paddingTop: '25vh' }}>
          <div 
            className="max-w-4xl mx-auto text-center"
          >
            {/* Überschrift VISUAL CONCEPT */}
            <h2 
              className="text-white mb-4 animate-uneven-pulse"
              style={{
                fontFamily: 'var(--font-macbeth)',
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              VISUAL CONCEPT
            </h2>

            {/* Text */}
            <p 
              className="text-white text-lg md:text-xl leading-relaxed mb-8"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.01em',
                lineHeight: '1.8',
              }}
            >
              The Shift combines a warm, old-school coming-of-age aesthetic—echoing films like <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 700 }}>Stand By Me or What&apos;s Eating Gilbert Grape</span>—with the unsettling, modern horror tone of <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 700 }}>It Follows</span> and <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 700 }}>Hereditary</span>. The real world feels nostalgic and grounded, shaped by soft lighting, natural textures, and a timeless small-town atmosphere. Vintage outfits, classic cars, and recurring nods to old music and film reinforce its sense of nostalgia.
              <br /><br />
              In contrast, The Shift presents a distorted, eerie version of reality: muted colors, uncanny stillness, and subtle surrealism.
            </p>
          </div>
        </div>
      </section>

      {/* Siebter Abschnitt - Bilder Galerie */}
      <section className="relative min-h-screen bg-black overflow-visible py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredImage(num)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <div className="relative w-full" style={{ aspectRatio: '1/1' }}>
                  <Image
                    src={`/Bilder/Bild_${num}.png`}
                    alt={`Bild ${num}`}
                    fill
                    className="object-cover transition-all duration-500"
                    style={{
                      filter: hoveredImage === num ? 'grayscale(0%)' : 'grayscale(100%)',
                    }}
                  />
                </div>
              </div>
            ))}
            
            {/* Video 7 - so breit wie 4 Bilder, näher an die Bilder */}
            <div className="relative col-span-2 md:col-span-3 lg:col-span-4 -mt-4" style={{ aspectRatio: '16/9' }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              >
                <source src="/Video_7.mov" type="video/quicktime" />
                <source src="/Video_7.mov" type="video/mp4" />
                Dein Browser unterstützt das Video-Tag nicht.
              </video>
            </div>
            
            {/* Video 8 - so breit wie 4 Bilder, näher an Video 7 */}
            <div className="relative col-span-2 md:col-span-3 lg:col-span-4 -mt-8" style={{ aspectRatio: '16/9' }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              >
                <source src="/Video_8.mov" type="video/quicktime" />
                <source src="/Video_8.mov" type="video/mp4" />
                Dein Browser unterstützt das Video-Tag nicht.
              </video>
              
              {/* Weißes Blatt - über Video 8 positioniert */}
              <div 
                className="absolute top-0 left-0 w-full" 
                style={{ 
                  height: isMobile ? '70vh' : (isTablet ? '80vh' : '120vh'), 
                  transform: isMobile ? 'translateY(20vh)' : (isTablet ? 'translateY(30vh)' : 'translateY(75vh)'), 
                  zIndex: 10 
                }}
              >
                {/* Weicher Schatten hinter den Blättern */}
                <div 
                  className="absolute inset-0"
                  style={{
                    transform: 'rotate(3deg)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.2)',
                    zIndex: 0,
                    filter: 'blur(20px)',
                    opacity: 0.6,
                  }}
                />
                {/* Hintere Blätter (Stapel-Effekt) */}
                <div 
                  className="absolute inset-0 bg-white"
                  style={{
                    transform: 'translate(16px, 16px) rotate(3deg)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    zIndex: 1,
                  }}
                />
                <div 
                  className="absolute inset-0 bg-white"
                  style={{
                    transform: 'translate(8px, 8px) rotate(3deg)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                    zIndex: 2,
                  }}
                />
                {/* Vorderes Blatt */}
                <div 
                  className="relative bg-white shadow-2xl"
                  style={{
                    zIndex: 3,
                    height: '100%',
                    transform: 'rotate(3deg)',
                    boxShadow: '0 15px 50px rgba(0, 0, 0, 0.25), 0 5px 15px rgba(0, 0, 0, 0.15)',
                    padding: isMobile ? '1.5rem' : (isTablet ? '2rem' : '3rem'),
                  }}
                >
                  <div className="max-w-4xl mx-auto">
                    {/* Gesamter Text mit einem einzigen Cursor */}
                    <div 
                      className="typewriter-content"
                      style={{
                        fontFamily: 'var(--font-courier-prime), monospace',
                        fontSize: isMobile ? '0.5rem' : (isTablet ? '0.6rem' : '0.9rem'),
                        lineHeight: '1.8',
                        letterSpacing: '0.02em',
                      }}
                    >
                      <TextType 
                        key={isMobile ? 'mobile' : (isTablet ? 'tablet' : 'desktop')}
                        as="div"
                        text={[(isMobile || isTablet) ? `THE SHIFT

Written by

Eleftherios Bethmage & Joel Monaco

Episode One - Erwachen

EXT. WALDLICHTUNG - MORGEN 1

Tau liegt schwer auf der sattgrünen Wiese. Langsam läuft ein einzelnes Reh auf die Lichtung, sein Fell golden gestreichelt

MORE` : `THE SHIFT

Written by

Eleftherios Bethmage & Joel Monaco

Episode One - Erwachen

EXT. WALDLICHTUNG - MORGEN 1

Tau liegt schwer auf der sattgrünen Wiese. Langsam läuft ein einzelnes Reh auf die Lichtung, sein Fell golden gestreichelt von den ersten Sonnenstrahlen. Die Welt ist still – nur entferntes Vogelgezwitscher dringt aus dem Dickicht. Das Reh zupft ruhig an einem Grashalm.

ARZTHELFERIN (O.S.)
Es tut uns leid, Frau Kessler, aber wir müssen die Aufnahme wiederholen.

Ein mechanisches SURREN setzt ein - ein motorisierter Schlitten gleitet in eine MRT-Röhre und rastet ein.

ARZTHELFERIN (O.S.) (CONT'D)
Wir können die Struktur noch nicht ganz beurteilen. Sie bekommen jetzt das Kontrastmittel. Eventuell fühlt es sich wieder etwas kalt an.

Das Surren der MRT-Röhre wird allmählich intensiver. Wir sehen den verunsicherten Blick der Arzthelferin hinter dem Computer.

MORE`]}
                        typingSpeed={150}
                        pauseDuration={0}
                        showCursor={true}
                        cursorCharacter="|"
                        loop={false}
                        className="typewriter-content"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neunter Abschnitt - Breites Bild (unter den Blättern) */}
      <section className="relative w-full bg-black overflow-hidden" style={{ marginTop: isMobile ? '20vh' : (isTablet ? '30vh' : '80vh') }}>
        <div className="relative w-full" style={{ height: '100vh', width: '100%' }}>
          {/* Bild Container */}
          <div className="absolute inset-0" style={{ zIndex: 1 }}>
            <Image
              src="/Bilder/Bild_Breit_1.png"
              alt="Bild Breit 1"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* Schwarzer Gradient am unteren Rand */}
          <div 
            className="absolute bottom-0 left-0 w-full pointer-events-none"
            style={{
              height: '50%',
              background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.2) 80%, rgba(0, 0, 0, 0) 100%)',
              zIndex: 1,
            }}
          />
        </div>
      </section>

      {/* Zehnter Abschnitt - Development Status (über dem Bild) */}
      <section className="relative w-full bg-transparent overflow-visible" style={{ marginTop: isMobile ? '-40vh' : (isTablet ? '-38vh' : '-20vh'), zIndex: 20 }}>
        <div className="relative w-full flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start" style={{ paddingLeft: isMobile ? '2rem' : '6rem', paddingRight: isMobile ? '2rem' : '2rem', gap: isMobile ? '2rem' : '0' }}>
          <div className={isMobile ? "w-full text-center" : "w-1/2"}>
            <h2
              className="text-white animate-uneven-pulse"
              style={{
                fontFamily: 'var(--font-macbeth)',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: '1.2',
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.3)',
              }}
            >
              DEVELOPMENT<br />STATUS
            </h2>
          </div>
          <div className={isMobile ? "w-full text-center" : "w-1/2"}>
            <ul 
              className="text-white list-none"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                fontWeight: 400,
                lineHeight: '2',
              }}
            >
              <li style={{ marginBottom: '0.5rem' }}>
                <span style={{ marginRight: '0.75rem' }}>•</span>
                Pilot episode shot (pre-post-production)
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <span style={{ marginRight: '0.75rem' }}>•</span>
                Lead roles cast
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <span style={{ marginRight: '0.75rem' }}>•</span>
                Episode arc for a entire first season
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <span style={{ marginRight: '0.75rem' }}>•</span>
                Concept for additional seasons in anthology style
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Elfter Abschnitt - Note of the Authors */}
      <section className="relative w-full bg-black overflow-hidden" style={{ marginTop: isMobile ? '-20vh' : (isTablet ? '-20vh' : '20vh') }}>
        <div className="relative w-full" style={{ height: '100vh', width: '100%' }}>
          <Image
            src="/Bilder/Bild_Breit_2.png"
            alt="Bild Breit 2"
            fill
            className="object-contain"
            priority
          />
          {/* Schwarzer Gradient am unteren Rand */}
          <div 
            className="absolute bottom-0 left-0 w-full pointer-events-none"
            style={{
              height: '50%',
              background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.2) 80%, rgba(0, 0, 0, 0) 100%)',
              zIndex: 1,
            }}
          />
        </div>
      </section>

      {/* Zwölfter Abschnitt - Note of the Authors (über dem Bild) */}
      <section className="relative w-full bg-transparent overflow-visible" style={{ marginTop: isMobile ? '-40vh' : (isTablet ? '-55vh' : '-40vh'), zIndex: 20 }}>
        <div className="relative w-full flex flex-col justify-center items-center" style={{ paddingLeft: isMobile ? '1rem' : '6rem', paddingRight: isMobile ? '1rem' : '6rem' }}>
          <h2
            className="text-white animate-uneven-pulse text-center mb-8"
            style={{
              fontFamily: 'var(--font-macbeth)',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: '1.2',
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.3)',
            }}
          >
            NOTE OF THE AUTHORS
          </h2>
          <p
            className="text-white text-center"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              fontWeight: 400,
              lineHeight: '1.8',
              letterSpacing: '0.01em',
              maxWidth: isMobile ? '100%' : '72rem',
            }}
          >
            The Shift explores fear, trauma, and psychological struggle by shaping them into physical, liminal spaces the audience can feel. Inspired by classic indie horror like <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 700 }}>Halloween</span> and <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 700 }}>The Evil Dead</span>, we value the creativity born from limitations and bold, timeless storytelling. At the same time, we&apos;re drawn to the warmth and nostalgia of small-town &quot;everyman&quot; stories that echo our own childhood memories. The Shift blends these worlds into a haunting mix of psychological horror and intimate nostalgia—set in a place anyone can recognize.
          </p>
        </div>
      </section>

      {/* Dreizehnter Abschnitt - Quote */}
      <section className="relative min-h-screen bg-black overflow-hidden" style={{ marginTop: isMobile ? '-20vh' : '20vh' }}>
        {/* Video Hintergrund */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/Video_9.mov" type="video/quicktime" />
          <source src="/Video_9.mov" type="video/mp4" />
          Dein Browser unterstützt das Video-Tag nicht.
        </video>

        {/* Dunkler transparenter Layer */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-10"></div>

        {/* Gradient Verlauf zu schwarz oben */}
        <div 
          className="absolute top-0 left-0 w-full h-96 pointer-events-none z-15"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>

        {/* Gradient Verlauf zu schwarz unten */}
        <div 
          className="absolute bottom-0 left-0 w-full h-96 pointer-events-none z-15"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0) 100%)',
          }}
        ></div>

        {/* Content */}
        <div className="relative z-20 min-h-screen flex items-center justify-center px-4 py-24" style={{ paddingTop: '25vh' }}>
          <div 
            ref={loglineTextRef}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 
              className="text-white mb-8 animate-uneven-pulse"
              style={{
                fontFamily: 'var(--font-macbeth)',
                fontSize: 'clamp(4rem, 12vw, 8rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              THE SHIFT
            </h2>
            
            <p 
              className="text-white text-lg md:text-xl leading-relaxed mb-4"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.01em',
                lineHeight: '1.8',
              }}
            >
              &quot;Eine faszinierende Idee, die manches aus Stranger Things noch einmal deutlich weiterdreht und um eine psychologische Komponente ergänzt, die besonders spannend ist.&quot;
            </p>
            <p 
              className="text-white text-base md:text-lg"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: '1.8',
              }}
            >
              - <span style={{ fontFamily: 'var(--font-playfair-display), serif', fontStyle: 'italic', fontWeight: 700 }}>Benedict Wells</span>
            </p>
          </div>
        </div>
      </section>

      {/* Fade-to-Black Overlay */}
      {isFading && (
        <div 
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{
            background: 'black',
            animation: 'fadeToBlack 1.5s ease-in forwards',
          }}
        />
      )}

      {/* Teaser Video Modal Fullscreen */}
      {showTeaserModal && (
        <div 
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          onClick={handleCloseTeaser}
        >
          {/* Close Button - Rechts oben (immer sichtbar) */}
          <button
            onClick={handleCloseTeaser}
            onMouseDown={(e) => e.stopPropagation()}
            className="absolute top-8 right-8 z-[102] text-white hover:text-gray-300 transition-all duration-200 cursor-pointer opacity-100"
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto',
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Vimeo Video Embed */}
          <div 
            className="relative w-full h-full"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '90vh' }}
          >
            <iframe
              src="https://player.vimeo.com/video/1139640898?h=8b743457b3&autoplay=1"
              className="w-full h-full"
              style={{ aspectRatio: '16/9' }}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="The Shift Teaser"
            ></iframe>
          </div>
        </div>
      )}

      {/* Video Modal Fullscreen */}
      {showVideoModal && (
        <div 
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          onMouseMove={() => {
            // Bei Mausbewegung Controls zeigen und Timer zurücksetzen
            setShowControls(true)
            if (controlsTimeoutRef.current) {
              clearTimeout(controlsTimeoutRef.current)
            }
            // Nach 3 Sekunden Inaktivität ausblenden
            controlsTimeoutRef.current = setTimeout(() => {
              setShowControls(false)
            }, 3000)
          }}
          onMouseLeave={() => {
            // Beim Verlassen sofort ausblenden
            setShowControls(false)
            if (controlsTimeoutRef.current) {
              clearTimeout(controlsTimeoutRef.current)
            }
          }}
        >
          {/* Close Button - Rechts oben (immer sichtbar) */}
          <button
            onClick={handleCloseVideo}
            onMouseDown={(e) => e.stopPropagation()}
            className="absolute top-8 right-8 z-[102] text-white hover:text-gray-300 transition-all duration-200 cursor-pointer opacity-100"
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto',
            }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Hinweis zum Drehen auf Mobile (nur im Portrait-Modus) */}
          {!isLandscape && isMobile && (
            <div 
              className="absolute inset-0 z-[103] bg-black/90 flex flex-col items-center justify-center md:hidden"
              style={{
                pointerEvents: 'auto',
              }}
            >
              <div className="text-center px-8">
                <svg 
                  width="64" 
                  height="64" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="text-white mx-auto mb-4 animate-spin"
                  style={{ animationDuration: '2s' }}
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                <p 
                  className="text-white text-lg font-medium mb-2"
                  style={{
                    fontFamily: 'var(--font-playfair-display), serif',
                    fontStyle: 'italic',
                  }}
                >
                  Bitte drehen Sie Ihr Gerät
                </p>
                <p className="text-white text-sm opacity-80">
                  Für die beste Wiedergabe im Querformat
                </p>
              </div>
            </div>
          )}

          {/* Video */}
          <video
            ref={introVideoRef}
            className={`w-full h-full ${isLandscape || !isMobile ? 'object-contain' : 'object-cover'}`}
            controls={false}
            playsInline
            volume={1.0}
          >
            <source src="/Intro.mp4" type="video/mp4" />
            Dein Browser unterstützt das Video-Tag nicht.
          </video>

          {/* Play/Pause Button - Mitte (nur bei Mausbewegung sichtbar) */}
          <div
            className="absolute inset-0 z-[101] flex items-center justify-center pointer-events-none"
          >
            <button
              onClick={handlePlayPause}
              className={`text-white hover:text-gray-300 transition-all duration-200 hover:scale-110 ${
                showControls ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '50%',
                backdropFilter: 'blur(10px)',
                pointerEvents: showControls ? 'auto' : 'none',
              }}
            >
            {isPlaying ? (
              // Pause Icon
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              // Play Icon
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

