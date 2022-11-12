import React from "react";
const Task=(props)=>{
  return(
   
  
    <tr
    className={
      props.priority === "High"
        ? "bg-danger bg-opacity-25"
        : "" || props.priority === "Medium"
        ? "bg-warning bg-opacity-25"
        : "" || props.priority === "Low"
        ? "bg-success  bg-opacity-25"
        : ""
    }
  >
    <td>{props.id}</td>
    <td>{props.taskname}</td>
    <td>{props.end_date}</td>
    <td>{props.description}</td>
    <td>
      <select
        className="select form-control"
        value={props.priority}
        name="priority"
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
        value={props.assignto}
      >
        <option value={""}>Select</option>
        <option>{props.assignto}</option>
        <option value={"Shivani"}>Shivani</option>
        <option value={"Vijendra"}>Vijendra</option>
        <option value={"Gaurav"}>Gaurav</option>
        <option value={"Jyotish"}>Jyotish</option>
        <option value={"Shubham"}>Shubham</option>
      </select>
    </td>
    <td>
      <select
        className="select form-control"
        value={props.status}
      >
        <option value={""}>Select</option>
        <option>{props.status}</option>
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
        onClick={props.edit}
      >
        Edit
      </button>
      <button
        className="btn btn-danger"
        onClick={props.delete}
      >
        Delete
      </button>
    </td>
  </tr>
  )
}
export default Task;