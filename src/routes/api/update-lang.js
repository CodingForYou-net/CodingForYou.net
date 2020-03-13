import { User } from '@helpers/mongoose.js';

const dev = process.env.NODE_ENV === 'development';

export async function post({ query: { lang, id }, query }, res) {
  console.log(query);
  if (!(lang && id)) return res.status(400).send('please specify a lang and an id');
  try {
    const userDoc = await User.findOne({ id });
    userDoc.lang = lang;
    await user.save();
    res.status(200).send('lang saved');
  } catch (error) {
    if (dev) console.warn(error);
    res.status(501).send('an error occured');
  }
}
