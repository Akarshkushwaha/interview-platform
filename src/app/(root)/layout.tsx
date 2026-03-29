"use client";

import Navbar from "@/components/Navbar";
import StreamClientProvider from "@/components/providers/StreamClientProvider";
import { usePathname } from "next/navigation";

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMeetingPage = pathname?.startsWith("/meeting");

  return (
    <StreamClientProvider>
      <div className="min-h-screen">
        {!isMeetingPage && <Navbar />}
        <main className={!isMeetingPage ? "px-4 sm:px-6 lg:px-8" : ""}>{children}</main>
      </div>
    </StreamClientProvider>
  );
}
export default Layout;