import { baseURL, stripeSecret, stripeSuccessURL } from '@config/keys.js';
import { Product } from '@helpers/mongoose.js';
import { xssFilter } from '@helpers/other.js';
import Stripe from 'stripe';

const stripe = Stripe(stripeSecret);

export async function get(req, res) {
  if (!req.user) return res.status(401).send('unauthorized');

  const { productID, cancelPath, comments } = req.query;
  if (!cancelPath) return res.status(400).send('please specify a cancel path');
  if (!comments) return res.status(400).send('please specify a comments');
  if (!productID) return res.status(400).send('please specify a productID');
  const product = await (await Product.findById(productID)).toObject();
  if (!product || product.archived) return res.status(400).send('please specify a valid productID');

  const { lang } = req.user;
  const { name, images, amount, currency, description, quantity } = product;

  let stripeProduct = {
    name: name[lang],
    images,
    amount,
    currency,
    description: description[lang],
    quantity,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [stripeProduct],
    success_url: stripeSuccessURL,
    cancel_url: `${baseURL}${cancelPath}`,
    customer_email: req.user.email,
    metadata: {
      comments: xssFilter.process(comments),
      userID: req.user.id,
      productID,
    },
  });
  res.send(session.id);
}
