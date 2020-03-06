import { googleClientID, googleClientSecret } from '@config/keys.js';
import { User } from '@helpers/mongoose.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const { NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

export default function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: `${dev ? '' : 'https://codingforyou.net'}/api/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        const userInfo = {
          googleID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        };
        // NOTE Check for existing user
        try {
          let user = await User.findOne({ googleID: profile.id });
          if (user) {
            for (const [key, value] of Object.entries(userInfo)) user[key] = value;
            await user.save();
          } else {
            user = await new User(userInfo).save();
          }
          done(null, user);
        } catch (error) {
          done(error);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}
