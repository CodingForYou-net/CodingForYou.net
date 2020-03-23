import { Order } from '@helpers/mongoose.js';

export async function get(req, res) {
  const { id } = req.query;
  if (req.user) {
    if (id && req.user.id === id) {
      const orders = await Order.find({ user: id })
        .lean()
        .populate('user')
        .populate('product');
      res.status(200).send(orders);
    } else if (!id && req.user.admin) {
      const orders = await Order.find()
        .lean()
        .populate('user')
        .populate('product');
      res.status(200).send(orders);
    } else {
      res.status(401).send('unauthorized');
    }
  } else {
    res.status(401).send('unauthorized');
  }
}
