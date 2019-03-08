'use-strict';
module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('user', [{
      email : 'test@test.com',
      password: '123456', // In further must be hashed
      first_name : 'John',
      last_name : 'Doe',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },
  down: function(queryInterface) {
    return queryInterface.bulkDelete('user', null, {});
  }
};
