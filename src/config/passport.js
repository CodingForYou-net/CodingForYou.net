import { googleClientID, googleClientSecret } from '@config/keys';
import { User } from '@helpers/mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const { NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

export default function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: `${dev ? '' : 'https://codingforyou.net'}/auth/google/callback`,
      },
      (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        };
        // NOTE Check for existing user
        User.fi;
      },
    ),
  );
}
