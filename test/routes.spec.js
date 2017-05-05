process.env.NODE_ENV = 'test';

const environment = 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')

chai.use(chaiHttp)

describe('Jet Fuel server testing', () => {
  before((done) => {
    database.migrate.latest()
    .then(() => {
      database.seed.run()
      .then(() => {
        done()
      })
    })
  })

  afterEach((done) => {
    database.seed.run()
    .then(() => {
      done()
    })
  })

  describe('Client routes', () => {
    it('should return all folders', (done) => {
      chai.request(server)
      .get('/api/v1/folders')
      .end((error, response) => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('array')
        response.body.should.have.length(2)
        response.body[0].should.have.property('title')
        response.body[0].should.have.property('id')
        done()
      })
    })
  })

  describe('POST /api/v1/folders', () => {
    it('should create a new folder', (done) => {
      chai.request(server)
      .post('/api/v1/folders')
      .send({
        id: '7',
        title: 'New Folder'
      })
      .end((error, response) => {
        response.should.have.status(201)
        response.body.should.be.a('object')
        response.body.should.have.property('title')
        chai.request(server)
        .get('/api/v1/folders')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          done()
        })
      })
    })
  })

  describe('GET /api/v1/links', () => {
    it('should return all links', (done) => {
      chai.request(server)
      .get('/api/v1/links')
      .end((error,response) => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('array')
        response.body[0].should.have.property('name')
        response.body[0].should.have.property('url')
        done()
      })
    })
  })

  describe('POST /api/v1/links', () => {
    it('should create a new link', (done) => {
      chai.request(server)
      .post('/api/v1/links')
      .send({
        id: 1,
        folder_id: 1,
        name: 'Reddit',
        url: 'http://www.reddit.com',
        visits: '0'
      })
      .end((error, response) => {
        console.log(response.body);
        response.should.have.status(201)
        response.body.should.be.a('object')
        response.body.should.have.property('name')
        response.body.should.have.property('visits')
        response.body.should.have.property('url')
        chai.request(server)
        .get('/api/v1/links')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          done()
        })
      })
    })
  })

})