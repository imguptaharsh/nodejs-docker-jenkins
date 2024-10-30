const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /', () => {
  it('should return Hello, World!', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res.text).to.equal('Hello, World!');
        expect(res.status).to.equal(200);
        done();
      });
  });
});
