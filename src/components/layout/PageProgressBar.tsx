// atlist1f/src/components/layout/PageProgressBar.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "@/styles/nprogress.css";

NProgress.configure({ showSpinner: false });

export default function PageProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {}, []);

  return null;
}
