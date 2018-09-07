class Users {
    constructor (){
        this.users = [];
    }

    addUser(id,name,room){
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        //remove user and returned removed user
        var removedUser = this.users.filter((user) => user.id === id)[0];    

        //update usesr array
        if(removedUser){
            this.users = this.users.filter((user) => user.id !== id);
        }
        
        return removedUser;
    }

    getUser(id){
        //get the user by id
        return this.users.filter((user) => user.id === id)[0];        
    }

    getUserNames(room){
        //get all user names in the room
        var users = this.users.filter((user) => user.room === room); 
        var userNames = users.map((user) => user.name);
        return userNames;
    }
}


module.exports = {
    Users
}