import moment from 'moment';
import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import { getAllRecord } from "../services/attendapi";
import Table from 'react-bootstrap/Table';
import { getallUser } from '../services/api';
function attendance(props) {
    const currentmonth = moment().format('')
    const [dateval, setdateval] = useState(currentmonth);
    const [uid, setuid] = useState('');
    const [userdata, setuserdata] = useState([]);
    const [attenddata, setattenddata] = useState([]);
    const [addattenddata, setaddattenddata] = useState([]);


    const onSelectChange = (e) => {
        let datval = e.target.value;
        setdateval(datval)
        console.log(datval)
    }
    const onattendChange = (e) => {
        setaddattenddata({
            ...addattenddata,
            [e.target.name]: e.target.value
        })
    }

    // useEffect(async () => {
    //     getRecord();
    //     getUser();
    // }, [dateval]);
    useEffect(async () => {
        getUser();
    }, [dateval]);
    useEffect(async () => {
        getRecord();
    }, [dateval,userdata]);
    const getRecord = async () => {
        console.log("fronteid"+uid)
        const monthh = moment(dateval).format('MMM')
        const response = await getAllRecord(monthh,uid);
        setattenddata(response.data)
        console.log("attendadata--" + JSON.stringify(response.data))
    }

    // attendancearray
  let element = [];
  let attendstatus = [];
  let useridd = [];

  for(let index = 0; index < attenddata.length; index++) {
   let el = moment(attenddata[index].date).format(`YYYY-MM-DD`);
  let uid= attenddata[index].userid;
    element.push(el);
   let stat = attenddata[index].status;
    attendstatus.push(stat);
    useridd.push(uid)

  }
  console.log("useriddd"+(useridd))
//  end array
    const getUser = async () => {
        const response = await getallUser();
        setuserdata(response.data)
    }

    // monthdays
    var monthdays = moment(dateval).daysInMonth();
    let ststmonth = moment(dateval, "YYYY-MM").format("MM-YYYY");
    let mdays = [];
    for (let i = 1; i <= monthdays; i++) {
        let datmon = i + "-" + ststmonth;
        let changeformat = moment(datmon, "DD-MM-YYYY").format(`YYYY-MM-DD`);
        mdays.push(changeformat);
    }
    // monthdaysend
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
                            <h3>{moment(dateval).format('YYYY-MMM')}</h3>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>UserName</th>
                                        {(mdays || []).map((mday, i) => {
                                             
                                            return (
                                                <th>{moment(mday).format('DD')}</th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {(userdata || []).map((udata, i) => {
                                        setuid(udata.id)
                                        return (
                                            <tr>
                                                
                                                <td onChange={(e) => onattendChange(e)} name='username' value={attenddata.username}>{udata.id}{udata.name}</td>
                                                {(mdays || []).map((mday, i) => {
                                                     let x = element.indexOf(mday);
                                                   console.log("-------jdj"+attendstatus[x])
                                                   
                                                    return (
                                                        <td className='p-0'> 
                                                             <select
                                                            className="select form-control"
                                                            onChange={(e) => onattendChange(e)}
                                                            value={moment(element[x]).isSame(mday) ? attendstatus[x] : ''}
                                                            name='status'
                                                        >
                                                            <option value={""}></option>
                                                            <option value={"P"}>P</option>
                                                            <option value={"A"}>A</option>
                                                        </select>
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
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