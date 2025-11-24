const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuario = require('../models/Usuario');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let usuario = await Usuario.findOne({ googleId: profile.id });

      if (!usuario) {
        usuario = new Usuario({
          nombre: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          foto: profile.photos[0]?.value
        });
        await usuario.save();
      }

      return done(null, usuario);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser((id, done) => {
  Usuario.findById(id, (err, usuario) => {
    done(err, usuario);
  });
});

module.exports = passport;
