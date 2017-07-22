(function(){
    angular
        .module('WAM')
        .service('pageService',pageService);

    function pageService() {

            this.findPageByWebsiteId= findPageByWebsiteId;
            this.findPageById=findPageById;
            this.createPage= createPage;
            this.updatePage=updatePage;
            this.deletePage=deletePage;

        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];



        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId=websiteId;
            pages.push(page);

        }


        function findPageByWebsiteId(websiteId) {
            var results = [];

            for (var w in pages) {
                if (pages[w].websiteId === websiteId) {
                    results.push(pages[w]);
                }
            }
            return results;
        }

        function findPageById(pageId) {
            return pages.find(function (page){
                return page._id===pageId;
            });

        }

        function updatePage(pageId, page){
            var updatePage=findPageById(pageId);
            updatePage.name=page.name;
            updatePage.description=page.description
        }

        function deletePage(pageId){
            var page=findPageById(pageId);
            var index=pages.indexOf(page);
            pages.splice(index,1);
        }

    }

})();