import { Product } from '@helpers/mongoose.js';

export async function get(req, res) {
  const products = await Product.find({
    archived: false,
    specificUser: { $in: [false, req.user ? req.user.id : false] },
  }).lean();
  res.status(200).send(products);
}
