"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getUser, getRSVPs, type RSVP } from "../lib/storage";

export default function DashboardPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [showBlessings, setShowBlessings] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user) { router.push("/login"); return; }
    if (!user.weddingDate) { router.push("/profile"); return; }
    setRsvps(getRSVPs());
    setLoaded(true);
  }, [router]);

  if (!loaded) return null;

  const attending = rsvps.filter((r) => r.attending === "yes");
  const totalGuests = attending.reduce((s, r) => s + (parseInt(r.count) || 0), 0);
  const groomSide = attending.filter((r) => r.side === "groom").reduce((s, r) => s + (parseInt(r.count) || 0), 0);
  const brideSide = attending.filter((r) => r.side === "bride").reduce((s, r) => s + (parseInt(r.count) || 0), 0);
  const totalAmount = rsvps.reduce((s, r) => s + (parseFloat(r.amount) || 0), 0);
  const inviteLink = `${typeof window !== "undefined" ? window.location.origin : ""}/merrymarry/invite/demo`;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fff" }}>
      <Header variant="auth" />
      <main className="flex-1 flex flex-col items-center px-5 py-10">

        <h1 className="mb-1 text-center" style={{ fontFamily: "var(--font-noto)", fontSize: "1.6rem", fontWeight: 300, color: "#4A2060" }}>
          賬戶報告
        </h1>
        <p className="mb-6 text-center" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 300, color: "#4A2060", letterSpacing: "0.1em" }}>
          — Dashboard —
        </p>

        {/* Invite link */}
        <div className="w-full max-w-sm mb-6 p-3 rounded-xl text-center" style={{ background: "#F5F0FA", border: "1px dashed #C9A0DC" }}>
          <p className="text-xs mb-1" style={{ color: "#6B3589", fontFamily: "var(--font-noto)" }}>您的邀請連結 Your Invite Link</p>
          <p className="text-xs break-all mb-2" style={{ color: "#4A2060", fontFamily: "monospace" }}>{inviteLink}</p>
          <button
            onClick={() => navigator.clipboard.writeText(inviteLink)}
            className="text-xs px-3 py-1 rounded-full"
            style={{ background: "#4A2060", color: "#F0E2C0" }}
          >
            複製 Copy
          </button>
        </div>

        {/* Financial section */}
        <div className="w-full max-w-sm mb-4 rounded-xl overflow-hidden" style={{ border: "1px solid #EEE" }}>
          <div className="px-4 py-3" style={{ background: "#F5F0FA" }}>
            <p className="text-xs font-semibold tracking-widest" style={{ color: "#4A2060", fontFamily: "var(--font-noto)" }}>禮金收入</p>
          </div>
          <StatRow label="總禮金 Total Received" value={`HK$${totalAmount.toFixed(0)}`} />
          <StatRow label="待處理禮金 Pending" value="HK$0" dim />
          <StatRow label="已交易到銀行金額 Settled to Bank" value="HK$0" dim />
          <StatRow label="下次處理日期 Next Payout" value="—" dim />
          <div className="px-4 py-3">
            <button className="w-full py-2 rounded-full text-xs tracking-widest" style={{ background: "#F0E2C0", color: "#4A2060", fontFamily: "var(--font-lato)" }}>
              輸出詳細匯款報告 Generate Transaction Details
            </button>
          </div>
        </div>

        {/* Guest section */}
        <div className="w-full max-w-sm mb-4 rounded-xl overflow-hidden" style={{ border: "1px solid #EEE" }}>
          <div className="px-4 py-3" style={{ background: "#F5F0FA" }}>
            <p className="text-xs font-semibold tracking-widest" style={{ color: "#4A2060", fontFamily: "var(--font-noto)" }}>賓客出席</p>
          </div>
          <StatRow label="出席人數 Total Received" value={`${totalGuests}`} />
          <StatRow label="男方賓客人數 Pending" value={`${groomSide}`} />
          <StatRow label="女方賓客人數 Settled to Bank" value={`${brideSide}`} />
          <StatRow label="下次處理日期 Next Payout" value="—" dim />
          <div className="px-4 py-3">
            <button className="w-full py-2 rounded-full text-xs tracking-widest" style={{ background: "#F0E2C0", color: "#4A2060", fontFamily: "var(--font-lato)" }}>
              輸出詳細賓客報告 Generate Transaction Details
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="w-full max-w-sm flex flex-col gap-3">
          <button className="w-full py-3 rounded-full text-sm tracking-widest" style={{ background: "#4A2060", color: "#F0E2C0", fontFamily: "var(--font-lato)" }}>
            總報告 Full Report
          </button>
          <button
            onClick={() => setShowBlessings(!showBlessings)}
            className="w-full py-3 rounded-full text-sm tracking-widest"
            style={{ background: "#F0E2C0", color: "#4A2060", fontFamily: "var(--font-lato)", border: "1px solid #DDD" }}
          >
            賓客祝福 Guest Blessing
          </button>
          <Link href="/customize" className="w-full">
            <button className="w-full py-3 rounded-full text-sm tracking-widest" style={{ background: "#F0E2C0", color: "#4A2060", fontFamily: "var(--font-lato)", border: "1px solid #DDD" }}>
              編輯邀請 Edit Invite
            </button>
          </Link>
        </div>

        {/* Blessings list */}
        {showBlessings && rsvps.length > 0 && (
          <div className="w-full max-w-sm mt-6 flex flex-col gap-3">
            <p className="text-xs font-semibold" style={{ color: "#4A2060", fontFamily: "var(--font-noto)" }}>祝福留言</p>
            {rsvps.filter((r) => r.wishes).map((r) => (
              <div key={r.id} className="p-3 rounded-xl" style={{ background: "#F5F0FA" }}>
                <p className="text-xs font-semibold mb-1" style={{ color: "#4A2060" }}>{r.name}</p>
                <p className="text-xs" style={{ color: "#6B3589" }}>{r.wishes}</p>
              </div>
            ))}
          </div>
        )}
        {showBlessings && rsvps.length === 0 && (
          <p className="mt-6 text-xs" style={{ color: "#999" }}>尚未收到祝福 No blessings yet</p>
        )}
      </main>
      <Footer />
    </div>
  );
}

function StatRow({ label, value, dim }: { label: string; value: string; dim?: boolean }) {
  return (
    <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #F0F0F0" }}>
      <span className="text-xs" style={{ color: "#4A2060", fontFamily: "var(--font-noto)" }}>{label}</span>
      <span className="text-xs font-semibold" style={{ color: dim ? "#AAA" : "#4A2060" }}>{value}</span>
    </div>
  );
}
