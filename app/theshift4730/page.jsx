'use client'

import { useEffect, useRef, useState } from 'react'

export default function TheShiftPage() {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const introVideoRef = useRef(null)
  const video2Ref = useRef(null)
  const container2Ref = useRef(null)
  const video3Ref = useRef(null)
  const video4Ref = useRef(null)
  const [shouldFlicker, setShouldFlicker] = useState(true)
  const [isLastHalfSecond, setIsLastHalfSecond] = useState(false)
  const [shouldFlicker2, setShouldFlicker2] = useState(true)
  const [isLastHalfSecond2, setIsLastHalfSecond2] = useState(false)
  const [isHoveringHannah, setIsHoveringHannah] = useState(false)
  const [isHoveringEmilia, setIsHoveringEmilia] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const heroTextRef = useRef(null)
  const loglineTextRef = useRef(null)
  const synopsisTextRef = useRef(null)
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
          // Finde die zweite Section (Logline-Sektion)
          const sections = document.querySelectorAll('section')
          if (sections.length > 1) {
            sections[1].scrollIntoView({ behavior: 'smooth' })
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

      {/* Vierter Abschnitt - Characters */}
      <section className="relative min-h-screen bg-black overflow-hidden">
        <div className="flex h-screen">
          {/* Linke Seite - Hannah */}
          <div 
            className="relative w-1/2 h-full overflow-hidden cursor-pointer group"
            onMouseEnter={() => {
              setIsHoveringHannah(true)
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
              className="absolute top-0 left-0 w-full h-full object-cover"
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
                className="text-white mb-8 animate-uneven-pulse"
                style={{
                  fontFamily: 'var(--font-macbeth)',
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
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
              className="absolute top-0 left-0 w-full h-full object-cover"
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
                className="text-white mb-8 animate-uneven-pulse"
                style={{
                  fontFamily: 'var(--font-macbeth)',
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
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

