import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function fetchSubscriptionByEmail(email: string) {
	try {
		const customers = await stripe.customers.list({
			limit: 1,
			email,
			expand: ["data.subscriptions"],
		});

		if (customers.data.length === 0) return null;

		const customer = customers.data[0];
		if (customer.subscriptions?.data.length === 0) return null;

		const subscription = customer.subscriptions?.data[0];

		return subscription;
	} catch (error) {
		console.error(error);
		return null;
	}
}
