const request = require('supertest');
const app = require('../src/app');


describe('GET /plants', () => {
  it('should return all plants when no parameters are provided', async () => {
    const res = await request(app).get('/plants');
    expect(res.statusCode).toBe(200);
    // When you alter the plant collection, feel free to update this number.
    expect(res.body.length).toEqual(11);
  });

  // Add your tests here
});
