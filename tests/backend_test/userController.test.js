const chai = require('chai');
const expect = chai.expect;
const userController = require('../controllers/userController');

describe('User Controller', function() {
  describe('getUserById', function() {
    it('should return user object when given a valid ID', async function() {
      const userId = 1;
      const user = await userController.getUserById(userId);
      expect(user).to.be.an('object');
      expect(user).to.have.property('id', userId);
    });

    it('should return null when user is not found', async function() {
      const userId = 9999;
      const user = await userController.getUserById(userId);
      expect(user).to.be.null;
    });
  });
});