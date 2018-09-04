const expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./message');

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

describe('generateLocationMessage' , () => {
    it('should return correct location object' , (done) => {
        var from = "santa";
        var latitude = 1;
        var longitude = 2;
        var url = 'https://www.google.com/maps?q='+latitude+','+longitude;
        var message = generateLocationMessage(from,latitude,longitude);
        expect(message.from).toBe(from);
        expect(message.url).toBe(url);
        expect(message.createdAt).toBeDefined();        
        done();
    })
});