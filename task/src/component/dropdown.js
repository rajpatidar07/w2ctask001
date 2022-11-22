import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { getAllRecord, AdddAttendance, SingleAttendance, UpdateAttendance } from "../services/attendapi";

function Dropdown(props) {
    const [attenddata, setattenddata] = useState([]);

    const [addattenddata, setaddattenddata] = useState({
        userid: '',
        username: '',
        date: '',
        month: '',
        status: ''
    });
    const [updateapicall, setupdateapicall] = useState(false);

    useEffect(() => {
        getRecord();
    }, [props.dateval, props.userdata]);
    const getRecord = async (e) => {
        const monthh = moment(props.dateval).format('MMM')
        const response = await getAllRecord(monthh, props.uid);
        setattenddata(response.data)
       
         
    }

    // console.log("-holiday"+ JSON.stringify(holidaydata))

    const onattendChange = async (id, e) => {
        e.preventDefault();
        if (id[4] === '' || id[4] === undefined || id[4] === null) {
            setaddattenddata({
                ...addattenddata,
                userid: id[0],
                username: id[1],
                date: id[2],
                month: id[3],
                status: e.target.value
            });
            setupdateapicall(true)
        }
        else {
            const response = await SingleAttendance(id[4]);
            const dat = response.data;
            setaddattenddata({ ...dat, status: e.target.value });
            setupdateapicall(true)
        }
    }
    const AddUpdateAttend = async (e) => {
        // e.preventDefault();
        if ((addattenddata.username === '') || (moment(props.dateval).format('YYYY-MM') > moment(props.currentmonth).format('YYYY-MM')) || (moment(props.dateval).format('YYYY-MM-DD') > moment(props.currentmonth).format('YYYY-MM-DD'))) {
        }
        else {
            if ((addattenddata.id === '' || addattenddata.id === undefined || addattenddata.id === null)) {
                await AdddAttendance(addattenddata);
            }
            else {
                await UpdateAttendance(addattenddata, addattenddata.id);
            }
        }
    }
    useEffect(() => {
        AddUpdateAttend();
    }, [addattenddata])
    // attendancearray
    let element = [];
    let attendstatus = [];
    let useridd = [];
    let attendid = [];
    let hodate = [];
    for (let index = 0; index < attenddata.length; index++) {
        let el = moment(attenddata[index].date).format(`YYYY-MM-DD`);
        element.push(el);
        let stat = attenddata[index].status;
        attendstatus.push(stat);
        let uid = attenddata[index].userid;
        useridd.push(uid)
        let aid = attenddata[index].id;
        attendid.push(aid)
    }
    for (let index = 0; index < props.holidaydata.length; index++) {
        let hdate = props.holidaydata[index].start_date;
        hodate.push(hdate);
    }
    const pcount = attendstatus.filter(item => item.includes('P'));
    const acount = attendstatus.filter(item => (!item.includes('P')));
    const hdcount = attendstatus.filter(item => (item.includes('HD')));
    const clcount = attendstatus.filter(item => (item.includes('CL')));
    const abcount = acount.length - hdcount.length - clcount.length
    const wcount = props.mdays.length - pcount.length - abcount
    //   endattendancvearray
    return (
        <>
            {(props.mdays || []).map((mday, i) => {
                let x = element.indexOf(mday);
                let y = hodate.indexOf(mday);
                let attendmonth = moment(mday).format('MMM')
                return (
                    (moment(mday).format('ddd') === 'Sun' || moment(hodate[y]).isSame(mday)) && props.j ===0?  <td rowspan={props.userdata.length} className='sunday_td text-danger'>
                        {moment(mday).format('ddd') === 'Sun' ?
                        'Sunday'  : 'Holiday'}
                        </td>:
                    (moment(mday).format('ddd') === 'Sun' || moment(hodate[y]).isSame(mday)) && props.j > 0  ? null :
                    <td className='p-0 attendance_status_select' key={mday}>
                        {moment(mday).format('ddd') === 'Sun' ?
                            <p className='text-danger mb-0'>{moment(mday).format('ddd')}</p>
                            : moment(hodate[y]).isSame(mday) ?
                                <p className='text-danger mb-0'>{'Hol'}</p> :
                                (moment(props.dateval).format('YYYY-MM') > moment(props.currentmonth).format('YYYY-MM')) ||
                                    (moment(mday).format('YYYY-MM-DD') > moment(props.currentmonth).format('YYYY-MM-DD')) ?
                                    <select
                                        className="select form-control attendance_statuss p-1"
                                        disabled
                                        name='status'
                                    >
                                    </select> :
                                    <select
                                        className="select form-control attendance_statuss p-1"
                                        onChange={onattendChange.bind(this, [props.uid, props.username, mday, attendmonth, attendid[x]])}
                                        // value={moment(element[x]).isSame(mday) ? attendstatus[x] : ''}
                                        name='status'
                                    >
                                        <option selected={attendstatus[x] === '' ? true : false} value={""}></option>
                                        <option selected={attendstatus[x] === 'P' ? true : false} value={"P"}>P</option>
                                        <option selected={attendstatus[x] === 'A' ? true : false} value={"A"}>A</option>
                                        <option selected={attendstatus[x] === 'L' ? true : false} value={"L"}>L</option>
                                        <option selected={attendstatus[x] === 'CL' ? true : false} value={"CL"}>CL</option>
                                        <option selected={attendstatus[x] === 'HD' ? true : false} value={"HD"}>HD</option>
                                        <option selected={attendstatus[x] === 'ML' ? true : false} value={"ML"}>ML</option>
                                        <option selected={attendstatus[x] === 'EL' ? true : false} value={"EL"}>EL</option>
                                    </select>}

                    </td>
                )
            })}
            {/* <td><input type='number' className='d-block w-100'/></td> */}
            <td>{pcount.length}</td>
            <td>{abcount}</td>
            <td>{wcount}</td>

        </>
    );
}

export default Dropdown;