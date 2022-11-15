import { addTask } from "../services/api";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import Badge from 'react-bootstrap/Badge';
import { deleteTask, getallTask, UpdateUser } from "../services/api";
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';

// import Task from "./tasktable";
import DatePicker from 'react-date-picker';
import DataTable from 'react-data-table-component';
const Home = () => {
  const columns = [
    {
        name: 'Task Name',
        selector: row =>row.taskname,
        sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
      sortable: true,
    },
    {
      name: 'Priority',
      selector: row => <Badge bg={row.priority==="High"?"danger":row.priority==="Medium"?"warning":"primary"}>{row.priority}</Badge>,
      sortable: true,
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
      selector: row =>  <select
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
    {
      button: true,
      cell: () => (
        <div className="row">
          <div className="col-md-12 col-sm-12 col-lg-12">
          <button
              type="button"
              className="btn btn-info btn-sm fs-5 me-2"
              onClick={editTaskDetails}
            >
              <FiEdit/>
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm fs-5"
              onClick={deleteData}
            >
            <AiOutlineDelete/>
            </button>
            </div>
            </div>
            )
      },
];
  const [addtask, setAddTask] = useState([]);
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const onValueChange = (e) => {
    //  console.log(e);
    // console.log(e.target.value);
    setAddTask({ ...addtask, [e.target.name]: e.target.value });
    // console.log(task);
  };
  const [open, setOpen] = useState(false);
  const [value, onChange] = useState(new Date());
  // console.log("---------------"+response);
  const addTaskDetails = async (id) => {
    await addTask(addtask, id);
    setOpen(false);
    window.location.reload(false);
  };
  const [status, setStatus] = useState();
  // const [assign, setAssign] = useState();
  // const [priority, setPriority] = useState();
  // const [datee, setDate] = useState();

  const onSelectChange = (e) => {
    setStatus(e.target.value);
    // setAssign(e.target.value);
    // setPriority(e.target.value);
    // setDate(e.target.value);
    
  };
  console.log("-----status--" + status);
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
            <h3>Heading Here </h3>
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
                <Form class="form-row" noValidate validated={validated} onSubmit={handleSubmit} >
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
                      <Form.Control.Feedback className="mr-0" type="invalid">Please Enter Task Name!</Form.Control.Feedback>
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
                      <Form.Control.Feedback type="invalid">Please Enter Date!</Form.Control.Feedback>
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
                      <Form.Control
                       required
                        className="mb-3"
                        as="textarea"
                        rows={4}
                        onChange={(e) => onValueChange(e)}
                        name="description"
                        type="comments"
                        value={addtask.description}
                      />
                    </Form.Group>
                      <Form.Control.Feedback type="invalid">Please Enter Description!</Form.Control.Feedback>
                  </div>
                  <button
                    className="btn btn-info opecity  m-3"
                    onClick={() => addTaskDetails(addtask.id)}
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
                >
                  <option value={""}>Select Priority</option>
                  <option value={"High"}>High</option>
                  <option value={"Medium"}>Medium</option>
                  <option value={"Low"}>Low</option>
                </select>
              </div>
              <div className="col-md-3 my-md-0 my-2 mb-0">
              <DatePicker className="form-group" onChange={onChange} value={value} />
                {/* <Form>
                  <Form.Group>
                    <Form.Control
                      onChange={(e) => onSelectChange(e)}
                      className=""
                      type="date"
                      placeholder="Enter date"
                    />
                  </Form.Group>
                </Form> */}
              </div>
            </div>
            <div className="table_contant">
           
           <DataTable
            columns={columns}
            data={task}
          
             />
              {/* <Table className="mt-3" bordered hover>
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
                    return data.status === status ?
                    (
                      <Task
                        id={data.id}
                        edit={() => editTaskDetails(data.id)}
                        delete={() => deleteData(data.id)}
                        taskname={data.taskname}
                        end_date={data.end_date}
                        description={data.description}
                        priority={data.priority}
                        assignto={data.assignto}
                        status={data.status}
                      />
                    ) : status === "" ||
                      data.assignto === assign ||
                      data.priority === priority ||
                      data.end_date === datee ? (
                      <Task
                        id={data.id}
                        edit={() => editTaskDetails(data.id)}
                        delete={() => deleteData(data.id)}
                        taskname={data.taskname}
                        end_date={data.end_date}
                        description={data.description}
                        priority={data.priority}
                        assignto={data.assignto}
                        status={data.status}
                      />
                    ) : null;
                  })}
                </tbody>
              </Table> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
