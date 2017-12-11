//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var vin = require('../app/models/vin');
var should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Vins', function () {
  before(function (done) { //Before each test we empty the database
    vin.remove({}, function (err) {
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
    it('it should GET list with one element', function (done) {
      let vin1 = require('./jdd/vin1.json');
      new vin(vin1).save().then(function(vin) {
        chai.request(server)
        .get('/vins')
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          res.body[0].nom.should.be.eql(vin1.nom);
          res.body[0].annee.should.be.eql(vin1.annee);
          done();
        });
      });
    });
    it('it should GET list with two elements', function (done) {
      let vin2 = require('./jdd/vin2.json');
      new vin(vin2).save().then(function (res) {
        chai.request(server)
        .get('/vins')
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          res.body[1].nom.should.be.eql(vin2.nom);
          res.body[1].annee.should.be.eql(vin2.annee);
          done();
        });
      });
    });
  });

  /*
  * Test the /POST route
  */
  describe('/POST Vins', function () {
    it('it should add a vin in list', function (done) {
      var vin = require('./jdd/vin3.json')
      chai.request(server)
      .post('/vins')
      .send(vin)
      .end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('vin');
        res.body.vin.nom.should.be.eql(vin.nom);
        res.body.vin.annee.should.be.eql(vin.annee);
        done();
      });
    });
    it('it shouldn\'t add a vin without a mandatory field', function(done) {
      var vin = {nom: 'test'};
      chai.request(server)
      .post('/vins')
      .send(vin)
      .end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });
  });

  describe('/PUT Vins', function () {
  });
});
