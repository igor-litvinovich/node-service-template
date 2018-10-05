const passport = require('passport');
const { Strategy: VKontakteStrategy } = require('passport-vkontakte');

const config = require('config');
const authorizationService = require('../services/authorization');

class AuthenticationManager {
    configure(app) {
        app.use(passport.initialize());
        app.use(passport.session());
        passport.use(new VKontakteStrategy(
            config.get('auth.vk'),
            (accessToken, refreshToken, params, profile, done) => {
                done(null, { accessToken, refreshToken, profile });
            },
        ));

        passport.serializeUser((user, done) => {
            done(null, user);
        });

        passport.deserializeUser((user, done) => done(null, user));
    }

    authenticate(authType) {
        return (req, res, next) => {
            passport.authenticate(authType, {
                successRedirect: '/users',
                failureRedirect: '/login-lest',
                // eslint-disable-next-line consistent-return
            }, (err, user) => {
                if (err) {
                    const error = new Error('Invalid credentials.', err.message);
                    error.stack = err.stack;

                    return next(error);
                }

                if (!user) {
                    const error = new Error('Invalid credentials. User not found');

                    return next(error);
                }

                req.logIn(user, (passportError) => {
                    if (passportError) {
                        const error = new Error('Invalid credentials.');
                        error.stack = passportError.stack;
                        next(error);
                    }
                    next();
                });
            })(req, res, next);
        };
    }
}

module.exports = AuthenticationManager;
