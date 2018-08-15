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
    it('should get an array in the correct order, if jobs includes dependencies', () => {
        const input = '{"a": "", "b": "c", "c": ""}';
        const actual = orderedJobs(input)
        expect(actual).to.eql(["a", "c", "b"])
    })
})