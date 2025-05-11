const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('POST /login', () => {
  it('should return 401 if user does not exist', async () => {
    const res = await request(app).post('/login').send({
      username: 'nonexistent',
      password: 'wrongpassword'
    });
    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Sai tài khoản hoặc mật khẩu');
  });
});