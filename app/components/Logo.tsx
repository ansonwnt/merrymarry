type LogoProps = {
  size?: "sm" | "md" | "lg";
  color?: string;
};

export default function Logo({ size = "md", color = "#C9A84C" }: LogoProps) {
  const sizes = {
    sm: { main: "1.4rem", sub: "0.42rem", zh: "0.4rem" },
    md: { main: "1.9rem", sub: "0.52rem", zh: "0.48rem" },
    lg: { main: "2.6rem", sub: "0.65rem", zh: "0.6rem" },
  };
  const s = sizes[size];
  return (
    <div className="flex flex-col items-center leading-none" style={{ color }}>
      <span style={{ fontFamily: "var(--font-cormorant)", fontSize: s.main, fontWeight: 300, letterSpacing: "0.08em" }}>
        M<span style={{ fontSize: "0.85em" }}>囍</span>M
      </span>
      <span style={{ fontFamily: "var(--font-lato)", fontSize: s.sub, letterSpacing: "0.3em", fontWeight: 400, marginTop: "2px" }}>
        MERRY MARRY
      </span>
      <span style={{ fontFamily: "var(--font-noto)", fontSize: s.zh, letterSpacing: "0.2em", fontWeight: 300, marginTop: "1px" }}>
        天長地久
      </span>
    </div>
  );
}
