const request= require('supertest');
const jokesRouter= require('../api/server');
const authRouter= require('../api/server');
const db= require('../database/dbConfig');

beforeEach(async () => {
    await db('users').truncate();
  });


describe('jokesRouter', () => {

    describe('get request', () => {

        //test 1 receives 401 error due to no user login
        it('should return success status', async () => {
            const expectedStatusCode= 400;
            
            const response = await request(jokesRouter).get('/api/jokes');

            expect(response.status).toEqual(expectedStatusCode);
        })


//         //test 2: returns "you": "shall not pass" due to no user login
        it('should return jokes', async () => {
            const jokesURL=({"message": "No authorization token provided"})    

            const response= await request(jokesRouter).get('/api/jokes');

            expect(response.body).toEqual(jokesURL)
        })
     })
})