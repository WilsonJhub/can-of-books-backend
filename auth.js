'use strict';

const { request } = require('express');
// jwt = JSON web token  (jot)
const jwt = require('jsonwebtoken');  // need to have a way to verify that we have a legitimate web token. 

// jwks = JSON web key set (pronounced ja-wicks)
const jwksClient = require('jwks-rsa')

// this jwks URL comes from Auth0 account page
// advanced settings -> endpoints -> 0auth -> JSON Web Key set
const client = jwksClient({
  jwksUri: process.env.JWKS_URI
});

// I need a getKey function from jsonweb token to make things work
// https://www.npmjs.com/package/jsonwebtoken
// search for "auth0"
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// we are verifying the user on our route: 
function verifyUser(request, errorFirstOrUserCallbackFunction) {
  try{
    const token = request.header.authorization.split(' ')[1];
    console.log(token);
    // from the jsonwebtoken docs:
    jwt.verify(token, getKey, {}, errorFirstOrUserCallbackFunction);
  } catch(error) {
    errorFirstOrUserCallbackFunction('not authorized')
  }
}

module.exports = verifyUser