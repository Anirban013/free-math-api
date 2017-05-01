const chai = require('chai')
const path = require('path')
const appDir = (path.resolve(__dirname) + '/').replace('tests/', '')
const mainFile = require('../index.js')

const ocr = mainFile.ocr
const math = mainFile.math
const user = mainFile.user
const api = mainFile.api

var expect = chai.expect

describe('First build and test', () => {
  it('should built without error', function (done) {
    console.log('built without error')
    done()
  })
})

describe('Testing Lib OCR module', () => {
  describe('the functionalities of the Get Lines Method', () => {
    it('should be a function', function(done) {
      expect(typeof ocr.getLines).to.be.equal('function')
      done()
    }) // OK
    it('Should split lines correctly', function(done) {
      this.timeout(5000)
      var fileContent = '2x" -7x +3 = 0\n(2x -1) (x -3)= 0\n\n'
      ocr
        .getLines(fileContent)
        .then(result => {
          // console.log(result)
          expect(result).to.be.an('array')
          expect(result[0]).to.be.a('string').and.to.be.equal('2x" -7x +3 = 0')
          expect(result[1]).to.be.a('string').and.to.be.equal('(2x -1) (x -3)= 0')
          done()
        })
        .catch(err => {
          done(err)
        })
    }) // OK
    it('Should return error when no parameter', function(done) {
      this.timeout(5000)
      ocr
        .getLines()
        .then(result => {
          done(result)
        })
        .catch(err => {
          expect(err).to.be.an('object')
          expect(err.message).to.be.equal('Please provide a parameter')
          done()
        })
    }) // OK
    it('Should return error when type of parameter is not string', function(done) {
      this.timeout(5000)
      ocr
        .getLines(123)
        .then(result => {
          done(result)
        })
        .catch(err => {
          expect(err).to.be.an('object')
          expect(err.message).to.be.equal('Parameter must be a string')
          done()
        })
    })
  })
})

describe('Testing Lib Math Module', () => {
  describe('the functionalities of the getExpType method', () => {
    it('should be a function', function(done) {
      expect(typeof math.getExpType).to.be.equal('function')
      done()
    })
    it('should return normalized equation', function(done) {
      math
      .getExpType('x^2-7x+3=0')
      .then(result => {
        expect(result).to.be.an('object')
        expect(result).to.have.property('expression').equal('x ^ 2 - 7 * x + 3 = 0')
        expect(result).to.have.property('equation').equal(true)
        done()
      })
      .catch(err => {
        done(err)
      })
    })
    it('should return parameter error', function(done) {
      math
      .getExpType()
      .then(result => {
        done(result)
      })
      .catch(err => {
        expect(err).to.be.an('object')
        expect(err.message).to.be.equal('Please provide a parameter')
        done()
      })
    })
    it('should return type error', function(done) {
      math
      .getExpType(123)
      .then(result => {
        done(result)
      })
      .catch(err => {
        expect(err).to.be.an('object')
        expect(err.message).to.be.equal('Parameter must be a string')
        done()
      })
    })
  })
})