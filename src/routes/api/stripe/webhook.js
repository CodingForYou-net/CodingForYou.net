import { stripeSecret, stripeWebhookSecret } from '@config/keys.js';
import { ourEmails } from '@config/keys.js';
import products from '@config/products.js';
import { Order } from '@helpers/mongoose.js';
import { sendMail } from '@helpers/nodemailer.js';
import Stripe from 'stripe';

const dev = process.env.NODE_ENV === 'development';
const stripe = Stripe(stripeSecret);

export async function post(req, res) {
  try {
    const sig = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, stripeWebhookSecret);

    if (event.type === 'checkout.session.completed') {
      const {
        metadata: { comments, userID, productID },
        customer_email,
      } = event.data.object;
      try {
        if (!comments) throw new Error('description is missing');
        if (!userID) throw new Error('userID is missing');
        if (!productID) throw new Error('productID is missing');
        const order = new Order({
          productID,
          comments,
          user: userID,
        });
        await order.save();
        sendMail(
          'main',
          'Succès CodingForYou <success@codingforyou.net>',
          ourEmails,
          (dev ? '[DEV] ' : ' ') + 'Une commande a été passée',
          'successfull-order',
          {
            customer_email,
            product: products[productID],
            productID,
            comments,
            dev,
            orderID: order.id,
            userID,
          }
        );
        return res.status(200).send('ok');
      } catch (error) {
        sendMail(
          'main',
          'Erreur CodingForYou <error@codingforyou.net>',
          ourEmails,
          (dev ? '[DEV] ' : ' ') + 'Une erreur est survenue',
          'error-checkout',
          {
            customer_email,
            error: JSON.stringify(error, null, 2),
            event: JSON.stringify(event, null, 2),
            dev,
          }
        );
        return res.status(501).send('internal server error');
      }
    }
  } catch (err) {
    if (dev) console.warn(err);
    return res.status(401).send('unauthorized');
  }
}
