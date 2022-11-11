import axios from 'axios';


const url = "http://127.0.0.1:3003/task";

export const getallTask = async (id) => {
    id = id || '';
    return await axios.get(`${url}/${id}`);
}

// export const addTask = async (task, id) => {
//     if(task.id!=='' || task.id !== null || task.id !== undefined){
//         return await axios.put(`${url}/${id}`,task);

//     }else{
//         return await axios.post(url,task);
//     }
// }
export const addTask = async (task) => {
    return await axios.post(url,task);
}

// export const editTask = async (id, task) => {
//     return await axios.put(`${url}/${id}`,task);
// }


export const deleteTask = async (id) => {
    return await axios.delete(`${url}/${id}`);
}
export const UpdateUser = async (id) => {
        console.log("ID"+id)
        const data= await axios.get(`http://127.0.0.1:3003/task/${id}`);
        console.log("IDDDDDDDDDDDDDDD"+JSON.stringify(data))
        
        return data;
}
// import axios from 'axios';


// const url = "  http://127.0.0.1:3003/task";

// export const getallTask = async (id) => {
//     id = id || '';
//     if(id){
//         return await axios.get(`http://127.0.0.1:3003/task/`);
//     }
//     else{
//         return await axios.get(url);
//     }
   
// }

// export const addTask = async (task) => {
//     return await axios.post(url,task);
    
// }

// export const editTask = async (id,task) => {
// console.log("uuuuuedit")

// return await axios.put(`http://127.0.0.1:3003/task/${id}`,task);
// }


// export const deleteTask = async (id) => {
//     return await axios.delete(`http://127.0.0.1:3003/task/${id}`);
// }