import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import Form from "react-bootstrap/Form";
import { deleteTask, getallTask, UpdateUser } from "../services/api";
const Task=()=>{
    const[status,setStatus]=useState();
    const[assign,setAssign]=useState();
    const[priority,setPriority]=useState();
    const[datee,setDate]=useState();

const onSelectChange=(e)=>{
  setStatus(e.target.value)
  setAssign(e.target.value)
  setPriority(e.target.value)
  setDate(e.target.value)

}
  const [addtask, setAddTask] = useState([]);
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
 return(
    <>
     <div className="row">
      <div className="col-md-3">

      <select className="select form-control"  onChange={(e) => onSelectChange(e)}>

<option value={""}>Select Status</option>
  <option value={"Pending"}>Pending</option>
  <option value={"Done"}>Done</option>
  <option value={"Blocked"}>Blocked</option>
  <option value={"In Progress"}>In Progress</option>
  <option value={"Not Started"}>Not Started</option>
</select>
      </div>
      <div className="col-md-3">
      <select className="select form-control"  onChange={(e) => onSelectChange(e)}>

<option value={""}>Select Name</option>
<option value={"Shivani"}>Shivani</option>
<option value={"Vijendra"}>Vijendra</option>
<option value={"Gaurav"}>Gaurav</option>
<option value={"Jyotish"}>Jyotish</option>
<option value={"Shubham"}>Shubham</option>
</select>
      </div>
      <div className="col-md-3">
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
      </div>
    </div>
<div className="main_content">
<div className="row">
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
          : status === '' || data.assignto===assign||data.priority===priority||data.end_date===datee?
          <tr className={data.priority === "High"? "bg-danger bg-opacity-25" : '' || data.priority === "Medium"? "bg-warning bg-opacity-25": '' ||data.priority === "Low"? "bg-success  bg-opacity-25" :''}>
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
    
    </>
     

 )
    }
export default Task;