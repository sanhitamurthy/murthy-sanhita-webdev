(function(){
    angular
        .module('wbdvDirectives',[])
        .directive('wbdvSortable',wbdvSortable );

        function wbdvSortable(){
            function sortingFunction(scope,element) {
                $(element).sortable({
                    start: function (event, object) {
                        this.initial=object.item.index();

                    },
                    stop: function (event, object) {
                        this.final= object.item.index();


                        var results = [];
                        var widgets = $(".wd-widget").toArray();
                        $.each(widgets, function (i, widget) {
                            results.push(widget.id);

                        });
                        scope.callback({
                            initial: this.initial,
                            final: this.final,
                            newWidgetList: results

                        });

                    }
                });
            }

            return{
                scope:{
                    callback:'&callback'
                },
                link:sortingFunction
            };
        }


})();

