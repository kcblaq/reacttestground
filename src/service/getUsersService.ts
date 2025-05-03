import axios from "axios";

export async function GetAllUsersService(){
    // const users = await axios.get('https://dummyjson.com/users')
    const users = await axios.get('https://jsonplaceholder.typicode.com/users')
    return users.data
}