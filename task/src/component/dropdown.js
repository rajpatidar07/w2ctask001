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
        if (addattenddata.username === '') {
        }
        else {
            if ((addattenddata.id === '' || addattenddata.id === undefined || addattenddata.id === null)) {
                console.log("------ifaddattendance" + JSON.stringify(addattenddata) + addattenddata.id)
                await AdddAttendance(addattenddata);
                setaddattenddata([])
                // setupdateapicall(false)
            }
            else {
                console.log("------else  updateattendance" + JSON.stringify(addattenddata) + addattenddata.id)
                await UpdateAttendance(addattenddata, addattenddata.id);
                setaddattenddata([])
                // setupdateapicall(false)
            }
        }
    }
    useEffect(() => {
        AddUpdateAttend();
    }, [updateapicall])
    // attendancearray
    let element = [];
    let attendstatus = [];
    let useridd = [];
    let attendid = [];
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
    //   endattendancvearray
    return (
        <>
            {(props.mdays || []).map((mday, i) => {
                let x = element.indexOf(mday);
                let attendmonth = moment(mday).format('MMM')
                return (
                    <td className='p-0' key={mday}>
                        <select
                            className="select form-control"
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
                        </select>
                    </td>

                )
            })}
        </>
    );
}

export default Dropdown;