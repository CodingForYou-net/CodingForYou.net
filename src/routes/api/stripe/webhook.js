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
      console.log(event.data.object.charges.data[0].metadata);
      const customer = await stripe.customers.retrieve(customerID);
      const { email } = customer;

      switch (event.type) {
        case 'payment_intent.succeeded':
          console.log('succeeded'.white.bgGreen);
          console.log(email);
          // Add order to the DB
          break;
        case 'payment_intent.payment_failed':
          console.log('failed'.white.bgRed);
          console.log(email);
          // Send mail to client
          break;
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
