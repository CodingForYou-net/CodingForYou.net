import { googleClientID, googleClientSecret } from '@config/keys.js';
import mongoose from 'mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const { NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

export default function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: `${dev ? '' : 'https://codingoforyou.net'}/auth/google/callback`,
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(accessToken, profile);
      },
    ),
  );
}
