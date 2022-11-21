import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import { Link, Navigate } from "react-router-dom";
// import {useHistory} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getallUser } from "../services/api";
// import data from './data.json';
const Login = () => {
  const Navigate=useNavigate();
  const [login, setLogin] = useState([]);
  const [logindata, setLoginData] = useState([]);
  useEffect(() => {
    getUser();
  }, [handlesubmit]);
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  console.log("------innnn---------" + JSON.stringify(login.email));
  const getUser = async () => {
    const response = await getallUser();
    setLoginData(response.data);
  };
  useEffect(() => {
    if((localStorage.getItem("loginid"))===''){
            Navigate('/user');
  console.log("------empty---------" +login.email);
          
    }
    else{
  console.log("-----idget---------" +login.email);


    }
  }, []);
  const handlesubmit = (e) => {
    {logindata.map((ldata)=>{
        return(
        ((ldata.email===login.email) && (ldata.password===login.password))?
        localStorage.setItem("loginid",login.email)
        : console.log("---"+login.email+"-------"+login.password)
        )
      })}
    e.preventDefault();
    // let x = logindata.some((e) => e.email === "bhavnaraut@gmail.com");
    // let y = logindata.some((e) => e.password === "b");
    // console.log("xxxxxx--> " + JSON.stringify(x));
    // console.log("yyyyyy--> " + JSON.stringify(y));
  };

  return (
    <div className="container text-center">
      <div className="row align-items-start">
        <div className=" content_div">
          <div className="header text-start d-flex p-2">
            <input
              name="id"
              type={"hidden"}
              value={
                login.id !== "" || login.id !== null || login.id !== undefined
                  ? login.id
                  : ""
              }
            />
            <Form className="align-item-center">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={(e) => onValueChange(e)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => onValueChange(e)}
                  name="password"
                />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={handlesubmit}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
