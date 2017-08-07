
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/webdev_summer_2');
mongoose.Promise = require('q').Promise;


var blogPostSchema=mongoose.Schema({
    title:String,
    body:String,
    postDate:{type: Date,default:Date.now},
    thumbsUp:{type: Number,default:0}
    },{collection:'blogpost'});

var blogModel=mongoose.model("BlogPost",blogPostSchema);


deleteBlogPost('59807cc7cdeceb4cfc8c3043')
    .then(function(status) {
        console.log(status);
        return findAllBlogPosts();
    })
    .then(function(posts) {
        console.log(posts);
    });


function deleteBlogPost(postId) {
    return blogModel.remove({_id:postId})
}

function updateBlogPost(postId,newPost){

    return blogModel
        .update({_id:postId},{
        $set:newPost
        });
}


function findBlogPostByTitle(title){
    return blogModel.find({title:title});
}

function findBlogPostById(postId){
    return blogModel.find({_id:postId});
}

function findAllBlogPosts(){
    return blogModel.find();
}
function createBlogPost(blogPost){
return blogModel
    .create(blogPost);
}




// createBlogPost({title:'Post 789',body:'Body 789'})
//     .then(function(doc) {
//         console.log(doc);
//     },function(err){
//         console.err(err);
//     });

// findAllBlogPosts()
//     .then(function(posts){
//         console.log(posts);
//     });


// findBlogPostById("59807cc7cdeceb4cfc8c3043")
//     .then(function(blogPost){
//         console.log(blogPost)
//     });



// updateBlogPost('59807cc7cdeceb4cfc8c3043',{
//     body:'Body 457 Body 457 Body 457 Body 457 Body 457 Body 457'
// })
//     .then(function(status) {
//         return findBlogPostById("59807cc7cdeceb4cfc8c3043")
//     },function(err){
//         console.err(err);
//     })
//     .then(function(post) {
//         console.log(post);
//     },function(err){
//         console.err(err);
//     });