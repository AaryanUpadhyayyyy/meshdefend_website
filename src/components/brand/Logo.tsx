/**
 * MeshDefend Brand Identity
 * Uses official brand assets: LOGOWHITETHEME.png for light mode, LOGOBALCKTHEME.png for dark mode.
 */

interface LogoProps {
  className?: string;
  mono?: boolean;
  style?: React.CSSProperties;
  height?: number;
  size?: number;
  theme?: "light" | "dark" | "auto";
  alt?: string;
}

/**
 * Clean Geometric MeshDefend Double-Chevron Mark
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
      <path
        d="M3 4H10.5L25 18.5V25.5L3 4Z"
        fill={brandOrange}
      />
      <path
        d="M3 13.5H10.5L20 23L29 14H29V21L20 30L3 13.5Z"
        fill={brandOrange}
      />
    </svg>
  );
}

/**
 * Lucide-Style Shield Mesh Mark
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
 * Full MeshDefend Logo with theme-aware image lockups:
 * - LOGOWHITETHEME.png for light mode
 * - LOGOBALCKTHEME.png for dark mode
 * Both assets contain the complete lockup (mark + wordmark).
 */
export function Logo({
  className = "",
  style,
  height = 30,
  mono = false,
  theme = "auto",
  alt = "MeshDefend",
}: LogoProps) {
  // If mono or forced dark mode (e.g., in dark footer)
  if (mono || theme === "dark") {
    return (
      <img
        src="/images/LOGOBALCKTHEME.png"
        alt={alt}
        className={`logo-img logo-img--dark-forced ${className}`}
        style={{
          height,
          width: "auto",
          objectFit: "contain",
          display: "block",
          ...style,
        }}
      />
    );
  }

  // If forced light mode
  if (theme === "light") {
    return (
      <img
        src="/images/LOGOWHITETHEME.png"
        alt={alt}
        className={`logo-img logo-img--light-forced ${className}`}
        style={{
          height,
          width: "auto",
          objectFit: "contain",
          display: "block",
          ...style,
        }}
      />
    );
  }

  // Responsive / CSS theme switching to prevent SSR hydration flash
  return (
    <span
      className={`meshdefend-brand-logo ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        lineHeight: 0,
        ...style,
      }}
    >
      <img
        src="/images/LOGOWHITETHEME.png"
        alt={alt}
        className="logo-img logo-img--light"
        style={{ height, width: "auto", objectFit: "contain" }}
      />
      <img
        src="/images/LOGOBALCKTHEME.png"
        alt={alt}
        className="logo-img logo-img--dark"
        style={{ height, width: "auto", objectFit: "contain" }}
      />
    </span>
  );
}
