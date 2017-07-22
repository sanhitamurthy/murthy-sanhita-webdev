(function(){

    angular
        .module('WAM')
        .controller('pageEditController',pageEditController);

    function pageEditController($routeParams,pageService,$location) {
        var model = this;

        model.userId=$routeParams['userId'];
        model.pageId = $routeParams['pageId'];
        model.websiteId=$routeParams['websiteId'];
        model.deletePage=deletePage;


        function init() {
            model.pages=pageService.findPageByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);

        }
        init();

        function deletePage(pageId){
            pageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }



})();
