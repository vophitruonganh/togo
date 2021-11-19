const request = require('supertest');
const app = require('../src');

describe('GET /login', function() {
	it('responds with json', function(done) {
		request(app)
			.get('/login?user_id=test_user_id_1&password=123456')
			.set('Accept', 'application/json')
			.expect(200, done);
	});
});

describe('POST /register', function() {
	it('register success', function(done) {
		request(app)
			.post('/register')
			.send(`user_id=test_user_id_${Math.random().toString()}`)
			.send('password=123456')
			.set('Accept', 'application/json')
			.expect(200, done);
	});

	it('register error', function(done) {
		request(app)
			.post('/register')
			.send(`user_id=test_user_id_2}`)
			.send('password=123456')
			.set('Accept', 'application/json')
			.expect(401, done);
	});
});

describe('GET /tasks', function() {
	it('get task error', function(done) {
		request(app)
			.get('/tasks?created_date=2020-06-29&page=1&limit=100')
			.set('Authorization', 'abc')
			.set('Accept', 'application/json')
			.expect(401, done);
	});

	it('get task success - has data', async function() {
		const data = await request(app)
			.get('/login?user_id=test_user_id_1&password=123456')
			.set('Accept', 'application/json');

		const response = await  request(app)
			.get('/tasks?created_date=2020-06-29')
			.set('Authorization', data.body.data.token)
			.set('Accept', 'application/json')
			.expect(200);
		expect(response.body).not.toBeUndefined();
		expect(response.body.data.length).toBeGreaterThan(0);

		// done()
	});
});