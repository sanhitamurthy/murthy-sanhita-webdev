(function(){
    angular
        .module('WAM')
        .factory('userService',userService);

    function userService(){

        var users=[
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api={
            findUserById:findUserById,
            findUserByCredentials:findUserByCredentials,
            findUserByName:findUserByName,
            createUser:createUser,
            updateUser:updateUser,
            deleteUser:deleteUser
        };
        return api;

        function createUser(user){
            user._id=(new Date()).getTime()+"";
            user.created=new Date();//why do v use this
            users.push(user);
            return user;
        }

        function findUserByName(username){
            var user=users.find(function(user){
                return user.username===username;
            });
            if(typeof user==='undefined'){
                return null;
            }
            return user;
        }

        function findUserById(userId)
        {
            for(var u in users)
            {
                if(users[u]._id===userId)
                    return users[u];
            }
            return null;
        }

        function findUserByCredentials(username,password){
            for(var u in users){
                var user=users[u];
                if(user.username===username&&
                    user.password===password){
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, user)
        {
            var updateUser=findUserById(userId);
            updateUser.username=user.username;
            updateUser.password=user.password;
            updateUser.firstName=user.firstName;
            updateUser.lastName=user.lastName;
        }

        function deleteUser(userId)
        {
            var user=findUserById(userId);
            var index=users.indexOf(user);
            users.splice(index,1);
        }
    }
})();