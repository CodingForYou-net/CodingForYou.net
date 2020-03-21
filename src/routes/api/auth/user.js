export function get(req, res) {
  const isLoggedIn = !!req.user;
  const isAdmin = !!(req.user || {}).admin;
  const { image, firstName, lastName, id, email, lang } = req.user || {};
  const user = { image, firstName, lastName, id, email, lang };
  res.status(200).send(JSON.stringify({ isLoggedIn, isAdmin, user }))
}