"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import type { User, Project } from "@/types";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    axios
      .get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => setUser(data.user))
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

  const statusColor = (s: string) => {
    const map: Record<string, string> = {
      pending: "bg-yellow-900 text-yellow-300",
      "in-progress": "bg-blue-900 text-blue-300",
      completed: "bg-green-900 text-green-300",
    };
    return map[s] || "bg-zinc-800 text-zinc-400";
  };

  if (loading) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-black">
      {/* الهيدر */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-900">
        <div>
          <h1 className="font-display text-sm font-bold text-white">
            TEK<span className="text-neon">NOVA</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-zinc-500 text-xs">{user?.name}</span>
          <button onClick={() => router.push("/")} className="text-zinc-600 hover:text-white text-xs transition-colors">
            الرئيسية
          </button>
          <button onClick={logout} className="text-zinc-600 hover:text-red-400 text-xs transition-colors">
            تسجيل خروج
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="font-display text-2xl font-bold text-white mb-2">
          مرحبًا، <span className="text-neon">{user?.name}</span>
        </h2>
        <p className="text-zinc-600 text-sm mb-10">لوحة تحكم المشاريع</p>

        {/* المشاريع */}
        {projects.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-600 text-sm mb-4">لا يوجد مشاريع بعد</p>
            <button
              onClick={() => router.push("/#quote")}
              className="bg-white text-black px-5 py-2 rounded-xl text-sm font-semibold hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all"
            >
              ابدأ مشروعك الآن
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((p: Project) => (
              <div
                key={p.id}
                className="p-5 rounded-xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-base font-bold text-white">{p.title}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${statusColor(p.status)}`}>
                    {p.status === "pending" ? "قيد المراجعة" : p.status === "in-progress" ? "قيد التنفيذ" : "مكتمل"}
                  </span>
                </div>
                <p className="text-zinc-500 text-xs">{p.description}</p>
                {p.budget && <p className="text-zinc-600 text-[10px] mt-2">الميزانية: ${p.budget}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
