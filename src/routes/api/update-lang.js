import { User } from '@helpers/mongoose.js';

const dev = process.env.NODE_ENV === 'development';

export async function post({ body: { lang, id } }, res) {
  if (!(lang && id)) return res.status(400).send('please specify a lang and an id');
  try {
    const userDoc = await User.findById(id);
    userDoc.lang = lang;
    await userDoc.save();
    res.status(200).send('lang saved');
  } catch (error) {
    if (dev) console.warn(error);
    res.status(501).send('an error occured');
  }
}
