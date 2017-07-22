(function(){

    angular
        .module('WAM')
        .controller('widgetEditController',widgetEditController);

    function widgetEditController($routeParams,widgetService,$location) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.widgetId = $routeParams['widgetId'];
        model.pageId = $routeParams['pageId'];
        model.websiteId=$routeParams['websiteId'];



        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.widget = widgetService.findWidgetById(model.widgetId);
        }

        init();

        model.EditWidgetUrl=EditWidgetUrl;
        model.deleteWidget=deleteWidget;
        model.EditWidgetUrl=EditWidgetUrl;
        model.updateWidget=updateWidget;
        function updateWidget(widgetId,widget)
        {
            widgetService.updateWidget(widgetId,widget);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }
        function EditWidgetUrl(widget) {
            var url='views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'-edit.view.client.html';
            return url;
        }

        function deleteWidget(widgetId){
            widgetService.deleteWidget(widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }
    }



})();
