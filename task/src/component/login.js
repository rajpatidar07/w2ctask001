import React from 'react';
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { getallUser } from "../services/api";
import Card from 'react-bootstrap/Card';
// import data from './data.json';
const Login = () => {
  const navigate=useNavigate();
  const [login, setLogin] = useState([]);
  const [logindata, setLoginData] = useState([]);
  const [validated, setValidated] = useState(false);
  const [error,setError]=useState(true);
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  console.log("------innnn---------" + JSON.stringify(login.email));
  const getUser = async () => {
    const response = await getallUser();
    setLoginData(response.data);
  };

const LoginCheck = () =>{
  localStorage.setItem("loginid",login.email);
  navigate('/home') 
}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = ((e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false ) {
    console.log("----false")
      e.preventDefault();
    e.stopPropagation();
    setValidated(true);

    }
   else{
    logindata.map((ldata)=>{
      return(
      ((ldata.email===login.email) && (ldata.password===login.password))?
      LoginCheck()
      :  setError(false)
      )
    })
   }

    e.preventDefault();
  });
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="container text-center">
      <div className="">
        <div className=" content_div">
        <div className="header_section w-100 d-flex justify-content-between">
          <div className="header text-start m-auto p-2">
            <input
              name="id"
              type={"hidden"}
              value={
                login.id !== "" || login.id !== null || login.id !== undefined
                  ? login.id
                  : ""
              }
            />
                <Card style={{ width: '25rem', height:"300px" ,marginTop:"50px"}}>
      <Card.Body>
        <Card.Title>Login User</Card.Title>
        <Form className="align-item-center" noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                required
                  type="email"
                  value={login.email}
                  placeholder="Enter email"
                  name="email"
                  onChange={(e) => onValueChange(e)}
                />
                 <Form.Control.Feedback className="mr-0" type="invalid">
                      Please Enter Email!
                    </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                required
                  type="password"
                  placeholder="Password"
                  value={login.password}
                  onChange={(e) => onValueChange(e)}        
                  name="password"
                />
                 <Form.Control.Feedback className="mr-0" type="invalid">
                     Enter Password
                    </Form.Control.Feedback>
                    {error===false ?
                    <div className="mr-0 text-danger" >
                    Password and Email Incorrect
                    </div>
                    : null}
              </Form.Group>
              <Button
                  className="btn btn-info opecity"
                  type="submit"
                >
                  {login.id === "" ||
                    login.id === null ||
                    login.id === undefined
                    ? "Login":""}
                </Button>
              {/* <Button variant="primary" type="submit" >
                Submit
              </Button> */}
            </Form>
      </Card.Body>
    </Card>
           
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
