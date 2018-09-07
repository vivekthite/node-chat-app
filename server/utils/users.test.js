const expect = require('expect');
const {Users} = require('./users');

describe('users',() => {

    var users;

    beforeEach((done) => {
        users = new Users();
        users.users = [{
            id: 'id1',
            name: 'name1',
            room: 'room1'
        },{
            id: 'id2',
            name: 'name2',
            room: 'room2'
        },{
            id: 'id3',
            name: 'name3',
            room: 'room1'
        }];
        done();
    });

    it('should add the user',(done) => {
        var user = {
            id: '1234',
            name: 'name1',
            room: 'room1'
        };

        //var users = new Users();
        users.addUser(user.id,user.name,user.room);
        //expect(users.users).toEqual([user]);
        expect(users.users.length).toBe(4);
        done();
    });

    it('should get the user names from room1' , (done) => {
        expect(users.getUserNames('room1')).toEqual(['name1','name3']);
        done();
    });

    it('should get the user whose id is id1',(done) => {
        expect(users.getUser('id1')).toEqual(users.users[0]);
        done();
    });

    it('shoud not return user with id as id4',(done) => {
        expect(users.getUser('id4')).toBeUndefined();
        done();
    });

    it('should remove the user whose id is id1',(done) => {
        expect(users.removeUser('id1').id).toBe('id1');
        expect(users.users.length).toBe(2);
        expect(users.getUser('id1')).toBeUndefined();
        done();
    });

    it('shoud not remove the user with id as id4',(done) => {
        expect(users.removeUser('id4')).toBeUndefined();
        expect(users.users.length).toBe(3);
        done();
    });
});