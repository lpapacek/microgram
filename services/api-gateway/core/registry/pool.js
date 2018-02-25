'use strict'
const uuidv4 = require('uuid/v4');
const rr = require('rr');

let services = {};

const addInstance = (instanceInfo) => {
  if (!services[instanceInfo.name]) {
    services[instanceInfo.name] = [];
  }

  services[instanceInfo.name].push({
    id: uuidv4(),
    version: instanceInfo.version,
    endpoint: instanceInfo.endpoint,
    host: instanceInfo.host === '::' ? 'localhost' : instanceInfo.host,
    port: instanceInfo.port
  });
}

const getInstance = (name) => {
  if (!services[name] || services[name].length === 0) {
    return null;
  }

  return rr(services[name]);
}

const getInstances = (name) => {
  if (!services[name] || services[name].length === 0) {
    return null;
  }

  return services[name];
}

const listAll = () => {
  let instanceList = [];
  for (let serviceName in services) {
    services[serviceName].forEach((instance) => {
      instance.serviceName = serviceName;
      instanceList.push(instance);
    })
  }
  return instanceList;
}

const removeInstance = (id) => {
  for (let serviceName in services) {
    for (let i = services[serviceName].length-1; i >= 0; i--) {
      if (services[serviceName][i].id === id) {
        services[serviceName].splice(i, 1);
        return;
      }
    }
  }
}

module.exports = { addInstance, getInstance, getInstances, removeInstance, listAll }