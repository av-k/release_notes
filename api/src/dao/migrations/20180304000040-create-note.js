'use-strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('note', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      applicationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'application',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      version: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      releaseDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('note', null);
  }
};
