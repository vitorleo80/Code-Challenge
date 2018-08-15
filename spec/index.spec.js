const {expect} = require('chai')
const {orderedJobs} = require('../index')

describe('orderedJobs', () => {

    it('should return empty string for empty input', () => {
        let input = ''
        let actual = orderedJobs(input)
        expect(actual).to.eql([])

        input = '{}'
        actual = orderedJobs(input)
        expect(actual).to.eql([])
    })
    it('should get the job if a single job is given', () => {
        let input = '{"a": ""}'
        let actual = orderedJobs(input)
        expect(actual).to.eql(['a'])
        
        input = '{"b": ""}'
        actual = orderedJobs(input)
        expect(actual).to.eql(['b'])
    })
    it('should get an array in any order when passed jobs without dependencies', () => {
        let input = '{"a": ""}'
        let actual = orderedJobs(input)
        expect(actual).to.have.lengthOf(1)
        expect(actual).to.contain('a')
        
        input = '{"a": "", "b": "", "c": ""}'
        actual = orderedJobs(input)
        expect(actual).to.have.lengthOf(3)
        expect(actual).to.contain('a')
        expect(actual).to.contain('b')
        expect(actual).to.contain('c')
        
        input = '{"d": "", "e": "", "f": "", "g": "", "h": "", "i": ""}'
        actual = orderedJobs(input)
        expect(actual).to.have.lengthOf(6)
        expect(actual).to.contain('d')
        expect(actual).to.contain('e')
        expect(actual).to.contain('f')
        expect(actual).to.contain('g')
        expect(actual).to.contain('h')
        expect(actual).to.contain('i')
    })
    it('should get an array in the correct order, if one job include a dependency', () => {
        let input = '{"g": "h"}'
        let actual = orderedJobs(input)
        expect(actual.indexOf('h')).to.below(actual.indexOf('g'))
        
        input = '{"a": "", "b": "c", "c": ""}'
        actual = orderedJobs(input)
        expect(actual).to.eql(["a", "c", "b"])
        
        input = '{"d": "f", "e": "", "f": ""}'
        actual = orderedJobs(input)
        expect(actual).to.have.lengthOf(3)
        expect(actual).to.contain('e')
        expect(actual.indexOf('f')).to.below(actual.indexOf('d'))
    })
    it('should get an array in the correct order, if more than one jobs includes dependencies', () => {
        let input = '{"a": "", "b": "c", "c": "f", "d": "a", "e": "b", "f": ""}'
        let actual = orderedJobs(input)
        expect(actual).to.eql(["a", "d", "f", "c", "b", "e"])
        
        input = '{"g": "", "h": "i", "i": "l", "j": "g", "k": "h", "l": ""}'
        actual = orderedJobs(input)
        expect(actual).to.have.lengthOf(6);
        expect(actual.indexOf('l')).to.below(actual.indexOf('i'));
        expect(actual.indexOf('g')).to.below(actual.indexOf('j'));
        expect(actual.indexOf('h')).to.below(actual.indexOf('k'));
    })
    it("should get an error message when including jobs that depend on themselves", () => {
        let input = '{"a" : "a"}'
        let actual = orderedJobs(input)
        expect(actual).to.equal(`Error: Jobs can’t depend on themselves.`)
        
        input = '{"a" : "", "b" : "", "c" : "c"}'
        actual = orderedJobs(input)
        expect(actual).to.equal(`Error: Jobs can’t depend on themselves.`)
        
        input = '{"d" : "d", "e" : "", "f" : "f"}'
        actual = orderedJobs(input)
        expect(actual).to.equal(`Error: Jobs can’t depend on themselves.`)
    })

    it("should get an error message when including jobs that contains circular dependencies", () => {
        let input = '{"a": "", "b": "c", "c": "f", "d": "a", "e": "", "f": "b"}'
        let actual = orderedJobs(input)
        expect(actual).to.equal(`Error: sequence contains a circular set of dependencies.`)
        
        input = '{"g": "", "h": "i", "i": "l", "j": "g", "k": "", "l": "h"}'
        actual = orderedJobs(input)
        expect(actual).to.equal(`Error: sequence contains a circular set of dependencies.`)

        input = '{"m": "", "n": "o", "o": "n"}'
        actual = orderedJobs(input)
        expect(actual).to.equal(`Error: sequence contains a circular set of dependencies.`)
    })
})

