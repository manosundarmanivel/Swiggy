import { useState } from "react";
import { Form, Button, Alert ,Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Body from "./Body";
import { MDBRow } from "mdb-react-ui-kit";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';





const Login=()=>{

    const [email ,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors]= useState('');
    const navigator = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState('');



    const loginSubmit = async (e) =>{
        e.preventDefault();

        const validateForm=() =>{
            let isValid = true;
    const newErrors = {};

    // Perform validation checks
    if (email.trim() === '') {
      newErrors.email = 'Name is required';
      isValid = false;
    }

    if (password.trim() === '') {
      newErrors.password = 'Email is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;

        }
    if(validateForm()){
        try {
            const response = await axios.post('http://localhost:8000/login', {
    
              email,
              password,
            })
            .then(res=>{
              // console.log(res.data)
              
               if (res.data ==="not-found")
              {
                
                navigator('/signUp')
              }
              else
                {
                  // console.log(res.data.name)
                  const data =res.data
                  // setLoggedInUser(res.data)
                  navigator('/',{ state: data })
                  
                  
                 
                 
                }
            })
            
            console.log(response.data); // Success message
            // Handle successful sign-up (e.g., redirect to login page)
          } catch (error) {
            console.error(error);
            // Handle sign-up error (e.g., display error message)
          }
    }

    axios.post('http://localhost:8000/token',{
      email, password
    }).then(res=>{
      const token = res.data;
     
      localStorage.setItem('token', token);
      console.log(res.data)

    }).catch(error => {
     console.log(error)
    });



    }
    return(loggedInUser!="")?(<Body username = {loggedInUser}/>):
    (
    //     <div>
    //   <h1>Login Page</h1>
    //   <Form onSubmit={loginSubmit}>
       

    //     <Form.Group controlId="formEmail">
    //       <Form.Label>Email</Form.Label>
    //       <Form.Control
    //         type="email"
    //         placeholder="Enter your email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //       {errors.email && <Alert variant="danger">{errors.email}</Alert>}
    //     </Form.Group>

    //     <Form.Group controlId="formPassword">
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control
    //         type="password"
    //         placeholder="Enter your password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //       {errors.password && <Alert variant="danger">{errors.password}</Alert>}
    //     </Form.Group>

    //     <Button variant="primary" type="submit">
    //       Sign Up
    //     </Button>
        
    //   </Form>
    // </div>
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>

<MDBCol col='9' md='6'>
  <img src= "https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?w=1380&t=st=1684651729~exp=1684652329~hmac=02cf25ea0a9531f002dd1a17ffdebe47af151fe924699c39acf0a2372488be14" class="img-fluid" alt="Phone image" style={{ width: '600px', height: '600px' }} />
</MDBCol>
<MDBCol col='3' md='5'>
    <div className="d-flex justify-content-center align-items-center vh-50" style={{ height: '40rem' ,  }}>
      <Card style={{ width: '30rem' ,  }}>
        <Card.Body>
          <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '35px', color: '#333', lineHeight: '1.5' ,fontWeight:'bold' }} className="text-center mb-4">Login Here</h1>
          <Form onSubmit={loginSubmit}>
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

            <Button style={{ fontFamily: 'Arial, sans-serif', fontSize: '20px', lineHeight: '1.5' ,fontWeight:'bold' }} variant="primary" type="submit" className="w-100">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
    </MDBCol>
    </MDBRow>

    </MDBContainer>

    
    )
}

export default Login;