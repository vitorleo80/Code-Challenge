const {expect} = require('chai');
const {orderedJobs} = require('../index');

describe('orderedJobs', () => {

    it('should return empty string for empty input', () => {
        const input = '';
        const actual = orderedJobs(input);
        expect(actual).to.eql([]);
    })
    it('should get the job if a single job is given', () => {
        const input = '{"a": ""}';
        const actual = orderedJobs(input);
        expect(actual).to.eql(['a']);
    })
    it('should get an array in any order when passed jobs without dependencies', () => {
        const input = '{"a": "", "b": "", "c": ""}';
        const actual = orderedJobs(input);
        expect(actual).to.have.lengthOf(3);
        expect(actual).to.contain('a');
        expect(actual).to.contain('b');
        expect(actual).to.contain('c');
    })
    it('should get an array in the correct order, if one job include a dependency', () => {
        const input = '{"a": "", "b": "c", "c": ""}';
        const actual = orderedJobs(input)
        expect(actual).to.eql(["a", "c", "b"])
    })
    it('should get an array in the correct order, if more than one jobs includes dependencies', () => {
        let input = '{"a": "", "b": "c", "c": "f", "d": "a", "e": "b", "f": ""}';
        let actual = orderedJobs(input);
        expect(actual).to.eql(["a", "d", "f", "c", "b", "e"]);
    })
    it("should get an error message when including jobs that depend on themselves", () => {
        let input = '{"a" : "", "b" : "", "c" : "c"}';
        let actual = orderedJobs(input);
        expect(actual).to.equal(`Error: Jobs can’t depend on themselves.`);
    });

    it("should get an error message when including jobs that contains circular dependencies", () => {
        let input = '{"a": "", "b": "c", "c": "f", "d": "a", "e": "", "f": "b"}';
        let actual = orderedJobs(input);
        expect(actual).to.equal(`Error: sequence contains a circular set of dependencies.`);
    });
})