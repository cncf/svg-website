// This file configures a web server for testing the production build
// on your local machine.

import path from 'path';
import historyApiFallback from 'koa2-history-api-callback';

/* eslint-disable no-console */

console.log(chalkProcessing('Opening production build...'));

// run a koa
const Koa = require('koa');

app.use(historyApiFallback());
app.use(servce('dist'));
app.listen();

// Run Browsersync
