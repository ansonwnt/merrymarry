"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getUser, getWedding, setWedding, DEFAULT_WEDDING, type GiftItem, type WeddingConfig } from "../lib/storage";

const BG_PRESETS = [
  { label: "Floral", url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80" },
  { label: "Garden", url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80" },
  { label: "Beach", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80" },
  { label: "Classic", url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80" },
];

export default function CustomizePage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [config, setConfig] = useState<WeddingConfig>(DEFAULT_WEDDING);
  const [weddingDate, setWeddingDate] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user) { router.push("/login"); return; }
    const stored = getWedding();
    const initial = stored ?? {
      ...DEFAULT_WEDDING,
      coupleDisplay: user.firstName && user.partnerFirstName ? `${user.firstName} & ${user.partnerFirstName}` : DEFAULT_WEDDING.coupleDisplay,
    };
    setConfig(initial);
    setWeddingDate(user.weddingDate);
    setLoaded(true);
  }, [router]);

  function updateGift(id: string, field: keyof GiftItem, value: string) {
    setConfig((c) => ({
      ...c,
      giftList: c.giftList.map((g) => (g.id === id ? { ...g, [field]: value } : g)),
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setWedding(config);
    setSaved(true);
    setTimeout(() => { router.push("/dashboard"); }, 1200);
  }

  if (!loaded) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fff" }}>
      <Header variant="auth" />
      <main className="flex-1 flex flex-col items-center px-5 py-8">

        <h1 className="mb-1 text-center" style={{ fontFamily: "var(--font-noto)", fontSize: "1.5rem", fontWeight: 300, color: "#4A2060" }}>
          編輯邀請
        </h1>
        <p className="mb-6 text-center" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 300, color: "#4A2060", letterSpacing: "0.1em" }}>
          — Customize Invite —
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-6">

          {/* Couple display name */}
          <FormSection title="新人名稱 Couple Names">
            <EditField label="顯示名稱 Display Name" value={config.coupleDisplay} onChange={(v) => setConfig((c) => ({ ...c, coupleDisplay: v }))} placeholder="Name & Name" />
          </FormSection>

          {/* Background */}
          <FormSection title="背景圖片 Background">
            <div className="flex gap-2 flex-wrap mb-3">
              {BG_PRESETS.map((p) => (
                <button
                  key={p.url}
                  type="button"
                  onClick={() => setConfig((c) => ({ ...c, bgImage: p.url }))}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    background: config.bgImage === p.url ? "#4A2060" : "#F0E2C0",
                    color: config.bgImage === p.url ? "#F0E2C0" : "#4A2060",
                    border: "1px solid #DDD",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <EditField label="或自訂 URL Custom URL" value={config.bgImage} onChange={(v) => setConfig((c) => ({ ...c, bgImage: v }))} placeholder="https://..." />
            {config.bgImage && (
              <div className="mt-2 rounded-lg overflow-hidden h-24 w-full" style={{ background: "#EEE" }}>
                <img src={config.bgImage} alt="bg preview" className="w-full h-full object-cover" />
              </div>
            )}
          </FormSection>

          {/* Profile pic */}
          <FormSection title="新人照片 Profile Photo">
            <EditField label="圖片 URL Image URL" value={config.profilePic} onChange={(v) => setConfig((c) => ({ ...c, profilePic: v }))} placeholder="https://..." />
            {config.profilePic && (
              <div className="mt-2 w-20 h-20 rounded-full overflow-hidden mx-auto" style={{ background: "#EEE" }}>
                <img src={config.profilePic} alt="profile" className="w-full h-full object-cover" />
              </div>
            )}
          </FormSection>

          {/* Venue */}
          <FormSection title="婚禮詳情 Event Details">
            <EditField label="場地 Venue (English)" value={config.venue} onChange={(v) => setConfig((c) => ({ ...c, venue: v }))} placeholder="Venue name" />
            <EditField label="場地（中文）Venue (Chinese)" value={config.venueZh} onChange={(v) => setConfig((c) => ({ ...c, venueZh: v }))} placeholder="場地名稱" />
            <div className="flex flex-col gap-1">
              <label className="text-xs" style={{ color: "#4A2060", fontFamily: "var(--font-noto)" }}>婚禮日期 Wedding Date</label>
              <div className="px-3 py-2 text-sm rounded" style={{ background: "#F5F0FA", color: "#4A2060" }}>{weddingDate || "—"}</div>
              <p className="text-xs" style={{ color: "#999" }}>在個人中心更改 Change in Profile settings</p>
            </div>
          </FormSection>

          {/* Invite text */}
          <FormSection title="邀請內文 Invitation Text">
            <TextAreaField label="英文 English" value={config.inviteText} onChange={(v) => setConfig((c) => ({ ...c, inviteText: v }))} rows={4} />
            <TextAreaField label="中文 Chinese" value={config.inviteTextZh} onChange={(v) => setConfig((c) => ({ ...c, inviteTextZh: v }))} rows={4} />
          </FormSection>

          {/* Gift list */}
          <FormSection title="禮物清單 Gift List">
            {config.giftList.map((g, i) => (
              <div key={g.id} className="mb-4 p-3 rounded-xl" style={{ background: "#FAF8FC", border: "1px solid #EEE" }}>
                <p className="text-xs font-semibold mb-2" style={{ color: "#4A2060" }}>Item {i + 1}</p>
                <EditField label="英文名稱 Name (English)" value={g.nameEn} onChange={(v) => updateGift(g.id, "nameEn", v)} placeholder="Gift name" />
                <div className="mt-2">
                  <EditField label="中文名稱 Name (Chinese)" value={g.nameZh} onChange={(v) => updateGift(g.id, "nameZh", v)} placeholder="禮物名稱" />
                </div>
                <div className="mt-2">
                  <EditField label="建議金額 HKD Amount" value={g.price} onChange={(v) => updateGift(g.id, "price", v)} placeholder="1000" />
                </div>
                <div className="mt-2">
                  <EditField label="圖片 URL Image URL" value={g.image} onChange={(v) => updateGift(g.id, "image", v)} placeholder="https://..." />
                </div>
                {g.image && (
                  <div className="mt-2 rounded-lg overflow-hidden h-20 w-full" style={{ background: "#EEE" }}>
                    <img src={g.image} alt={g.nameEn} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            ))}
          </FormSection>

          {saved ? (
            <div className="w-full py-3 rounded-full text-sm text-center tracking-widest" style={{ background: "#D4EDDA", color: "#155724" }}>
              已儲存！正在跳轉… Saved! Redirecting…
            </div>
          ) : (
            <button type="submit" className="w-full py-3 rounded-full text-sm tracking-widest" style={{ background: "#4A2060", color: "#F0E2C0", fontFamily: "var(--font-lato)" }}>
              確認邀請設計，繼續登記收款銀行帳號 Confirm and Proceed to Fund Collection Set Up
            </button>
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold tracking-widest" style={{ color: "#4A2060", fontFamily: "var(--font-noto)", borderBottom: "1px solid #EEE", paddingBottom: "6px" }}>{title}</p>
      {children}
    </div>
  );
}

function EditField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs" style={{ color: "#4A2060", fontFamily: "var(--font-noto)" }}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm outline-none"
        style={{ border: "1px solid #DDD", borderRadius: "4px", color: "#4A2060" }}
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, rows }: { label: string; value: string; onChange: (v: string) => void; rows: number }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs" style={{ color: "#4A2060", fontFamily: "var(--font-noto)" }}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-3 py-2 text-sm outline-none resize-none"
        style={{ border: "1px solid #DDD", borderRadius: "4px", color: "#4A2060", lineHeight: 1.7 }}
      />
    </div>
  );
}
