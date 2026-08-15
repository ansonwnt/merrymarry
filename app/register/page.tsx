"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { setUser, generateAccountNumber } from "../lib/storage";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password || !confirm) { setError("請填寫所有欄位 Please fill in all fields"); return; }
    if (password !== confirm) { setError("密碼不一致 Passwords do not match"); return; }
    if (password.length < 6) { setError("密碼最少6位 Password must be at least 6 characters"); return; }
    setUser({
      email,
      accountNumber: generateAccountNumber(),
      phone: "", firstName: "", lastName: "",
      partnerFirstName: "", partnerLastName: "", weddingDate: "",
    });
    router.push("/profile");
  }

  function handleGoogle() {
    setUser({
      email: "demo@merrymarry.hk",
      accountNumber: generateAccountNumber(),
      phone: "", firstName: "", lastName: "",
      partnerFirstName: "", partnerLastName: "", weddingDate: "",
    });
    router.push("/profile");
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#fff" }}>
      <Header variant="public" />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <h1 className="mb-1 text-center" style={{ fontFamily: "var(--font-noto)", fontSize: "1.8rem", fontWeight: 300, color: "#4A2060" }}>
          註冊
        </h1>
        <p className="mb-8 text-center" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontWeight: 300, color: "#4A2060", letterSpacing: "0.1em" }}>
          — Join Us —
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-4">
          <Field label="電郵 Email Account" type="email" value={email} onChange={setEmail} />
          <Field label="密碼 Password" type="password" value={password} onChange={setPassword} />
          <Field label="確認密碼 Confirm Password" type="password" value={confirm} onChange={setConfirm} />

          {error && <p className="text-xs text-center" style={{ color: "#c0392b" }}>{error}</p>}

          <button type="submit" className="w-full py-3 mt-2 rounded-full text-sm tracking-widest" style={{ background: "#4A2060", color: "#F0E2C0", fontFamily: "var(--font-lato)" }}>
            註冊 Register
          </button>

          <div className="flex items-center gap-2 my-1">
            <div className="flex-1 h-px" style={{ background: "#DDD" }} />
            <span className="text-xs" style={{ color: "#999" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "#DDD" }} />
          </div>

          <button type="button" onClick={handleGoogle} className="w-full py-3 rounded-full border text-sm flex items-center justify-center gap-2" style={{ borderColor: "#DDD", color: "#4A2060", fontFamily: "var(--font-lato)" }}>
            <GoogleIcon /> Sign in with Google
          </button>
        </form>

        <p className="mt-6 text-xs" style={{ color: "#999" }}>
          已有帳戶？{" "}
          <Link href="/login" style={{ color: "#4A2060" }}>
            登入 Login
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}

function Field({ label, type, value, onChange }: { label: string; type: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs" style={{ color: "#4A2060", fontFamily: "var(--font-noto)" }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm outline-none"
        style={{ border: "1px solid #DDD", borderRadius: "4px", color: "#4A2060" }}
      />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
