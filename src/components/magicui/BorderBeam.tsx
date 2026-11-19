import React from "react";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className = "",
  size = 200,
  duration = 12,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#f45532",
  colorTo = "#ff9a7b",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--anchor": `${anchor}%`,
          "--border-width": `${borderWidth}px`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={`border-beam-container ${className}`}
      aria-hidden="true"
    >
      <div className="border-beam-line" />
      <style>{`
        .border-beam-container {
          pointer-events: none;
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border: var(--border-width) solid transparent;
          mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
          mask-clip: padding-box, border-box;
          -webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
          -webkit-mask-clip: padding-box, border-box;
          mask-composite: intersect;
          -webkit-mask-composite: destination-in;
        }

        .border-beam-line {
          position: absolute;
          aspect-ratio: 1 / 1;
          width: var(--size);
          background: linear-gradient(to left, var(--color-from), var(--color-to), transparent);
          offset-anchor: calc(var(--anchor)) 50%;
          offset-path: rect(0 auto auto 0 round var(--size));
          animation: border-beam-anim var(--duration) infinite linear;
          animation-delay: var(--delay);
        }

        @keyframes border-beam-anim {
          0% {
            offset-distance: 0%;
          }
          100% {
            offset-distance: 100%;
          }
        }
      `}</style>
    </div>
  );
}
