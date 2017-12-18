//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

//Require the dev-dependencies
var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../server')
var Vin = require('../app/models/vin')
var Emplacement = require('../app/models/emplacement')
global.should = chai.should()

chai.use(chaiHttp)
//Our parent block
describe('Vins', function () {
  before(function (done) { //Before each test we empty the database
    Vin.remove({}).then(() => {done()})
  })

  /*
  * Test the /GET route
  */
  describe('/GET Vins', function () {
    it('it should GET all the vins', function (done) {
      chai.request(server)
        .get('/vins')
        .end(function (err, res) {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(0)
          done()
        })
    })
    it('it should GET list with one element', function (done) {
      let vin1 = require('./jdd/vin1.json')
      let empl1 = require('./jdd/empl1.json')
      new Vin(vin1).save().then(function(vin) {
        new Emplacement({...empl1, vin : vin._id}).save().then(function(empl) {
          vin.emplacements.push(empl._id)
          vin.save().then(function() {
            chai.request(server)
            .get('/vins')
            .end(function (err, res) {
              res.should.have.status(200)
              res.body.should.be.a('array')
              res.body.length.should.be.eql(1)
              res.body[0].nom.should.be.eql(vin1.nom)
              res.body[0].annee.should.be.eql(vin1.annee)
              res.body[0].emplacements.length.should.be.eql(1)
              res.body[0].emplacements[0].should.have.property('rangee')
              done()
            })
          })
        })
      })
    })
    it('it should GET list with two elements', function (done) {
      let vin2 = require('./jdd/vin2.json')
      new Vin(vin2).save().then(function () {
        chai.request(server)
          .get('/vins')
          .end(function (err, res) {
            res.should.have.status(200)
            res.body.should.be.a('array')
            res.body.length.should.be.eql(2)
            res.body[1].nom.should.be.eql(vin2.nom)
            res.body[1].annee.should.be.eql(vin2.annee)
            done()
          })
      })
    })
  })

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
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.have.property('vin')
          res.body.vin.nom.should.be.eql(vin.nom)
          res.body.vin.annee.should.be.eql(vin.annee)
          done()
        })
    })
    it('it shouldn\'t add a vin without a mandatory field', function(done) {
      var vin = {nom: 'test'}
      chai.request(server)
        .post('/vins')
        .send(vin)
        .end(function (err, res) {
          res.should.have.status(400)
          done()
        })
    })
  })

  describe('/PUT Vins', function () {
    it('should update a existing vin', function (done) {
      let vin1 = require('./jdd/vin1.json')
      Vin.find({nom:vin1.nom}).exec(function(err,res) {
        let vinTmp = res[0]
        vinTmp.nom = 'testUpdate'
        chai.request(server)
          .put('/vin/' + vinTmp._id)
          .send(vinTmp)
          .end(function (err, res) {
            res.should.have.status(200)
            res.body.should.have.property('vin')
            res.body.vin.nom.should.be.eql(vinTmp.nom)
            res.body.vin.annee.should.be.eql(vinTmp.annee)
            done()
          })
      })
    })
    it('shouldn\'t update if id is non set', function (done) {
      chai.request(server)
        .put('/vin')
        .send({_id:123, nom:'AAA', annee:2010})
        .end(function (err, res) {
          res.should.have.status(404)
          done()
        })
    })
    it('shouldn\'t update if id is not existing', function (done) {
      chai.request(server)
        .put('/vin/123')
        .send({_id:123, nom:'AAA', annee:2010})
        .end(function (err, res) {
          res.should.have.status(404)
          done()
        })
    })
  })
})
