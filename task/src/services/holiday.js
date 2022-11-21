import axios from 'axios';

const url3 = "http://127.0.0.1:3003/holiday";

export const getAllHoliday = async () => {
    return await axios.get(`${url3}`);

}