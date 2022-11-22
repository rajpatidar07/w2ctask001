import axios from 'axios';


export const getAllRecord = async (monthh,uid) => {
    return await axios.get(`http://127.0.0.1:3003/attendance?month=${monthh}&userid=${uid}`);
}
export const getAllCount = async (monthh) => {
        return await axios.get(`http://127.0.0.1:3003/attendance?month=${monthh}`);
    }
export const AdddAttendance = async (addattenddata) => {
        if(addattenddata.username === ''){
        }
        else{
                console.log("====addattendance")
                return await axios.post(`http://127.0.0.1:3003/attendance`,addattenddata);
        }
       
   
}
export const UpdateAttendance = async (addattenddata, attendidd) => {
        if(addattenddata.username === ''){
        }
        else{
                return await axios.put(`http://127.0.0.1:3003/attendance/${attendidd}`,addattenddata);
        }
       
       
}
export const SingleAttendance = async (id) => {
console.log("--------------*********************************************")

        const data= await axios.get(`http://127.0.0.1:3003/attendance/${id}`);
        return data;
}