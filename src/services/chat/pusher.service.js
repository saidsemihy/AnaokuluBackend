const Pusher = require('pusher');
require('dotenv').config();
const config = require('../../config/config');



const appId = '1732720';
const key = '1fa5c190fd5ae5085ba8';
const secret = '42b5bcabdc85f26511ac';
const cluster = 'eu';

// const appId = config.pusher.appId;
// const key = config.pusher.key;
// const secret = config.pusher.secret;
// const cluster = config.pusher.cluster;


const pusher = new Pusher({
  appId,
  key,
  secret,
  cluster,
  useTLS: true,
});

module.exports = { pusher };
