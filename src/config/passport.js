import { googleClientID, googleClientSecret } from '@config/keys.js';
import mongoose from 'mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export default function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: `/auth/google/callback`,
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(accessToken, profile);
      },
    ),
  );
}
