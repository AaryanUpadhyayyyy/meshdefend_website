/**
 * MeshDefend Brand Vector Identity
 * Precision-engineered geometric SVG vectors matching official Wordmark brand assets.
 */

interface LogoProps {
  className?: string;
  mono?: boolean;
  style?: React.CSSProperties;
  size?: number;
}

/**
 * Clean Geometric MeshDefend Double-Chevron Mark
 * Razor-sharp 45° angles, crisp vector geometry (no jagged auto-tracer artifacts).
 */
export function LogoMark({
  className = "",
  mono = false,
  style,
  size = 28,
}: {
  className?: string;
  mono?: boolean;
  style?: React.CSSProperties;
  size?: number;
}) {
  const brandOrange = mono ? "currentColor" : "#f45532";
  return (
    <svg
      className={className}
      style={{ width: size, height: size, flexShrink: 0, ...style }}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Upper angled chevron band */}
      <path
        d="M3 4H10.5L25 18.5V25.5L3 4Z"
        fill={brandOrange}
      />
      {/* Lower chevron band with checkmark corner */}
      <path
        d="M3 13.5H10.5L20 23L29 14H29V21L20 30L3 13.5Z"
        fill={brandOrange}
      />
    </svg>
  );
}

/**
 * Lucide-Style Shield Mesh Mark
 * Pure 24x24 vector grid with 1.75px stroke geometry for a clean modern icon aesthetic.
 */
export function LucideShieldMark({
  size = 24,
  color = "#f45532",
  style,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M7 11.5L10.5 15L17 8.5" />
    </svg>
  );
}

/**
 * Full MeshDefend Logo (Mark + Clean Wordmark)
 */
export function Logo({ className = "", mono = false, style }: LogoProps) {
  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        textDecoration: "none",
        ...style,
      }}
    >
      <LogoMark size={28} mono={mono} />
      <span
        style={{
          fontFamily: "var(--font-body), system-ui, -apple-system, sans-serif",
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: "-0.025em",
          color: mono ? "currentColor" : "var(--ink, #161416)",
          lineHeight: 1,
        }}
      >
        MeshDefend
      </span>
    </div>
  );
}
