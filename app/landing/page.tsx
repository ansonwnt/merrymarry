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

      {/* Section 1: 美滿嫁期 */}
      <Section label="美滿嫁期 Merry Marry">
        <ZhPara>將傳統人情化繁為簡<br />電子請帖、RSVP 管理及網上收禮金，一個平台輕鬆完成。</ZhPara>
        <ZhPara>告別繁瑣的婚禮行政工作。透過美滿嫁期，新人可建立專屬婚禮頁面、發送電子請帖、管理賓客回覆及安全收取網上禮金，讓婚禮籌備更簡單、更高效。</ZhPara>
        <EnPara>Say goodbye to wedding administration. With Merry Marry, couples can create a personalised wedding page, send digital invitations, manage RSVPs and receive wedding contributions securely online — all in one place.</EnPara>
      </Section>

      {/* Section 2: 關於我們 */}
      <Section label="關於我們 About Us">
        <ZhPara>婚禮是人生最重要的時刻之一，但籌備過程往往充滿繁瑣的行政工作。由印製請帖、統計賓客名單、跟進 RSVP 回覆，到婚宴當天處理禮金及記錄收款，傳統婚禮流程既耗時亦容易出現遺漏。</ZhPara>
        <EnPara>Planning a wedding should be exciting, not stressful. Yet many couples still spend countless hours managing invitations, guest lists, RSVP responses and wedding gift records through spreadsheets, messaging apps and manual administration.</EnPara>
        <ZhPara>美滿嫁期的成立，源於我們相信婚禮管理可以更簡單、更現代化。我們希望透過科技，讓新人能夠以更方便、更透明及更環保的方式管理婚禮事宜，同時讓親友送上祝福變得更加輕鬆。</ZhPara>
        <EnPara>Merry Marry was created to modernise the wedding gifting experience. Our mission is to provide couples with a secure, transparent and convenient platform that simplifies wedding planning while giving guests a seamless gifting experience.</EnPara>
        <ZhPara>我們相信，新人應該把時間留給人生最重要的時刻，而不是花在行政工作上。</ZhPara>
        <EnPara>We believe couples should spend their time creating memories, not managing paperwork.</EnPara>
      </Section>

      {/* Section 3: How It Works */}
      <Section label="如何運作 How It Works">
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
      <Section label="為何選擇美滿嫁期 Why Choose Merry Marry">
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
            <p className="mb-2" style={{ fontFamily: "var(--font-noto)", fontSize: "0.82rem", color: "#4A2060", lineHeight: 1.85 }}>
              建立婚禮頁面<strong>完全免費</strong>。
            </p>
            <EnPara>Creating a wedding page is completely free.</EnPara>

            <div className="mt-3 mb-1">
              <ZhPara>無需支付：</ZhPara>
              {["開戶費", "設定費", "月費", "年費"].map((t) => (
                <p key={t} style={{ fontFamily: "var(--font-noto)", fontSize: "0.82rem", color: "#4A2060", lineHeight: 1.85 }}>{t}</p>
              ))}
              <div className="mt-2">
                <EnPara>There are:</EnPara>
                {["No setup fees", "No monthly subscriptions", "No annual fees"].map((t) => (
                  <p key={t} style={{ fontSize: "0.78rem", color: "#6B3589", lineHeight: 1.85 }}>{t}</p>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <ZhPara>只有成功收取網上禮金時，平台才會收取 4% 交易及服務費。</ZhPara>
              <EnPara>A 4% transaction and service fee applies only to successfully processed online contributions.</EnPara>
            </div>

            <div className="mt-3">
              <ZhPara>此費用包括：</ZhPara>
              {["支付處理費用", "平台營運及維護", "交易管理系統", "防欺詐及安全監控"].map((t) => (
                <p key={t} style={{ fontFamily: "var(--font-noto)", fontSize: "0.82rem", color: "#4A2060", lineHeight: 1.85 }}>{t}</p>
              ))}
              <div className="mt-2">
                <EnPara>This fee covers:</EnPara>
                {["Payment processing", "Platform operations", "Transaction management", "Fraud prevention and security monitoring"].map((t) => (
                  <p key={t} style={{ fontSize: "0.78rem", color: "#6B3589", lineHeight: 1.85 }}>{t}</p>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg" style={{ background: "#F5F0FA" }}>
              <p className="text-xs font-semibold mb-2" style={{ fontFamily: "var(--font-noto)", color: "#4A2060" }}>收費例子 Example</p>
              <div className="flex flex-col gap-2">
                {[
                  ["賓客送出禮金：HK$1,000", "Guest Contribution: HK$1,000"],
                  ["平台交易及服務費（4%）：HK$40", "Transaction & Service Fee (4%): HK$40"],
                  ["新人實收金額：HK$960", "Amount Received by Couple: HK$960"],
                ].map(([zh, en]) => (
                  <div key={zh}>
                    <p style={{ fontFamily: "var(--font-noto)", fontSize: "0.8rem", color: "#4A2060" }}>{zh}</p>
                    <p style={{ fontSize: "0.75rem", color: "#6B3589" }}>{en}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3" style={{ fontFamily: "var(--font-noto)", fontSize: "0.8rem", color: "#4A2060" }}>除上述費用外，並無任何隱藏收費或額外提現費用。</p>
              <p style={{ fontSize: "0.75rem", color: "#6B3589" }}>There are no hidden charges or additional withdrawal fees.</p>
            </div>
          </div>

          {/* Free badge */}
          <div className="shrink-0 flex flex-col items-center justify-center px-3 py-6 rounded-2xl self-start mt-6" style={{ background: "#4A2060", minWidth: "56px" }}>
            <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 300, color: "#F0E2C0", writingMode: "vertical-rl", letterSpacing: "0.15em" }}>Free</span>
          </div>
        </div>
      </Section>

      {/* Section 6: Security & Trust */}
      <Section label="安全與信任 Security & Trust">
        <ZhPara>每一份祝福都值得被安全地傳遞。</ZhPara>
        <EnPara>Every contribution deserves to be delivered securely.</EnPara>
        <ZhPara>所有交易均透過受監管及可信賴的支付服務供應商處理，並採用業界標準加密技術保障資料安全。</ZhPara>
        <EnPara>All transactions are processed through regulated and trusted payment providers using industry-standard security protocols.</EnPara>
        <ZhPara>平台提供完整交易記錄及收款紀錄，讓新人及賓客均可安心查閱。</ZhPara>
        <EnPara>Complete transaction records provide transparency and peace of mind for both couples and guests.</EnPara>
      </Section>

      {/* Section 7: Our Commitment */}
      <Section label="我們的承諾 Our Commitment">
        <ZhPara>我們致力讓婚禮回歸幸福本質，減少繁瑣行政工作，讓新人能夠專注享受人生最重要的時刻。</ZhPara>
        <EnPara>We are committed to making wedding planning simpler, more transparent and more enjoyable for modern couples.</EnPara>
        <ZhPara>美滿嫁期希望成為香港最值得信賴的婚禮禮金及婚禮管理平台，讓每一份祝福都能更簡單地傳遞。</ZhPara>
        <EnPara>Merry Marry aims to become Hong Kong's most trusted wedding gifting and wedding management platform, helping every blessing reach its destination with simplicity, convenience and trust.</EnPara>
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
    titleZh: "第一步：建立專屬婚禮頁面",
    titleEn: "Step 1: Create Your Wedding Page",
    descZh: "建立專屬婚禮網站，加入婚禮日期、地點、流程安排、婚照及新人故事，打造屬於您們的婚禮專頁。",
    descEn: "Create a personalised wedding page with your wedding details, schedule, photos and story as a couple.",
  },
  {
    titleZh: "第二步：發送電子請帖",
    titleEn: "Step 2: Share Your Digital Invitation",
    descZh: "透過 WhatsApp、電郵或社交媒體分享婚禮頁面及電子請帖，無需印刷及郵寄傳統請帖。",
    descEn: "Share your wedding page and digital invitation instantly through WhatsApp, email or social media without printing or postage costs.",
  },
  {
    titleZh: "第三步：管理 RSVP 回覆",
    titleEn: "Step 3: Manage Guest RSVPs",
    descZh: "親友可直接於婚禮頁面確認出席情況，系統會自動整理賓客回覆及出席紀錄。",
    descEn: "Guests can RSVP directly through your wedding page, with responses automatically organised and tracked.",
  },
  {
    titleZh: "第四步：安全收取禮金",
    titleEn: "Step 4: Receive Contributions Securely",
    descZh: "賓客可透過安全的網上支付方式送上禮金及祝福。所有交易均會即時記錄，方便新人查閱及管理。",
    descEn: "Guests can send wedding contributions securely online. Every contribution is recorded automatically for complete transparency.",
  },
];

const REASONS = [
  {
    titleZh: "節省時間",
    titleEn: "Save Time",
    descZh: "無需逐一統計 RSVP、管理賓客名單或手動整理禮金記錄。",
    descEn: "Eliminate manual guest tracking, spreadsheets and gift record management.",
  },
  {
    titleZh: "節省成本",
    titleEn: "Reduce Costs",
    descZh: "減少請帖印刷、郵寄及行政成本，讓婚禮預算更有效運用。",
    descEn: "Reduce spending on invitation cards, printing, postage and administration.",
  },
  {
    titleZh: "支持環保",
    titleEn: "Environmentally Friendly",
    descZh: "透過電子請帖及數碼化管理流程，減少紙張浪費及不必要的印刷物料。",
    descEn: "Reduce paper consumption through digital invitations and online wedding management.",
  },
  {
    titleZh: "安全可靠",
    titleEn: "Secure & Reliable",
    descZh: "所有交易均透過可信賴的支付合作夥伴處理，並設有完整電子記錄。",
    descEn: "Every transaction is processed through trusted payment partners and recorded digitally.",
  },
  {
    titleZh: "提前收取祝福",
    titleEn: "Receive Contributions Before Your Wedding",
    descZh: "婚禮籌備期間需要支付大量訂金及前期開支。透過美滿嫁期，新人可於婚禮前提早收到部分禮金，讓婚禮資金安排更具彈性。",
    descEn: "Wedding planning often requires significant upfront expenses. Receiving contributions before the wedding helps couples manage their budget and cash flow more effectively.",
  },
  {
    titleZh: "方便每一位親友",
    titleEn: "Convenient for Every Guest",
    descZh: "無論未能出席婚禮、未有時間與新人見面，或希望提早送上祝福，親友都可透過美滿嫁期安全地送上禮金，讓每一份心意準時送達。",
    descEn: "Whether guests are unable to attend the wedding, don't have the opportunity to meet the couple beforehand, or simply wish to send their blessings early, Merry Marry provides a secure and convenient way to contribute online.",
  },
];

