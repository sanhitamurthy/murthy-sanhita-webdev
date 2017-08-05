(function(){
    angular
        .module("tmdbApp",['ngRoute'])
        .config(configuration)
        .controller("searchController",searchController)
        .controller("detailsController",detailsController)
        .service("tvService",tvService);


    function configuration($routeProvider){
        $routeProvider
            .when("/",{
                templateUrl:"main.html",
                //controller:"mainController",
                //controllerAs:"model"
            })
            .when("/s/:query",{
                templateUrl:"search.html",
                controller:"searchController",
                controllerAs:"model"
            })
            .when("/details/:id",{
                templateUrl:"details.html",
                controller:"detailsController",
                controllerAs:"model"

            })
    }


    function detailsController($routeParams,tvService){
        var model=this;
        var id=$routeParams.id;

        function init(){

            tvService
                .searchSeriesById(id)
                .then(renderShow);


        }
        init();

        function renderShow(show)
        {
            console.log(show);
            model.show=show;
        }
    }



    function searchController(tvService, $routeParams) {
        var model = this;

        model.query = $routeParams.query;
        model.searchSeriesByTitle = searchSeriesByTitle;

        function init() {
            searchSeriesByTitle(model.query);
        }



        init();




        function searchSeriesByTitle(tvTitle) {
            tvService.searchSeriesByTitle(tvTitle)
                .then(renderShows);

        }

        function renderShows(shows){
            model.shows=shows;

        }
    }

        function tvService($http){
            this.searchSeriesByTitle=searchSeriesByTitle;
            this.searchSeriesById=searchSeriesById;

            function searchSeriesById(id){
                var url="https://api.themoviedb.org/3/tv/"+id+"?api_key=590ee6634acbca823183d896221bd971";
                return $http.get(url)
                    .then(function(response){
                        return response.data;
                    });

            }

            function searchSeriesByTitle(tvTitle){
                var url="https://api.themoviedb.org/3/search/tv?api_key=590ee6634acbca823183d896221bd971&query="+tvTitle;
                return $http.get(url)
                    .then(function(response){
                        return response.data;
                    });
            }
        }


})();