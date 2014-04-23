'use strict';

var config = require('../config/config'),
    crypto = require('crypto'),
    inputEncoding = 'utf8',
    outputEncoding = 'hex';

module.exports.encrypt = function(plainText) {
    var cipher = crypto.createCipher(config.encryptAlgorithm, config.secret);
    var ciphered = cipher.update(plainText, inputEncoding, outputEncoding);
    ciphered += cipher.final(outputEncoding);
    return ciphered;
};

module.exports.decrypt = function(encrypted) {
    var deciphered = null;

    // encrypted must be not empty
    if(encrypted) {
        var decipher = crypto.createDecipher(config.encryptAlgorithm, config.secret);
        deciphered = decipher.update(encrypted, outputEncoding, inputEncoding);
        deciphered += decipher.final(inputEncoding);
    }
    return deciphered;
};