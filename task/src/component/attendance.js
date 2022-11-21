import moment from 'moment';
import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Table from 'react-bootstrap/Table';
import { getallUser } from '../services/api';
import Dropdown from './dropdown';
function attendance(props) {
    const currentmonth = moment().format('')
    const [dateval, setdateval] = useState(currentmonth);
    const [userdata, setuserdata] = useState([]);


    const onSelectChange = (e) => {
        let datval = e.target.value;
        setdateval(datval)
        console.log(datval)
    }
    useEffect(async () => {
        getUser();
    }, [dateval]);

    //  end array
    const getUser = async (e) => {
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
        <div className="container-fluid text-center">
            <div className="row align-items-start">
                <div className="col-md-12 col-sm-12 col-lg-12 content_div">
                    <div className="header text-start d-flex p-2">
                        <h3>Attendance  ({moment(dateval).format('YYYY-MMM')})</h3>
                            <div className="col-md-3 my-md-0 my-2 mb-0 ms-auto me-0">
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

                    <div className="main_content">
                       
                        <div className="table_contant">
                           
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={{width:"150px"}}>UserName</th>
                                        {(mdays || []).map((mday, i) => {
                                            return (
                                                <th key={i}>{moment(mday).format('DD')}</th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {(userdata || []).map((udata, i) => {
                                        return (
                                            <tr key={i}>
                                                <td name='username' className='text-start'>{'#'+udata.id} {udata.name}</td>
                                                <Dropdown
                                                    dateval={dateval}
                                                    mdays={mdays}
                                                    uid={udata.id}
                                                    username={udata.name}
                                                    userdata={userdata}
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

export default attendance;