import { ourEmails } from '@config/keys.js';
import { sendMail } from '@helpers/nodemailer.js';
import { emailRegex } from '@helpers/other.js';

const dev = process.env.NODE_ENV === 'development';

export async function post(req, res) {
  const { name, email, title, message } = req.body;
  if (!(name.trim() && emailRegex.test(email) && title.trim() && message.trim()))
    return res.status(400).send('please specify a name, a valid email, a title and a message');
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
