// const request = require('supertest');
// const app = require('../src/app');


// describe('GET /plants', () => {
//   it('should return all plants when no parameters are provided', async () => {
//     const res = await request(app).get('/plants');
//     expect(res.statusCode).toBe(200);
//     // When you alter the plant collection, feel free to update this number.
//     expect(res.body.length).toEqual(11);
//   });

//   // Add your tests here
// });


// const request = require('supertest');
// const app = require("../src/app"); // Make sure to import your Express app

// describe('GET /plants', () => {

//     it('should return all plants when no filter is applied', async () => {
//         const response = await request(app).get('/plants');
//         expect(response.status).toBe(200);
//         expect(Array.isArray(response.body)).toBe(true);
//         // You can add more specific checks for plant objects if you know the structure
//     });

//     it('should return plants with height greater than or equal to min_height', async () => {
//         const response = await request(app).get('/plants').query({ min_height: 0 });
//         expect(response.status).toBe(200);
//         expect(Array.isArray(response.body)).toBe(true);
//         response.body.forEach(plant => {
//             expect(plant.height).toBeGreaterThanOrEqual(0);
//         });
//     });

//     it('should return only sold plants when sold=true', async () => {
//         const response = await request(app).get('/plants').query({ sold: true });
//         expect(response.status).toBe(200);
//         expect(Array.isArray(response.body)).toBe(true);
//         response.body.forEach(plant => {
//             expect(plant.isSold).toBe(true); 
//         });
//     });

//     it('should return 400 if min_height is invalid', async () => {
//         const response = await request(app).get('/plants').query({ min_height: 'invalid' });
//         expect(response.status).toBe(400);
//         expect(response.body).toHaveProperty('error', 'Invalid min_height parameter. Must be equal or bigger than 0.');
//     });

// });

const request = require('supertest');
const app = require('../src/app'); 
const plantService = require('../src/services/PlantService');

jest.mock('../src/services/PlantService');

describe('GET /plants', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all plants when no parameters are provided', async () => {
        // Mocking the getPlants method to return some plants
        const mockPlants = [
            { plant_id: 1, height: 100, batch_id: 'b1', isSold: true },
            { plant_id: 2, height: 80, batch_id: 'b2', isSold: false }
        ];
        plantService.prototype.getPlants.mockReturnValue(mockPlants);
        const response = await request(app).get('/plants');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(mockPlants);
    });

    it('should return plants with height greater than or equal to min_height', async () => {
        const mockPlants = [
            { plant_id: 1, height: 100, batch_id: 'b1', isSold: true }
        ];
        // Mocking the getPlants method to return plants that match the height filter
        plantService.prototype.getPlants.mockReturnValue(mockPlants);
        const response = await request(app).get('/plants').query({ min_height: 50 });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        response.body.forEach(plant => {
            expect(plant.height).toBeGreaterThanOrEqual(50);
        });
    });

    it('should return only sold plants when sold=true', async () => {
        const mockPlants = [
            { plant_id: 1, height: 100, batch_id: 'b1', isSold: true }
        ];
        // Mocking the getPlants method to return sold plants
        plantService.prototype.getPlants.mockReturnValue(mockPlants);
        const response = await request(app).get('/plants').query({ sold: 'true' });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        response.body.forEach(plant => {
            expect(plant.isSold).toBe(true);
        });
    });

    it('should return only unsold plants when sold=false', async () => {
        const mockPlants = [
            { plant_id: 2, height: 80, batch_id: 'b2', isSold: false }
        ];
        // Mocking the getPlants method to return unsold plants
        plantService.prototype.getPlants.mockReturnValue(mockPlants);
        const response = await request(app).get('/plants').query({ sold: 'false' });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        response.body.forEach(plant => {
            expect(plant.isSold).toBe(false);
        });
    });

    it('should return 400 if min_height is invalid', async () => {
        const response = await request(app).get('/plants').query({ min_height: -1 });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid min_height parameter. Must be equal or bigger than 0.');
    });

    it('should return 400 for bad request', async () => {
        // Mocking the getPlants method to throw an error
        plantService.prototype.getPlants.mockImplementation(() => {
            throw new Error("Bad request.");
        });
        const response = await request(app).get('/plants');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Bad request.');
    });
});

