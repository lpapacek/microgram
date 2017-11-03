const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

require('rootpath')();
const config = require('config/db.def')();
const Logger = require('helpers/logger');
let log = new Logger();

let entities = {};

const init = async () => {
  log.info('Sequelize init start...');

  // Create sequelize object
  let sequelize = new Sequelize(
    config.database, 
    config.user, 
    config.pass, 
    {
      host: config.hostname,
      dialect: config.dialect,
      pool: { max: 5, min: 0, idle: 10000 },
      define: {
        timestamps: false,
        charset: 'utf8',
          collate: 'utf8_general_ci',
      },
      query: { raw: false },
      timezone: '+00:00',
      logging: function(msg, executionTime) {
        if (config.debug) {
          additionalInfo = {};
          if (executionTime) {
            additionalInfo['exec_time'] = executionTime + ' ms';
          }
          log.debug(msg, additionalInfo);
        }
      },
      benchmark: true,
    }
  );

  const modelsPath = path.join(__dirname, 'models');

  // Define models
  fs.readdirSync(modelsPath).forEach(function(name) {
    var model = sequelize.import(path.join(modelsPath, name));
    log.info('Defining ' + model.name);
    entities[model.name] = model;
  })

  // Define associations
  for (var modelName in entities) {
    if ('associate' in entities[modelName]) {
      entities[modelName].associate(entities);
    }
  }

  try {
    let res = await sequelize.sync({ force: false });
    log.info('Sequelize init done!');
  } catch(err) {
    throw err;
  }

  return 'OK';
}

module.exports = Object.assign({}, { init, entities });