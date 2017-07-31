(function(){

    angular
        .module('WAM')
        .controller('websiteListController',websiteListController);

    function websiteListController($routeParams,websiteService) {
        var model = this;

        model.userId = $routeParams['userId'];
        function init() {
            // model.websites = websiteService.findAllWebsiteForUser(model.userId);
            websiteService
                .findAllWebsiteForUser(model.userId)
                .then(renderWebsites);
        }

        init();

        function renderWebsites(websites){
            model.websites=websites;
        }
    }



})();
