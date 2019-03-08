'use-strict';
module.exports = {
  up: function(queryInterface) {
    return Promise.resolve();
  },
  down: function(queryInterface) {
    return queryInterface.bulkDelete('note', null, {});
  }
};
