import { auth } from "@/auth";
import { fetchSubscriptionByEmail } from "@/lib/stripe";
import { Check } from "lucide-react";
import PaymentButton from "./payment-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { getTranslations } from "next-intl/server";

export default async function PricingCard() {
  const session = await auth();
  const t = await getTranslations("pricing");
  const tLanding = await getTranslations("landing");

  let subscription = null;

  if (session) {
    const email = session?.user?.email;
    subscription = await fetchSubscriptionByEmail(email ?? "");
  }

  return (
    <Card className="w-[350px] text-left md:mt-20 mt-10">
      <CardHeader>
        <CardTitle>{t("cardTitle")}</CardTitle>
        <CardDescription>{t("cardDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold mb-8 mt-4">
          R$29
          <span className="font-normal text-muted-foreground text-lg">
            {t("perMonth")}
          </span>{" "}
        </p>
        <ul>
          <li className="flex gap-2 text-muted-foreground">
            <Check className="w-4 text-green-600" />
            {tLanding("featureOneBook")}
          </li>
          <li className="flex gap-2 text-muted-foreground">
            <Check className="w-4 text-green-600" />
            {tLanding("featureCuration")}
          </li>
          <li className="flex gap-2 text-muted-foreground">
            <Check className="w-4 text-green-600" />
            {tLanding("featureUnlimited")}
          </li>
          <li className="flex gap-2 text-muted-foreground">
            <Check className="w-4 text-green-600" />
            {tLanding("featureCancel")}
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        {!subscription && (
          <PaymentButton isLoggedIn={!!session} className="w-full">
            {t("subscribe")}
          </PaymentButton>
        )}
      </CardFooter>
    </Card>
  );
}
