/* eslint-disable import/no-unresolved */

'use strict';

const auth = require('basic-auth');
const { User } = require('unleash-server');
const sharedSecret = '12312Random';
const user = 'admin';
const password = 'admin';

function basicAuthentication(app) {

    app.use('/api/client', (req, res, next) => {
        if (req.header('Authorization') === sharedSecret) {
            next();
        } else {
            res.sendStatus(401);
        }
    });

    app.use('/api/admin/', (req, res, next) => {
        const credentials = auth(req);

        if (credentials) {
            // TODO better verification of credentials here.
            if (credentials.name === user && credentials.pass === password) {
                const user = new User({ email: `${credentials.name}@domain.com` });
                req.user = user;
                return next();
            }
        }

        return res
            .status('401')
            .set({ 'WWW-Authenticate': 'Basic realm="example"' })
            .end('access denied');
    });

    app.use((req, res, next) => {
        // Updates active sessions every hour
        req.session.nowInHours = Math.floor(Date.now() / 3600e3);
        next();
    });
}

module.exports = basicAuthentication;
