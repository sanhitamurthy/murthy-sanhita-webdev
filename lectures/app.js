module.exports = function (app) {

    var todos = [
        {title: 'todo 123', details: 'details 123'},
        {title: 'todo 234', details: 'details 234'},
        {title: 'todo 345', details: 'details 345'}
    ];

    app.get('/api/todo', findAllTodos);2
    app.get('/api/todo/:index', findTodoByIndex);
    app.delete('/api/todo/:index', deleteTodo);

    function deleteTodo(req, res) {
        todos.splice(req.params.index, 1);
        res.json(todos);
    }

    function findAllTodos(req, res) {
        res.json(todos);
    }

    function findTodoByIndex(req, res) {
        var index = req.params['index'];
        res.json(todos[index]);
    }
};

// //this connects to the server and exports makes the
// //whole msg directly interact with the server.
// //say hello is a function here and it is called in
// //serve.js and prints onto console
//
// // module.exports={
// //     message:'hello',
// //     sayHello:function(){
// //         console.log('hello');
// //     }
// // };
//
// module.exports=function(app){
//
//     var todos=[
//         {title:'todo 124',details:'details 124'},
//         {title:'todo 124',details:'details 124'}
//     ];
//
//     app.delete('api/todo/:index',deleteTodo);
//     app.get('/api/todo',findAllTodos);
//     app.get('api/todo/:index',findTodoByIndex);
//
//         function deleteTodo(req,res){
//         todos.splice(req.params.index,1);
//         //these are the remaining todos
//         res.json(todos);
//     }
//     //listener for inco;ming get request.If it matches the url,
//     //excecute that function
//     //api or rest is used for dynamic content
//     function findAllTodos(req,res){
//         //just prints the message on the screen
//         //you wont be able to send two res(throws error)
//         //res.send('here are the todos')
//         res.json(todos)
//     };
//
//
//     function findTodoByIndex(req,res){
//
//         //params allows u to retrieve values from
//         var index= req.params['index'];
//         res.json(todos[index]);
//         };
//     // console.log('message='+message)
// };
//
//
