//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Vins', function () {
/*  beforeEach((done) => { //Before each test we empty the database
    db.collection(VINS_COLLECTION).deleteOne({}, (err) => {
      done();
    });
  });*/
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

});
