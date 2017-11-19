'use strict'

const cron = require('node-cron');

require('rootpath')();
const log = require('helpers/logger');
const rest = require('core/lib/restWrapper');
const pool = require('core/registry/pool');

const STATUSES = {
  free: 0,
  busy: 1,
}

let status;

const start = () => {
  status = STATUSES.free;
  cron.schedule('*/5 * * * * *', check)
}

const check = async () => {
  if (status === STATUSES.busy) {
    return;
  }
  status = STATUSES.busy;

  log.info('Checking service hearthbeats...');
  let instances = pool.listAll();
  for (let i in instances) {
    let instance = instances[i];
    log.info('Service: ' + instance.serviceName + ' | Instance: ' + instance.id + ' | Address: ' + instance.host + ':' + instance.port);
    try {
      let pulse = await rest.get(`http://${instance.host}:${instance.port}/pulse`, { timeout: 1000 });
      if (pulse.status != 'OK') {
        throw new Error('Service not available.');
      } 
      log.info('Pulse success.');
    } catch (e) {
      log.info('Pulse failed.');
      pool.removeInstance(instance.id);
    }
  }
  status = STATUSES.free;
}

module.exports = { start }