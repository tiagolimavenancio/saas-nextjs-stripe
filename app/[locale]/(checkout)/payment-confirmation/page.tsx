import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function PaymentConfirmationPage() {
  const t = await getTranslations("payment.confirmation");

  return (
    <Card className="max-w-lg mt-10 text-center">
      <CardContent>
        <CardHeader>
          <ShoppingBag className="text-green-500 mx-auto mb-4 w-12 h-12" />
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <div className="text-gray-700 text-sm">
          <p>{t("message1")}</p>
          <p>{t("message2")}</p>
          <Link
            href="/dashboard"
            className={cn(buttonVariants(), "mt-12")}
          >
            {t("goToDashboard")}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
