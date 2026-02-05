'use strict';

const { app: electronApp } = require('electron');
const { coreLogger } = require('../../log');
const { is } = require('../../utils');
const { cross } = require('../../cross');
const { createMainWindow, setCloseAndQuit, loadServer } = require('../window');
const { eventBus, ElectronAppReady, BeforeClose, Preload } = require('../../app/events');
const { getConfig } = require('../../config');

/**
 * 创建electron应用
 */
function createElectron(preflight) {
  const { singleLock } = getConfig();
  // 允许多个实例 
  const gotTheLock = electronApp.requestSingleInstanceLock();
  if (singleLock && !gotTheLock) {
    electronApp.quit();
    return;
  }

  electronApp.whenReady().then(async () => {
    try {
      await preflight();
    } catch (err) {
      coreLogger.error('[startup] init failed', err);
      electronApp.quit();
      return;
    }

    createMainWindow();
    eventBus.emitLifecycle(Preload);
    loadServer();
  })

  electronApp.on('window-all-closed', () => {
    if (!is.macOS()) {
      coreLogger.info('[ee-core] [lib/eeApp] window-all-closed quit');
      electronApp.quit(); 
    }
  })

  electronApp.on('before-quit', () => {
    setCloseAndQuit(true);
    eventBus.emitLifecycle(BeforeClose);
    cross.killAll();
  })

  eventBus.emitLifecycle(ElectronAppReady);
}

module.exports = {
  electronApp,
  createElectron,
};
