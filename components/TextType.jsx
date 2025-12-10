'use client';

import { useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import './TextType.css';

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return;
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout;
    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }
          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }
          setCurrentTextIndex(prev => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText(prev => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(
            () => {
              setDisplayedText(prev => prev + processedText[currentCharIndex]);
              setCurrentCharIndex(prev => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed
          );
        } else if (textArray.length >= 1) {
          if (!loop && currentTextIndex === textArray.length - 1) return;
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete
  ]);

  const shouldHideCursor =
    hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

  // Teile den Text in zentrierten und linksbündigen Teil
  const fullText = textArray[currentTextIndex] || '';
  const lines = fullText.split('\n');
  const centeredEndIndex = lines.findIndex(line => line.startsWith('EXT.'));
  
  const displayedLines = displayedText.split('\n');
  const isInCenteredPart = centeredEndIndex > 0 && displayedLines.length <= centeredEndIndex;
  
  const centeredText = centeredEndIndex > 0 ? lines.slice(0, centeredEndIndex).join('\n') : '';
  const displayedCenteredText = isInCenteredPart ? displayedText : (centeredEndIndex > 0 ? centeredText : '');
  const displayedLeftText = centeredEndIndex > 0 && !isInCenteredPart 
    ? displayedText.split('\n').slice(centeredEndIndex).join('\n')
    : (!isInCenteredPart ? displayedText : '');

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `text-type ${className}`,
      ...props
    },
    <>
      {centeredEndIndex > 0 && (
        <div className="text-center mb-16" style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '0.1em', lineHeight: '1.2', whiteSpace: 'pre-line' }}>
          <span className="text-type__content" style={{ color: getCurrentTextColor() || 'inherit' }}>
            {displayedCenteredText.split('\n').map((line, index, array) => {
              const isTheShift = line.trim() === 'THE SHIFT';
              return (
                <span key={index}>
                  {isTheShift ? (
                    <span style={{ textDecoration: 'underline' }}>{line}</span>
                  ) : (
                    line
                  )}
                  {index < array.length - 1 ? '\n' : ''}
                </span>
              );
            })}
          </span>
          {showCursor && isInCenteredPart && (
            <span
              ref={cursorRef}
              className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`}
            >
              {cursorCharacter}
            </span>
          )}
        </div>
      )}
      {displayedLeftText && (
        <div className="text-left" style={{ fontSize: '1rem', textAlign: 'left', width: '100%' }}>
          <span className="text-type__content" style={{ color: getCurrentTextColor() || 'inherit', display: 'block', textAlign: 'left' }}>
            {displayedLeftText.split('\n').map((line, index, array) => {
              // Erkenne Dialog-Zeilen (ARZTHELFERIN (O.S.) oder ARZTHELFERIN (O.S.) (CONT'D) oder ähnliche)
              const isDialogHeader = /^[A-Z\s]+\([^)]+\)(\s*\([^)]+\))?$/.test(line.trim());
              const isDialogText = index > 0 && /^[A-Z\s]+\([^)]+\)(\s*\([^)]+\))?$/.test(array[index - 1].trim());
              
              if (isDialogHeader || isDialogText) {
                return (
                  <div key={index} style={{ textAlign: 'center' }}>
                    {line}
                    {index < array.length - 1 ? '\n' : ''}
                  </div>
                );
              }
              return <span key={index}>{line}{index < array.length - 1 ? '\n' : ''}</span>;
            })}
          </span>
          {showCursor && !isInCenteredPart && (
            <span
              ref={cursorRef}
              className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`}
            >
              {cursorCharacter}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default TextType;

