import {
  mailAuthCodingTeam,
  mailAuthContact,
  mailAuthMain,
  mailAuthSales,
  mailServer,
} from '@config/keys.js';
import { createTransport } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

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

const hbsViewsPath = `${__dirname}/../../../src/mails/`;
for (const key in transporters)
  transporters[key].use(
    'compile',
    hbs({
      viewEngine: {
        extname: '.hbs',
        partialsDir: hbsViewsPath + 'partials',
        layoutsDir: hbsViewsPath + 'layouts',
      },
      viewPath: hbsViewsPath,
      extName: '.hbs',
    })
  );

/**
 * @param {'main' | 'sales' | 'contact' | 'codingTeam'} account
 * @param {String} from
 * @param {String[]} receivers
 * @param {String} subject
 * @param {String} html
 * @param {Boolean?} sendOnError
 * @example await sendMail(
    'sales',
    'Ventes CodingForYou <sales#codingforyou.net>',
    ['samumartineau#gmail.com', 'cvdkhoa#gmail.com'],
    'test',
    '<b>this is bold</b>'
  );
 */
export async function sendMail(account, from, receivers, subject, html, sendOnError = true) {
  await transporters[account].sendMail({
    from,
    to: receivers.join(', '),
    template: 'error',
    subject,
  });
  // try {
  //   await transporters[account].sendMail({
  //     from,
  //     to: receivers.join(', '),
  //     html,
  //     subject,
  //   });
  // } catch (error) {
  //   if (error.code && sendOnError) {
  //     console.log(error);
  //     sendMail(
  //       'main',
  //       'Erreur CodingForYou <errorcodingforyou.net>',
  //       ['samumartineau@gmail.com', 'cvdkhoa@gmail.com'],
  //       'Une erreur est survenue',
  //       `Une erreur est survenue lors de l'envoi d'un courriel à ${receivers
  //         .map((r) => `<b>${r}</b>`)
  //         .join(' et ')}.
  //       <h1>Erreur</h1>
  //       <pre>${JSON.stringify(error, null, 2)}</pre>
  //       <h1>Arguments</h1>
  //       <pre>${JSON.stringify(
  //         {
  //           account,
  //           from,
  //           receivers,
  //           subject,
  //           html: html.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
  //           sendOnError,
  //         },
  //         null,
  //         2
  //       )}</pre>`,
  //       false
  //     );
  //   }
  // }
}
