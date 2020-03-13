import { baseURL, stripeSecret, stripeSuccessURL } from '@config/keys.js';
import products from '@config/products.js';
import Stripe from 'stripe';

const stripe = Stripe(stripeSecret);

export async function get(req, res) {
  if (!req.user) return res.status(401).send('unauthorized');

  const { productID, cancelPath, lang } = req.query;

  const product = products[productID];
  if (!product) return res.status(400).send('please specify a product');

  if (!cancelPath) return res.status(400).send('please specify a cancel path');

  if (!lang) return res.status(400, 'please specify a language');

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [product],
    success_url: stripeSuccessURL,
    cancel_url: `${baseURL}${cancelPath}`,
    customer_email: req.user.email,
    metadata: {
      lang: lang,
    },
  });
  res.send(session.id);
}
