'use strict'

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
let expect = chai.expect

chai.use(chaiHttp)

const usersUrl = 'localhost:3000/users';

describe('Users', () => {

	describe('/GET module health', () => {
		it('should return module status', (done) => {
			chai.request(usersUrl)
				.get('/health')
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(200)
					expect(res.body).to.have.all.keys([ 'status', 'timestamp' ])
					done()	
			})
		})
	})

	describe('/GET user list', () => {
		it('should get all users', (done) => {
			chai.request(usersUrl)
				.get('/')
				.end((err, res) => {
					expect(res).to.have.status(200)
					expect(res.body).to.be.an('object')
					expect(res.body).to.have.all.keys([ 'error', 'result' ]);
					expect(res.body.error).to.be.null;
					expect(res.body.result).to.be.an('array');
					done()	
				})
		})
	})

})