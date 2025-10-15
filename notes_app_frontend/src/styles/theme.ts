export const theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB",
    secondary: "#F59E0B",
    success: "#F59E0B",
    error: "#EF4444",
    background: "#f9fafb",
    surface: "#ffffff",
    text: "#111827",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    shadow: "rgba(0,0,0,0.08)",
    gradientFrom: "rgba(59,130,246,0.10)",
    gradientTo: "rgba(249,250,251,1.0)",
  },
  radii: {
    sm: "6px",
    md: "10px",
    lg: "14px",
    pill: "999px",
  },
  spacing: (n: number) => `${n * 4}px`,
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.04)",
    md: "0 4px 10px rgba(0,0,0,0.08)",
    lg: "0 10px 25px rgba(0,0,0,0.12)",
  },
  transition: "all 200ms ease",
};
export type Theme = typeof theme;
