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
        model.EditWidgetUrl=EditWidgetUrl;
        model.deleteWidget=deleteWidget;
        model.updateWidget=updateWidget;


        function init() {
            // widgetService
            //     .findWidgetsByPageId(model.pageId)
            //     .then(renderWidgets);
            widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget);
        }
        init();



        // function renderWidgets(widgets){
        //     model.widgets=widgets;
        // }

        function renderWidget(widget){
            model.widget=widget;
        }


        function updateWidget(widgetId,widget)
        {
            widgetService
                .updateWidget(widgetId,widget)
                .then(function(res){
                    console.log(res);
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });

        }

        function EditWidgetUrl(widget) {

            var url='views/widget/templates/widget-'+widget.widgetType+'-edit.view.client.html';
            return url;
        }

        function deleteWidget(widgetId){

            widgetService.deleteWidget(widgetId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
        }
    }



})();
