import { Order } from '@helpers/mongoose.js';
import { dev } from '@helpers/other.js';

export async function post(req, res) {
  if (!(req.user && req.user.admin)) return res.status(401).send('unauthorized');
  const { id, update } = req.body;
  try {
    await Order.findByIdAndUpdate(id, update);
    res.status(200).send('success');
  } catch (error) {
    if (dev) console.log(error);
    res.status(500).send('internal server error');
  }
}
