import React from "react";
import DataTable from "react-data-table-component";
import data from "./data.json";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useState,useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { deleteUser, getallUser,UpdateUsers } from "../services/api";
const User = () => {
  const [user, setUser] = useState([]);
  const [adduser, setAddUser] = useState([]);
  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getUser();
  },[]);
  const onValueChange = async(e,id) => {
    setAddUser({ ...adduser, [e.target.name]: e.target.value });
    await setAddUser(adduser, id);
  };
  console.log(JSON.stringify(adduser) )
  const handleClose = () =>{
    setAddUser('')
    setValidated(false)
    setShow(false)
  };
  const handleShow = () => setShow(true);
  const addUserDetails = async (event, id) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    setValidated(true);
    }
    else {
      event.preventDefault();
      await setAddUser(adduser, id);
      handleClose();
    }

  };
  const getUser = async () => {
    const response = await getallUser();
    setUser(response.data);
    // console.log("---------------"+response);
  };
  const editUserDetails = async (userid) => {
    const response = await UpdateUsers(userid);
    setAddUser(response.data);
    setOpen(!open);
    // setapicall(true)
    handleShow();

  };
  const deleteDataa = async (id) => {
    await deleteUser(id);
  };
  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

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
      name: "Status",
      selector: (row) =><select
      className="select form-control statusslect_box assigntask"
      value={row.status}
      name='status'
    >
      <option value={""}>Select</option>
      <option value={"Active"}>Active</option>
      <option value={"InActive"}>InActive</option>
    </select>,
      sortable: true
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
                onClick={editUserDetails.bind(this, row.id)}
              >
                <FiEdit  />
              </Button>
              <Button
               variant="danger"
                size="sm"
                type="button"
                className="fs-6"
                onClick={deleteDataa.bind(this, row.id)}
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
              <Form className="form-row" noValidate validated={validated} onSubmit={(event) => addUserDetails(event, adduser.id)}>
              <input
                    name="id"
                    type={"hidden"}
                    value={
                      adduser.id !== "" ||
                      adduser.id !== null ||
                      adduser.id !== undefined
                        ? adduser.id
                        : ""
                    }
                  />
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter Name" onChange={(e) => onValueChange(e)} value={adduser.name} />
              </Form.Group>
        
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="number" required placeholder="Enter Number" onChange={(e) => onValueChange(e)} value={adduser.mobile}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" required placeholder="Enter Address" onChange={(e) => onValueChange(e)} value={adduser.address} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required placeholder="Enter Email"onChange={(e) => onValueChange(e)} value={adduser.email} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Status</Form.Label>
                <select
                        className="select form-control"
                        name="status"
                        onChange={(e) => onValueChange(e)}
                        value={adduser.status}
                      >
                        <option value={""}>Select</option>
                        <option value={"Active"}>Active</option>
                        <option value={"InActive"}>InActive</option>
                      </select>
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
