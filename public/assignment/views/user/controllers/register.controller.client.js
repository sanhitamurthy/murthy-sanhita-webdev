(function(){
    angular
        .module('WAM')
        .controller('registerController',registerController);

    function registerController($location,userService) {

        var model = this;

        // var users=[
        //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        // ]

        model.register = register;


        function register(username, password, password2) {

            if (username === null || username === '' || typeof username === 'undefined') {
                model.error = "username is required";
                return
            }
            if (password !== password2 || password === null ||
                typeof password === 'undefined') {
                model.error = "passwords must match";
                return
            }
            // var found=userService.findUserByName(username);
            userService
                .findUserByName(username)
                .then(function () {
                        model.error = "Sorry! That username is taken";
                    },
                    function () {
                        var newUser = {
                            username: username,
                            password: password
                        };
                        return userService
                            .createUser(newUser)

                            })
                .then(function(user){
                    $location.url('/user/' + user._id);

                    });
        }
    }

})();
