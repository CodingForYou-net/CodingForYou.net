import { baseURL, stripeSecret, stripeSuccessURL } from '@config/keys.js';
import products from '@config/products.js';
import Stripe from 'stripe';

const stripe = Stripe(stripeSecret);

export async function get(req, res) {
  if (!req.user) return res.status(401).send('unauthorized');
  const product = products[req.query.productID];
  if (!product) return res.status(400).send('please specify a product');
  const cancelPath = req.query.cancelPath;
  if (!cancelPath) return res.status(400).send('please specify a cancel path');
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [product],
    success_url: stripeSuccessURL,
    cancel_url: `${baseURL}${cancelPath}`,
    customer_email: req.user.email,
  });
  res.send(session.id);
}
