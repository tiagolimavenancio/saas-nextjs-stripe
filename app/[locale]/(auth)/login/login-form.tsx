"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "next/form";
import loginAction from "./loginAction";
import { useActionState } from "react";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const t = useTranslations("auth.login");

  return (
    <>
      {state?.success === false && (
        <div
          className="text-xs mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">{t("errorPrefix")} </strong>
          <span className="block sm:inline">{state?.message}</span>
        </div>
      )}
      <Form action={formAction}>
        <div>
          <Label>{t("emailLabel")}</Label>
          <Input
            type="email"
            name="email"
            placeholder={t("emailPlaceholder")}
          />
        </div>
        <div>
          <Label>{t("passwordLabel")}</Label>
          <Input
            type="password"
            name="password"
            placeholder={t("passwordPlaceholder")}
          />
        </div>
        <div>
          <Button disabled={isPending} className="w-full mt-6" type="submit">
            {isPending ? t("submittingButton") : t("submitButton")}
          </Button>
        </div>
      </Form>
    </>
  );
}
