const expect = require('expect');
const {generateMessage} = require('./message');

describe('generateMessage',() => {
    it('should generate the correct message object' , (done) => {
        var from = 'abc';
        var text = 'Hello. How r u?';
        var message =  generateMessage(from,text);
        expect(message).toBeDefined();
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        //expect(message.createdAt).toExist();
        expect(message.createdAt).toBeDefined();        
        done();
    });
});