import { sendMail } from '@helpers/nodemailer.js';
import { getTranslation } from '@helpers/translation.js';

const dev = process.env.NODE_ENV === 'development';

export async function post(req, res) {
  try {
    if (!(req.user && req.user.admin)) return res.status(401).send('unauthorized');
    const { accountFrom, message, user, subject } = req.body;
    if (!(accountFrom && message && user && subject))
      return res.status(400).send('please specify an accountFrom, a subject, a message and a user');
    const emailFrom = getTranslation(accountFrom + 'CFY', {}, user.lang);
    const error = await sendMail(
      accountFrom,
      emailFrom,
      [user.email],
      subject,
      'message-to-client',
      {
        message,
      }
    );
    if (!error) return res.status(200).send('ok');
    else throw error;
  } catch (error) {
    if (dev) console.log(error);
    res.status(500).send('internal server error');
  }
}
