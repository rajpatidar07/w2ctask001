import axios from 'axios';

const url3 = "http://127.0.0.1:3003/attendance";

export const getAllRecord = async (monthh,uid) => {
    return await axios.get(`http://127.0.0.1:3003/attendance?month=${monthh}&userid=${uid}`);

}

export const AdddAttendance = async (addattenddata) => {
        if(addattenddata.username === ''){
console.log("--------------*********************************************")
        }
        else{
                console.log("====addattendance")
                return await axios.post(`http://127.0.0.1:3003/attendance`,addattenddata);
        }
       
   
}
export const UpdateAttendance = async (addattenddata, attendidd) => {
        if(addattenddata.username === ''){
                console.log("-------------*********************************************")

        }
        else{
                console.log("====updateattendance"+JSON.stringify(addattenddata))
                return await axios.put(`http://127.0.0.1:3003/attendance/${attendidd}`,addattenddata);
        }
       
       
}
export const SingleAttendance = async (id) => {
console.log("--------------*********************************************")

        const data= await axios.get(`http://127.0.0.1:3003/attendance/${id}`);
        return data;
}