import { stripeSecret, stripeWebhookSecret } from '@config/keys.js';
import Stripe from 'stripe';

const dev = process.env.NODE_ENV === 'development';
const stripe = Stripe(stripeSecret);

export async function post(req, res) {
  try {
    const sig = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, stripeWebhookSecret);

    const intent = event.data.object;
    const { customer: customerID } = intent;

    try {
      const customer = await stripe.customers.retrieve(customerID);
      const { email } = customer;

      if (event.type === 'checkout.session.completed') {
        console.log('succeeded'.white.bgGreen);
        console.log(email);
        console.log(event.data.object.metadata);
      }

      return res.status(200).send('ok');
    } catch (error) {
      // Send mail to me
    }
  } catch (err) {
    if (dev) console.warn(err);
    return res.status(401).send('unauthorized');
  }
}
