const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel'); // Import your user model

/* Passport Middleware */
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'https://your-site.com/auth/google/callback',
        },
        async function (token, tokenSecret, profile, done) {
            try {
                console.log(profile);
                const [user, created] = await User.findOrCreate({
                    where: {
                        googleId: profile.id,
                    },
                    defaults: {
                        googleId: profile.id,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                        image:
                            profile.photos && profile.photos.length > 0
                                ? profile.photos[0].value
                                : undefined,
                        isVerified: true,
                        username: profile.emails[0].value.split('@')[0],
                    },
                });
                return done(null, traveler);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport;
