import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchSubscriptionByEmail } from "@/lib/stripe";
import { CreditCard, XCircle } from "lucide-react";
import Form from "next/form";
import cancelSubscriptionAction from "./cancel-subscription-action";
import BannerWarning from "@/components/banner-warning";
import PricingCard from "@/components/pricing-card";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function MySubscription() {
  const session = await auth();
  const t = await getTranslations("dashboard.mySubscription");
  let subscription = null;
  if (session?.user?.email) {
    subscription = await fetchSubscriptionByEmail(session?.user?.email);
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      {subscription && (
        <div className="flex gap-10">
          <PlanCard subscription={subscription} />
          <ActionCard subscription={subscription} />
        </div>
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

async function PlanCard({ subscription }: { subscription: any }) {
  const t = await getTranslations("dashboard.mySubscription");

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>{t("detailsTitle")}</CardTitle>
        <CardDescription>{t("detailsDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">{t("plan")}</span>
            <span>{subscription.plan.nickname}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t("status")}</span>
            <span className="text-green-600">{subscription.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t("nextPayment")}</span>
            <span>
              {new Date(
                subscription.current_period_end * 1000,
              ).toLocaleDateString("pt-BR")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t("amount")}</span>
            <span>
              {(subscription.plan.amount / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t("cycle")}</span>
            <span>{subscription.plan.interval}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

async function ActionCard({ subscription }: { subscription: any }) {
  const t = await getTranslations("dashboard.mySubscription");

  return (
    <Card className="w-full max-w-sm h-full">
      <CardHeader>
        <CardTitle>{t("actionsTitle")}</CardTitle>
        <CardDescription>{t("actionsDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Link
            target="_blank"
            href={process.env.STRIPE_CUSTOMER_PORTAL_URL ?? ""}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <CreditCard className="mr-2 h-5 w-5 text-gray-400" />{" "}
            {t("updatePayment")}
          </Link>
          <Form action={cancelSubscriptionAction}>
            <input
              type="hidden"
              name="subscriptionId"
              value={subscription.id}
            />
            <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              <XCircle className="mr-2 h-5 w-5" /> {t("cancelSubscription")}
            </button>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
