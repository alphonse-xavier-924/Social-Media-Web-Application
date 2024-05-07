const {gql} = require('apollo-server');

module.exports = gql`
    type Post{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }

    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Query{
        getPosts: [Post]
    }

    type Mutation{
        register(registerInput: RegisterInput): User!,
        login(username: String!, password: String!): User!
    }
`;

    /* In graphql we are using the Mutation type to register a user.
    So we are expecting to the receive the inputs of type 'RegisterInput'
    Once all the received inputs are valid, we then send the output of the type 'User'*/