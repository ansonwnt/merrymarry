"use client";

import { useEffect, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

type GiftItem = {
  id: string;
  title: string;
  titleZh: string;
  category: string;
  categoryZh: string;
  image: string;
};

type CheckoutData = {
  gift: GiftItem;
  amount: string;
};

const BASE = process.env.NODE_ENV === "production" ? "/merrymarry" : "";

// ── Seed data ──────────────────────────────────────────────────────────────

const GIFTS: GiftItem[] = [
  { id: "1", title: "Dinner on Big Day", titleZh: "婚宴晚餐", category: "Celebration", categoryZh: "慶典", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80" },
  { id: "2", title: "New Home Furniture", titleZh: "新居家具", category: "Home", categoryZh: "家居", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" },
  { id: "3", title: "Honeymoon", titleZh: "蜜月旅行", category: "Honeymoon Fund", categoryZh: "蜜月基金", image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80" },
  { id: "4", title: "Russian Roulette", titleZh: "俄羅斯轉盤", category: "Fun & Games", categoryZh: "玩樂遊戲", image: `${BASE}/russian-roulette.jpg` },
  { id: "5", title: "Feed My Baby", titleZh: "餵飽寶寶", category: "Family", categoryZh: "家庭", image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80" },
];

const WEDDING_DATE = new Date("2026-07-23T12:00:00");

const zh: Record<string, string> = {
  toGo: "倒數",
  giftList: "禮物清單",
  items: "項",
  available: "可選",
  contribute: "贈禮",
  yourName: "姓名",
  phone: "聯絡電話",
  email: "電郵地址",
  message: "給新人的話",
  checkout: "確認送出",
  required: "必填",
  invalidEmail: "電郵格式有誤",
  thankYouTitle: "衷心感謝",
  thankYouBody: "您的心意對 Jacky & Angel 意義深重，他們將盡快與您聯絡。",
  close: "關閉",
  namePlaceholder: "全名",
  phonePlaceholder: "+852 xxxx xxxx",
  emailPlaceholder: "you@example.com",
  messagePlaceholder: "寫點溫馨的話吧…",
  footer: "以愛製作，獻給 Jacky & Angel",
};

// ── Countdown ──────────────────────────────────────────────────────────────

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc() {
      const diff = WEDDING_DATE.getTime() - Date.now();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { en: "Days", zh: "天", value: timeLeft.days },
    { en: "Hours", zh: "時", value: timeLeft.hours },
    { en: "Mins", zh: "分", value: timeLeft.minutes },
    { en: "Secs", zh: "秒", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 py-10 px-5">
      <div className="grid grid-cols-2 gap-3 w-full max-w-[210px]">
        {units.map(({ en, zh: zhLabel, value }) => (
          <div key={en} className="flex flex-col items-center">
            <span
              className="text-3xl font-bold tabular-nums w-full py-3 flex items-center justify-center rounded-xl"
              style={{ background: "rgba(74,32,96,0.07)", color: "#4A2060", fontFamily: "var(--font-lato)" }}
            >
              {String(value).padStart(2, "0")}
            </span>
            <span className="text-[9px] mt-1 tracking-widest uppercase text-center leading-tight" style={{ color: "#9B6CC0" }}>
              {en}<br />
              <span style={{ fontFamily: "var(--font-noto)", letterSpacing: "0.05em" }}>{zhLabel}</span>
            </span>
          </div>
        ))}
      </div>
      <p className="text-[10px] font-semibold tracking-widest uppercase mt-1 text-center" style={{ color: "#9B6CC0" }}>
        To go &nbsp;·&nbsp; <span style={{ fontFamily: "var(--font-noto)" }}>{zh.toGo}</span>
      </p>
    </div>
  );
}

// ── Checkout Modal ─────────────────────────────────────────────────────────

function CheckoutModal({ data, onClose }: { data: CheckoutData; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = zh.required;
    if (!form.phone.trim()) e.phone = zh.required;
    if (!form.email.trim()) e.email = zh.required;
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = zh.invalidEmail;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const fields: { key: keyof typeof form; en: string; zhLabel: string; type: string; placeholder: string }[] = [
    { key: "name", en: "Your Name", zhLabel: zh.yourName, type: "text", placeholder: zh.namePlaceholder },
    { key: "phone", en: "Contact Number", zhLabel: zh.phone, type: "tel", placeholder: zh.phonePlaceholder },
    { key: "email", en: "Email Address", zhLabel: zh.email, type: "email", placeholder: zh.emailPlaceholder },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(30,0,50,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden" style={{ background: "#F0E2C0" }}>
        {/* Header */}
        <div className="px-8 pt-8 pb-5" style={{ background: "#4A2060" }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-xl font-light opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: "#F0E2C0" }}
          >
            ✕
          </button>
          <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "#DFD0A8", opacity: 0.7 }}>
            {data.gift.category}&nbsp;·&nbsp;
            <span style={{ fontFamily: "var(--font-noto)" }}>{data.gift.categoryZh}</span>
          </p>
          <h3 className="text-2xl leading-tight" style={{ color: "#F0E2C0", fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>
            {data.gift.title}
          </h3>
          <p className="text-sm mt-0.5" style={{ color: "#DFD0A8", fontFamily: "var(--font-noto)" }}>
            {data.gift.titleZh}
          </p>
          <p className="mt-2 text-lg font-bold" style={{ color: "#F0E2C0", fontFamily: "var(--font-lato)" }}>
            HKD {Number(data.amount).toLocaleString()}
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          {done ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-4">💜</p>
              <h4 className="text-2xl mb-1" style={{ color: "#4A2060", fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>
                Thank you, {form.name}!
              </h4>
              <p className="text-base mb-3" style={{ color: "#4A2060", fontFamily: "var(--font-noto)" }}>
                {zh.thankYouTitle}，{form.name}！
              </p>
              <p className="text-sm" style={{ color: "#6B3589" }}>
                Your contribution means the world to Jacky &amp; Angel.
              </p>
              <p className="text-sm mt-1" style={{ color: "#6B3589", fontFamily: "var(--font-noto)" }}>
                {zh.thankYouBody}
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-8 py-3 rounded-xl text-sm font-bold transition-opacity hover:opacity-80"
                style={{ background: "#4A2060", color: "#F0E2C0" }}
              >
                Close &nbsp;·&nbsp; <span style={{ fontFamily: "var(--font-noto)" }}>{zh.close}</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {fields.map(({ key, en, zhLabel, type, placeholder }) => (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-xs font-semibold tracking-wide uppercase flex gap-2 items-center" style={{ color: "#9B6CC0" }}>
                    <span>{en}</span>
                    <span className="opacity-50">·</span>
                    <span style={{ fontFamily: "var(--font-noto)", textTransform: "none", letterSpacing: 0 }}>{zhLabel}</span>
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                    className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4A2060] bg-white transition-all"
                    style={{ borderColor: "#DFD0A8", color: "#4A2060", fontFamily: "var(--font-noto)" }}
                  />
                  {errors[key] && <p className="text-xs" style={{ color: "#c0392b", fontFamily: "var(--font-noto)" }}>{errors[key]}</p>}
                </div>
              ))}

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold tracking-wide uppercase flex gap-2 items-center" style={{ color: "#9B6CC0" }}>
                  <span>Message</span>
                  <span className="opacity-50">·</span>
                  <span style={{ fontFamily: "var(--font-noto)", textTransform: "none", letterSpacing: 0 }}>{zh.message}</span>
                </label>
                <textarea
                  rows={3}
                  placeholder={zh.messagePlaceholder}
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-3 text-sm outline-none resize-none focus:border-[#4A2060] bg-white transition-all"
                  style={{ borderColor: "#DFD0A8", color: "#4A2060", fontFamily: "var(--font-noto)" }}
                />
              </div>

              <button
                onClick={() => { if (validate()) setDone(true); }}
                className="w-full py-3 rounded-xl font-bold tracking-wide transition-opacity hover:opacity-80 mt-1"
                style={{ background: "#4A2060", color: "#F0E2C0" }}
              >
                Checkout &nbsp;·&nbsp; <span style={{ fontFamily: "var(--font-noto)", fontWeight: 400 }}>{zh.checkout}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Gift Card ──────────────────────────────────────────────────────────────

function GiftCard({ gift, onContributeClick }: { gift: GiftItem; onContributeClick: (d: CheckoutData) => void }) {
  const [inputVal, setInputVal] = useState("");

  function handleClick() {
    const amt = parseFloat(inputVal);
    if (!amt || amt <= 0) return;
    onContributeClick({ gift, amount: inputVal });
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-md flex flex-col" style={{ background: "#fff" }}>
      <div className="relative h-52 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={gift.image} alt={gift.title} className="w-full h-full object-cover" />
        {gift.id === "1" && (
          <span
            className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: "#F0E2C0", color: "#4A2060" }}
          >
            Main · <span style={{ fontFamily: "var(--font-noto)" }}>主要</span>
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 gap-2">
        {/* Category */}
        <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#9B6CC0" }}>
          {gift.category}&nbsp;
          <span style={{ fontFamily: "var(--font-noto)", textTransform: "none", letterSpacing: "0.05em" }}>· {gift.categoryZh}</span>
        </p>

        {/* Title */}
        <div>
          <h3 className="text-xl leading-tight" style={{ color: "#4A2060", fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
            {gift.title}
          </h3>
          <p className="text-sm mt-0.5" style={{ color: "#6B3589", fontFamily: "var(--font-noto)" }}>
            {gift.titleZh}
          </p>
        </div>

        {/* Contribute */}
        <div className="mt-auto pt-3 flex flex-col gap-2">
          <div className="flex items-center w-full border rounded-xl px-4 py-2" style={{ borderColor: "#DFD0A8" }}>
            <span className="text-xs font-bold mr-2 shrink-0" style={{ color: "#9B6CC0" }}>HKD</span>
            <input
              type="number"
              min="1"
              placeholder="0"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleClick()}
              className="flex-1 outline-none text-sm py-1 bg-transparent"
              style={{ color: "#4A2060" }}
            />
          </div>
          <button
            onClick={handleClick}
            className="w-full py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-80"
            style={{ background: "#4A2060", color: "#F0E2C0" }}
          >
            Contribute &nbsp;·&nbsp; <span style={{ fontFamily: "var(--font-noto)", fontWeight: 400 }}>{zh.contribute}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function Home() {
  const [checkout, setCheckout] = useState<CheckoutData | null>(null);

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="min-h-screen" style={{ background: "rgba(30,0,50,0.35)" }}>
        <div className="flex flex-col items-center px-3 md:px-6 py-16 min-h-screen">

          {/* ── Main Card ── */}
          <div className="w-full max-w-3xl relative mt-20">

            {/* Couple photo */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10">
              <div className="w-32 h-32 rounded-full border-4 overflow-hidden shadow-xl" style={{ borderColor: "#fff" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${BASE}/couple.jpg`} alt="Jacky & Angel" className="w-full h-full object-cover object-top" />
              </div>
            </div>

            <div className="w-full rounded-3xl shadow-2xl overflow-hidden bg-white">

              {/* Names + date */}
              <div className="text-center pt-20 pb-6 px-4 md:px-8">
                <h1
                  className="text-5xl md:text-6xl tracking-wide"
                  style={{ color: "#2A2A2A", fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                >
                  Jacky &amp; Angel
                </h1>
                <p className="text-base font-bold tracking-[0.2em] uppercase mt-6" style={{ color: "#4A2060", fontFamily: "var(--font-lato)" }}>
                  23 July 2026
                </p>
                <p className="text-sm mt-0.5" style={{ color: "#9B6CC0", fontFamily: "var(--font-noto)" }}>
                  二〇二六年七月二十三日
                </p>
              </div>

              {/* Countdown | message — stacked on mobile, side-by-side on md+ */}
              <div className="flex flex-col md:flex-row border-t" style={{ borderColor: "#F0E2C0" }}>
                {/* Countdown */}
                <div className="md:w-56 md:shrink-0 border-b md:border-b-0 md:border-r" style={{ borderColor: "#F0E2C0", background: "#FAF5FF" }}>
                  <Countdown />
                </div>

                {/* Bilingual message */}
                <div className="flex-1 px-6 md:px-8 py-6 md:py-8 flex flex-col gap-5 text-sm leading-relaxed" style={{ color: "#2A2A2A" }}>
                  <div>
                    <p className="mb-2">
                      Having you with us on our big day is already the greatest gift. We are so grateful for every laugh, every memory, and every bit of love you&apos;ve poured into our lives.
                    </p>
                    <p style={{ color: "#6B3589", fontFamily: "var(--font-noto)" }}>
                      能與最愛的人共慶婚禮，對我們而言已是最大的禮物。感謝你們一路以來的愛與支持，這份情誼我們永遠珍惜。
                    </p>
                  </div>

                  <div>
                    <p className="mb-2">
                      For those who&apos;ve asked, we&apos;ve put together a little wish list — from filling our new home, to a honeymoon escape, and even feeding the tiny human we&apos;re planning to bring into the world. 😄
                    </p>
                    <p style={{ color: "#6B3589", fontFamily: "var(--font-noto)" }}>
                      對於詢問禮物的朋友，我們準備了一份心意清單——從新居佈置、蜜月旅行，到迎接新生命的準備，每一份心意我們都感恩珍重。😄
                    </p>
                  </div>

                  <div>
                    <p className="mb-2">
                      No obligation at all, but if you&apos;d like to contribute, we would be over the moon. 💜
                    </p>
                    <p style={{ color: "#6B3589", fontFamily: "var(--font-noto)" }}>
                      完全沒有壓力，但若您有意贈禮，我們將不勝感激。💜
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── Gift Grid ── */}
          <div className="w-full max-w-6xl mt-12">
            <div className="flex items-center justify-between mb-6 px-1">
              <h2 style={{ color: "#fff", fontFamily: "var(--font-cormorant)", fontWeight: 300 }} className="text-3xl">
                Gift List &nbsp;
                <span className="text-xl" style={{ fontFamily: "var(--font-noto)", fontWeight: 300 }}>· {zh.giftList}</span>
              </h2>
              <span />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {GIFTS.map((gift) => (
                <GiftCard key={gift.id} gift={gift} onContributeClick={setCheckout} />
              ))}
            </div>
          </div>

          {/* ── Footer ── */}
          <p className="mt-12 mb-4 text-sm text-center" style={{ color: "rgba(255,255,255,0.5)" }}>
            Made with love for Jacky &amp; Angel · 23 July 2026
            <br />
            <span style={{ fontFamily: "var(--font-noto)" }}>{zh.footer} · 二〇二六年七月二十三日</span>
          </p>

        </div>
      </div>

      {checkout && <CheckoutModal data={checkout} onClose={() => setCheckout(null)} />}
    </main>
  );
}
