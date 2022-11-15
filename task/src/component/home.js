import { addTask } from "../services/api";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import Badge from 'react-bootstrap/Badge';
import { deleteTask, UpdateUser, FilterUser } from "../services/api";
import DataTable, { createTheme } from 'react-data-table-component';
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FcEditImage,FcFullTrash } from "react-icons/fc";
import Button from "react-bootstrap/Button";
import { Action } from "@remix-run/router";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const Home = () => {
  // createTheme('solarized', {
  //   text: {
  //     primary: '#268bd2',
  //     secondary: '#2aa198',
  //   },
  //   background: {
  //     default: '#002b36',
  //   },
  //   context: {
  //     background: '#cb4b16',
  //     text: '#FFFFFF',
  //   },
  //   divider: {
  //     default: '#073642',
  //   },
  //   action: {
  //     button: 'rgba(0,0,0,.54)',
  //     hover: 'rgba(0,0,0,.08)',
  //     disabled: 'rgba(0,0,0,.12)',
  //   },
  // }, 'dark');
  const [value, onChange] = useState(new Date());
  const [task, setTask] = useState([]);
  const [addtask, setAddTask] = useState([]);
  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);
  const [filter, setfilter] = useState([]);
  const [apicall, setapicall] = useState(false);
  const ExpandedComponent = ({ data }) => <div className="taskdescription">
    <p>{data.description}</p>
    {/* <div className="prioritystatusbox"> 
    
      <select
        className="select form-control"
        value={data.assignto}
      >
        <option value={""}>Select</option>
        <option value={"Shivani"}>Shivani</option>
        <option value={"Vijendra"}>Vijendra</option>
        <option value={"Gaurav"}>Gaurav</option>
        <option value={"Jyotish"}>Jyotish</option>
        <option value={"Shubham"}>Shubham</option>
      </select>
    
      <select
        className="select form-control"
        value={data.status}
      >
        <option value={""}>Select</option>
        <option value={"Pending"}>Pending</option>
        <option value={"Done"}>Done</option>
        <option value={"In Progress"}>In Progress</option>
        <option value={"Not Started"}>Not Started</option>
        <option value={"Blocked"}>Blocked</option>
      </select>
    </div>
    */}
    </div>;
  useEffect(() => {
    getTasks();
  }, [filter, apicall]);
  const onValueChange = (e) => {
    setAddTask({ ...addtask, [e.target.name]: e.target.value });
  };

  const onSelectChange = async (e) => {
    setfilter(filter => {
      return { ...filter, [e.target.name]: e.target.value }
    });
  }
  const addTaskDetails = async (event,id) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else{
      event.preventDefault();
      await addTask(addtask, id);
      setOpen(false);
      setapicall(true)
    }
    setValidated(true);
  };

  const getTasks = async () => {
    const response = await FilterUser(filter);
    setTask(response.data);
    setapicall(false)
  };
  const editTaskDetails = async (taskid) => {
    const response = await UpdateUser(taskid);
    setAddTask(response.data);
    setOpen(!open);
    setapicall(true)

  };
  const deleteData = async (id) => {
    await deleteTask(id);
    setapicall(true)
  };
  const columns = [
    {
      name: '#',
      selector: row => <div>
{'#'+row.id}
<Badge bg={row.priority === "High" ? "danger" : row.priority === "Medium" ? "warning" : "primary"} className='ms-1'>{row.priority}</Badge>
      </div>,
      sortable: true,
      width:"150px"
    },
    {
      name: 'Task Name',
      selector: row => row.taskname,
      sortable: true,
      width:"40%"
    },
   
    {
      name: 'End_Date',
      selector: row => row.end_date,
      sortable: true,
    },
    {
      name: 'AssignTo',
      selector: row => <select
        className="select form-control"
        value={row.assignto}
      >
        <option value={""}>Select</option>
        <option value={"Shivani"}>Shivani</option>
        <option value={"Vijendra"}>Vijendra</option>
        <option value={"Gaurav"}>Gaurav</option>
        <option value={"Jyotish"}>Jyotish</option>
        <option value={"Shubham"}>Shubham</option>
      </select>,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => <select
        className="select form-control"
        value={row.status}
      >
        <option value={""}>Select</option>
        <option value={"Pending"}>Pending</option>
        <option value={"Done"}>Done</option>
        <option value={"In Progress"}>In Progress</option>
        <option value={"Not Started"}>Not Started</option>
        <option value={"Blocked"}>Blocked</option>
      </select>,
      sortable: true,
    },
    {name:'Action',
      button: true,
      cell: (row) => (
        <div className="row">
          <div className="col-md-12 col-sm-12 col-lg-12">
            <Button
              type="button"
              size='sm'
              className="btn btn-light"
              onClick={editTaskDetails.bind(this, row.id)}
            >
              <FcEditImage className="h4 mb-0"/>
              {/* <FiEdit /> */}
            </Button>
            
            <Button
             variant="danger"
             size='sm'
              type="button"
              className="btn btn-light mx-2"
              onClick={deleteData.bind(this, row.id)}
            >
              <FcFullTrash className="h4 mb-0"/>
              {/* <AiOutlineDelete className="text-dark"/> */}
            </Button>
          </div>
        </div>
      )
    },
  ];

  
  return (
    <div class="container text-center">
      <div class="row align-items-start">
        <div className="col-md-12 col-sm-12 col-lg-12 content_div">
          <div className="header text-start d-flex p-2">
            <h3>Task Management </h3>
            <button
              className="btn btn-info  ms-auto"
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              Add Task
            </button>
          </div>

          <Collapse in={open}>
            <div className="add_form">
              <div id="example-collapse-text" className="row add-form_div">
              <span className="add_fome_close" onClick={() => setOpen(!open)}>&times;</span>
                <Form className="form-row" noValidate validated={validated} onSubmit={(event)=>addTaskDetails(event,addtask.id)}>
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
                    <Form.Group className="col-12">
                      <Form.Label className="m-0 pb-1 text-start w-100">
                        Description
                      </Form.Label>
                      {/* <CKEditor
                    editor={ ClassicEditor }
                    
                    value={addtask.description}
                    name="description"
                    type="text"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onValueChange={(e) => onValueChange(e)}
                /> */}
                      <Form.Control
                        required
                        className="mb-3"
                        as="textarea"
                        rows={4}
                        onChange={(e) => onValueChange(e)}
                        name="description"
                        type="text"
                        value={addtask.description}
                      />
                    </Form.Group>
                    <Form.Control.Feedback type="invalid">
                      Please Enter Description!
                    </Form.Control.Feedback>
                  </div>
                  <button
                    className="btn btn-info opecity  m-3"
                    // onClick={() => addTaskDetails(addtask.id)}
                   type="submit"
                  >
                    {addtask.id !== "" ||
                      addtask.id !== null ||
                      addtask.id !== undefined
                      ? "Update Task"
                      : "Add Task"}
                  </button>
                </Form>
              </div>
            </div>
          </Collapse>
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
            theme="solarized" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
