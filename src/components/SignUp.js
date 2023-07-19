import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert ,Card } from 'react-bootstrap';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigator = useNavigate();
  // useEffect(()=>{

  // },[name,email,password])
  const handleSubmit = async (e) => {
    e.preventDefault();
    
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Perform validation checks
    if (name.trim() === '') {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (email.trim() === '') {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    if (password.trim() === '') {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    // Add more validation checks for password, etc.

    setErrors(newErrors);
    return isValid;
  };

  if (validateForm()) {
    try {
      const response = await axios.post('http://localhost:8000/signup', {
        name,
        email,
        password,
      }).then(res=>{
        if(
        res.data == "exist"){
          alert("user already exist")
          
        }
        else if (res.data =="not exist")
        {
          navigator('/login')
        }
      })
      
      console.log(response.data); // Success message
      // Handle successful sign-up (e.g., redirect to login page)
    } catch (error) {
      console.error(error);
      // Handle sign-up error (e.g., display error message)
    }
  }

  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card>
        <Card.Body>
          <h1 className="text-center mb-4">Signup Page</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={errors.name}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={errors.email}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={errors.password}
                className="mb-3"
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUpForm;

