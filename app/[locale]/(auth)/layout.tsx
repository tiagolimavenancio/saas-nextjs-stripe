import Logo from "@/components/logo";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("landing");

  return (
    <section className="flex flex-col items-center justify-center py-40">
      <Link href={"/"}>
        <Logo alt={t("altLogo")} />
      </Link>
      {children}
    </section>
  );
}
