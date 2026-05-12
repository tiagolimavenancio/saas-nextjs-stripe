import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "./login-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const session = await auth();
  const t = await getTranslations("auth.login");
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
          <LoginForm />
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground mt-3">
        {t("noAccount")}{" "}
        <Link className="text-gray-800 hover:underline" href="/cadastro">
          {t("registerLink")}
        </Link>
        .
      </p>
    </>
  );
}
