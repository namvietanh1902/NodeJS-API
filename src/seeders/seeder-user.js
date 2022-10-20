'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Amberino',
      lastName: 'Nguyen',
      email: 'admin@gmail.com',
      password: '123456',
      address: 'VN',
      gender: 1,
      roleID : 'R1',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};