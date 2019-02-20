const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/auth/google',
    passport.authenticate('google', {
            scope:
                ['https://www.googleapis.com/auth/plus.login',
                    'https://www.googleapis.com/auth/plus.profile.emails.read']
        }
    ));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    }));

const loginCtrl = (req, res, next) => passport.authenticate('login', async (err, user, info) => {
    try {
        if (err || !user) {
            const error = new Error('An Error occured');
            return next(error);
        }
        req.login(user, { session: false }, (error) => {
            if (error) return next(error);
            const token = jwt.sign({ user }, process.env.JWT_SECRET);
            return res.json({ token });
        });
    } catch (error) {
        return next(error);
    }
})(req, res, next);

router.post('/sign-up', passport.authenticate('sign-up', { session: false }), loginCtrl);

router.post('/login', loginCtrl);

module.exports = router;