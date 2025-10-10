// ScroggyCoin visual component
// Silver circle with greyscale wizard in the center

interface ScroggyCoinProps {
  size?: number; // Size in pixels
  className?: string;
}

export default function ScroggyCoin({ size = 40, className = '' }: ScroggyCoinProps) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Silver coin circle with metallic gradient */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #e8e8e8, #c0c0c0 45%, #a8a8a8 65%, #888888)',
          boxShadow: `
            inset 0 2px 4px rgba(255,255,255,0.6),
            inset 0 -2px 4px rgba(0,0,0,0.3),
            0 4px 8px rgba(0,0,0,0.3),
            0 1px 2px rgba(0,0,0,0.2)
          `,
        }}
      />
      
      {/* Inner ring */}
      <div 
        className="absolute rounded-full"
        style={{
          inset: '8%',
          background: 'radial-gradient(circle at 30% 30%, #f0f0f0, #d0d0d0 45%, #b0b0b0)',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
        }}
      />
      
      {/* Greyscale wizard emoji in center */}
      <div 
        className="relative z-10"
        style={{
          fontSize: size * 0.6,
          filter: 'grayscale(100%)',
          opacity: 0.9,
        }}
      >
        🧙‍♂️
      </div>
      
      {/* Edge shine */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
        }}
      />
    </div>
  );
}

