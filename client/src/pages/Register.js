import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from 'react-router-dom';
import gql from 'graphql-tag';

import { useForm } from "../utils/hooks"

function Register() {

  const [errors, setErrors] = useState({});

  const {onChange, onSubmit, values } = useForm(registerUser,{
    username: "",
    email: "",
    password: "",
    confirmPassword: "", 
  })
  
  const navigate = useNavigate();

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      console.log(result);
      //From React Router v6 or later, useNavigate hook should be used instead of history.push.
      navigate("/")
    },

    //The value should be err.graphQLErrors[0].extensions.errors and not err.graphQLErrors[0].extensions.exceptions.errors
    onError(err) {
      //Have to check this error
      if(err.graphQLErrors[0])
      {
        setErrors(err.graphQLErrors[0].extensions.errors);
        console.log("Error");
      }
    },
    variables: values
  });

  function registerUser(){
    addUser();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
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
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>Register</Button>
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      createdAt
      token
    }
  }
`;

export default Register;
