import { addTask } from "../services/api";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState, useRef } from "react";
import Badge from 'react-bootstrap/Badge';
import { deleteTask, UpdateUser, FilterUser,getallUser } from "../services/api";
import DataTable from 'react-data-table-component';
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Button from "react-bootstrap/Button";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "@ckeditor/ckeditor5-build-classic";
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import 'moment-timezone';
// import User from "./user";
import { Link } from "react-router-dom";
const Home = () => {
  const [task, setTask] = useState([]);
  const [addtask, setAddTask] = useState([]);
  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);
  const [filter, setfilter] = useState([]);
  const [apicall, setapicall] = useState(false);
  const [updateapicall, setupdateapicall] = useState(false);
  const [data1, setdata1] = useState('');
  const currentdate = moment().format('YYYY-MM-DD')
  const formRef = useRef();
  const [show, setShow] = useState(false);
  const [userdata, setuserdata] = useState([]);

  const ExpandedComponent = ({ data }) => <div className="taskdescription">
    <div dangerouslySetInnerHTML={{ __html: data.description }} className='editor'>
    </div>
  </div>;
  useEffect(() => {
    getTasks();
    getUser();

  }, [filter, apicall]);
  const onValueChange = async (e) => {
    // e.preventDefault();
    setAddTask({ ...addtask, [e.target.name]: e.target.value });
  };
