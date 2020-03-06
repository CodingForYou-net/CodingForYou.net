import { stripeSecret } from '@config/keys.js';
import products from '@config/products.js';
import Stripe from 'stripe';

const stripe = Stripe(stripeSecret);

export async function get(req, res) {
  if (!req.user) return res.status(401).send('unauthorized');
  const product = products[req.query.productID];
  if (!product) return res.status(400).send('please specify a product');
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [product],
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
    customer_email: req.user.email,
  });
  res.send(session.id);
}
