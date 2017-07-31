(function(){

    angular
        .module('WAM')
        .controller('websiteNewController',websiteNewController);

    function websiteNewController($routeParams,websiteService,$location) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.createWebsite=createWebsite;


        function init() {
            websiteService
                .findAllWebsiteForUser(model.userId)
                .then(renderWebsites)
        }
        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }



        function createWebsite(website){

            websiteService
                .createWebsite(website,model.userId)
                .then(function(){
                    $location.url('/user/'+model.userId+'/website')
                });
        }

    }



})();
