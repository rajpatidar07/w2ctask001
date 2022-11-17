import React from "react";
import DataTable from "react-data-table-component";
import data from "./data.json";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useState,useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
const User = () => {
 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
    name:"Image",
    selector:true,
    cell:(row) => (
        <div className="row">
          <div className="col-md-12 col-sm-12 col-lg-12">
            <img src={row.image} style={{width:"60px",height:"40px",borderRadius: "100%",marginTop:"5px"}}/>
            <p>Nature</p>
          </div> 
        </div>
      ),
    },
    {
        name:"Action",
        button: true,
        cell: (row) => (
          <div className="row">
            <div className="col-md-12 col-sm-12 col-lg-12">
              <Button
                type="button"
                variant="info"
                size="sm"
                className="fs-6 me-1"
              >
                <FiEdit  />
              </Button>
              <Button
               variant="danger"
                size="sm"
                type="button"
                className="fs-6"
              >
                <AiOutlineDelete/>
              </Button>
            </div>
          </div>
        )
      },
  ];
  return (
    <div className="container text-center">
      <div className="row align-items-start">
        <div className="col-md-12 col-sm-12 col-lg-12 content_div">
          <div className="header text-start d-flex p-2">
            <h3>Add Users</h3>
            <button
              className="btn btn-info  ms-auto"
              onClick={handleShow}
              aria-controls="example-collapse-text"
            >
              Add User
            </button>
          </div>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" />
              </Form.Group>
        
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="number" placeholder="Enter Number"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter Address" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" />
              </Form.Group>
              <button
                          className="btn btn-info opecity  m-3"
                          type="submit"
                        >
                         Add User
                        </button>
            </Form>
        </Modal.Body>
      </Modal>
          <DataTable columns={columns} data={data.user} />
        </div>
      </div>
    </div>
  );
};
export default User;
