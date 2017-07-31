(function() {

    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            websiteService
                .findAllWebsiteForUser(model.userId)
                .then(renderWebsites);
            websiteService
                .findWebsiteById(model.websiteId)
                .then(renderWebsite);
        }

        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }

        function renderWebsite(website) {
            model.website = website;
        }

        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(websiteId)
                .then(function () {
                        $location.url('/user/' + model.userId + '/website')
                    }
                    , function () {
                        model.error = "Unable to unregister you";
                    });
        }

        function updateWebsite(websiteId, website) {
            websiteService
                .updateWebsite(websiteId, website)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website');
                });
        }
    }
})();




