export function get(req, res) {
  if (req.user) {
    res.send('logged in');
  } else {
    res.send('not logged in');
  }
}
