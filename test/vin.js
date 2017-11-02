//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Vins', () => {
/*  beforeEach((done) => { //Before each test we empty the database
    db.collection(VINS_COLLECTION).deleteOne({}, (err) => {
      done();
    });
  });*/
/*
  * Test the /GET route
  */
  describe('/GET Vins', () => {
      it('it should GET all the vins', (done) => {
        chai.request(server)
            .get('/vins')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});
