import BannerWarning from "@/components/banner-warning";
import PricingCard from "@/components/pricing-card";
import { getTranslations } from "next-intl/server";

export default async function MonthlyBook() {
  const t = await getTranslations("dashboard.bookOfMonth");

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      <BannerWarning text={t("noSubscription")} />
      <PricingCard />
    </>
  );
}
