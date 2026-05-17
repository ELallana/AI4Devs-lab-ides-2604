import request from 'supertest';
import { app } from '../index';

describe('GET /', () => {
    it('responds with Hola LTI!', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Hola LTI!');
    });
});

describe('POST /candidates', () => {
    it('creates a candidate with valid data', async () => {
        const response = await request(app)
            .post('/candidates')
            .field('name', 'John')
            .field('surname', 'Doe')
            .field('email', 'john@example.com')
            .field('phone', '123456789');

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('John');
        expect(response.body).not.toHaveProperty('resume');
    });

    it('returns 400 when required fields are missing', async () => {
        const response = await request(app)
            .post('/candidates')
            .field('name', 'John');

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    it('returns 400 when email format is invalid', async () => {
        const response = await request(app)
            .post('/candidates')
            .field('name', 'John')
            .field('surname', 'Doe')
            .field('email', 'not-an-email')
            .field('phone', '123456789');

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toContain('email');
    });
});
