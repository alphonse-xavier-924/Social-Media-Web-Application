const {ApolloServer} = require("apollo-server");

//TODO - Work on subscriptions
// https://www.apollographql.com/docs/apollo-server/data/subscriptions/
// As per the above documentation, graphql-subscriptions needs to be installed to use PubSub in higher versions of Apollo server
const {PubSub} = require("graphql-subscriptions")
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubsub})
});

mongoose
    .connect(MONGODB, {})
    .then(() => {
        console.log("MongoDB Connected");
        return server.listen({port: 5000});
    }).then(res => {
            console.log(`Server running at ${res.url}`)
        })