const expect = require('expect');
const {isRealString} = require('./validation');

describe('validation' , () => {
    it('should return true',(done) => {
        expect(isRealString('abc')).toBeTruthy();
        done();
    });

    it('should return false',(done) => {
        expect(isRealString(123)).toBeFalsy();
        done();
    });

    it('should return false',(done) => {
        expect(isRealString('   ')).toBeFalsy();
        done(); 
    });
});