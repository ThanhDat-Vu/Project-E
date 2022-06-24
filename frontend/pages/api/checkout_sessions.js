import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			// ref: https://stripe.com/docs/api/checkout/sessions
			// use: create Checkout Sessions from body params
			const params = {
				line_items: req.body.map((item) => {
					const imgRef = item.thumbnail.asset._ref;
					const image = imgRef
						.replace(
							'image-',
							`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/`
						)
						.replace('-webp', '.webp');
					return {
						price_data: {
							currency: 'USD',
							product_data: {
								name: item.title,
								images: [image],
							},
							unit_amount: item.price * 100,
						},
						quantity: item.quantity,
					};
				}),
				mode: 'payment',
				success_url: `${req.headers.origin}/success`,
				cancel_url: `${req.headers.origin}/`,
			};
			const session = await stripe.checkout.sessions.create(params);
			res.status(200).json(session);
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
