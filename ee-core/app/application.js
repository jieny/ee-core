'use strict';

const debug = require('debug')('ee-core:app:appliaction');
const { loadController } = require('../controller');
const { eventBus, Ready } = require('./events');
const { loadSocket } = require('../socket');
const { loadElectron } = require('../electron');

class Appliaction {
  constructor() {

  }

  register(eventName, handler) {
    return eventBus.register(eventName, handler);
  }

  run(preflight) {
    loadController();
    loadSocket();
    eventBus.emitLifecycle(Ready);
    loadElectron(preflight);
  }
}

const app = new Appliaction();

module.exports = {
  Appliaction,
  app,
};