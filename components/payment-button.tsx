"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	EmbeddedCheckoutProvider,
	EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { useCallback } from "react";
import { useTranslations } from "next-intl";

type PaymentButtonProps = {
	children: React.ReactNode;
	className?: string;
	isLoggedIn: boolean;
};

export default function PaymentButton({
	children,
	className,
	isLoggedIn = false,
}: PaymentButtonProps) {
	const stripePromise = loadStripe(
		process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
	);

	const fetchClientSecret = useCallback(async () => {
		return fetch("/api/checkout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => data.client_secret);
	}, []);

	const options = { fetchClientSecret };

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					type="submit"
					formMethod="post"
					variant={"default"}
					className={className}
				>
					{children}
				</Button>
			</DialogTrigger>
			<DialogContent className="my-4 py-12">
				{!isLoggedIn && <LoggedOutContent />}
				{isLoggedIn && (
					<>
						<VisuallyHidden.Root>
							<DialogTitle className="text-xl font-semibold">
								<ModalTitle />
							</DialogTitle>
						</VisuallyHidden.Root>
						<EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
							<EmbeddedCheckout className="max-h-[80dvh]" />
						</EmbeddedCheckoutProvider>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}

function ModalTitle() {
	const t = useTranslations("payment.modal");
	return <>{t("proMembership")}</>;
}

function LoggedOutContent() {
	const t = useTranslations("payment.modal");

	return (
		<>
			<DialogTitle className="flex items-center gap-2">
				{t("opsTitle")}
			</DialogTitle>
			<h2>{t("needAccount")}</h2>
			<Link href="/cadastro" className={buttonVariants({ variant: "default" })}>
				{t("createAccount")}
			</Link>

			<p className="text-muted-foreground text-sm mt-2">
				{t("hasAccount")}
				<Link
					className={cn(
						buttonVariants({ variant: "link" }),
						"text-muted-foreground pl-2",
					)}
					href="/login"
				>
					{t("loginLink")}
				</Link>
			</p>
		</>
	);
}
