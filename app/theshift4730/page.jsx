'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import TextType from '@/components/TextType'

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
  const [isFading, setIsFading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const controlsTimeoutRef = useRef(null)

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

      {/* Explore mit Pfeil - Ganz unten in Hero Section */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group hover:opacity-80 transition-opacity" 
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
              A shattering medical diagnosis swallows the older sister Hannah into The Shift, a sinister parallel universe shaped by her most haunting fears. Driven by love and grief, her younger sister Emilia steps into the same darkness, seeking the truth on a journey that threatens to consume her as well.
            </p>

            {/* Play Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handlePlayFirstMinutes}
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
              Hannah (28) and Emilia (21) are sisters bound by a deep, lifelong connection—yet they couldn&apos;t be more different. Hannah, the confident and charismatic rising film producer on the brink of her big breakthrough, has always pulled her quiet, introverted sister Emilia along in her wake. But when Hannah receives a devastating cancer diagnosis, a trauma she once endured as a child resurfaces, shattering the stability she worked so hard to build.
              <br /><br />
              As overwhelming fear, buried memories, and old wounds resurface, Hannah is suddenly dragged into The Shift: a dark parallel universe where every suppressed terror takes physical form. Though she manages to escape once, the second time she is pulled in, she never returns. In the real world, her body is found—her death ruled a suicide. But Emilia refuses to believe it. Grieving the loss of the sister, Emilia begins searching for answers—and is soon swallowed by The Shift herself.
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
            fontSize: 'clamp(6rem, 20vw, 12rem)',
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
            fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
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
        <div className="flex h-screen relative">
          {/* HOVER HERE Text - nur sichtbar wenn noch nicht gehovert wurde */}
          {!hasHovered && (
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
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
            className="relative w-1/2 h-full overflow-hidden cursor-pointer group"
            onMouseEnter={() => {
              setIsHoveringHannah(true)
              setHasHovered(true)
              if (video3Ref.current) {
                video3Ref.current.play().catch(err => console.error('Video play error:', err))
              }
            }}
            onMouseLeave={() => {
              setIsHoveringHannah(false)
              if (video3Ref.current) {
                video3Ref.current.pause()
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
            <div className="relative z-20 h-full flex flex-col items-center justify-center px-8 text-center">
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
              
              {/* Text - erscheint beim Hover */}
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
                  She projects strength, yet quietly carries fears she never reveals—especially to her younger sister, Emilia, whom she has always fiercely protected. Hannah&apos;s defining tension lies in this contrast: a woman who appears unstoppable, but privately battles the shadows of her past.
                  <br /><br />
                  Played by Eli Riccardi, known from Maxton Hall, Mandy und die Mächte des Bösen, and more.
                </p>
              </div>
            </div>
          </div>

          {/* Rechte Seite - Emilia */}
          <div 
            className="relative w-1/2 h-full overflow-hidden cursor-pointer group"
            onMouseEnter={() => {
              setIsHoveringEmilia(true)
              setHasHovered(true)
              if (video4Ref.current) {
                video4Ref.current.play().catch(err => console.error('Video play error:', err))
              }
            }}
            onMouseLeave={() => {
              setIsHoveringEmilia(false)
              if (video4Ref.current) {
                video4Ref.current.pause()
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
            <div className="relative z-20 h-full flex flex-col items-center justify-center px-8 text-center">
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
              
              {/* Text - erscheint beim Hover */}
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
                  Emilia, 21, is quiet, quirky, and deeply introverted—a true wallflower. With her soft brown hair and gentle eyes, she carries a natural shyness that makes her blend into the background. She still lives in her small hometown, recently starting medical school more out of safety than ambition.
                  <br /><br />
                  Overshadowed her whole life by her confident older sister, Hannah, Emilia relied on her as both protector and anchor. That dependence left Emilia sheltered, with few friends, a strained relationship with her mother, and little sense of her own identity. Defined by her sensitivity and hesitation, Emilia is someone who has never learned to stand on her own—now forced to confront a world, and fears, she&apos;s long avoided.
                  <br /><br />
                  Played by Lina Hüesker, known from Hilfe, ich hab meine Lehrerin geschrumpft, Vaterfreuden and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fünfter Abschnitt - The Mystery of The Shift */}
      <section className="relative min-h-screen bg-black overflow-hidden">
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

        <div className="flex h-screen relative">
          {/* Linke Hälfte - Text */}
          <div 
            ref={mysteryTextRef}
            className="relative w-1/2 h-full flex flex-col justify-center text-left" 
            style={{ 
              paddingLeft: '6rem', 
              paddingRight: '2rem',
            }}
          >
            <h2 
              className="text-white mb-8 animate-uneven-pulse text-left"
              style={{
                fontFamily: 'var(--font-macbeth)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
              }}
            >
              THE MYSTERY<br />OF THE SHIFT
            </h2>
            
            <div className="max-w-2xl">
              <p 
                className="text-white text-base md:text-lg leading-relaxed"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: 400,
                  lineHeight: '1.8',
                }}
              >
                The Shift is a supernatural, distorted reflection of reality—a parallel dimension where a person&apos;s deepest fears and hidden traumas physically manifest. It cannot be entered by choice; it pulls people in when their inner world begins to collapse.
                <br /><br />
                Fueled by raw emotion, The Shift grows stronger with fear and pain, twisting memories and playing with its victims like a predator. Though it feels like a nightmare, everything that happens inside it has real and often devastating consequences in the real world.
              </p>
            </div>
          </div>

          {/* Rechte Hälfte - Video */}
          <div className="relative w-1/2 h-full overflow-hidden">
            {/* Video Hintergrund mit Flackern */}
            <div 
              ref={container5Ref}
              className={`absolute top-0 left-0 w-full h-full z-0 ${shouldFlicker5 ? 'animate-flicker-start' : ''}`}
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
            
            {/* Gradient Verlauf zu schwarz links (nur am linken Rand) */}
            <div 
              className="absolute top-0 left-0 pointer-events-none z-10"
              style={{
                width: '30%',
                height: '100%',
                background: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%)',
              }}
            ></div>
          </div>
        </div>
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
              The Shift combines a warm, old-school coming-of-age aesthetic—echoing films like Stand By Me or What&apos;s Eating Gilbert Grape—with the unsettling, modern horror tone of It Follows and Hereditary. The real world feels nostalgic and grounded, shaped by soft lighting, natural textures, and a timeless small-town atmosphere. Vintage outfits, classic cars, and recurring nods to old music and film reinforce its sense of nostalgia.
              <br /><br />
              In contrast, The Shift presents a distorted, eerie version of reality: muted colors, uncanny stillness, and subtle surrealism.
            </p>
          </div>
        </div>
      </section>

      {/* Siebter Abschnitt - Bilder Galerie */}
      <section className="relative min-h-screen bg-black overflow-visible py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-8">
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
            <div className="relative col-span-4 -mt-4" style={{ aspectRatio: '16/9' }}>
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
            <div className="relative col-span-4 -mt-8" style={{ aspectRatio: '16/9' }}>
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
              <div className="absolute top-0 left-0 w-full" style={{ height: '120vh', transform: 'translateY(75vh)', zIndex: 10 }}>
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
                  className="relative bg-white p-12 shadow-2xl"
                  style={{
                    zIndex: 3,
                    height: '100%',
                    transform: 'rotate(3deg)',
                  }}
                >
                  <div className="max-w-4xl mx-auto">
                    {/* Gesamter Text mit einem einzigen Cursor */}
                    <div 
                      className="typewriter-content"
                      style={{
                        fontFamily: 'var(--font-courier-prime), monospace',
                        fontSize: '0.9rem',
                        lineHeight: '1.8',
                        letterSpacing: '0.02em',
                      }}
                    >
                      <TextType 
                        as="div"
                        text={[`THE SHIFT

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

Das Surren der MRT-Röhre wird allmählich intensiver. Wir sehen den verunsicherten Blick der Arzthelferin hinter dem Computer.`]}
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

          {/* Video */}
          <video
            ref={introVideoRef}
            className="w-full h-full object-contain"
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

