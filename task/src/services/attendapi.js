import axios from 'axios';


export const getAllRecord = async (monthh,uid) => {
    return await axios.get(`https://my-json-server.typicode.com/shivaniwe2code/we2codejson/attendance?month=${monthh}&userid=${uid}`);
}
export const getAllCount = async (monthh) => {
        return await axios.get(`https://my-json-server.typicode.com/shivaniwe2code/we2codejson/attendance?month=${monthh}`);
    }
export const AdddAttendance = async (addattenddata) => {
        if(addattenddata.username === ''){
        }
        else{
                console.log("====addattendance")
                return await axios.post(`https://my-json-server.typicode.com/shivaniwe2code/we2codejson/attendance`,addattenddata);
        }
       
   
}
export const UpdateAttendance = async (addattenddata, attendidd) => {
        if(addattenddata.username === ''){
        }
        else{
                return await axios.put(`https://my-json-server.typicode.com/shivaniwe2code/we2codejson/attendance/${attendidd}`,addattenddata);
        }
       
       
}
export const SingleAttendance = async (id) => {
console.log("--------------*********************************************")

        const data= await axios.get(`https://127.0.0.1:3003/attendance/${id}`);
        return data;
}