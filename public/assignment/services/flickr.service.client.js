(function(){
    angular
        .module('WAM')
        .service('FlickrService',FlickrService);

    function FlickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = "01240145f5398214d580c23713a85bb7";
        var secret = "3d8788c44f3e4fcc";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);

            return $http.get(url);


        }
    }




})();