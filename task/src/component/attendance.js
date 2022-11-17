import moment from 'moment';
import React ,{useState,useEffect} from 'react';
import Form from "react-bootstrap/Form";
import { getAllRecord } from "../services/attendapi";
import Table from 'react-bootstrap/Table';
function attendance(props) {
    const currentmonth = moment().format('YYYY-MM')
  const [dateval, setdateval] = useState(currentmonth);
  var monthdays = moment(dateval).daysInMonth();
console.log("daysssssssssssss"+monthdays)

    const onSelectChange = (e) => {
       let datval =e.target.value;
       setdateval(datval)
       console.log(datval)
      }
      useEffect(async () => {
        getRecord();
      }, []);
      const getRecord = async () => {
        const response = await getAllRecord();
    console.log("--"+JSON.stringify(response.data))
      }
      let mdays=[];
      for (let i = 1; i <= monthdays; i++) {
        // let datmon = i + "-" + ststmonth;
        // let changeformat = moment(datmon, "D-MM-YYYY").format(`YYYY-MM-DD`);
        mdays.push(i);
      }
    return (
        <div className="container text-center">
        <div className="row align-items-start">
          <div className="col-md-12 col-sm-12 col-lg-12 content_div">
            <div className="header text-start d-flex p-2">
              <h3>Attendance</h3>
            </div>
           
            <div className="main_content">
            <div className="row my-3">
              <div className="col-md-3 my-md-0 my-2 mb-0">
                <Form>
                  <Form.Group>
                    <Form.Control
                      onChange={(e) => onSelectChange(e)}
                      className=""
                      type="month"
                      placeholder="Enter date"
                      name={'filtermonth'}
                    />
                  </Form.Group>
                </Form>
              </div>
            </div>
            <div className="table_contant">
                <h3>{dateval}</h3>
                <Table striped bordered hover>
      <thead>
        <tr>
          <th>UserName</th>
          {(mdays || []).map((mday,i)=>{
            return (
                <th>{mday}</th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
}

export default attendance;