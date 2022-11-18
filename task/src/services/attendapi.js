import axios from 'axios';

const url = "http://127.0.0.1:3003/attendance";

export const getAllRecord = async (monthh,uid) => {
    uid = uid || '';
    console.log("====uid"+uid)
    return await axios.get(`http://127.0.0.1:3003/attendance?month=${monthh}&userid=${uid}`);

}

export const addattendance = async (task, id) => {
    if(id ==='' || id === null || id === undefined){
        console.log("====addattendance")
        return await axios.post(url,task);
    }else{
        console.log("====updateattendance")
        return await axios.put(`${url}/${id}`,task);
    }
}