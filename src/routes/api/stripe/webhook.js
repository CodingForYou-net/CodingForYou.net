import { stripeSecret, stripeWebhookSecret } from '@config/keys.js';
import { ourEmails } from '@config/keys.js';
import { Order, Product, User } from '@helpers/mongoose.js';
import { sendMail } from '@helpers/nodemailer.js';
import { dev } from '@helpers/other.js';
import { getTranslation } from '@helpers/translation.js';
import Stripe from 'stripe';

const stripe = Stripe(stripeSecret);

export async function post(req, res) {
  try {
    const sig = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, stripeWebhookSecret);

    if (event.type === 'checkout.session.completed') {
      const {
        metadata: { userID, productID },
        customer_email,
      } = event.data.object;
      try {
        if (!userID) throw new Error('userID is missing');
        if (!productID) throw new Error('productID is missing');
        const order = new Order({
          product: productID,
          user: userID,
        });
        await order.save();
        const product = await (await Product.findById(productID)).toObject();
        const user = await (await User.findById(userID)).toObject();
        let error;
        error = await sendMail(
          'main',
          'Succès CodingForYou <success@codingforyou.net>',
          ourEmails,
          (dev ? '[DEV] ' : ' ') + 'Une commande a été passée',
          'successfull-order',
          {
            customer_email,
            product,
            productID,
            dev,
            orderID: order.id,
            userID,
          }
        );
        if (error) throw error;
        error = await sendMail(
          'sales',
          getTranslation('salesCFY', {}, user.lang),
          [user.email],
          getTranslation('messageFromCFY', {}, user.lang),
          'message-to-client',
          {
            message: getTranslation('orderReceivedMessage', { package: product.name[user.lang] }),
            lang: user.lang,
            subject: getTranslation('orderReceived'),
          }
        );
        if (error) throw error;
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
        return res.status(500).send('internal server error');
      }
    }
  } catch (err) {
    if (dev) console.warn(err);
    return res.status(401).send('unauthorized');
  }
}
