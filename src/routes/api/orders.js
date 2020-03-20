import { Order } from '@helpers/mongoose.js';

export async function get(req, res) {
  if (!(req.user && req.user.admin)) return res.status(401).send('unauthorized');
  const orders = await Order.find()
    .lean()
    .populate('user')
    .populate('product');
  res.status(200).send(orders);
}
