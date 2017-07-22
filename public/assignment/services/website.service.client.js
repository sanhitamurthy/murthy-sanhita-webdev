(function(){
    angular
        .module('WAM')
        .service('websiteService',websiteService);

    function websiteService(){
        this.findAllWebsiteForUser=findAllWebsiteForUser;
        this.findWebsiteById=findWebsiteById;
        this.deleteWebsite=deleteWebsite;
        this.createWebsite=createWebsite;
        this.updateWebsite=updateWebsite


        var websites=[
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];


            function createWebsite(website){
                website._id=(new Date()).getTime()+"";
                websites.push(website);
            }

            function deleteWebsite(websiteId){
                var website=findWebsiteById(websiteId);
                var index=websites.indexOf(website);
                websites.splice(index,1);
            }

            function findAllWebsiteForUser(userId){
            var results=[];

            for(var v in websites)
            {
                if(websites[v].developerId===userId){
                    results.push(websites[v]);
                }
            }
            return results;
        }


        function findWebsiteById(websiteId){
                return websites.find(function (website){
                    return website._id===websiteId;
                });
        }

        function updateWebsite(websiteId, website){
            var updateWebsite=findWebsiteById(websiteId);
            updateWebsite.name=website.name;
            updateWebsite.description=website.description;

        }
    }






})();