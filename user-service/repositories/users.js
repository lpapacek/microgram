require('rootpath')();
const dbm = require('core/db/dbManager');

const STATUSES = {
  PENDING: 0,
  ACTIVE: 1
}

const findUsers = async () => {
  var users = await dbm.entities.user.findAll({
    where: {
      deleted: 0,
      status: STATUSES.ACTIVE
    }
  })
  return users;
}

const findUserById = async (id) => {
  var users = await dbm.entities.user.findAll({
    where: {
      deleted: 0,
      status: STATUSES.ACTIVE,
      id: id
    }
  })
  return users;
}

const findUserByUsername = async (username) => {
  var users = await dbm.entities.user.findAll({
    where: {
      deleted: 0,
      status: STATUSES.ACTIVE,
      username: username
    }
  })
  return users;
}

module.exports = { findUsers, findUserById, findUserByUsername };