'use strict';

module.exports = {
    db: 'mongodb://gamboDbUser:baxyr@ds041327.mongolab.com:41327/gambo',
    port: 3001,
    app: {
        name: 'GAMBO - filtered context data view - Test'
    },
    facebook: {
        clientID: '641796912562834', //'APP_ID',
        clientSecret: '52146ab13cce4ebb0c29c36312d3ff97', //'APP_SECRET',
        callbackURL: 'http://localhost:3001/auth/facebook/callback'
    },
    twitter: {
        clientID: 'CONSUMER_KEY',
        clientSecret: 'CONSUMER_SECRET',
        callbackURL: 'http://localhost:3000/auth/twitter/callback'
    },
    github: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    linkedin: {
        clientID: 'API_KEY',
        clientSecret: 'SECRET_KEY',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    }
};
