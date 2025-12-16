'use client'

import React, { useEffect, useRef, useState } from 'react'

const FuzzyText = ({
  children,
  fontSize = 'clamp(2rem, 10vw, 10rem)',
  fontWeight = 900,
  fontFamily = 'inherit',
  color = '#fff',
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5
}) => {
  const canvasRef = useRef(null)
  const [isSafari, setIsSafari] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Safari-Erkennung nach dem Mount, um Hydration-Mismatch zu vermeiden
  useEffect(() => {
    setIsMounted(true)
    const userAgent = navigator.userAgent.toLowerCase()
    // Safari-Erkennung: Safari hat "safari" aber nicht "chrome" im User-Agent
    // Chrome hat "chrome" im User-Agent, auch wenn es "safari" enthält
    const isSafariBrowser = /safari/.test(userAgent) && !/chrome/.test(userAgent) && !/chromium/.test(userAgent) && !/edg/.test(userAgent)
    setIsSafari(isSafariBrowser)
  }, [])

  useEffect(() => {
    // Warte bis Component gemountet ist und prüfe Safari
    if (!isMounted || isSafari) return

    let animationFrameId
    let isCancelled = false
    const canvas = canvasRef.current
    if (!canvas) return

    const init = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready
      }
      if (isCancelled) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Resolve CSS variable for fontFamily
      let resolvedFontFamily = fontFamily
      if (fontFamily === 'inherit') {
        resolvedFontFamily = window.getComputedStyle(canvas).fontFamily || 'sans-serif'
      } else if (fontFamily.includes('var(--font-')) {
        // Resolve CSS variable
        const temp = document.createElement('span')
        temp.style.fontFamily = fontFamily
        document.body.appendChild(temp)
        resolvedFontFamily = window.getComputedStyle(temp).fontFamily
        document.body.removeChild(temp)
      }

      const fontSizeStr = typeof fontSize === 'number' ? `${fontSize}px` : fontSize
      let numericFontSize
      if (typeof fontSize === 'number') {
        numericFontSize = fontSize
      } else {
        const temp = document.createElement('span')
        temp.style.fontSize = fontSize
        temp.style.fontFamily = resolvedFontFamily
        document.body.appendChild(temp)
        const computedSize = window.getComputedStyle(temp).fontSize
        numericFontSize = parseFloat(computedSize)
        document.body.removeChild(temp)
      }

      const text = React.Children.toArray(children).join('')

      const offscreen = document.createElement('canvas')
      const offCtx = offscreen.getContext('2d')
      if (!offCtx) return

      offCtx.font = `${fontWeight} ${fontSizeStr} ${resolvedFontFamily}`
      offCtx.textBaseline = 'alphabetic'
      const metrics = offCtx.measureText(text)

      const actualLeft = metrics.actualBoundingBoxLeft ?? 0
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize
      const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2

      const textBoundingWidth = Math.ceil(actualLeft + actualRight)
      const tightHeight = Math.ceil(actualAscent + actualDescent)

      // Device pixel ratio für Retina-Displays und bessere Qualität
      const dpr = window.devicePixelRatio || 1
      // Für Safari verwenden wir einen höheren Multiplikator für bessere Qualität
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      const scaleFactor = isSafari ? Math.max(dpr * 2, 3) : (dpr >= 2 ? dpr * 1.5 : dpr * 2)

      const extraWidthBuffer = 10
      const offscreenWidth = textBoundingWidth + extraWidthBuffer

      // Offscreen Canvas mit höherer Auflösung
      offscreen.width = offscreenWidth * scaleFactor
      offscreen.height = tightHeight * scaleFactor
      
      // Image smoothing für bessere Qualität
      offCtx.imageSmoothingEnabled = true
      offCtx.imageSmoothingQuality = 'high'
      
      offCtx.scale(scaleFactor, scaleFactor)

      const xOffset = extraWidthBuffer / 2
      offCtx.font = `${fontWeight} ${fontSizeStr} ${resolvedFontFamily}`
      offCtx.textBaseline = 'alphabetic'
      offCtx.fillStyle = color
      offCtx.fillText(text, xOffset - actualLeft, actualAscent)

      const horizontalMargin = 50
      const verticalMargin = 0
      const displayWidth = offscreenWidth + horizontalMargin * 2
      const displayHeight = tightHeight + verticalMargin * 2
      
      // Canvas mit höherer Auflösung
      canvas.width = displayWidth * scaleFactor
      canvas.height = displayHeight * scaleFactor
      canvas.style.width = `${displayWidth}px`
      canvas.style.height = `${displayHeight}px`
      
      // Image smoothing für bessere Qualität
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      
      ctx.scale(scaleFactor, scaleFactor)
      ctx.translate(horizontalMargin, verticalMargin)

      const interactiveLeft = horizontalMargin + xOffset
      const interactiveTop = verticalMargin
      const interactiveRight = interactiveLeft + textBoundingWidth
      const interactiveBottom = interactiveTop + tightHeight

      let isHovering = false
      const fuzzRange = 30

      const run = () => {
        if (isCancelled) return
        ctx.clearRect(-fuzzRange, -fuzzRange, offscreenWidth + 2 * fuzzRange, tightHeight + 2 * fuzzRange)
        const intensity = isHovering ? hoverIntensity : baseIntensity
        for (let j = 0; j < tightHeight; j++) {
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange)
          // Zeichne von der hochauflösenden Offscreen-Canvas
          // Da ctx bereits skaliert ist, müssen wir die Quellkoordinaten im skalierten Raum angeben
          ctx.drawImage(
            offscreen,
            0, j * scaleFactor, offscreenWidth * scaleFactor, scaleFactor,
            dx, j, offscreenWidth, 1
          )
        }
        animationFrameId = window.requestAnimationFrame(run)
      }

      run()

      const isInsideTextArea = (x, y) => {
        return x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom
      }

      const handleMouseMove = e => {
        if (!enableHover) return
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        isHovering = isInsideTextArea(x, y)
      }

      const handleMouseLeave = () => {
        isHovering = false
      }

      const handleTouchMove = e => {
        if (!enableHover) return
        e.preventDefault()
        const rect = canvas.getBoundingClientRect()
        const touch = e.touches[0]
        const x = touch.clientX - rect.left
        const y = touch.clientY - rect.top
        isHovering = isInsideTextArea(x, y)
      }

      const handleTouchEnd = () => {
        isHovering = false
      }

      if (enableHover) {
        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('mouseleave', handleMouseLeave)
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
        canvas.addEventListener('touchend', handleTouchEnd)
      }

      const cleanup = () => {
        window.cancelAnimationFrame(animationFrameId)
        if (enableHover) {
          canvas.removeEventListener('mousemove', handleMouseMove)
          canvas.removeEventListener('mouseleave', handleMouseLeave)
          canvas.removeEventListener('touchmove', handleTouchMove)
          canvas.removeEventListener('touchend', handleTouchEnd)
        }
      }

      canvas.cleanupFuzzyText = cleanup
    }

    init()

    return () => {
      isCancelled = true
      window.cancelAnimationFrame(animationFrameId)
      if (canvas && canvas.cleanupFuzzyText) {
        canvas.cleanupFuzzyText()
      }
    }
  }, [children, fontSize, fontWeight, fontFamily, color, enableHover, baseIntensity, hoverIntensity, isMounted, isSafari])

  // Während SSR und vor dem Mount: Canvas rendern (vermeidet Hydration-Mismatch)
  // Nach dem Mount: In Safari normalen Text anzeigen, sonst Canvas-Effekt
  if (isMounted && isSafari) {
    return (
      <span
        style={{
          fontSize: fontSize,
          fontWeight: fontWeight,
          fontFamily: fontFamily === 'inherit' ? 'inherit' : fontFamily,
          color: color,
          display: 'block',
          textAlign: 'center',
        }}
      >
        {children}
      </span>
    )
  }

  // In Chrome und anderen Browsern (oder während SSR): Canvas-Effekt
  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        display: 'block', 
        maxWidth: '100%', 
        height: 'auto', 
        pointerEvents: 'auto', 
        position: 'relative', 
        zIndex: 1,
        imageRendering: 'auto',
        WebkitImageRendering: 'auto'
      }} 
    />
  )
}

export default FuzzyText
