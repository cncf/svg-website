'use strict';

//////////////////////
// Greenlock Setup  //
//////////////////////

var greenlock = require('greenlock-koa').create({
  version: 'draft-11' // Let's Encrypt v2
, server: 'https://acme-v02.api.letsencrypt.org/directory'
, email: 'info@cncf.io'
, agreeTos: true
, approveDomains: [ 'svg.cncf.io' ]

  // Join the community to get notified of important updates
  // and help make greenlock better
, communityMember: true

, configDir: require('os').homedir() + '/acme/etc'
, store: require('le-store-fs')

//, debug: true
});


//////////////////
// Just add Koa //
//////////////////

var http = require('http');
var https = require('https');
var koa = require('koa');
var app = new koa();

var sslify = require('koa-sslify').default;
app.use(sslify());
app.use(async function (ctx) {
  ctx.body = 'Hello World';
});

// https server
var server = https.createServer(greenlock.tlsOptions, greenlock.middleware(app.callback()));

server.listen(443, function () {
 console.log('Listening at https://localhost:' + this.address().port);
});


// http redirect to https
var http = require('http');
http.createServer(greenlock.middleware(app.callback())).listen(80, function () {
  console.log('Listening on port 80 to handle ACME http-01 challenge and redirect to https');
});
