import passport from 'passport';

export const get = passport.authenticate('google', {
  failureRedirect: '/',
  successRedirect: '/profile',
});
