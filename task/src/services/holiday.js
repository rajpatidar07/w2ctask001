import axios from 'axios';

const url3 = "https://my-json-server.typicode.com/shivaniwe2code/we2codejson/holiday";

export const getAllHoliday = async () => {
    return await axios.get(`${url3}`);
}

export const addHoliday = async (addholiday,id) => {
    if(id ==='' || id === null || id === undefined){
        console.log("====addholiday")
        return await axios.post(url3,addholiday);
    }else{
        console.log("====updateholiday")
        return await axios.put(`${url3}/${id}`,addholiday);
    }
   
 }
export const deleteHoliday = async (id) => {
    return await axios.delete(`${url3}/${id}`);
}
export const UpdateHoliday = async (hid) => {
    const data= await axios.get(`https://my-json-server.typicode.com/shivaniwe2code/we2codejson/holiday/${hid}`);
    return data;
}