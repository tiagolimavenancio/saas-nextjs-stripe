import PricingCard from "@/components/pricing-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { getTranslations } from "next-intl/server";
import { Check, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.svg";
import womanImg from "../assets/woman.svg";
import { auth } from "@/auth";
import { fetchSubscriptionByEmail } from "@/lib/stripe";
import PaymentButton from "@/components/payment-button";
import LocaleSwitcher from "@/components/locale-switcher";

export default async function Home() {
  const session = await auth();
  const t = await getTranslations();
  let subscription = null;
  if (session) {
    const email = session?.user?.email;
    subscription = await fetchSubscriptionByEmail(email ?? "");
  }

  return (
    <main>
      <section className="container mx-auto text-center pb-20 px-2 md:px-0">
        <nav className="flex justify-between items-center py-4">
          <Image src={logo} alt={t("landing.altLogo")} />
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MenuIcon size={24} className="md:hidden cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-4">
                <DropdownMenuLabel>{t("nav.menu")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <a href={"/#funcionamento"}>
                  <DropdownMenuItem>{t("nav.howItWorks")}</DropdownMenuItem>
                </a>
                <DropdownMenuItem>
                  <Link href={"#preco"}>{t("nav.price")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/login">
                    <Button variant={"bg-white"}>{t("nav.login")}</Button>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="items-center gap-1 hidden md:flex">
              <Link href={"#funcionamento"}>
                <Button variant={"link"}>{t("nav.howItWorks")}</Button>
              </Link>
              <Link href={"#preco"}>
                <Button variant={"link"}>{t("nav.price")}</Button>
              </Link>
              {session && (
                <Link href="/dashboard">
                  <Button variant={"bg-white"}>{t("nav.dashboard")}</Button>
                </Link>
              )}
              {!session && (
                <Link href="/login">
                  <Button variant={"bg-white"}>{t("nav.login")}</Button>
                </Link>
              )}
            </div>
          </div>
        </nav>
        <h1 className="md:text-6xl text-2xl font-bold mt-8 md:mt-16">
          {t("landing.heroTitle")}
        </h1>
        <p className="text-gray-500 mt-4 text-sm md:text-xl max-w-3xl mx-auto">
          {t("landing.heroSubtitle")}
        </p>
        <form className="md:mt-16 mt-10">
          <div className="flex gap-2 justify-center">
            <Input
              placeholder={t("landing.emailPlaceholder")}
              type="text"
              className="max-w-sm border-gray-300 border"
            />
            <Button>{t("landing.subscribeNow")}</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {t("landing.disclaimer")}
          </p>
        </form>
      </section>
      <section className="bg-white md:py-16 py-8" id="funcionamento">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            {t("landing.howItWorksTitle")}
          </h2>
          <div className="mx-24 xl:mx-80 flex flex-col md:flex-row items-center justify-between">
            <Image
              src={womanImg}
              alt={t("landing.altWoman")}
              className="max-w-xs"
            />
            <ul className="md:text-2xl text-lg text-muted-foreground space-y-4 md:space-y-6 flex-shrink-0">
              <li className="flex items-center justify-between gap-4">
                {t("landing.featureOneBook")}{" "}
                <Check size={24} className="text-green-600" />
              </li>
              <li className="flex items-center justify-between gap-4">
                {t("landing.featureCuration")}{" "}
                <Check size={24} className="text-green-600" />
              </li>
              <li className="flex items-center justify-between gap-4">
                {t("landing.featureCancel")}{" "}
                <Check size={24} className="text-green-600" />
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="md:py-16 py-8 text-center px-2" id="preco">
        <h2 className="md:text-6xl text-2xl font-bold md:mt-16">
          {t("landing.pricingTitle")}
        </h2>
        <p className="text-gray-500 mt-4 text-sm md:text-xl max-w-3xl mx-auto">
          {t("landing.pricingDescription")}
        </p>
        <div className="flex justify-center">
          <PricingCard />
        </div>
      </section>
      <section className="bg-white md:py-16 py-10 text-center">
        <h2 className="md:text-6xl text-2xl font-bold md:mt-16">
          {t("landing.ctaTitle")}
        </h2>
        <p className="text-gray-500 mt-4 text-sm md:text-xl max-w-3xl mx-auto">
          {t("landing.ctaDescription")}
        </p>
        {!subscription && (
          <>
            <PaymentButton className="mt-10 w-80" isLoggedIn={!!session}>
              {t("landing.subscribeNow")}
            </PaymentButton>
            <p className="text-xs text-muted-foreground mt-2">
              {t("landing.disclaimer")}
            </p>
          </>
        )}
        <footer className="mt-16 border-t border-gray-300 pt-10">
          <Image src={logo} alt={t("landing.altLogo")} className="mx-auto" />
          <p className="text-muted-foreground">{t("landing.copyright")}</p>
        </footer>
      </section>
    </main>
  );
}
