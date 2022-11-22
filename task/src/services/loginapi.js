import axios from 'axios';
const url = "https://my-json-server.typicode.com/shivaniwe2code/we2codejson/login";
export const getallUser=async(id)=>{
    id = id || '';
    return await axios.get(`${url}/${id}`);
}
export const addUser = async (login) => {

        console.log("====adduser")
        return await axios.post(url,login);
}
//  }
//  export const Login = async (email,password,login) => {
//     const data= await axios.get(`https://127.0.0.1:3003/user${(email.email===login||password.password===login)}`)
//     return await axios.get(`${url}/${email,password}`);
//  }