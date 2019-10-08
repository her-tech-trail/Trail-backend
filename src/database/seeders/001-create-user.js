import { hashPassword } from '../../utils';

export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        id: 'e71c28fd-73d8-4d92-9125-ab3d022093b9',
        firstName: '',
        lastName: '',
        email: 'lasley@gmail.com',
        password: hashPassword('passkey'),
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'e71c28fd-73d8-4d92-9125-ab3d022093b0',
        email: 'kelchio@yahoo.com',
        password: hashPassword('olivers'),
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '7aa38d4e-7fbf-4067-8821-9c27d2fb6e3a',
        email: 'tari@gmail.com',
        password: hashPassword('funnyDev'),
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
