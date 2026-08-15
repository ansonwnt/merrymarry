"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import { setUser, setWedding, generateAccountNumber } from "../lib/storage";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  function handleDemo() {
    setUser({
      email: "demo@merrymarry.hk",
      accountNumber: generateAccountNumber(),
      phone: "+852 9999 8888",
      firstName: "Jacky",
      lastName: "Chan",
      partnerFirstName: "Angel",
      partnerLastName: "Lee",
      weddingDate: "2026-07-23",
    });
    setWedding({
      coupleDisplay: "Jacky & Angel",
      venue: "The Peninsula Hong Kong",
      venueZh: "香港半島酒店",
      bgImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
      profilePic: "",
      inviteText:
        "Having you with us on one of the most important days of our lives is truly the greatest gift we could ask for. Thank you for your love, support and friendship throughout our journey.",
      inviteTextZh:
        "能有你出席我們最重要的一天，已是我們最大的幸福。感謝你一直以來對我們的關懷與珍惜，我們誠摯地邀請您與我們共同分享我們的喜悅。",
      giftList: [
        { id: "1", nameEn: "Banquet", nameZh: "喜宴", price: "1000", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80" },
        { id: "2", nameEn: "Honeymoon", nameZh: "蜜月旅行", price: "2000", image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80" },
        { id: "3", nameEn: "Custom 1", nameZh: "自訂 1", price: "500", image: "" },
        { id: "4", nameEn: "Custom 2", nameZh: "自訂 2", price: "500", image: "" },
      ],
    });
    router.push("/dashboard");
  }

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
      </header>

      {/* Drawer */}
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
            <NavItem href="/login" onClick={() => setMenuOpen(false)}>登入 Login</NavItem>
            <NavItem href="/register" onClick={() => setMenuOpen(false)}>註冊 Register</NavItem>
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setMenuOpen(false)} />
        </div>
      )}

      {/* Login / Register hero */}
      <div className="flex" style={{ borderBottom: "1px solid #E8E8E8" }}>
        <Link href="/login" className="flex-1 flex flex-col items-center justify-center py-10 gap-1" style={{ borderRight: "1px solid #E8E8E8" }}>
          <span style={{ fontFamily: "var(--font-noto)", fontSize: "1.5rem", fontWeight: 300, color: "#4A2060" }}>登入</span>
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 300, color: "#4A2060", letterSpacing: "0.08em" }}>Login</span>
        </Link>
        <Link href="/register" className="flex-1 flex flex-col items-center justify-center py-10 gap-1">
          <span style={{ fontFamily: "var(--font-noto)", fontSize: "1.5rem", fontWeight: 300, color: "#4A2060" }}>註冊</span>
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 300, color: "#4A2060", letterSpacing: "0.08em" }}>Register</span>
        </Link>
      </div>

      {/* Section 1: 美麗婚禮 */}
      <Section label="美麗婚禮 Merry Marry">
        <ZhPara>使用我們的先進功能，告別人事行政工作，一個平台幫到底。</ZhPara>
        <ZhPara>告別煩瑣的婚禮行政工作。使用美麗婚禮，新人可建立專屬婚禮頁面，發送電子邀請，管理賓客回覆及安全在線收取禮金，讓婚禮籌備更加輕鬆愉快。</ZhPara>
        <EnPara>Say goodbye to wedding administration. With Marry, couples can create a personalized wedding page, send digital invitations, manage RSVPs and receive wedding contributions securely online — all in one place.</EnPara>
      </Section>

      {/* Section 2: 關於我們 */}
      <Section label="關於我們 About Us">
        <ZhPara>規劃婚禮應是令人興奮而非繁瑣的過程。但是，很多新人仍花費大量時間進行行政工作，包括填寫試算表、追蹤 RSVP 回覆、安排處理及統計禮金，甚至無法全心享受訂婚的喜悅。</ZhPara>
        <EnPara>Planning a wedding should be exciting, not stressful. Yet many couples still spend countless hours managing invitations, guest lists, tracking gifts through spreadsheets, messaging apps and manual administration.</EnPara>
        <ZhPara>美麗婚禮的使命是：通過現代化的婚禮管理，讓婚禮策劃更輕鬆、嘉賓的祝福更美好。我們的使命是為新人提供安全、透明且方便的平台，簡化婚禮規劃的同時，為賓客提供無縫的贈禮體驗。</ZhPara>
        <EnPara>Merry Marry was created to modernise the wedding gifting experience. Our mission is to provide couples with a secure, transparent and convenient platform that simplifies wedding planning while giving guests a seamless gifting experience.</EnPara>
        <ZhPara>我們相信，新人應把時間和精力投放在人生重要的時刻。</ZhPara>
        <EnPara>We believe couples should spend their time creating memories, not managing paperwork.</EnPara>
      </Section>

      {/* Section 3: How It Works */}
      <Section label="如何使用 How It Works">
        {STEPS.map((s, i) => (
          <div key={i} className="flex gap-4 mb-5">
            <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5" style={{ background: "#4A2060", color: "#F0E2C0" }}>
              {i + 1}
            </div>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ fontFamily: "var(--font-noto)", color: "#4A2060" }}>{s.titleZh}</p>
              <p className="text-xs mb-1 font-medium" style={{ color: "#6B3589" }}>{s.titleEn}</p>
              <ZhPara>{s.descZh}</ZhPara>
              <EnPara>{s.descEn}</EnPara>
            </div>
          </div>
        ))}
      </Section>

      {/* Section 4: Why Choose */}
      <Section label="為何選擇美麗婚禮 Why Choose Merry Marry">
        {REASONS.map((r, i) => (
          <div key={i} className="mb-4">
            <p className="text-sm font-semibold mb-1" style={{ fontFamily: "var(--font-noto)", color: "#4A2060" }}>{r.titleZh}</p>
            <p className="text-xs font-medium mb-1" style={{ color: "#6B3589" }}>{r.titleEn}</p>
            <ZhPara>{r.descZh}</ZhPara>
            <EnPara>{r.descEn}</EnPara>
          </div>
        ))}
      </Section>

      {/* Section 5: Fees */}
      <Section label="收費方式 Fees">
        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <ZhPara>建立婚禮頁面完全免費。</ZhPara>
            <EnPara>Creating a wedding page is completely free.</EnPara>

            <div className="mt-3 mb-1">
              <ZhPara>沒有以下費用：</ZhPara>
              {["無需安裝費", "無月費訂閱", "無年費"].map((t) => (
                <div key={t} className="flex gap-2 items-center ml-2">
                  <span style={{ color: "#4A2060" }}>·</span>
                  <ZhPara>{t}</ZhPara>
                </div>
              ))}
              <div className="mt-1">
                {["No setup fees", "No monthly subscriptions", "No annual fees"].map((t) => (
                  <div key={t} className="flex gap-2 items-center ml-2">
                    <span style={{ color: "#6B3589" }}>·</span>
                    <EnPara>{t}</EnPara>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <ZhPara>只有在成功處理心意後，平台會收取 4% 至業及服務費。</ZhPara>
              <EnPara>A 4% transaction and service fee applies only to successfully processed online contributions.</EnPara>
            </div>

            <div className="mt-3">
              <ZhPara>此費用包括：</ZhPara>
              {FEE_ITEMS.map((f) => (
                <div key={f.zh} className="flex gap-2 items-center ml-2">
                  <span style={{ color: "#4A2060" }}>·</span>
                  <span style={{ fontFamily: "var(--font-noto)", fontSize: "0.8rem", color: "#4A2060" }}>{f.zh}</span>
                </div>
              ))}
              <div className="mt-1">
                <EnPara>This fee covers:</EnPara>
                {FEE_ITEMS.map((f) => (
                  <div key={f.en} className="flex gap-2 items-center ml-2">
                    <span style={{ color: "#6B3589" }}>·</span>
                    <EnPara>{f.en}</EnPara>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg" style={{ background: "#F5F0FA" }}>
              <p className="text-xs font-semibold mb-2" style={{ fontFamily: "var(--font-noto)", color: "#4A2060" }}>收費示例 Example</p>
              <div className="flex flex-col gap-1">
                {[
                  ["賓客金額 (HK)", "Guest Contribution: HK$1,000"],
                  ["交易及服務費 (4%): HK$40", "Transaction & Service Fee (4%): HK$40"],
                  ["新人實收金額: HK$960", "Amount Received by Couple: HK$960"],
                ].map(([zh, en]) => (
                  <div key={zh}>
                    <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.75rem", color: "#4A2060" }}>{zh}</p>
                    <p style={{ fontSize: "0.72rem", color: "#6B3589" }}>{en}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2" style={{ fontFamily: "var(--font-noto)", fontSize: "0.72rem", color: "#4A2060" }}>以上費用之外，沒有任何隱藏費或額外附加費用。</p>
              <p style={{ fontSize: "0.7rem", color: "#6B3589" }}>There are no hidden charges or additional withdrawal fees.</p>
            </div>
          </div>

          {/* Free badge */}
          <div className="shrink-0 flex flex-col items-center justify-center px-3 py-6 rounded-2xl self-start mt-6" style={{ background: "#4A2060", minWidth: "56px" }}>
            <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 300, color: "#F0E2C0", writingMode: "vertical-rl", letterSpacing: "0.15em" }}>Free</span>
          </div>
        </div>
      </Section>

      {/* Section 6: Security & Trust */}
      <Section label="安全及信任 Security & Trust">
        <ZhPara>每一筆心意都值得被安全保護。</ZhPara>
        <EnPara>Every contribution deserves to be delivered securely.</EnPara>
        <ZhPara>所有交易均透過監管且受信任的支付提供商處理，使用業界標準的安全協定。</ZhPara>
        <EnPara>All transactions are processed through regulated and trusted payment providers using industry-standard security protocols.</EnPara>
        <ZhPara>手本交易記錄提供透明度和安心感，讓新人及賓客都安心。</ZhPara>
        <EnPara>Complete transaction records provide transparency and peace of mind for both couples and guests.</EnPara>
      </Section>

      {/* Section 7: Our Commitment */}
      <Section label="我們的承諾 Our Commitment">
        <ZhPara>我們正在努力讓婚禮籌備更加簡單、更加愉快，讓每一位新人都能以輕鬆、安心和信任的方式，迎接人生最重要的時刻。</ZhPara>
        <EnPara>We are committed to making wedding planning simpler, more transparent and more enjoyable for modern couples.</EnPara>
        <ZhPara>美麗婚禮正在成為全港最受信賴的婚禮禮金管理及婚禮管理平台，讓每一份祝福都能以便捷、安心及信任的方式，送達婚禮當天。</ZhPara>
        <EnPara>Merry Marry aims to be Hong Kong's most trusted wedding gifting and wedding management platform, helping every blessing reach its destination with simplicity, convenience and trust.</EnPara>
      </Section>

      {/* CTA */}
      <div className="flex flex-col items-center py-12 px-6 gap-4">
        <Link href="/register">
          <button className="px-12 py-4 rounded-full text-sm tracking-widest" style={{ background: "#4A2060", color: "#F0E2C0", fontFamily: "var(--font-lato)", fontSize: "1rem" }}>
            立即開始 Get Started Today
          </button>
        </Link>
        <button
          onClick={handleDemo}
          className="px-10 py-3 rounded-full text-sm tracking-widest"
          style={{ background: "transparent", color: "#4A2060", border: "1px solid #4A2060", fontFamily: "var(--font-lato)" }}
        >
          🎯 體驗示範 Demo Mode
        </button>
      </div>

      <Footer />
    </div>
  );
}

/* ── Shared primitives ── */

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="px-5 py-7" style={{ borderBottom: "1px solid #F0EEF4" }}>
      <p className="mb-4 text-xs font-semibold" style={{ fontFamily: "var(--font-noto)", color: "#4A2060", letterSpacing: "0.05em" }}>{label}</p>
      {children}
    </section>
  );
}

function ZhPara({ children }: { children: React.ReactNode }) {
  return <p className="mb-1" style={{ fontFamily: "var(--font-noto)", fontSize: "0.82rem", color: "#4A2060", lineHeight: 1.85 }}>{children}</p>;
}

function EnPara({ children }: { children: React.ReactNode }) {
  return <p className="mb-2" style={{ fontSize: "0.78rem", color: "#6B3589", lineHeight: 1.85 }}>{children}</p>;
}

function NavItem({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className="text-sm font-light tracking-widest" style={{ color: "#F0E2C0", fontFamily: "var(--font-lato)" }}>
      {children}
    </Link>
  );
}

/* ── Data ── */

const STEPS = [
  {
    titleZh: "第一步：建立婚禮頁面",
    titleEn: "Step 1: Create Your Wedding Page",
    descZh: "建立充滿婚禮細節、加入婚禮日期、時間、地點、場地照片、婚禮故事及按自己的要求。",
    descEn: "Create a personalised wedding page with your wedding details, schedule, photos and story as a couple.",
  },
  {
    titleZh: "第二步：發送電子邀請",
    titleEn: "Step 2: Share Your Digital Invitation",
    descZh: "透過 WhatsApp、電郵或社交媒體分享你的婚禮頁面及電子請柬，輕鬆且節省印製和郵費費用。",
    descEn: "Share your wedding page and digital invitation instantly through WhatsApp, email or social media without printing or postage costs.",
  },
  {
    titleZh: "第三步：管理 RSVP 回覆",
    titleEn: "Step 3: Manage Guest RSVPs",
    descZh: "賓客可直接透過婚禮頁面進行回覆，系統會自動整理賓客的出席及出席安排。",
    descEn: "Guests can RSVP directly through your wedding page, with responses automatically organised and tracked.",
  },
  {
    titleZh: "第四步：安全收取禮金",
    titleEn: "Step 4: Receive Contributions Securely",
    descZh: "賓客可以通過安全的在線平台上傳心意金額及祝福，所有交易記錄均會自動記錄，方便夫婦查閱及管理。",
    descEn: "Guests can send wedding contributions securely online. Every contribution is recorded automatically for complete transparency.",
  },
];

const REASONS = [
  {
    titleZh: "節省時間 Save Time",
    titleEn: "Save Time",
    descZh: "無需進行繁瑣的 RSVP，系統幫助追蹤及管理賓客回覆。",
    descEn: "Eliminate manual guest tracking, spreadsheets and gift record management.",
  },
  {
    titleZh: "降低成本 Reduce Costs",
    titleEn: "Reduce Costs",
    descZh: "減少花費於邀請卡等印刷和郵費費用，讓婚禮策劃更省錢。",
    descEn: "Reduce spending on invitation cards, printing, postage and administration.",
  },
  {
    titleZh: "友善環境 Environmentally Friendly",
    titleEn: "Environmentally Friendly",
    descZh: "透過電子邀請取代傳統紙質邀請，節省資源和不必要的印刷物。",
    descEn: "Reduce paper consumption through digital invitations and online wedding management.",
  },
  {
    titleZh: "安全可靠 Secure & Reliable",
    titleEn: "Secure & Reliable",
    descZh: "所有交易均通過可靠的第三方支付系統完成，確保安全可靠。",
    descEn: "Every transaction is processed through trusted payment partners and recorded digitally.",
  },
  {
    titleZh: "於你婚前收取禮金 Receive Contributions Before Your Wedding",
    titleEn: "Receive Contributions Before Your Wedding",
    descZh: "婚禮策劃讓你在婚前取得心意禮金，透過收取禮金讓你清楚了解及時估算婚禮的費用及現金流量。",
    descEn: "Wedding planning often requires significant upfront expenses. Receiving contributions before the wedding helps couples manage their budget and cash flow more effectively.",
  },
  {
    titleZh: "方便每一位賓客 Convenient for Every Guest",
    titleEn: "Convenient for Every Guest",
    descZh: "無論是到場出席婚禮，未能提前認識新人，還是只想送上祝福的賓客，均可方便地在線送禮。",
    descEn: "Whether guests are unable to attend the wedding, don't have the opportunity to meet the couple beforehand, or simply wish to send their blessings early, Merry Marry provides a secure and convenient way to contribute online.",
  },
];

const FEE_ITEMS = [
  { zh: "付款手續費", en: "Payment processing" },
  { zh: "平台運營費用", en: "Platform maintenance" },
  { zh: "交易管理費", en: "Transaction management" },
  { zh: "欺詐預防及安全監控", en: "Fraud prevention and security monitoring" },
];
