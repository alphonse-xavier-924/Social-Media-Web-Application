import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from 'react-router-dom';
import gql from 'graphql-tag';
import {useForm} from "../utils/hooks";

function Login() {  
  const [errors, setErrors] = useState({});

  const {onChange, onSubmit, values } = useForm(loginUserCallback,{
    username: "",
    password: "",
  })

  const navigate = useNavigate();

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      //From React Router v6 or later, useNavigate hook should be used instead of history.push.
      navigate("/")
    },

    //The value should be err.graphQLErrors[0].extensions.errors and not err.graphQLErrors[0].extensions.exceptions.errors
    onError(err) {
      if(err.graphQLErrors[0])
      {
        setErrors(err.graphQLErrors[0].extensions.errors);
      }
    },
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  };

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>Login</Button>
      </Form>

      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className="list">
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
        username: $username
        password: $password
    ) {
      id
      email
      createdAt
      token
    }
  }
`;

export default Login;
