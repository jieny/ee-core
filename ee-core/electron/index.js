'use strict';

const { createElectron } = require("./app");
const { getMainWindow, setCloseAndQuit, getCloseAndQuit } = require("./window");

// load socket server
function loadElectron(preflight) {
  createElectron(preflight);
}

module.exports = {
  loadElectron,
  getMainWindow,
  setCloseAndQuit,
  getCloseAndQuit
};