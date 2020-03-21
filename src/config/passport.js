import { googleCallbackURL, googleClientID, googleClientSecret } from '@config/keys.js';
import { User } from '@helpers/mongoose.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const { NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

export default function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: googleCallbackURL,
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
          let userDoc = await User.findOne({ googleID: profile.id });
          if (userDoc) {
            for (const [key, value] of Object.entries(userInfo)) userDoc[key] = value;
            await userDoc.save();
          } else {
            userDoc = await new User(userInfo).save();
          }
          done(null, userDoc);
        } catch (error) {
          done(error);
        }
      }
    )
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
