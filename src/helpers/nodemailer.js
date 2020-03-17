import {
  mailAuthCodingTeam,
  mailAuthContact,
  mailAuthMain,
  mailAuthSales,
  mailServer,
} from '@config/keys.js';
import { translationsList } from '@helpers/translation.js';
import { createTransport } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import format from 'string-template';

const transporters = {
  main: createTransport({
    ...mailServer,
    auth: mailAuthMain,
  }),
  sales: createTransport({
    ...mailServer,
    auth: mailAuthSales,
  }),
  contact: createTransport({
    ...mailServer,
    auth: mailAuthContact,
  }),
  codingTeam: createTransport({
    ...mailServer,
    auth: mailAuthCodingTeam,
  }),
};

const hbsViewsPath = `${__dirname}/mails/`;
const hbsConfig = {
  viewEngine: {
    extname: '.hbs',
    partialsDir: hbsViewsPath + 'partials',
    layoutsDir: hbsViewsPath + 'layouts',
    helpers: {
      translate(textId, data) {
        return format(translationsList[this.lang][textId], { ...this, ...data.hash });
      },
      compare(v1, operator, v2) {
        switch (operator) {
          case '==':
            return v1 == v2;
          case '!=':
            return v1 != v2;
          case '===':
            return v1 === v2;
          case '<':
            return v1 < v2;
          case '<=':
            return v1 <= v2;
          case '>':
            return v1 > v2;
          case '>=':
            return v1 >= v2;
          case '&&':
            return !!(v1 && v2);
          case '||':
            return !!(v1 || v2);
          default:
            return false;
        }
      },
      math(v1, operator, v2) {
        switch (operator) {
          case '+':
            return v1 + v2;
          case '-':
            return v1 - v2;
          case '*':
            return v1 * v2;
          case '/':
            return v1 / v2;
          case '%':
            return v1 % v2;
        }
      },
    },
  },
  viewPath: hbsViewsPath,
  extName: '.hbs',
};

for (const key in transporters) transporters[key].use('compile', hbs(hbsConfig));

/**
 * @param {'main' | 'sales' | 'contact' | 'codingTeam'} account
 * @param {String} from
 * @param {String[]} receivers
 * @param {String} subject
 * @param {String} template
 * @param {Object?} context
 * @param {Boolean?} sendOnError
 */
export async function sendMail(
  account,
  from,
  receivers,
  subject,
  template,
  context = {},
  sendOnError = true
) {
  try {
    await transporters[account].sendMail({
      from,
      to: receivers.join(', '),
      subject,
      template,
      context,
    });
  } catch (error) {
    if (!error.receivers) {
      if (sendOnError)
        sendMail(
          'main',
          'Erreur CodingForYou <error@codingforyou.net>',
          ['samumartineau@gmail.com', 'cvdkhoa@gmail.com'],
          'Une erreur est survenue',
          'error-sending-mail',
          {
            receivers,
            error: JSON.stringify(error, null, 2),
            arguments: JSON.stringify(
              {
                account,
                from,
                receivers,
                subject,
                template,
                context,
                sendOnError,
              },
              null,
              2
            ),
          },
          false
        );
      else console.log(error);
    }
  }
}
