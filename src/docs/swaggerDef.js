const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Anaokulu Project API Documentation',
    version,
  },
  servers: [
    {
      url: `http://192.168.2.190:${config.port}/v1`,
    },
    {
      url: `https://oyster-app-4mo4u.ondigitalocean.app/v1`,
    },
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
