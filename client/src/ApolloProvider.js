import React from "react";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import ReactDOM from 'react-dom/client';

//JSX converts HTML tags into react elements.
//You are not required to use JSX, but JSX makes it easier to write React applications.

const httpLink = createHttpLink({
    uri: "http://localhost:5000"
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

//https://www.apollographql.com/docs/react/get-started/

const renderApp = () => {
    const root = ReactDOM.createRoot(document.getElementById('root'));

    root.render(
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    );
}

export default renderApp;