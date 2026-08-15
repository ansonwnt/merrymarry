"use client";

import Link from "next/link";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import { useState } from "react";
import { clearUser } from "../lib/storage";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fff", color: "#4A2060" }}>

      {/* Header */}
      <header className="w-full flex items-center justify-between px-4 py-3" style={{ background: "#4A2060" }}>
        <button onClick={() => setMenuOpen(true)} className="p-1" aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F0E2C0" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <Logo size="sm" />
        <div className="w-8" />
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 flex flex-col py-8 px-6 gap-6" style={{ background: "#4A2060" }}>
            <div className="flex justify-between items-center mb-2">
              <Logo size="sm" />
              <button onClick={() => setMenuOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F0E2C0" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            {["登入 Login:/login", "註冊 Register:/register"].map((item) => {
              const [label, href] = item.split(":");
              return (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="text-sm font-light tracking-widest" style={{ color: "#F0E2C0", fontFamily: "var(--font-lato)" }}>
                  {label}
                </Link>
              );
            })}
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setMenuOpen(false)} />
        </div>
      )}

      {/* Hero Login/Register */}
      <section className="flex border-b" style={{ borderColor: "#EEE" }}>
        <Link href="/login" className="flex-1 flex flex-col items-center justify-center py-8 gap-1 transition-colors hover:bg-purple-50">
          <span style={{ fontFamily: "var(--font-noto)", fontSize: "1.3rem", fontWeight: 300, color: "#4A2060" }}>登入</span>
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", fontWeight: 300, color: "#4A2060", letterSpacing: "0.1em" }}>Login</span>
        </Link>
        <div className="w-px" style={{ background: "#EEE" }} />
        <Link href="/register" className="flex-1 flex flex-col items-center justify-center py-8 gap-1 transition-colors hover:bg-purple-50">
          <span style={{ fontFamily: "var(--font-noto)", fontSize: "1.3rem", fontWeight: 300, color: "#4A2060" }}>註冊</span>
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", fontWeight: 300, color: "#4A2060", letterSpacing: "0.1em" }}>Register</span>
        </Link>
      </section>

      {/* About Merry Marry */}
      <Section title="關於我們" titleEn="Merry Marry">
        <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.85rem", lineHeight: 1.9, color: "#4A2060" }}>
          規劃婚禮應該是令人興奮而非繁瑣的過程。然而，許多新人仍花費大量時間管理邀請、收集 RSVP、通過試算表追蹤禮金，並手動管理行政事務。
        </p>
        <p style={{ fontSize: "0.8rem", lineHeight: 1.9, color: "#6B3589", marginTop: "0.75rem" }}>
          Planning a wedding should be exciting, not stressful. Yet many couples still spend countless hours managing invitations, guest lists, tracking gifts through spreadsheets, and manual administration.
        </p>
        <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.85rem", lineHeight: 1.9, color: "#4A2060", marginTop: "0.75rem" }}>
          Merry Marry 的使命是現代化婚禮體驗，為新人提供安全、透明、便捷的平台，讓婚禮籌備更輕鬆，賓客的心意更圓滿。
        </p>
        <p style={{ fontSize: "0.8rem", lineHeight: 1.9, color: "#6B3589", marginTop: "0.75rem" }}>
          Merry Marry was created to modernise the wedding gifting experience. Our mission is to provide couples with a secure, transparent and convenient platform that simplifies wedding planning while giving guests a seamless gifting experience.
        </p>
        <p style={{ fontSize: "0.8rem", lineHeight: 1.9, color: "#6B3589", marginTop: "0.5rem" }}>
          We believe couples should spend their time creating memories, not managing paperwork.
        </p>
      </Section>

      {/* How it Works */}
      <Section title="如何使用" titleEn="How It Works" tinted>
        {STEPS.map((s, i) => (
          <div key={i} className="flex gap-3 mb-5">
            <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "#4A2060", color: "#F0E2C0", fontFamily: "var(--font-lato)" }}>
              {i + 1}
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "#4A2060", fontFamily: "var(--font-lato)" }}>{s.en}</p>
              <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.8rem", color: "#4A2060", lineHeight: 1.7 }}>{s.zh}</p>
              <p style={{ fontSize: "0.78rem", color: "#6B3589", lineHeight: 1.7, marginTop: "0.25rem" }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </Section>

      {/* Why Choose */}
      <Section title="為什麼選擇我們" titleEn="Why Choose Merry Marry">
        <div className="grid grid-cols-1 gap-4">
          {REASONS.map((r, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-xl">{r.icon}</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#4A2060", fontFamily: "var(--font-noto)" }}>{r.zh}</p>
                <p className="text-xs font-semibold mb-1" style={{ color: "#6B3589" }}>{r.en}</p>
                <p style={{ fontSize: "0.78rem", color: "#6B3589", lineHeight: 1.7 }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Fees */}
      <Section title="收費方式" titleEn="Fees" tinted>
        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.85rem", lineHeight: 1.8, color: "#4A2060" }}>
              建立婚禮頁面完全免費。只有在成功收到心意時，才會收取 <strong>4%</strong> 的交易及服務費。
            </p>
            <p style={{ fontSize: "0.78rem", color: "#6B3589", lineHeight: 1.8, marginTop: "0.5rem" }}>
              Creating a wedding page is completely free. A <strong>4%</strong> transaction and service fee applies only to successfully processed online contributions.
            </p>
            <div className="mt-4 flex flex-col gap-1">
              {FEE_ITEMS.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full" style={{ background: "#4A2060" }} />
                  <span style={{ fontSize: "0.78rem", color: "#4A2060" }}>{f}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg" style={{ background: "#F0E2C0" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "#4A2060", fontFamily: "var(--font-noto)" }}>收費示例 Example</p>
              <p className="text-xs" style={{ color: "#4A2060" }}>HK$1,000 → 服務費 Fee: HK$40</p>
              <p className="text-xs" style={{ color: "#4A2060" }}>HK$1,500 → 服務費 Fee: HK$60</p>
            </div>
          </div>
          <div className="shrink-0 flex flex-col items-center justify-center px-4 py-5 rounded-2xl" style={{ background: "#4A2060", minWidth: "72px" }}>
            <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 300, color: "#F0E2C0" }}>Free</span>
            <span style={{ fontSize: "0.5rem", color: "#F0E2C0", letterSpacing: "0.15em", marginTop: "2px" }}>TO CREATE</span>
          </div>
        </div>
      </Section>

      {/* Security */}
      <Section title="安全可靠" titleEn="Security & Trust">
        {SECURITY.map((s, i) => (
          <div key={i} className="mb-4">
            <p className="text-sm font-semibold" style={{ color: "#4A2060", fontFamily: "var(--font-noto)" }}>{s.zh}</p>
            <p style={{ fontSize: "0.78rem", color: "#6B3589", lineHeight: 1.7 }}>{s.desc}</p>
          </div>
        ))}
      </Section>

      {/* Commitment */}
      <Section title="我們的承諾" titleEn="Our Commitment" tinted>
        <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.85rem", lineHeight: 1.9, color: "#4A2060" }}>
          我們致力於提供婚禮籌備的最佳體驗，讓每對新人都能以便捷、安心、可靠的方式，迎接他們人生最重要的時刻。
        </p>
        <p style={{ fontSize: "0.78rem", color: "#6B3589", lineHeight: 1.9, marginTop: "0.75rem" }}>
          We are committed to being Hong Kong's most trusted wedding gifting and wedding management platform, helping every blessing reach the celebration with simplicity, convenience and trust.
        </p>
      </Section>

      {/* CTA */}
      <section className="flex flex-col items-center py-12 px-6">
        <Link href="/register">
          <button className="px-10 py-4 rounded-full text-sm tracking-widest" style={{ background: "#4A2060", color: "#F0E2C0", fontFamily: "var(--font-lato)" }}>
            立即開始 Get Started Today
          </button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}

