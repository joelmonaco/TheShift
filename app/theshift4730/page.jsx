'use client'

export default function TheShiftPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* THE SHIFT Titel oben */}
      <div className="pt-8 px-4">
        <h1 
          className="text-white text-center"
          style={{
            fontFamily: 'var(--font-macbeth)',
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            fontWeight: 400,
            letterSpacing: '0.1em',
          }}
        >
          THE SHIFT
        </h1>
      </div>
    </div>
  )
}

