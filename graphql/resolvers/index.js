const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentResolvers = require("./comments");

module.exports = {
    //Name of the type is "Post" from typeDefs
    //Any time a query, mutation returns a Post, will go through this post modifier and update the necessary changes
    Post:{
        likeCount(parent){
            console.log(parent);
            return parent.likes.length;
        },
        commentCount: (parent) => parent.comments.length
    },

    Query:{
        ...postsResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentResolvers.Mutation
    },
    Subscription:{
        ...postsResolvers.Subscription
    }
}