function Section({ title, titleEn, children, tinted }: { title: string; titleEn: string; children: React.ReactNode; tinted?: boolean }) {
  return (
    <section className="px-5 py-8" style={{ background: tinted ? "#FAF8FC" : "#fff" }}>
      <p style={{ fontFamily: "var(--font-noto)", fontSize: "1.1rem", fontWeight: 300, color: "#4A2060", marginBottom: "2px" }}>{title}</p>
      <p className="mb-5" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 300, color: "#6B3589", letterSpacing: "0.08em" }}>{titleEn}</p>
      <div className="w-8 h-px mb-5" style={{ background: "#4A2060" }} />
      {children}
    </section>
  );
}

const STEPS = [
  { en: "Step 1: Create Your Wedding Page", zh: "第一步：建立您的婚禮頁面", desc: "Create a personalised wedding page with your photo, story, date, venue, schedule and custom gift list." },
  { en: "Step 2: Share Your Digital Invitation", zh: "第二步：分享電子邀請", desc: "Share your wedding page link instantly through WhatsApp, email or social media without printing or postage costs." },
  { en: "Step 3: Manage Guest RSVPs", zh: "第三步：管理賓客 RSVP", desc: "Guests can RSVP directly through your wedding page, with responses automatically organised and tracked." },
  { en: "Step 4: Receive Contributions Securely", zh: "第四步：安全收取心意", desc: "Guests can send wedding contributions securely online. Every contribution is recorded automatically for complete transparency." },
];

const REASONS = [
  { icon: "⏱", zh: "節省時間 Save Time", en: "Save Time", desc: "Eliminate manual guest tracking, spreadsheets and gift record management." },
  { icon: "💸", zh: "減少成本 Reduce Costs", en: "Reduce Costs", desc: "Reduce spending on invitation cards, printing, postage and administration." },
  { icon: "🌿", zh: "環保 Environmentally Friendly", en: "Eco-Friendly", desc: "Reduce paper consumption through digital invitations and online wedding management." },
  { icon: "🔒", zh: "安全可靠 Secure & Reliable", en: "Secure & Reliable", desc: "All transactions are processed through regulated and trusted payment providers using industry-standard security protocols." },
  { icon: "🎁", zh: "婚前收取心意 Receive Contributions Before Your Wedding", en: "Receive Before Wedding", desc: "Wedding platforms allow couples to receive significant gift-in-person expenses. Receiving contributions before the wedding helps couples manage their budget." },
  { icon: "✉️", zh: "方便賓客 Convenient for Every Guest", en: "Convenient for All", desc: "Whether guests are unable to attend, have the opportunity to meet the couple beforehand, or simply wish to send their blessings early, Merry Marry provides a secure and convenient way to contribute online." },
];

const FEE_ITEMS = [
  "Payment processing / 付款處理",
  "Platform operations / 平台運營",
  "Fraud prevention / 欺詐預防",
  "Security monitoring / 安全監控",
];

const SECURITY = [
  { zh: "每一筆心意都值得被安全保護", desc: "Every contribution deserves to be delivered securely. All transactions are processed through regulated and trusted payment providers using industry-standard security protocols." },
  { zh: "手本交易記錄提供透明度和安心感", desc: "Complete transaction records provide transparency and peace of mind for both couples and guests." },
];
