const db = require('../../data/dbConfig');

exports.getAllUsers = () => {
  return db('users');
};

exports.getUser = username => {
  return db('users')
    .where('username', '=', username)
    .first();
};

exports.postUser = async user => {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
};

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}
