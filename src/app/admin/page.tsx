"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import type { User, Project, Message } from "@/types";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"projects" | "messages">("projects");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    axios
      .get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => {
        if (data.user.role !== "admin") return router.push("/dashboard");
        setUser(data.user);
      })
      .catch(() => router.push("/login"));

    axios
      .get("/api/projects", { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => setProjects(data.projects))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (loading) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-black">
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-900">
        <h1 className="font-display text-sm font-bold text-white">
          ADMIN <span className="text-neon">PANEL</span>
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-zinc-500 text-xs">{user?.name}</span>
          <button onClick={() => router.push("/")} className="text-zinc-600 hover:text-white text-xs">
            الرئيسية
          </button>
          <button onClick={logout} className="text-zinc-600 hover:text-red-400 text-xs">
            خروج
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setTab("projects")}
            className={`text-sm font-medium transition-colors ${tab === "projects" ? "text-white" : "text-zinc-600 hover:text-zinc-400"}`}
          >
            المشاريع ({projects.length})
          </button>
          <button
            onClick={() => setTab("messages")}
            className={`text-sm font-medium transition-colors ${tab === "messages" ? "text-white" : "text-zinc-600 hover:text-zinc-400"}`}
          >
            الرسائل ({messages.length})
          </button>
        </div>

        {tab === "projects" && (
          <div className="space-y-3">
            {projects.map((p: Project) => (
              <div key={p.id} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-white">{p.title}</h3>
                  <span className="text-zinc-500 text-[10px]">{p.status}</span>
                </div>
                <p className="text-zinc-600 text-xs mt-1">{p.description}</p>
              </div>
            ))}
            {projects.length === 0 && <p className="text-zinc-600 text-sm text-center py-10">لا يوجد مشاريع</p>}
          </div>
        )}

        {tab === "messages" && (
          <div className="space-y-3">
            {messages.map((m: Message) => (
              <div key={m.id} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-white">{m.name}</h3>
                  <span className={`text-[10px] ${m.read ? "text-zinc-700" : "text-neon"}`}>{m.read ? "مقروءة" : "جديدة"}</span>
                </div>
                <p className="text-zinc-500 text-xs mt-1">{m.email}</p>
                <p className="text-zinc-600 text-xs mt-1">{m.message}</p>
              </div>
            ))}
            {messages.length === 0 && <p className="text-zinc-600 text-sm text-center py-10">لا يوجد رسائل</p>}
          </div>
        )}
      </div>
    </div>
  );
}
