"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { getTranslations } from "next-intl/server";

export default async function loginAction(
  _prevState: any,
  formData: FormData,
) {
  const t = await getTranslations("serverActions.login");

  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: true,
      redirectTo: "/dashboard",
    });
  } catch (e: any) {
    if (isRedirectError(e)) {
      throw e;
    }

    if (e.type === "CredentialsSignin") {
      return { success: false, message: t("invalidCredentials") };
    }
    return { success: false, message: t("genericError") };
  }
}
