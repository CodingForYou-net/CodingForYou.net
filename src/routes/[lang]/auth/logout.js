export function get(req, res) {
  if (req.user) req.logout();
  res.redirect('/');
}
