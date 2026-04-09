"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthSession } from "@/shared/lib/auth";
import { getSplashContent } from "../services/splashService";
import { SplashView } from "../views/SplashView";

export function SplashController() {
  const router = useRouter();
  const content = getSplashContent();

  useEffect(() => {
    if (getAuthSession()) {
      router.replace("/dashboard");
    }
  }, [router]);

  return <SplashView content={content} />;
}
