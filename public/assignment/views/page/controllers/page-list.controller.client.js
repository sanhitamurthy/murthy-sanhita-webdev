(function(){
    angular
        .module('WAM')
        .controller('pageListController',pageListController);

    function pageListController($routeParams,pageService){

        var model=this;

        model.userId=$routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];


        function init() {
           pageService
               .findPageByWebsiteId(model.websiteId)
               .then(renderPages);
        }

        init();

        function renderPages(pages){
            model.pages=pages;
        }

    }
})();
