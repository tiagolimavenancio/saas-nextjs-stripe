"use server";

import db from "@/lib/db";
import { hashSync } from "bcrypt-ts";
import { getTranslations } from "next-intl/server";

export default async function registerAction(
  _prevState: any,
  formData: FormData,
) {
  const t = await getTranslations("serverActions.register");

  try {
    const entries = Array.from(formData.entries());
    const data = Object.fromEntries(entries) as {
      name: string;
      email: string;
      password: string;
    };

    if (!data.email || !data.name || !data.password) {
      return {
        message: t("fillAllFields"),
        success: false,
      };
    }

    const user = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      return {
        message: t("userAlreadyExists"),
        success: false,
      };
    }

    await db.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashSync(data.password),
      },
    });

    return { success: true, message: t("success") };
  } catch (e) {
    return { message: t("genericError"), success: false };
  }
}
