import { Order } from '@helpers/mongoose.js';

export async function post(req, res) {
  if (!(req.user && req.user.admin)) return res.status(401).send('unauthorized');
  const { id, update } = req.body;
  try {
    await Order.findByIdAndUpdate(id, update);
    res.status(200).send('success');
  } catch (error) {
    res.status(501).send('internal server error');
  }
}
