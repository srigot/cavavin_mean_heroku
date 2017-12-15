//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var Emplacement = require('../app/models/emplacement');
var Vin = require('../app/models/vin');
var should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Emplacements', function () {
  before(function (done) { //Before each test we empty the database
    new Vin(require('./jdd/vin1.json')).save()
    new Vin(require('./jdd/vin2.json')).save()
    Emplacement.remove({}, function (err) {
      done();
    });
  });

 /*
  * Test the /GET route
  */
  describe('/GET Emplacements', function () {
    it('it should GET all the emplacements', function (done) {
      chai.request(server)
      .get('/emplacements')
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
/*    it('it should GET list with one element', function (done) {
      new vin(require('./jdd/vin1.json')).save().then(function(vin) {
        chai.request(server)
        .get('/vins')
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          done();
        });
      });
    });
    it('it should GET list with two elements', function (done) {
      new vin(require('./jdd/vin2.json')).save().then(function (res) {
        chai.request(server)
        .get('/vins')
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          done();
        });
      });
    });*/
  });

  /*
  * Test the /POST route
  */
  describe('/POST Emplacements', function () {
    it('it should not POST a book without pages field', function (done) {
      var empl = require('./jdd/empl1.json')
      let vin1 = require('./jdd/vin1.json');
      vin.find({nom:vin1.nom}).exec(function(err,res) {
        empl.vin = res ;
        chai.request(server)
          .post('/emplacements')
          .send(empl)
          .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('emplacement');
            done();
        });
      });
    });
  });
});
