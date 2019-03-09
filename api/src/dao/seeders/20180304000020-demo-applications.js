'use-strict';
module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert('application', [
      {
        name: 'Application I',
        userId: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Application II',
        userId: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Application III',
        userId: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Application IV',
        userId: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Application V',
        userId: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Application VI',
        userId: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Application VII',
        userId: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Application VIII',
        userId: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Application IX',
        userId: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Application X',
        userId: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Application XI',
        userId: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Application XII',
        userId: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ], {});
  },
  down: function(queryInterface) {
    return queryInterface.bulkDelete('application', null, {});
  }
};
