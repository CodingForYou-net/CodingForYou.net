import passport from 'passport';

export function get(req, res, next) {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
}
