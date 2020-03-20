import { ourEmails } from '@config/keys.js';
import { sendMail } from '@helpers/nodemailer.js';

const dev = process.env.NODE_ENV === 'development';

export function post(req, res) {
  try {
    sendMail(
      'main',
      'Contact CodingForYou <contact@codingforyou.net>',
      ourEmails,
      (dev ? '[DEV] ' : ' ') + 'Un client vous a contacté',
      'customer-contact',
      {
        dev,
        name: req.body.name,
        email: req.body.email,
        title: req.body.title,
        message: req.body.message,
      }
    );
    return res.status(200).send('ok');
  } catch (error) {
    return res.status(501).send('internal server error');
  }
}
