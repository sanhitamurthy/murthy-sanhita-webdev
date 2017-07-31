(function(){

    angular
        .module('WAM')
        .controller('widgetNewController',widgetNewController);

    function widgetNewController($routeParams,widgetService,$location) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.pageId=$routeParams['pageId'];
        model.websiteId=$routeParams['websiteId'];
        model.createWidget=createWidget;



        // function init() {
        //     widgetService
        //         .findWidgetsByPageId(model.pageId)
        //         .then(renderWidgets);
        //     widgetService
        //         .findWidgetById(model.widgetId)
        //         .then(renderWidget);
        //
        // }
        //
        // init();
        //
        // function renderWidgets(widgets){
        //     model.widgets=widgets;
        // }
        //
        // function renderWidget(widget){
        //     model.widget=widget;
        // }

        function createWidget(type){
            console.log(model.pageId);
            var widget = {
                "_id:":(new Date()).getTime()+"",
                "widgetType":type
                //"pageId": model.pageId
            };
            widgetService
                .createWidget(model.pageId,widget)
                .then(function(res){
                    //console.log(res);
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+res._id);
                });

        }

    }



})();
