import { sendMail } from '@helpers/nodemailer.js';
import { dev } from '@helpers/other.js';
import { getTranslation } from '@helpers/translation.js';

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
      getTranslation('messageFromCFY', {}, user.lang),
      'message-to-client',
      {
        message,
        lang: user.lang,
        subject,
      }
    );
    if (!error) return res.status(200).send('ok');
    else throw error;
  } catch (error) {
    if (dev) console.log(error);
    res.status(500).send('internal server error');
  }
}
