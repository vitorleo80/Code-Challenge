const {expect} = require('chai');
const {orderedJobs} = require('../index');

describe('orderedJobs', () => {

    it('should return empty string for empty input', () => {
        const input = '';
        const actual = orderedJobs(input);
        expect(actual).to.eql([]);
    })
})