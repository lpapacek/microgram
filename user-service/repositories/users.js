require('rootpath')();
const dbm = require('core/db/dbManager');

const STATUSES = {
  PENDING: 0,
  ACTIVE: 1
}

const findAll = async () => {
  var users = await dbm.entities.user.findAll({
    where: {
      deleted: 0,
      status: STATUSES.ACTIVE
    }
  })
  return users;
}

const findById = async (id) => {
  var users = await dbm.entities.user.findAll({
    where: {
      deleted: 0,
      status: STATUSES.ACTIVE,
      id: id
    }
  })
  return users;
}

const findByUsername = async (username) => {
  var users = await dbm.entities.user.findAll({
    where: {
      deleted: 0,
      status: STATUSES.ACTIVE,
      username: username
    }
  })
  return users;
}

module.exports = { findAll, findById, findByUsername };