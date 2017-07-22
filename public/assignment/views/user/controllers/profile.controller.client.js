(function(){
    angular
        .module('WAM')
        .controller('profileController',profileController);

    //$ means created by underlined framework
    function profileController($location,$routeParams,userService){

        var model=this;

        model.userId=$routeParams['userId'];


        model.user=userService.findUserById(model.userId)

        function updateUser(userId,user){

            userService.updateUser(userId, user);
            $location.url('/user/'+userId);

        }

    }
})();
