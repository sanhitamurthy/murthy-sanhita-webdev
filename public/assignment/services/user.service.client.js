(function(){
    angular
        .module('WAM')
        .factory('userService',userService);

    function userService($http){

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
            deleteUser:deleteUser,
            logout:logout

        };
        return api;


        function logout()
        {
            var url="api/assignment/logout";
            return $http.post(url)
                .then(function(response){
                    return response.data;
                })
        }

        function createUser(user) {
            //create operaations use post, read uses get ,create new instances post,updtae use put,remove delete
            var url = "/api/assignment/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });

            // user._id=(new Date()).getTime()+"";
            // user.created=new Date();//why do v use this
            // users.push(user);
            // return user;
        }

        function findUserByName(username){

            var url="/api/assignment/user?username="+username;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
            // var user=users.find(function(user){
            //     return user.username===username;
            // });
            // if(typeof user==='undefined'){
            //     return null;
            // }
            // return user;
        }

        function findUserById(userId)
        {
            var url="/api/assignment/user/"+userId;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });

            // for(var u in users)
            // {
            //     if(users[u]._id===userId)
            //         return users[u];
            // }
            // return null;
        }

        function findUserByCredentials(username,password){

            var url="/api/assignment/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });

            // for(var u in users){
            //     var user=users[u];
            //     if(user.username===username&&
            //         user.password===password){
            //         return user;
            //     }
            // }
            // return null;
        }

        function updateUser(userId, user)
        {
            var url="/api/assignment/user/"+userId;
            return $http.put(url,user)
                .then(function(response){
                    return response.data;
                });
        }

        function deleteUser(userId)
        {
            var url="/api/assignment/user/"+userId;
            return $http.delete(url)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();