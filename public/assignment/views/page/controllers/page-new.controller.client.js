(function(){

    angular
        .module('WAM')
        .controller('pageNewController',pageNewController);

    function pageNewController($routeParams,pageService,$location) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId=$routeParams['websiteId'];
        model.createPage=createPage;


        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages);
        }

        init();

        function renderPages(pages)
        {
            model.pages=pages;
        }

        function createPage(page){

            pageService
                .createPage(model.websiteId,page)
                .then(function(){
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });

        }

    }



})();
