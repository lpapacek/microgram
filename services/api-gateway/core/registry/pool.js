'use strict';

const Consul = require('consul');

const knownServices = ['users-service', 'image-service'];

const connect = () => {
	const consul = Consul({
		host: '127.0.0.1',
		port: 8500,
		secure: false,
		promisify: true
	});
	return consul;
};

const getInstance = async name => {
	const instances = await getInstances(name);
	if (instances.length === 0) return null;

	// TODO better algorithm for load balancing!
	return instances[Math.floor(Math.random() * instances.length)];
};

const getInstances = async name => {
	const consul = connect();
	const instances = await consul.health.service({ service: name, passing: true });
	const instanceList = instances.map(instance => {
		return {
			id: instance.Service.ID,
			address: instance.Service.Address,
			port: instance.Service.Port
		};
	});

	return instanceList;
};

const listAll = async () => {
	const consul = connect();

	const services = knownServices.map(serviceName => {
		return consul.health.service({ service: serviceName, passing: true });
	});

	const serviceList = await Promise.all(services);
	const normalizedInstances = serviceList.map(service => {
		const instances = service.map(instance => {
			return {
				id: instance.Service.ID,
				address: instance.Service.Address,
				port: instance.Service.Port
			};
		});
		console.log(instances);
		return instances;
	});

	return normalizedInstances;
};

module.exports = { getInstance, getInstances, listAll };
