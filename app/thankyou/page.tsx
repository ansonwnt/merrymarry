"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ThankYouPage() {
  const [ref, setRef] = useState("");

  useEffect(() => {
    const r = Math.random().toString(36).toUpperCase().slice(2, 12);
    setRef(r);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fff" }}>
      <Header variant="guest" />
      <main className="flex-1 flex flex-col items-center px-6 py-12">

        <h1 className="mb-2 text-center" style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.4rem", fontWeight: 300, color: "#4A2060" }}>
          Thank You
        </h1>
        <div className="w-12 h-px mx-auto mb-6" style={{ background: "#4A2060" }} />

        <p className="text-center mb-1" style={{ fontFamily: "var(--font-noto)", fontSize: "0.95rem", color: "#4A2060", lineHeight: 1.8 }}>
          謝謝您的回覆及祝福！非常高興收到您的消息，謝謝您抽空回覆我們！<br />
          幫助我們踏進這重要的人生里程碑！
        </p>
        <p className="text-center mb-8" style={{ fontSize: "0.85rem", color: "#6B3589", lineHeight: 1.8 }}>
          Thank you for taking the time to reply and send us your warm wishes. We truly appreciate it!
        </p>

        {ref && (
          <div className="w-full max-w-xs mb-8 text-center p-4 rounded-lg" style={{ background: "#F5F0FA" }}>
            <p className="text-xs mb-1" style={{ color: "#6B3589", fontFamily: "var(--font-noto)" }}>
              你的交易編號 Your Transaction Reference
            </p>
            <p className="font-mono text-sm font-semibold" style={{ color: "#4A2060" }}>
              {ref}
            </p>
            <p className="text-xs mt-1" style={{ color: "#999" }}>
              賬戶號碼 · Couple Account Number · 0001
            </p>
          </div>
        )}

        {/* Partner promo */}
        <div className="w-full max-w-xs rounded-xl overflow-hidden mb-6" style={{ border: "1px solid #EEE" }}>
          <div className="px-4 pt-4 pb-3">
            <p className="text-xs mb-2 font-semibold" style={{ color: "#4A2060" }}>LUCENTE Jewelry · @lucente</p>
            <p className="text-xs mb-1" style={{ color: "#4A2060" }}>Design Your Own Jewelry</p>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2" style={{ background: "#4A2060", color: "#F0E2C0" }}>
              10% OFF
            </div>
            <p className="text-xs" style={{ color: "#6B3589" }}>
              使用以下優惠碼於結帳時享用折扣 Use the following code at checkout to get!
            </p>
            <div className="mt-2 px-3 py-1 rounded text-center text-sm font-mono font-bold" style={{ background: "#F0E2C0", color: "#4A2060" }}>
              MML2001
            </div>
          </div>
        </div>

        {/* QR section */}
        <div className="w-full max-w-xs text-center mb-8 p-4 rounded-xl" style={{ background: "#F5F0FA" }}>
          <p className="text-xs mb-3" style={{ color: "#6B3589", fontFamily: "var(--font-noto)" }}>
            您的出現令我們的婚禮更圓滿。請掃描 QR code 或點擊連結訪問我們的相冊，送給您一張特別的照片留念。
          </p>
          <p className="text-xs mb-3" style={{ color: "#4A2060" }}>
            Your presence truly perfected our wedding day. Please scan this QR code or open it via your phone to access our photo gallery.
          </p>
          {/* Placeholder QR */}
          <div className="w-24 h-24 mx-auto rounded" style={{ background: "#DDD", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="text-xs" style={{ color: "#999" }}>QR Code</span>
          </div>
        </div>

        <Link
          href="/invite/demo"
          className="text-xs underline"
          style={{ color: "#6B3589", fontFamily: "var(--font-noto)" }}
        >
          ← 返回邀請頁 Back to Invite
        </Link>
      </main>
      <Footer />
    </div>
  );
}
