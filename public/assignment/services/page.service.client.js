(function(){
    angular
        .module('WAM')
        .service('pageService',pageService);

    function pageService($http) {

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
            var url="/api/assignment/website/"+websiteId+"/page";
            return $http.post(url,page)
                .then(function(response){
                    return response.data;
                });

        }


        function findPageByWebsiteId(websiteId) {
            var url="/api/assignment/website/"+websiteId+"/page";
            return $http.get(url)
                .then(function(response){
                    return response.data;
                }, function (res) {
                    console.log("service client");
                });



        }

        function findPageById(pageId) {
            var url="/api/assignment/page/"+pageId;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });



        }

        function updatePage(pageId, page){
            var url="/api/assignment/page/"+pageId;
            return $http.put(url,page)
                .then(function(response){
                    return response.data;
                });

        }

        function deletePage(pageId){
            var url="/api/assignment/page/"+pageId;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                });

        }

    }

})();