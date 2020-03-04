import passport from 'passport';

// NOTE Caveat: incompatibility between Sapper and Passport SEE src/server.js
export const get = passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/auth/verify',
});
