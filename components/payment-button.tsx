"use client";

import { useCallback } from "react";
import { Button } from "./ui/button";
import { loadStripe } from "@stripe/stripe-js";
import {
	EmbeddedCheckoutProvider,
	EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

type PaymentButtonProps = {
	children: React.ReactNode;
};

function PaymentButton({ children }: PaymentButtonProps) {
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

	const options = {
		fetchClientSecret,
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full">{children}</Button>
			</DialogTrigger>
			<DialogContent>
				<>
					<VisuallyHidden>
						<DialogTitle>Assinatura Pro</DialogTitle>
					</VisuallyHidden>

					<EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
						<EmbeddedCheckout />
					</EmbeddedCheckoutProvider>
				</>
			</DialogContent>
		</Dialog>
	);
}

export default PaymentButton;
