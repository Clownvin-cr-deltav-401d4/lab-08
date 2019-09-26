'use-strict';

const { server } = require('../src/server');
const supergoose = require('./supergoose');
const mockedGoose = supergoose(server);

describe('Server', () => {
  it('🍔 Responds with 404 if not found 🍔', () => {
    return mockedGoose
      .get('/api/v1/cats')
      .expect(404);
  });
});

describe('/api/v1/categories', () => {
  it('🍕 Can create things using POST /api/v1/categories 🍕', () => {
    return mockedGoose
      .post('/api/v1/categories')
      .send({ name: 'Test', description: 'Description' })
      .expect(200)
      .then(result => {
        expect(result.body).toHaveProperty('_id');
      });
  });
  it('🍜 Can get all the categories using GET /api/v1/categories 🍜', () => {
    return mockedGoose
      .get('/api/v1/categories')
      .then(response => {
        expect(response.body.count).toBe(1);
      });
  });
  it(`🍩 Can get a single record using GET /api/v1/categories/:id 🍩`, () => {
    return mockedGoose
      .get('/api/v1/categories')
      .expect(200)
      .then(response => {
        expect(response.body.count).toBe(1);
        const record = response.body.results[0];
        return mockedGoose
          .get(`/api/v1/categories/${record._id}`)
          .expect(200)
          .then(response => {
            expect(record).toStrictEqual(response.body);
          });
      });
  });
  it(`🥞 Can update a single record using PUT /api/v1/categories/:id 🥞`, () => {
    return mockedGoose
      .get('/api/v1/categories')
      .expect(200)
      .then(response => {
        expect(response.body.count).toBe(1);
        const record = response.body.results[0];
        return mockedGoose
          .put(`/api/v1/categories/${record._id}`)
          .send({description: 'Updated, yay!'})
          .expect(200)
          .then(response => {
            expect(response.body).toHaveProperty('description', 'Updated, yay!');
          });
      });
  });
  it(`🥓 Can delete a single record using DELETE /api/v1/categories/:id 🥓`, () => {
    return mockedGoose
      .get('/api/v1/categories')
      .expect(200)
      .then(response => {
        expect(response.body.count).toBe(1);
        const record = response.body.results[0];
        return mockedGoose
          .delete(`/api/v1/categories/${record._id}`)
          .expect(200)
          .then(response => {
            //console.log(response.body);
            return mockedGoose
              .get('/api/v1/categories')
              .expect(200)
              .then(response => {
                expect(response.body.count).toBe(0);
              });
            //expect(response.body).toHaveProperty('description', 'Updated, yay!');
          });
      });
  });
});

describe('/api/v1/products', () => {
  it('🍕 Can create things using POST /api/v1/products 🍕', () => {
    return mockedGoose
      .post('/api/v1/products')
      .send({name: 'Test Product', description: 'A test product...', price: 30, stock: 10, available: true})
      .expect(200)
      .then(result => {
        expect(result.body).toHaveProperty('_id');
      });
  });
  it('🍜 Can get all the categories using GET /api/v1/products 🍜', () => {
    return mockedGoose
      .get('/api/v1/products')
      .then(response => {
        expect(response.body.count).toBe(1);
      });
  });
  it(`🍩 Can get a single record using GET /api/v1/products/:id 🍩`, () => {
    return mockedGoose
      .get('/api/v1/products')
      .expect(200)
      .then(response => {
        expect(response.body.count).toBe(1);
        const record = response.body.results[0];
        return mockedGoose
          .get(`/api/v1/products/${record._id}`)
          .expect(200)
          .then(response => {
            expect(record).toStrictEqual(response.body);
          });
      });
  });
  it(`🥞 Can update a single record using PUT /api/v1/products/:id 🥞`, () => {
    return mockedGoose
      .get('/api/v1/products')
      .expect(200)
      .then(response => {
        expect(response.body.count).toBe(1);
        const record = response.body.results[0];
        return mockedGoose
          .put(`/api/v1/products/${record._id}`)
          .send({description: 'Updated, yay!'})
          .expect(200)
          .then(response => {
            expect(response.body).toHaveProperty('description', 'Updated, yay!');
          });
      });
  });
  it(`🥓 Can delete a single record using DELETE /api/v1/products/:id 🥓`, () => {
    return mockedGoose
      .get('/api/v1/products')
      .expect(200)
      .then(response => {
        expect(response.body.count).toBe(1);
        const record = response.body.results[0];
        return mockedGoose
          .delete(`/api/v1/products/${record._id}`)
          .expect(200)
          .then(response => {
            //console.log(response.body);
            return mockedGoose
              .get('/api/v1/products')
              .expect(200)
              .then(response => {
                expect(response.body.count).toBe(0);
              });
            //expect(response.body).toHaveProperty('description', 'Updated, yay!');
          });
      });
  });
});