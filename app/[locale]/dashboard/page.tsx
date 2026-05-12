import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download, BookOpen } from "lucide-react";
import Link from "next/link";
import { fetchSubscriptionByEmail } from "@/lib/stripe";
import { auth } from "@/auth";
import BannerWarning from "@/components/banner-warning";
import PricingCard from "@/components/pricing-card";
import { getTranslations } from "next-intl/server";

export default async function MonthlyBook() {
  const session = await auth();
  const t = await getTranslations("dashboard.bookOfMonth");
  const subscription = await fetchSubscriptionByEmail(
    session?.user?.email ?? "",
  );

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      {subscription && (
        <>
          <div className="bg-white rounded-lg shadow-md p-12 flex items-center justify-center mb-6">
            <BookOpen size={96} className="text-gray-300" />
          </div>
          <Link
            className={cn(
              "flex items-center justify-center gap-4 mt-10",
              buttonVariants(),
            )}
            href="/livro.pdf"
            target="_blank"
          >
            <Download className="h-4 w-4" /> {t("downloadPdf")}
          </Link>
        </>
      )}
      {!subscription && (
        <>
          <BannerWarning text={t("noSubscription")} />
          <PricingCard />
        </>
      )}
    </>
  );
}
