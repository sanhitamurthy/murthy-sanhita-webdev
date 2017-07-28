(function(){
    angular
        .module('WAM')
        .controller('widgetListController',widgetListController);


    function widgetListController($sce,widgetService,$routeParams){

        var model=this;
        model.userId=$routeParams['userId'];
        model.pageId=$routeParams['pageId'];
        model.websiteId=$routeParams['websiteId'];
        model.widgetUrl= widgetUrl;
        model.trust=trust;
        model.getYouTubeEmbedUrl=getYouTubeEmbedUrl;
        model.widgetUrl=widgetUrl;

        function init(){
            model.widgets=widgetService.findWidgetsByPageId(model.pageId);
        }

        init();

       
        function getYouTubeEmbedUrl(linkUrl) {
            var embedUrl="https://www.youtube.com/embed/";
            var linkUrlParts=linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length-1];
            return $sce.trustAsResourceUrl(embedUrl);

        }

        function trust(html){
            //scrubbing the html
            return $sce.trustAsHtml(html);
        }

        function widgetUrl(widget){
            var url='views/widget/templates/widget-'+widget.widgetType.toLowerCase()+'.view.client.html'
            return url;
        }




    }

})();
