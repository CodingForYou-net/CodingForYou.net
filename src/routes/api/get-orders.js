import products from '@config/products.js';
import { Order } from '@helpers/mongoose.js';

export async function get(req, res) {
  if (!(req.user && req.user.admin)) return res.status(401).send('unauthorized');
  const orders = await Order.find().populate('user');
  res.status(200).send(orders);
}
