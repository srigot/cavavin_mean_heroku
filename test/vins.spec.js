//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var vin = require('../app/models/vin');
var should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Vins', () => {
  beforeEach((done) => { //Before each test we empty the database
    vin.remove({}, (err) => {
      done();
    });
  });
/*
  * Test the /GET route
  */
  describe('/GET Vins', function () {
      it('it should GET all the vins', function (done) {
        chai.request(server)
            .get('/vins')
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  /*
  * Test the /POST route
  */
  describe('/POST Vins', () => {
    it('it should not POST a book without pages field', (done) => {
      let vin = {
        nom: "Vin test",
        annee : 2010
      }
      chai.request(server)
        .post('/vins')
            .send(vin)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('vin');
              done();
            });
      });
    });
});
