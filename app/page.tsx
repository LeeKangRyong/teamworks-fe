"use client";

import { Main } from "@/pages/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { tokenStorage } from "@/shared/lib/tokenStorage";
import '@/shared/lib/chartSetup';


export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (tokenStorage.hasValidToken()) {
      router.replace('/projects');
    }
  }, [router]);

  return <Main />;
}