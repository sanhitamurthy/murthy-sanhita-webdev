(function(){
    angular
        .module('WAM')
        .service('widgetService',widgetService);

    function widgetService($http){
        this.findWidgetsByPageId=findWidgetsByPageId;
        this.findWidgetById=findWidgetById;
        this.deleteWidget=deleteWidget;
        this.createWidget=createWidget;
        this.updateWidget=updateWidget;
        this.sortWidget=sortWidget;


        var widgets=[
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];


        function sortWidget(pageId,initial,final,newWidgetList){
            var url="/api/assignment/page/"+pageId+"/widget?initial="+initial+"&final="+final;
            return $http.put(url)
                .then(function(response){
                    return response.data;
                });
        }

        function createWidget(pageId, widget) {
            var url="/api/assignment/page/"+pageId+"/widget";
            return $http.post(url,widget)
                .then(function(response){
                    return response.data;
                });

            }

            function deleteWidget(widgetId){
                var url="/api/assignment/widget/"+widgetId;
                return $http.delete(url)
                    .then(function(response){
                        return response.data;
                    });
            }

            function findWidgetsByPageId(pageId){
                var url="/api/assignment/page/"+pageId+"/widget";
                return $http.get(url)
                    .then(function(response){

                        return response.data;

                    });

        }

        function findWidgetById(widgetId){
                console.log(widgetId);
            var url="/api/assignment/widget/"+widgetId;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function updateWidget(widgetId, widget){
            var url="/api/assignment/widget/"+widgetId;
            return $http.put(url,widget)
                .then(function(response){
                    return response.data;
                });

        }

    }






})();