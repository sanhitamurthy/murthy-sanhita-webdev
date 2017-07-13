
(function() {//IIFE
    //angular.module("TodoApp", [])

    angular
        .module("TodoApp",[]) //returns angular so that we can call it again
        .controller("TodoController", TodoController)

    function TodoController($scope,$http) {
        //scope allows to bind view and controller.
        //anything u declare on the cope is available on
        //both sides
       // $scope.hello = "Hello from TodoController"
        $scope.todo={title:"initial title",details:"Lorem ipsum"}//this is by default in the title box
    //scope allows u to interatc with DOM
        $scope.addNote=addNote;
        $scope.removeTodo=removeTodo;
        $scope.selectTodo=selectTodo;
        $scope.updateTodo=updateTodo;

        function findAllTodos(){

            //it shoould use asynchronous coommunication
            // http is using ajax.it relies on the browser
            //browser knows multi threading
            //gives the browser the requests
            //and notifies it when the server respond
            //get returns a promise.
            //function to register a callback is then()
            $http.get('/api/todo')
                .then(function(response){
                    $scope.todos=response.data;
                });

        }
        findAllTodos();




        function updateTodo(todo){
            $scope.todos[$scope.selectedIndex]=angular.copy(todo)

        }

        function selectTodo(index){
            $scope.todo=angular.copy($scope.todos[index]);
            $scope.selectedIndex=index;

        }

        function removeTodo(todo)
        {

            var index=$scope.todos.indexOf(todo);
            //in splice if u give a non zero value, it removes that many elements
            //$scope.todos.splice(index,1);
            $http.delete('/api/todo/'+index)
                .then(findAllTodos);

        };
        function addNote(todo){


            //below shows copying the instance
            //each one will be a different object .the {{todos}}
            //under the button will show this.
            //this is not effective when its 100s of elements
            // var newTodo={
            //     title:todo.title
            // }

            //this below does deep copy. an gives a copy of the original object
            var newTodo=angular.copy(todo)
            //faking the primary key og the mongo db
            newTodo._id=(new Date()).getTime();
            newTodo.date=new Date();

            $scope.todos.push(newTodo); //todo object is considered to be a single instance
                                    //and it points to the same object
                                    //so all the things u type goes into the same array element


            //console.log(newTodo)


        }

    }
})()