//  end array
const getUser = async (e) => {
    const response = await getallUser();
    setuserdata(response.data)
}

  // console.log("-chalaternge"+JSON.stringify(addtask))
  const onTableChange = async (e, id) => {
    e.preventDefault();
    const response = await UpdateUser(id);
    const dat = response.data;
    setAddTask({ ...dat, [e.target.name]: e.target.value });
    setupdateapicall(true)

  };
  useEffect(async () => {
    if (addtask.id === '' || addtask.id === undefined || addtask.id === null) {
    }
    else {
      await addTask(addtask, addtask.id);
      setupdateapicall(false)
    }
  }, [updateapicall]);

  const handledescription = (event, editor) => {
    setdata1(editor.getData());
    console.log({ event, editor, data1 });
    console.log(data1);
    setAddTask({
      ...addtask,
      description: data1
    });
  }


  const handleClose = () => {
    formRef.current.reset();
    setAddTask('')
    setValidated(false)
    setShow(false)
  };
  const handleShow = () => setShow(true);


  const onSelectChange = (e) => {
    setfilter(filter => {
      return { ...filter, [e.target.name]: e.target.value }
    });

  }
  const addTaskDetails = async (event, id) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }
    else {
      event.preventDefault();
      await addTask(addtask, id);
      formRef.current.reset();
      setAddTask('')
      setValidated(false)
      setShow(false)
      setapicall(true)
      // setupdateapicall(false)
    }

  };

  const getTasks = async () => {
    const response = await FilterUser(filter);
    const sorting = (response.data).sort((a, b) => {
      return new Date(a.end_date) - new Date(b.end_date); // descending
    })
    if (filter.status === 'Done') {
      setTask(sorting);
    }
    else {
      let finalData = [];
      for (var i = 0; i < sorting.length; i++) {
        if (sorting[i].status !== 'Done') {
          finalData.push(sorting[i]);
        }
      }
      setTask(finalData);
      setapicall(false)
    }
  };
  const editTaskDetails = async (taskid) => {
    const response = await UpdateUser(taskid);
    setAddTask(response.data);
    setOpen(!open);
    setapicall(true)
    handleShow();

  };
  const deleteData = async (id) => {
    await deleteTask(id);
    setapicall(true)
  };
  const columns = [
    {
      name: '#',
      selector: row => <div className="prioritydat_box">
        {'#' + row.id}
        <Badge bg={row.priority === "High" ? "danger" : row.priority === "Medium" ? "warning" : "primary"} className='ms-1'>{row.priority}</Badge>
      </div>,
      sortable: true,
      width: "180px"
    },
    {
      name: 'Task Name',
      selector: row => row.taskname,
      sortable: true,
      width: "40%"
    },


    {
      name: 'AssignTo',
      selector: row => 
      <div className="d-flex align-items-center user_img_box">
       <img src="https://pixinvent.com/demo/vuexy-bootstrap-laravel-admin-template/demo-1/images/profile/user-uploads/user-04.jpg" className="user_round_img"/>
      <select
        className="select form-control assigntask"
        // value={row.assignto}
        onChange={(e) => onTableChange(e, row.id)}
        name='assignto'
      >
        <option selected={row.assignto === '' ? true : false} value={""}>Select</option>
        {(userdata || []).map((username) =>{
        <option selected={row.assignto === username.name ? true : false} value={username.name}>{username.name}</option>

        })}
        {/* <option selected={row.assignto === 'Shivani' ? true : false} value={"Shivani"}>Shivani</option>
        <option selected={row.assignto === 'Vijendra' ? true : false} value={"Vijendra"}>Vijendra</option>
        <option selected={row.assignto === 'Gaurav' ? true : false} value={"Gaurav"}>Gaurav</option>
        <option selected={row.assignto === 'Jyotish' ? true : false} value={"Jyotish"}>Jyotish</option>
        <option selected={row.assignto === 'Shubham' ? true : false} value={"Shubham"}>Shubham</option> */}
      </select>
      </div>,
      width:"150px",
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => <select
        className="select form-control statusslect_box"
        // value={tablestatus}
        onChange={(e) => onTableChange(e, row.id)}
        name='status'
      >
        <option selected={row.status === '' ? true : false} value={""}>Select</option>
        <option selected={row.status === 'Pending' ? true : false} value={"Pending"}>Pending</option>
        <option selected={row.status === 'Done' ? true : false} value={"Done"}>Done</option>
        <option selected={row.status === 'In Progress' ? true : false} value={"In Progress"}>In Progress</option>
        <option selected={row.status === 'Not Started' ? true : false} value={"Not Started"}>Not Started</option>
        <option selected={row.status === 'Blocked' ? true : false} value={"Blocked"}>Blocked</option>
      </select>,
      width:"150px",
      sortable: true,
    },
    {
      name: 'End_Date',
      selector: row =>
        <div>
          {moment(row.end_date).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last Week]',
            sameElse: function (now) {
              if (this.isBefore(now)) {
                return 'MMM YY';

              }
              else {
                return 'MMM YY';
              }
              /* ... */
            }
          })}
          <br />
          {row.end_date < currentdate ?
            <span className="text-danger overdue">{'Overdue'}</span> : null}
        </div>,
      sortable: true,
      width: "120px",
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
              onClick={editTaskDetails.bind(this, row.id)}
            >
              <FiEdit />
            </Button>
            <Button
              variant="danger"
              size="sm"
              type="button"
              className="fs-6"
              onClick={deleteData.bind(this, row.id)}
            >
              <AiOutlineDelete />
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
            <div className="header_section w-100 d-flex justify-content-between">
            <h3>Task Management </h3>
            <div className=" button_section ">
            <button
              className="btn btn-info  ms-auto"
              onClick={handleShow}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              Add Task
            </button>
            <button
             className="btn btn-info  ms-auto"
             aria-controls="example-collapse-text"
            >
             <Link to="/attendance" className="text-dark text-decoration-none">Attendance</Link> 
            </button>
            <button
              className="btn btn-info  ms-auto"
              aria-controls="example-collapse-text"
            >
              <Link to="/User" className="text-dark text-decoration-none">Add User</Link>
            </button>

            </div>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="form-row" noValidate validated={validated} onSubmit={(event) => addTaskDetails(event, addtask.id)} ref={formRef}>
                <input
                  name="id"
                  type={"hidden"}
                  value={
                    addtask.id !== "" ||
                      addtask.id !== null ||
                      addtask.id !== undefined
                      ? addtask.id
                      : ""
                  }
                />
                <div className="row">
                  <Form.Group className="col-12">
                    <Form.Label className="m-0 pb-1 text-start w-100">
                      Task Name
                    </Form.Label>
                    <Form.Control
                      required
                      className="mb-3"
                      type="text"
                      placeholder="Enter Task"
                      onChange={(e) => onValueChange(e)}
                      name="taskname"
                      value={addtask.taskname}
                    />
                    <Form.Control.Feedback className="mr-0" type="invalid">
                      Please Enter Task Name!
                    </Form.Control.Feedback>
                    <div className="row my-3">
                      <div className="col-md-6">
                        <Form.Label className="m-0 pb-1 text-start w-100">
                          Priority
                        </Form.Label>
                        <select
                          className="select form-control"
                          name="priority"
                          onChange={(e) => onValueChange(e)}
                          value={addtask.priority}
                        >
                          <option value={""}>select</option>
                          <option value={"High"}>High</option>
                          <option value={"Medium"}>Medium</option>
                          <option value={"Low"}>Low</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <Form.Label className="m-0 pb-1 text-start w-100">
                          Assign To
                        </Form.Label>
                        <select
                          className="select form-control"
                          name="assignto"
                          onChange={(e) => onValueChange(e)}
                          value={addtask.assignto}
                        >
                          <option value={""}>Select</option>
                          <option value={"Bhavna"}>Bhavna</option>
                          <option value={"Shivani"}>Shivani</option>
                          <option value={"Vijendra"}>Vijendra</option>
                          <option value={"Gaurav"}>Gaurav</option>
                          <option value={"Jyotish"}>Jyotish</option>
                          <option value={"Shubham"}>Shubham</option>
                        </select>
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group className="col-12">
                    <Form.Label className="m-0 pb-1 text-start w-100">
                      End Date
                    </Form.Label>
                    <Form.Control
                      required
                      className="mb-3"
                      type="date"
                      placeholder="Enter date"
                      onChange={(e) => onValueChange(e)}
                      name="end_date"
                      value={addtask.end_date}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter Date!
                    </Form.Control.Feedback>
                    <div className="my-3">
                      <Form.Label className="m-0 pb-1 text-start w-100">
                        Status
                      </Form.Label>
                      <select
                        className="select form-control"
                        name="status"
                        onChange={(e) => onValueChange(e)}
                        value={addtask.status}
                      >
                        <option value={""}>Select</option>
                        <option value={"In Progress"}>In Progress</option>
                        <option value={"Pending"}>Pending</option>
                        <option value={"Done"}>Done</option>
                        <option value={"Blocked"}>Blocked</option>
                        <option value={"Not Started"}>Not Started</option>
                      </select>
                    </div>
                  </Form.Group>
                  <Form.Group className="col-12 description">
                    <Form.Label className="m-0 pb-1 text-start w-100">
                      Description
                    </Form.Label>
                    <Form.Control
                      required
                      className="mb-3"
                      as="textarea"
                      placeholder="Enter date"
                      onChange={(e) => onValueChange(e)}
                      name="description"
                      value={addtask.description}
                    />
                  </Form.Group>
                  <Form.Control.Feedback type="invalid">
                    Please Enter Description!
                  </Form.Control.Feedback>
                </div>
                <button
                  className="btn btn-info opecity  m-3"
                  type="submit"
                >
                  {addtask.id === "" ||
                    addtask.id === null ||
                    addtask.id === undefined
                    ? "Add Task"
                    : "Update Task"}
                </button>
              </Form>
            </Modal.Body>
          </Modal>
          <div className="main_content">
            <div className="row my-3">
              <div className="col-md-3 my-md-0 my-2">
                <select
                  className="select form-control"
                  onChange={(e) => onSelectChange(e)}
                  name={'status'}
                >
                  <option value={""}>Select Status</option>
                  <option value={"Pending"}>Pending</option>
                  <option value={"Done"}>Done</option>
                  <option value={"Blocked"}>Blocked</option>
                  <option value={"In Progress"}>In Progress</option>
                  <option value={"Not Started"}>Not Started</option>
                </select>
              </div>
              <div className="col-md-3 my-md-0 my-2">
                <select
                  className="select form-control"
                  onChange={(e) => onSelectChange(e)}
                  name={'assignto'}
                >
                  <option value={""}>Select Name</option>
                  <option value={"Shivani"}>Shivani</option>
                  <option value={"Vijendra"}>Vijendra</option>
                  <option value={"Gaurav"}>Gaurav</option>
                  <option value={"Jyotish"}>Jyotish</option>
                  <option value={"Shubham"}>Shubham</option>
                </select>
              </div>
              <div className="col-md-3 my-md-0 my-2">
                <select
                  className="select form-control"
                  onChange={(e) => onSelectChange(e)}
                  name={'priority'}
                >
                  <option value={""}>Select Priority</option>
                  <option value={"High"}>High</option>
                  <option value={"Medium"}>Medium</option>
                  <option value={"Low"}>Low</option>
                </select>
              </div>
              <div className="col-md-3 my-md-0 my-2 mb-0">
                <Form>
                  <Form.Group>
                    <Form.Control
                      onChange={(e) => onSelectChange(e)}
                      className=""
                      type="date"
                      placeholder="Enter date"
                      name={'end_date'}
                    />
                  </Form.Group>
                </Form>
              </div>
            </div>
            <div className="table_contant">

              <DataTable
                columns={columns}
                data={task}
                pagination
                fixedHeader
                expandableRows expandableRowsComponent={ExpandedComponent}
                theme="solarized"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
