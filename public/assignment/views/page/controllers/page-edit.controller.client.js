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
        model.updatePage=updatePage;


        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages);
            pageService
                .findPageById(model.pageId)
                .then(renderPage);

        }

        init();

        function renderPages(pages){
            model.pages=pages;
        }

        function renderPage(page){
            model.page=page;
        }

        function deletePage(pageId){
            pageService
                .deletePage(pageId)
                .then(function(){
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });

        }

        function updatePage(pageId,page){
            pageService
                .updatePage(pageId, page)
                .then(function(){
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                });

        }
    }



})();
