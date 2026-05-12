"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const otherLocale = routing.locales.find((l) => l !== locale) ?? "en-US";

  function switchLocale() {
    const newPathname = pathname.replace(`/${locale}`, `/${otherLocale}`);
    router.push(newPathname);
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLocale}
      className="flex items-center gap-1 text-xs"
    >
      <Globe size={14} />
      {otherLocale.toUpperCase()}
    </Button>
  );
}
