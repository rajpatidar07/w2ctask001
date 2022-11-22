import moment from 'moment';
import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Table from 'react-bootstrap/Table';
import { getActiveUser } from '../services/api';
import Dropdown from './dropdown';
import { Link } from "react-router-dom";
import { getAllHoliday } from '../services/holiday';

function Attendance(props) {
    const currentmonth = moment().format('')
    const [dateval, setDateval] = useState(currentmonth);
    const [userdata, setuserdata] = useState([]);
    const [holidaydata, setholidaydata] = useState([]);
    const [presentcount, setpresentcount] = useState('');



    const onSelectChange = (e) => {
        let datval = e.target.value;
        setDateval(datval)
    }
    useEffect(async () => {
        getUser();
    }, [dateval]);

    //  end array
    const getUser = async (e) => {
        const response = await getActiveUser();
        setuserdata(response.data)
    }
    useEffect(() => {
        getHoliday();
    }, []);
    const getHoliday = async (e) => {
        const response = await getAllHoliday();
        setholidaydata(response.data)
    }
    // monthdays
    var monthdays = moment(dateval).daysInMonth();
    let ststmonth = moment(dateval, "YYYY-MM").format("MM-YYYY");
    let mdays = [];
    let sdays=[];
    for (let i = 1; i <= monthdays; i++) {
        let datmon = i + "-" + ststmonth;
        let changeformat = moment(datmon, "DD-MM-YYYY").format(`YYYY-MM-DD`);
        let sundayday = moment(datmon, "DD-MM-YYYY").format(`dddd`)
        if(sundayday === 'Sunday'){
            sdays.push(sundayday)
        }
        mdays.push(changeformat);
    }
   
    // monthdaysend
    return (
        <div className="container-fluid text-center">
            <div className="row align-items-start">
                <div className="col-md-12 col-sm-12 col-lg-12 content_div">
                    <div className="header text-start d-flex p-2 align-items-center">
                        <h3>Attendance  ({moment(dateval).format('YYYY-MMM')})</h3>
                        <div className="col-md-7 my-md-0 my-2 mb-0 ms-auto me-0 d-flex align-items-center">
                        <div className="col-md-5 my-md-0 my-2 mb-0 ms-auto me-0 d-flex">
                            <h5 className='mb-0'>Working Days:{mdays.length - (sdays.length) - (holidaydata.length) }</h5>
                            <h5 className='mb-0 me-3 ms-3'>Present:{2}</h5>
                            <h5 className='mb-0'>Absent:{22}</h5>


</div>
                        <div className="col-md-3 my-md-0 my-2 mb-0 me-0 d-flex">
                            <button
                                className="btn btn-info  ms-auto me-2"
                                aria-controls="example-collapse-text"
                            >
                                <Link to="/" className="text-dark text-decoration-none">Task</Link>
                            </button>
                            <Form>
                                <Form.Group>
                                    <Form.Control
                                        onChange={(e) => onSelectChange(e)}
                                        className=""
                                        type="month"
                                        placeholder="Enter date"
                                        name={'filtermonth'}
                                        value={moment(dateval).format('YYYY-MM')}
                                    />
                                </Form.Group>
                            </Form>
                        </div>
                        </div>
                      
                       
                    </div>

                    <div className="main_content">

                        <div className="table_contant">

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={{ width: "160px" }}>UserName</th>
                                        {(mdays || []).map((mday, i) => {
                                            return (
                                                <th key={i}>{moment(mday).format('DD')} {moment(mday).format('dd')}</th>
                                            )
                                        })}
                                         {/* <th>PL</th> */}
                                        <th>P</th>
                                        <th>A</th>
                                        <th>WD</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {(userdata || []).map((udata, i) => {
                                        return (
                                            <tr key={i}>
                                                <td name='username' className='text-start user_name_data p-1'>
                                                    <p className=' user_name_data '>
                                                    {'#' + udata.id} {udata.name}
                                                    </p>
                                                    </td>
                                                <Dropdown
                                                    holidaydata={holidaydata}
                                                    dateval={dateval}
                                                    mdays={mdays}
                                                    uid={udata.id}
                                                    username={udata.name}
                                                    userdata={userdata}
                                                    presentcount={presentcount}
                                                />
                                              
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

export default Attendance;