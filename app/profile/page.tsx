"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getUser, setUser } from "../lib/storage";

export default function ProfilePage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [partnerFirst, setPartnerFirst] = useState("");
  const [partnerLast, setPartnerLast] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const user = getUser();
    if (!user) { router.push("/login"); return; }
    setAccountNumber(user.accountNumber);
    setEmail(user.email);
    setPhone(user.phone);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPartnerFirst(user.partnerFirstName);
    setPartnerLast(user.partnerLastName);
    setWeddingDate(user.weddingDate);
    setLoaded(true);
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone || !firstName || !lastName || !partnerFirst || !partnerLast || !weddingDate) {
      setError("請填寫所有欄位 Please fill in all fields");
      return;
    }
    const user = getUser();
    if (!user) return;
    setUser({ ...user, phone, firstName, lastName, partnerFirstName: partnerFirst, partnerLastName: partnerLast, weddingDate });
    router.push("/customize");
  }

  if (!loaded) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fff" }}>
      <Header variant="auth" />
      <main className="flex-1 flex flex-col items-center px-6 py-10">
        <h1 className="mb-1 text-center" style={{ fontFamily: "var(--font-noto)", fontSize: "1.8rem", fontWeight: 300, color: "#4A2060" }}>
          個人中心
        </h1>
        <p className="mb-8 text-center" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontWeight: 300, color: "#4A2060", letterSpacing: "0.1em" }}>
          — Profile —
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">

          <ReadonlyField label="賬戶號碼 Account Number" value={accountNumber} note="Format 000001 · Unchangeable" />
          <ReadonlyField label="電郵 Email Account" value={email} />

          <Field label="電話 Phone Number" type="tel" value={phone} onChange={setPhone} placeholder="+852 xxxx xxxx" />
          <Field label="用家名字 User Name" type="text" value={firstName} onChange={setFirstName} placeholder="First name" />
          <Field label="用家姓氏 Last Name" type="text" value={lastName} onChange={setLastName} placeholder="Last name" />
          <Field label="伴侶名字 Partner's Name" type="text" value={partnerFirst} onChange={setPartnerFirst} placeholder="Partner's first name" />
          <Field label="伴侶姓氏 Partner's Last Name" type="text" value={partnerLast} onChange={setPartnerLast} placeholder="Partner's last name" />
          <Field label="婚禮日期 Wedding Date" type="date" value={weddingDate} onChange={setWeddingDate} placeholder="" />

          {error && <p className="text-xs text-center" style={{ color: "#c0392b" }}>{error}</p>}

          <button type="submit" className="w-full py-3 mt-2 rounded-full text-sm tracking-widest" style={{ background: "#4A2060", color: "#F0E2C0", fontFamily: "var(--font-lato)" }}>
            確認 Confirm
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

function Field({ label, type, value, onChange, placeholder }: { label: string; type: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs" style={{ color: "#4A2060", fontFamily: "var(--font-noto)" }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm outline-none"
        style={{ border: "1px solid #DDD", borderRadius: "4px", color: "#4A2060" }}
      />
    </div>
  );
}

function ReadonlyField({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs" style={{ color: "#4A2060", fontFamily: "var(--font-noto)" }}>{label}</label>
      <div className="w-full px-3 py-2 text-sm" style={{ background: "#F5F0FA", borderRadius: "4px", color: "#4A2060" }}>
        {value || "—"}
      </div>
      {note && <p className="text-xs" style={{ color: "#c0392b" }}>{note}</p>}
    </div>
  );
}
