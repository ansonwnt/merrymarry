"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getWedding, addRSVP, DEFAULT_WEDDING, type WeddingConfig, type GiftItem } from "../../lib/storage";

function useCountdown(dateStr: string) {
  const [parts, setParts] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    if (!dateStr) return;
    const target = new Date(dateStr + "T12:00:00");
    function tick() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setParts({ d: 0, h: 0, m: 0, s: 0 }); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setParts({ d, h, m, s });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [dateStr]);
  return parts;
}

export default function InviteClient({ coupleId }: { coupleId: string }) {
  const router = useRouter();
  const [config, setConfig] = useState<WeddingConfig | null>(null);
  const [weddingDate, setWeddingDate] = useState("");

  // RSVP form state
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("yes");
  const [count, setCount] = useState("1");
  const [side, setSide] = useState("groom");
  const [wishes, setWishes] = useState("");
  const [selectedGift, setSelectedGift] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = getWedding();
    const cfg = stored ?? DEFAULT_WEDDING;
    setConfig(cfg);

    // Pull wedding date from localStorage user data
    const raw = localStorage.getItem("mm_user");
    if (raw) {
      const user = JSON.parse(raw);
      setWeddingDate(user.weddingDate ?? "");
    }
  }, [coupleId]);

  const { d, h, m, s } = useCountdown(weddingDate);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name) return;
    const gift = config?.giftList.find((g) => g.id === selectedGift);
    addRSVP({
      name,
      attending,
      count,
      side,
      wishes,
      giftId: selectedGift,
      amount: customAmount || (gift?.price ?? "0"),
    });
    setSubmitted(true);
    setTimeout(() => router.push("/thankyou"), 800);
  }

  if (!config) return null;

  const formattedDate = weddingDate
    ? new Date(weddingDate).toLocaleDateString("zh-HK", { year: "numeric", month: "long", day: "numeric" })
    : "";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fff" }}>
      <Header variant="guest" />

      {/* Hero with background */}
      <div className="relative w-full" style={{ minHeight: "340px" }}>
        {config.bgImage && (
          <img src={config.bgImage} alt="wedding background" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.35 }} />
        )}
        <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.55)" }} />
        <div className="relative flex flex-col items-center px-6 pt-10 pb-8">
          <h1 className="text-center mb-2" style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.2rem", fontWeight: 300, color: "#4A2060", letterSpacing: "0.05em" }}>
            {config.coupleDisplay}
          </h1>
          <p className="text-center text-sm mb-1" style={{ color: "#6B3589" }}>
            With family &amp; friends, we invite you to celebrate our wedding day.
          </p>
          {weddingDate && (
            <p className="text-center font-semibold mb-1" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", color: "#4A2060" }}>
              {new Date(weddingDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}
          {formattedDate && (
            <p className="text-center text-xs mb-2" style={{ fontFamily: "var(--font-noto)", color: "#6B3589" }}>{formattedDate}</p>
          )}
          <p className="text-center text-sm mb-1" style={{ fontFamily: "var(--font-cormorant)", color: "#4A2060" }}>{config.venue}</p>
          <p className="text-center text-xs" style={{ fontFamily: "var(--font-noto)", color: "#6B3589" }}>{config.venueZh}</p>

          {/* Countdown */}
          {weddingDate && (
            <div className="flex gap-3 mt-6">
              {[{ v: d, l: "Days", lz: "天" }, { v: h, l: "Hours", lz: "小時" }, { v: m, l: "Minutes", lz: "分鐘" }, { v: s, l: "Seconds", lz: "秒" }].map((p) => (
                <div key={p.l} className="flex flex-col items-center px-3 py-2 rounded-lg" style={{ background: "rgba(74,32,96,0.08)", minWidth: "52px" }}>
                  <span className="font-bold text-xl" style={{ color: "#4A2060", fontFamily: "var(--font-cormorant)" }}>{p.v}</span>
                  <span className="text-xs" style={{ color: "#6B3589" }}>{p.l}</span>
                  <span className="text-xs" style={{ fontFamily: "var(--font-noto)", color: "#6B3589" }}>{p.lz}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Profile + invite text */}
      <div className="flex flex-col items-center px-6 py-8">
        {config.profilePic ? (
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-md">
            <img src={config.profilePic} alt="couple" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center shadow-md" style={{ background: "#F0E2C0" }}>
            <span className="text-xs text-center" style={{ color: "#4A2060", fontFamily: "var(--font-noto)" }}>新人照片</span>
          </div>
        )}
        <p className="text-center text-sm mb-3" style={{ fontFamily: "var(--font-noto)", color: "#4A2060", lineHeight: 1.9 }}>
          {config.inviteTextZh}
        </p>
        <p className="text-center text-xs" style={{ color: "#6B3589", lineHeight: 1.9 }}>
          {config.inviteText}
        </p>
      </div>

      {/* RSVP */}
      <section className="px-5 py-6" style={{ background: "#FAF8FC" }}>
        <h2 className="text-center mb-1" style={{ fontFamily: "var(--font-noto)", fontSize: "1.3rem", fontWeight: 300, color: "#4A2060" }}>確認出席</h2>
        <p className="text-center mb-5" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", color: "#4A2060", letterSpacing: "0.08em" }}>RSVP</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
          <FormField label="姓名 Name">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-base" placeholder="Your name" required style={inputStyle} />
          </FormField>

          <FormField label="會否出席 Attendance">
            <select value={attending} onChange={(e) => setAttending(e.target.value)} style={inputStyle}>
              <option value="yes">✓ 出席 Attending</option>
              <option value="no">✗ 不出席 Not attending</option>
            </select>
          </FormField>

          {attending === "yes" && (
            <>
              <FormField label="出席人數 Number of Attendance">
                <select value={count} onChange={(e) => setCount(e.target.value)} style={inputStyle}>
                  {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n} 人</option>)}
                </select>
              </FormField>
              <FormField label="男方 / 女方賓客 Guest for">
                <select value={side} onChange={(e) => setSide(e.target.value)} style={inputStyle}>
                  <option value="groom">男方 Groom's Side</option>
                  <option value="bride">女方 Bride's Side</option>
                </select>
              </FormField>
            </>
          )}

          <FormField label="祝福說話 Well-wishes would mean the world">
            <textarea
              value={wishes}
              onChange={(e) => setWishes(e.target.value)}
              rows={3}
              placeholder="Write your blessings here…"
              style={{ ...inputStyle, resize: "none", lineHeight: 1.7 }}
            />
          </FormField>

          {/* Gift list */}
          <div>
            <p className="text-center mb-3" style={{ fontFamily: "var(--font-noto)", fontSize: "1.1rem", fontWeight: 300, color: "#4A2060" }}>禮物清單</p>
            <p className="text-center mb-4" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", color: "#4A2060", letterSpacing: "0.08em" }}>Gift List</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {config.giftList.map((g) => (
                <GiftCard
                  key={g.id}
                  gift={g}
                  selected={selectedGift === g.id}
                  onSelect={() => setSelectedGift(selectedGift === g.id ? "" : g.id)}
                />
              ))}
            </div>
            {selectedGift && (
              <FormField label="心意金額 HKD Contribution Amount">
                <div className="flex gap-2 items-center">
                  <span className="text-sm" style={{ color: "#4A2060" }}>HK$</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder={config.giftList.find((g) => g.id === selectedGift)?.price ?? ""}
                    style={{ ...inputStyle, flex: 1 }}
                  />
                </div>
              </FormField>
            )}
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="w-full py-3 rounded-full text-sm tracking-widest mt-2"
            style={{ background: submitted ? "#AAA" : "#4A2060", color: "#F0E2C0", fontFamily: "var(--font-lato)" }}
          >
            {submitted ? "正在提交… Submitting…" : "送出回覆及祝福 Confirm and Proceed to Gift Transfer"}
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  border: "1px solid #DDD",
  borderRadius: "4px",
  color: "#4A2060",
  fontSize: "0.875rem",
  outline: "none",
  background: "#fff",
};

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs" style={{ color: "#4A2060", fontFamily: "var(--font-noto)" }}>{label}</label>
      {children}
    </div>
  );
}

function GiftCard({ gift, selected, onSelect }: { gift: GiftItem; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex flex-col rounded-xl overflow-hidden text-left"
      style={{
        border: selected ? "2px solid #4A2060" : "1px solid #EEE",
        background: selected ? "#F5F0FA" : "#fff",
        transition: "all 0.15s",
      }}
    >
      <div className="w-full h-24 overflow-hidden" style={{ background: "#F0E2C0" }}>
        {gift.image ? (
          <img src={gift.image} alt={gift.nameEn} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs" style={{ color: "#4A2060" }}>+</span>
          </div>
        )}
      </div>
      <div className="px-2 py-2">
        <p className="text-xs font-semibold" style={{ color: "#4A2060", fontFamily: "var(--font-noto)" }}>{gift.nameZh}</p>
        <p className="text-xs" style={{ color: "#6B3589" }}>{gift.nameEn}</p>
        <p className="text-xs mt-1" style={{ color: "#4A2060" }}>HK${gift.price}</p>
      </div>
    </button>
  );
}
