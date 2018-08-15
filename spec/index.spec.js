const {expect} = require('chai')
const {orderedJobs} = require('../index')

describe('orderedJobs', () => {

    it('should return empty string for empty input', () => {
        let input = ''
        expect(orderedJobs(input)).to.eql([])

        input = '{}'
        expect(orderedJobs(input)).to.eql([])
    })
    it('should get the job if a single job is given', () => {
        let input = '{"a": ""}'
        expect(orderedJobs(input)).to.eql(['a'])
        
        input = '{"b": ""}'
        expect(orderedJobs(input)).to.eql(['b'])
    })
    it('should get an array in any order when passed jobs without dependencies', () => {
        
        input = '{"a": "", "b": "", "c": ""}'
        actual = orderedJobs(input)
        expect(actual).to.have.lengthOf(3)
        expect(actual).to.contain('a', 'b', 'c')
        
        input = '{"d": "", "e": "", "f": "", "g": "", "h": "", "i": ""}'
        actual = orderedJobs(input)
        expect(actual).to.have.lengthOf(6)
        expect(actual).to.contain('d', 'e', 'f', 'g', 'h', 'i')
    })
    it('should get an array in the correct order, if one job include a dependency', () => {
        let input = '{"g": "h"}'
        let actual = orderedJobs(input)
        expect(actual.indexOf('h')).to.below(actual.indexOf('g'))
        
        input = '{"a": "", "b": "c", "c": ""}'
        expect(orderedJobs(input)).to.eql(["a", "c", "b"])
        
        input = '{"d": "f", "e": "", "f": ""}'
        actual = orderedJobs(input)
        expect(actual).to.have.lengthOf(3)
        expect(actual).to.contain('e')
        expect(actual.indexOf('f')).to.below(actual.indexOf('d'))
    })
    it('should get an array in the correct order, if more than one jobs includes dependencies', () => {
        let input = '{"a": "", "b": "c", "c": "f", "d": "a", "e": "b", "f": ""}'
        expect(orderedJobs(input)).to.eql(["a", "d", "f", "c", "b", "e"])
        
        input = '{"g": "", "h": "i", "i": "l", "j": "g", "k": "h", "l": ""}'
        actual = orderedJobs(input)
        expect(actual).to.have.lengthOf(6);
        expect(actual.indexOf('l')).to.below(actual.indexOf('i'));
        expect(actual.indexOf('g')).to.below(actual.indexOf('j'));
        expect(actual.indexOf('h')).to.below(actual.indexOf('k'));
    })
    it('should get an error message when including jobs that depend on themselves', () => {
        const errorMsg = `Jobs can’t depend on themselves.`
        let input = '{"a" : "a"}'
        expect(function(){ orderedJobs(input)}).to.throw(Error, errorMsg)
        
        input = '{"a" : "", "b" : "", "c" : "c"}'
        expect(function () { orderedJobs(input) }).to.throw(Error, errorMsg)
        
        input = '{"d" : "d", "e" : "", "f" : "f"}'
        expect(function () { orderedJobs(input) }).to.throw(Error, errorMsg)
    })

    it('should get an error message when including jobs that contains circular dependencies', () => {
        const errorMsg = 'Sequence contains a circular set of dependencies.'
        let input = '{"a": "", "b": "c", "c": "f", "d": "a", "e": "", "f": "b"}'
        expect(function(){ orderedJobs(input)}).to.throw(Error, errorMsg)
        
        input = '{"g": "", "h": "i", "i": "l", "j": "g", "k": "", "l": "h"}'
        expect(function(){ orderedJobs(input)}).to.throw(Error, errorMsg)

        input = '{"m": "", "n": "o", "o": "n"}'
        expect(function(){ orderedJobs(input)}).to.throw(Error, errorMsg)
    })
})

