"use client";

import { ReactNode } from "react";

interface Props {
  sidebar: ReactNode;
  children: ReactNode;
}

export default function DashboardLayout({
  sidebar,
  children,
}: Props) {
  return (
    <div className="min-h-screen flex bg-[#F5F9FF]">
      {sidebar}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}