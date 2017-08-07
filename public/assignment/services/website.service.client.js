(function(){
    angular
        .module('WAM')
        .service('websiteService',websiteService);

    function websiteService($http){
        this.findAllWebsiteForUser=findAllWebsiteForUser;
        this.findWebsiteById=findWebsiteById;
        this.deleteWebsite=deleteWebsite;
        this.createWebsiteForUser=createWebsiteForUser;
        this.updateWebsite=updateWebsite;


        var websites=[
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];


            function createWebsiteForUser(website,userId){
                var url="/api/assignment/user/"+userId+"/website";
                return $http.post(url,website)
                    .then(function(response){
                        return response.data;
                    });

            }

            function deleteWebsite(userId,websiteId){
                var url="/api/assignment/user/"+userId+"/website/"+websiteId;
                return $http.delete(url)
                    .then(function(response){
                        return response.data;
                    });


            }

            function findAllWebsiteForUser(userId){

                var url="/api/assignment/user/"+userId+"/website";
                return $http.get(url)
                    .then(function(response){
                        return response.data;
                    });

        }


        function findWebsiteById(websiteId){
            var url="/api/assignment/website/"+websiteId;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function updateWebsite(websiteId, website){
            var url="/api/assignment/website/"+websiteId;
            return $http.put(url,website)
                .then(function(response){
                    return response.data;
                });



        }
    }






})();