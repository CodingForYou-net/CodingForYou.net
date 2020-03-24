import { ourEmails } from '@config/keys.js';
import { sendMail } from '@helpers/nodemailer.js';

const dev = process.env.NODE_ENV === 'development';

export async function post(req, res) {
  const error = await sendMail(
    'contact',
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
  if (!error) return res.status(200).send('ok');
  else {
    if (dev) console.log(error);
    res.status(500).send('internal server error');
  }
}
