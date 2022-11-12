import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { addTask,deleteTask, getallTask, UpdateUser } from "../services/api";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
const Home = () => {
const[status,setStatus]=useState();
const onSelectChange=(e)=>{
  setStatus(e.target.value)
}
  const [addtask, setAddTask] = useState([]);
  const onValueChange = (e) => {
    //  console.log(e);
    // console.log(e.target.value);
    setAddTask({ ...addtask, [e.target.name]: e.target.value });
    // setEditTask({ ...edittask, [e.target.name]: e.target.value });
    // console.log(task);
  };
  // useEffect(() => {
  //   loadTaskData();
  // }, []);

  // const loadTaskData = async () => {
    
  //   // setTask(response.data);
  // };
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState([]);
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const response = await getallTask();
    setTask(response.data);
    // console.log("---------------"+response);
  };
  const addTaskDetails = async () => {
    await addTask(addtask);
    setOpen(false);
    window.location.reload(false);
  };
  const editTaskDetails = async (taskid) => {
    
    const response=await UpdateUser(taskid);
    setAddTask(response.data);
    setOpen(!open)
  };
  const deleteData = async (id) => {
    await deleteTask(id);
    getTasks();
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
              <Form class="form-row">
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
              <select className="select form-control"  onChange={(e) => onSelectChange(e)}>

              <option value={""}>Select</option>
                <option value={"Pending"}>Pending</option>
                <option value={"Done"}>Done</option>
                <option value={"Blocked"}>Blocked</option>
                <option value={"In Progress"}>In Progress</option>
                <option value={"Not Started"}>Not Started</option>
              </select>
              <Table className="mt-3" bordered hover>
                <thead>
                  <tr >
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
                    return (
                      data.status===status? 
                      <tr className={data.priority === "High"? "bg-danger bg-opacity-25" : '' || data.priority === "Medium"? "bg-warning bg-opacity-25" : '' ||data.priority === "Low"? "bg-success  bg-opacity-25" : ''}>
                        <td>{data.id}</td>
                        <td>{data.taskname}</td>
                        <td>{data.end_date}</td>
                        <td>{data.description}</td>
                        <td>
                        <select
                            className="select form-control"
                            value={data.priority} name="priority" 
                          >
                            <option value={""}>Select</option>
                            <option value={"High"}>High</option>
                            <option value={"Medium"}>Medium</option>
                            <option value={"Low"}>Low</option>
                          </select>
                        </td>
                        <td>
                          <select
                            className="select form-control"
                            value={data.assignto}
                          >
                            <option value={""}>Select</option>
                            <option>{data.assignto}</option>
                            <option value={"Shivani"}>Shivani</option>
                            <option value={"Vijendra"}>Vijendra</option>
                            <option value={"Gaurav"}>Gaurav</option>
                            <option value={"Jyotish"}>Jyotish</option>
                            <option value={"Shubham"}>Shubham</option>
                          </select>
                        </td>
                        <td >
                          <select
                            className="select form-control"
                            value={data.status} 
                          >
                            <option value={""}>Select</option>
                            <option>{data.status}</option>
                            <option value={"Pending"}>Pending</option>
                            <option value={"Done"}>Done</option>
                            <option value={"In Progress"}>In Progress</option>
                            <option value={"Not Started"}>Not Started</option>
                            <option value={"Blocked"}>Blocked</option>
                          </select>
                        </td>
                        <td>
                          <button
                            className="btn btn-info me-1"
                            onClick={()=>editTaskDetails(data.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={()=>deleteData(data.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                       
                      : status === '' ? 
                      <tr className={data.priority === "High"? "bg-danger bg-opacity-25" : '' || data.priority === "Medium"? "bg-warning bg-opacity-25" : '' ||data.priority === "Low"? "bg-success  bg-opacity-25" :''}>
                      <td>{data.id}</td>
                      <td>{data.taskname}</td>
                      <td>{data.end_date}</td>
                      <td>{data.description}</td>
                      <td>
                      <select
                          className="select form-control"
                          value={data.priority} name="priority" 
                        >
                          <option value={""}>Select</option>
                          <option>{data.priority}</option>
                          <option value={"Medium"}>Medium</option>
                          <option value={"Low"}>Low</option>
                        </select>
                      </td>
                      <td>
                        <select
                          className="select form-control"
                          value={data.assignto}
                        >
                          <option value={""}>Select</option>
                          <option>{data.assignto}</option>
                          <option value={"Shivani"}>Shivani</option>
                          <option value={"Vijendra"}>Vijendra</option>
                          <option value={"Gaurav"}>Gaurav</option>
                          <option value={"Jyotish"}>Jyotish</option>
                          <option value={"Shubham"}>Shubham</option>
                        </select>
                      </td>
                      <td >
                        <select
                          className="select form-control"
                          value={data.status} 
                        >
                          <option value={""}>Select</option>
                          <option>{data.status}</option>
                          <option value={"Pending"}>Pending</option>
                          <option value={"Done"}>Done</option>
                          <option value={"In Progress"}>In Progress</option>
                          <option value={"Blocked"}>Blocked</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="btn btn-info me-1"
                          onClick={()=>editTaskDetails(data.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                             alert("Are you sure want to delete")
                             deleteData(data.id)
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                      :
                      null
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
