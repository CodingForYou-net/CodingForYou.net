import { Product } from '@helpers/mongoose.js';

export async function get(req, res) {
  const products = await Product.find().lean();
  res.status(200).send(products);
}
