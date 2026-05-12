"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import registerAction from "./registerAction";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Form from "next/form";

const initialState = { message: "", success: false };

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );
  const router = useRouter();
  const t = useTranslations("auth.register");

  useEffect(() => {
    if (state?.success) {
      router.push("/login");
    }
  }, [state, router]);

  return (
    <>
      {state?.success === false && state?.message && (
        <div
          className="text-xs mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">{t("errorPrefix")}</strong>
          <span className="block sm:inline">{state?.message}</span>
        </div>
      )}
      {state?.success === true && (
        <div
          className="text-xs mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">{t("successPrefix")}</strong>
          <span className="block sm:inline">{state?.message}</span>
        </div>
      )}
      <Form action={formAction}>
        <div>
          <Label>{t("nameLabel")}</Label>
          <Input type="text" name="name" placeholder={t("namePlaceholder")} />
        </div>
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
