import React from "react";
import DataTable from "react-data-table-component";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {
  addHoliday,
  deleteHoliday,
  getAllHoliday,
  UpdateHoliday,
} from "../services/holiday";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Holiday = () => {
  const formRef = useRef();
  const [hday, setHday] = useState([]);
  const [addholiday, setAddholiday] = useState([]);
  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);
  const [apicall, setapicall] = useState(false);
  const [updateapicall, setupdateapicall] = useState(false);

  const navigate = useNavigate();
  let loginid = localStorage.getItem("loginid");
  console.log("---login" + loginid);
  // if(loginid === '' || loginid === null || loginid === undefined ){
  //   navigate('/login')
  // }
  useEffect(() => {
    getHoliday();
  }, [apicall]);
  const onValueChange = (e) => {
    setAddholiday({ ...addholiday, [e.target.name]: e.target.value });
    // setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleClose = () => {
    formRef.current.reset();
    setAddholiday("");
    setValidated(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const addholidayDetails = async (event, id) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      await addHoliday(addholiday, id);
      formRef.current.reset();
      setAddholiday("");
      setValidated(false);
      setapicall(true);
      setShow(false);
    }
  };
  console.log("----------fulldata" + JSON.stringify(addholiday));

  const getHoliday = async () => {
    const response = await getAllHoliday();
    setHday(response.data);
    setapicall(false)
    // console.log("---------------"+response);
  };
  const onTableChange = async (e, id) => {
    e.preventDefault();
    const response = await UpdateHoliday(id);
    const dat = response.data;
    setAddholiday({ ...dat, [e.target.name]: e.target.value });
    setupdateapicall(true)

  };
  useEffect(async () => {
    if (addholiday.id === '' || addholiday.id === undefined || addholiday.id === null) {
    }
    else {
      await addHoliday(addholiday, addholiday.id);
      setupdateapicall(false)
    }
  }, [updateapicall]);
  const editUserDetails = async (hid) => {
    const response = await UpdateHoliday(hid);
    setAddholiday(response.data);
    setOpen(!open);
    // setapicall(true)
    handleShow();
  };
  const deleteDataa = async (id) => {
    await deleteHoliday(id);
    setapicall(true);

  };
  const [show, setShow] = useState(false);

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Event Name",
      selector: (row) => row.event,
      sortable: true,
    },
    {
      name: "Start_date",
      selector: (row) => row.start_date,
      sortable: true,
    },
    {
      name: "End_date",
      selector: (row) => row.end_date,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <select
          className="select form-control statusslect_box assigntask"
        //   value={row.status}
          name="status"
          onChange={(e) => onTableChange(e, row.id)}

        >
          <option  selected={row.status === '' ? true : false} value={""}>Select</option>
          <option  selected={row.status === 'Active' ? true : false} value={"Active"}>Active</option>
          <option  selected={row.status === 'InActive' ? true : false} value={"InActive"}>InActive</option>
        </select>
      ),
      sortable: true,
    },

    {
      name: "Action",
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
              <FiEdit />
            </Button>
            <Button
              variant="danger"
              size="sm"
              type="button"
              className="fs-6"
              onClick={deleteDataa.bind(this, row.id)}
            >
              <AiOutlineDelete />
            </Button>
          </div>
        </div>
      ),
    },
  ];
  //   const ButtonClick=()=>{
  //     localStorage.removeItem("loginid")
  //     console.log("-----cluickjhj------"+loginid);
  //     navigate('/login')
  //   }
  return (
    <div className="container text-center">
      <div className="row align-items-start">
        <div className="col-md-12 col-sm-12 col-lg-12 content_div">
          <div className="header_section w-100 d-flex justify-content-between">
            <h3> Holiday Management </h3>
            <div className="button_section ">
              <button
                className="btn btn-info  ms-auto"
                aria-controls="example-collapse-text"
              >
                <Link to="/" className="text-dark text-decoration-none">
                  Task
                </Link>
              </button>
              <button
                className="btn btn-info mx-2"
                aria-controls="example-collapse-text"
              >
                <Link to="/user" className="text-dark text-decoration-none">
                  User
                </Link>
              </button>

              <button
                className="btn btn-info me-2"
                aria-controls="example-collapse-text"
              >
                <Link
                  to="/attendance"
                  className="text-dark text-decoration-none"
                >
                  Attendance
                </Link>
              </button>
              <button
                className="btn btn-info"
                onClick={handleShow}
                aria-controls="example-collapse-text"
              >
                Add Holiday
              </button>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                className="form-row"
                noValidate
                validated={validated}
                onSubmit={(event) => addholidayDetails(event, addholiday.id)}
                ref={formRef}
              >
                <input
                  name="id"
                  type={"hidden"}
                  value={
                    addholiday.id !== "" ||
                    addholiday.id !== null ||
                    addholiday.id !== undefined
                      ? addholiday.id
                      : ""
                  }
                />

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter Name"
                    onChange={(e) => onValueChange(e)}
                    value={addholiday.event}
                    name="event"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    placeholder="Enter Number"
                    onChange={(e) => onValueChange(e)}
                    value={addholiday.start_date}
                    name="start_date"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    placeholder="Enter Address"
                    onChange={(e) => onValueChange(e)}
                    value={addholiday.end_date}
                    name="end_date"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <select
                    className="select form-control"
                    name="status"
                    onChange={(e) => onValueChange(e)}
                    value={addholiday.status}
                  >
                    <option value={""}>Select</option>
                    <option value={"Active"}>Active</option>
                    <option value={"InActive"}>InActive</option>
                  </select>
                </Form.Group>

                <button className="btn btn-info opecity  m-3" type="submit">
                  {addholiday.id === "" ||
                  addholiday.id === null ||
                  addholiday.id === undefined
                    ? "Add Holiday"
                    : "Update Holiday"}
                </button>
              </Form>
            </Modal.Body>
          </Modal>
          <DataTable columns={columns} data={hday} pagination fixedHeader />
        </div>
      </div>
    </div>
  );
};
export default Holiday;
