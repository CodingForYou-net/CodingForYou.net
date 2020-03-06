import { stripeSecret, stripeWebhookSecret } from '@config/keys.js';
import Stripe from 'stripe';

const dev = process.env.NODE_ENV === 'development';

const stripe = Stripe(stripeSecret);

export async function post(req, res) {
  try {
    const sig = req.headers['stripe-signature'];
    console.log(req.rawBody, req.body);
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, stripeWebhookSecret);

    const intent = event.data.object;
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log(intent);
        break;
      case 'payment_intent.payment_failed':
        console.log(intent);
        break;
    }
  } catch (err) {
    if (dev) console.warn(err);
    res.status(401).send('unauthorized');
  }
}
