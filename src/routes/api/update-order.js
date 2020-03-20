import { Order } from '@helpers/mongoose.js';

const dev = process.env.NODE_ENV === 'development';

export async function post(req, res) {
  if (!(req.user && req.user.admin)) return res.status(401).send('unauthorized');
  const { id, update } = req.body;
  try {
    await Order.findByIdAndUpdate(id, update);
    res.status(200).send('success');
  } catch (error) {
    if (dev) console.log(error);
    res.status(501).send('internal server error');
  }
}
