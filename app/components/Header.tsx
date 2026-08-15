"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { clearUser } from "../lib/storage";
import { useRouter } from "next/navigation";

type HeaderVariant = "public" | "auth" | "guest";

export default function Header({ variant = "public" }: { variant?: HeaderVariant }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleLogout() {
    clearUser();
    router.push("/landing");
  }

  return (
    <>
      <header className="w-full flex items-center justify-between px-4 py-3" style={{ background: "#4A2060" }}>
        <button onClick={() => setOpen(true)} className="p-1" aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F0E2C0" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <Link href="/landing">
          <Logo size="sm" />
        </Link>
      </header>

      {/* Drawer overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 flex flex-col py-8 px-6 gap-6" style={{ background: "#4A2060" }}>
            <div className="flex justify-between items-center mb-2">
              <Logo size="sm" />
              <button onClick={() => setOpen(false)} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F0E2C0" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {(variant === "public" || variant === "guest") && (
              <>
                <NavLink href="/landing" onClick={() => setOpen(false)}>首頁 Home</NavLink>
                <NavLink href="/login" onClick={() => setOpen(false)}>登入 Login</NavLink>
                <NavLink href="/register" onClick={() => setOpen(false)}>註冊 Register</NavLink>
              </>
            )}

            {variant === "auth" && (
              <>
                <NavLink href="/dashboard" onClick={() => setOpen(false)}>賬戶報告 Dashboard</NavLink>
                <NavLink href="/customize" onClick={() => setOpen(false)}>編輯邀請 Customize</NavLink>
                <NavLink href="/profile" onClick={() => setOpen(false)}>個人中心 Profile</NavLink>
                <button
                  onClick={handleLogout}
                  className="text-left text-sm font-light tracking-widest"
                  style={{ color: "#F0E2C0", fontFamily: "var(--font-lato)" }}
                >
                  登出 Logout
                </button>
              </>
            )}
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}

function NavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-sm font-light tracking-widest"
      style={{ color: "#F0E2C0", fontFamily: "var(--font-lato)" }}
    >
      {children}
    </Link>
  );
}
