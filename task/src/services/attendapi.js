import axios from 'axios';

const url = "http://127.0.0.1:3003/attendance";

export const getAllRecord = async () => {
    // id = id || '';
    console.log("====alltask")
    return await axios.get(`${url}`);

}