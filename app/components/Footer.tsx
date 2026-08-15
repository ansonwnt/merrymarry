export default function Footer() {
  return (
    <footer className="w-full py-4 flex justify-center items-center gap-5" style={{ background: "#4A2060" }}>
      {/* Instagram */}
      <a href="#" aria-label="Instagram">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F0E2C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="#F0E2C0" stroke="none" />
        </svg>
      </a>
      {/* YouTube */}
      <a href="#" aria-label="YouTube">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F0E2C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#F0E2C0" stroke="none" />
        </svg>
      </a>
      {/* LinkedIn */}
      <a href="#" aria-label="LinkedIn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F0E2C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      </a>
      {/* Facebook */}
      <a href="#" aria-label="Facebook">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F0E2C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      </a>
      {/* Email */}
      <a href="mailto:hello@merrymarry.hk" aria-label="Email">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F0E2C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </a>
    </footer>
  );
}
