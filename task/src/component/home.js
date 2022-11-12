
import { addTask } from "../services/api";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { deleteTask, getallTask, UpdateUser } from "../services/api";
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
    await addTask(addtask, id);
    setOpen(false);
    window.location.reload(false);
  };
  const [status, setStatus] = useState();
  const [assign, setAssign] = useState();
  const [priority, setPriority] = useState();
  const [datee, setDate] = useState();

  const onSelectChange = (e) => {
    setStatus(e.target.value);
    setAssign(e.target.value);
    setPriority(e.target.value);
    setDate(e.target.value);
  };
  console.log("-----status--"+status)
  const [task, setTask] = useState([]);
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const response = await getallTask();
    setTask(response.data);
    // console.log("---------------"+response);
  };
  const editTaskDetails = async (taskid) => {
    const response = await UpdateUser(taskid);
    setAddTask(response.data);
    setOpen(!open);
  };
  const deleteData = async (id) => {
    await deleteTask(id);
    getTasks();
  };
  console.log("Addd Task----------" + JSON.stringify(addtask));
  console.log("Addd Task----------" + JSON.stringify(addtask));
  return (
    <div class="container text-center">
      <div class="row align-items-start">
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
                        <Form.Label className="m-0 text-start w-100">
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
                        <Form.Label className="m-0 text-start w-100">
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
                  <Form.Group className="col-md-4 col-sm-6">
                    <Form.Label className="m-0 text-start w-100">
                      End Date
                    </Form.Label>
                    <Form.Control
                      className="mb-3"
                      type="date"
                      placeholder="Enter date"
                      onChange={(e) => onValueChange(e)}
                      name="end_date"
                      value={addtask.end_date}
                    />
                    <Form.Label className="m-0 text-start w-100">
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
                  </Form.Group>
                  <Form.Group className="col-md-4 col-sm-6">
                    <Form.Label className="m-0 text-start w-100">
                      Description
                    </Form.Label>
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
                  {addtask.id !== "" ||
                  addtask.id !== null ||
                  addtask.id !== undefined
                    ? "Update Task"
                    : "Add Task"}
                </button>
              </Form>
            </div>
          </Collapse>
          <div className="main_content">
            <div className="row">
              <select
                className="select form-control"
                onChange={(e) => onSelectChange(e)}
              >
                <option value={""}>Select Status</option>
                <option value={"Pending"}>Pending</option>
                <option value={"Done"}>Done</option>
                <option value={"Blocked"}>Blocked</option>
                <option value={"In Progress"}>In Progress</option>
                <option value={"Not Started"}>Not Started</option>
              </select>
              <select className="select form-control"  onChange={(e) => onSelectChange(e)}>

<option value={""}>Select Name</option>
<option value={"Shivani"}>Shivani</option>
<option value={"Vijendra"}>Vijendra</option>
<option value={"Gaurav"}>Gaurav</option>
<option value={"Jyotish"}>Jyotish</option>
<option value={"Shubham"}>Shubham</option>
</select>
<select
                className="select form-control"
                 onChange={(e) => onSelectChange(e)}
              >
                <option value={""}>Select Priority</option>
                <option value={"High"}>High</option>
                <option value={"Medium"}>Medium</option>
                <option value={"Low"}>Low</option>
              </select>
              <Form>
              <Form.Group>
                    <Form.Control
                    onChange={(e) => onSelectChange(e)}
                    className="mt-3"
                      type="date"
                      placeholder="Enter date"
                    />
              </Form.Group>
              </Form>
              <Table className="mt-3" bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Task Name</th>
                    <th>End Date</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Assign to</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(task || []).map((data) => {
                    return (data.status === status ? 
                      <Task id={data.id}  edit={() => editTaskDetails(data.id)} delete={() => deleteData(data.id)} taskname={data.taskname} end_date={data.end_date} description={data.description} priority={data.priority} assignto={data.assignto} status={data.status}/>

                     : status === "" || data.assignto===assign||data.priority===priority||data.end_date===datee?  
                     <Task id={data.id}  edit={() => editTaskDetails(data.id)} delete={() => deleteData(data.id)} taskname={data.taskname} end_date={data.end_date} description={data.description} priority={data.priority} assignto={data.assignto} status={data.status}/>: null
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
