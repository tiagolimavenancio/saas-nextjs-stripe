import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import RegisterForm from "./register-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export default async function RegisterPage() {
  const session = await auth();
  const t = await getTranslations("auth.register");
  if (session) {
    return redirect("/dashboard");
  }

  return (
    <>
      <Card className="max-w-sm w-full rounded-2xl mt-12">
        <CardHeader>
          <h2 className="text-xl font-bold">{t("title")}</h2>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground mt-3">
        {t("hasAccount")}{" "}
        <Link className="text-gray-800 hover:underline" href="/login">
          {t("loginLink")}
        </Link>
        .
      </p>
    </>
  );
}
