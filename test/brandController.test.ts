import request from 'supertest';
import {app, server} from '../src/app';

describe('Brand Controller - Complex Endpoints', () => {
  it('should return a brand with Get /brand/:id', async () => {
    const response = await request(app).get('/api/brand/1'); 

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Thành công',
      data: [
        {
          brand_id: 1,
          brand_name: 'Dell',
          image: '1700224745679logo-dell.png',
        },
      ],
    });
  });

  it('should return a list of brands with Get /brand', async () => {
    const response = await request(app).get('/api/brand');
    expect(response.status).toBe(200);
    expect(response.body.data[0]).toEqual({
        "brand_id": 1,
        "brand_name": "Dell",
        "image": "1700224745679logo-dell.png",
        "status": 1
    },);
  });

  it('should return result with Post /brand', async () => {
    const newBrand = {
        brand_name: 'test',
        image: '1700224745679logo-dell.png',
        status:1
      };

    const response = (await request(app).post('/api/brand').send(newBrand));
    expect(response.status).toBe(200);
    
  });

  afterAll((done) => {
    server.close(() => {
      done();
    });
  });
  



});
