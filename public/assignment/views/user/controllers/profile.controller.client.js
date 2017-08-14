(function(){
    angular
        .module('WAM')
        .controller('profileController',profileController);

    //$ means created by underlined framework
    function profileController($location,$routeParams,userService){

        var model=this;

        model.userId=$routeParams['userId'];
        model.updateUser=updateUser;
        model.deleteUser=deleteUser;
        model.logout=logout();


        // model.user=userService.findUserById(model.userId)

        userService
            .findUserById(model.userId)
            .then(renderUser,userError);

        function renderUser(user){
            model.user=user;
        };

        function userError(error)
        {
            model.error="User not found";
        }

        function updateUser(user){

            userService
                .updateUser(user._id, user)
                .then(function(){
                    model.message="User update successful";
                });
            // $location.url('/user/'+userId);

        }

        function deleteUser(user)
        {
            userService
                .deleteUser(user._id)
                .then(function(){
                    $location.url('/');
                },function(){
                    model.error="Unable to unregister you";
                });

        }



        function logout(){
            userService
                .logout()
                .then(function(){
                    $location.url('/login');
                });
        }

    }
})();
