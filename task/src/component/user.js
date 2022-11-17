import React from "react";
import DataTable from "react-data-table-component";
import data from "./data.json";
import { AiOutlineDelete } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import { FiEdit } from "react-icons/fi";
const User = () => {
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
    name:"Image",
    selector:true,
    cell:(row) => (
        <div className="row">
          <div className="col-md-12 col-sm-12 col-lg-12">
            <img src={row.image}style={{width:"60px",height:"40px"}}/>
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
              >
                <FiEdit />
              </Button>
              <Button
               variant="danger"
                size="sm"
                type="button"
                className="fs-6"
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
              aria-controls="example-collapse-text"
            >
              Add User
            </button>
          </div>
          <DataTable columns={columns} data={data.user} />
        </div>
      </div>
    </div>
  );
};
export default User;
