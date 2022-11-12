import React, { useState } from "react";
import { addTask } from "../services/api";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import Task from "./tasktable";
const Home = () => {
  const [addtask, setAddTask] = useState([]);
  const onValueChange = (e) => {
    //  console.log(e);
    // console.log(e.target.value);
    setAddTask({ ...addtask, [e.target.name]: e.target.value });
    // console.log(task);
  };
  const [open, setOpen] = useState(false);
 // console.log("---------------"+response);
  const addTaskDetails = async (id) => {
    await addTask(addtask,id);
    setOpen(false);
    window.location.reload(false);
  };
  console.log("Addd Task----------"+JSON.stringify(addtask))
  return (
    <div class="container text-center">
      <div class="row align-items-start">
        {/* <div className='col-md-3 col-sm-3 col-lg-2 sidebar bg-dark text-start'>
            <h1 className='text-white'>LOGO HERE </h1>
          </div> */}
        <div className="col-md-12 col-sm-12 col-lg-12 content_div">
          <div className="header text-start d-flex p-2">
            <h1>Heading Here </h1>
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
            <div id="example-collapse-text" className="row">
              <Form className="form-row">
                <input name="id" type={'hidden'} value={(addtask.id!=='' || addtask.id !== null || addtask.id !== undefined)?addtask.id:''} />
                <div className="row" >
                  <Form.Group className="col-md-4 col-sm-6">
                    <Form.Label className="m-0 text-start w-100">
                      Task Name
                    </Form.Label>
                    <Form.Control
                    className="mb-3"
                      type="text"
                      placeholder="Enter Task"
                      onChange={(e) => onValueChange(e)}
                      name="taskname"
                      value={addtask.taskname}
                    />
                    
                    <div className="row">
                    <div className="col-md-6">
                    <Form.Label className="m-0 text-start w-100">Priority</Form.Label>
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
                    <Form.Label className="m-0 text-start w-100">Assign To</Form.Label>
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
                  <Form.Group className="col-md-4 col-sm-6">
                  <Form.Label className="m-0 text-start w-100">End Date</Form.Label>
                    <Form.Control
                    className="mb-3"
                      type="date"
                      placeholder="Enter date"
                      onChange={(e) => onValueChange(e)}
                      name="end_date"
                      value={addtask.end_date}
                    />
                    <Form.Label className="m-0 text-start w-100">Status</Form.Label>
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
                  </Form.Group>
                  <Form.Group className="col-md-4 col-sm-6">
                    <Form.Label className="m-0 text-start w-100">Description</Form.Label>
                    <Form.Control
                    className="mb-3"
                      as="textarea"
                      rows={4}
                      onChange={(e) => onValueChange(e)}
                      name="description"
                      type="comments"
                      value={addtask.description}
                    />
                  </Form.Group>
                </div>
                <button
                    className="btn btn-info opecity  m-3"
                    onClick={() => addTaskDetails(addtask.id)}
                    type="button"
                  >
                    {(addtask.id!=='' || addtask.id !== null || addtask.id !== undefined)?'Update Task':'Add Task'}
                  </button>
              </Form>
            </div>
          </Collapse>
          <div className="main_content">
            <div className="row">
              <Task/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
