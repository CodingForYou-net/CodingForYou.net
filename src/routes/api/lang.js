import { User } from '@helpers/mongoose.js';

const dev = process.env.NODE_ENV === 'development';

export async function post(req, res) {
  const user = req.user;
  const lang = req.body.lang;
  if (!lang) return res.status(400).send('please specify a lang');
  if (!user) return res.status(401).send('unauthorized');
  try {
    const userDoc = await User.findById(user.id);
    userDoc.lang = lang;
    await userDoc.save();
    res.status(200).send('lang saved');
  } catch (error) {
    if (dev)
      console.log(error);
    res.status(500).send('an error occured');
  }
}
