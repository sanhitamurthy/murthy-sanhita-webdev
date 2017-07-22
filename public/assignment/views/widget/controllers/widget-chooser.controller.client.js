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



        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.widget = widgetService.findWidgetById(model.widgetId);

        }

        init();

        function createWidget(type){
            var widget={
                "id:":(new Date()).getTime()+"",
                "widgetType":type
            };
            widgetService.createWidget(model.pageId,widget);

            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+widget._id);
        }

    }



})();
