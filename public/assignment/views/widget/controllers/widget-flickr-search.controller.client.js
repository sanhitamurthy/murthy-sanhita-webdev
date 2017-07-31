(function(){

    angular
        .module('WAM')
        .controller('FlickrImageSearchController',FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService,$routeParams,$location,widgetService) {
        var model = this;


        model.searchPhotos=searchPhotos;
        model.selectPhoto=selectPhoto;


        function init(){
            model.userId=$routeParams['userId'];
            model.pageId=$routeParams['pageId'];
            model.websiteId=$routeParams['websiteId'];
            model.widgetId=$routeParams['widgetId'];

            widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget);

        }

        init();

        function renderWidget(widget){
            model.widget=widget;
        }


        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            model.widget.url=url;
            widgetService
                .updateWidget(model.widgetId,model.widget)
                .then(function(){
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+model.widgetId);
                });
        }

        function searchPhotos(searchTerm){
        console.log(searchTerm);
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });


        }
    }


})();
