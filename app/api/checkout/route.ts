import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../../lib/stripe";

export async function POST() {
	try {
		const headersList = await headers();
		const origin = headersList.get("origin");

		// Create Checkout Sessions from body params.
		const session = await stripe.checkout.sessions.create({
			ui_mode: "embedded",
			line_items: [
				{
					// Provide the exact Price ID (for example, price_1234) of the product you want to sell
					price: process.env.STRIPE_PRICE_ID,
					quantity: 1,
				},
			],
			mode: "subscription",
			payment_method_types: ["card"],
			return_url: `${origin}/payment-confirmation?session_id={CHECKOUT_SESSION_ID}`,
		});

		return NextResponse.json({
			id: session.id,
			client_secret: session.client_secret,
		});
	} catch (err: any) {
		return NextResponse.json(
			{ error: err.message },
			{ status: err.statusCode || 500 },
		);
	}
}
