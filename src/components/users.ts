import { useQuery } from "@tanstack/react-query";
import { GetAllUsersService } from "../service/getUsersService";

export function GetAllUsers(){
     const allUsers = useQuery({
        queryKey: ['allusers'],
        queryFn: GetAllUsersService
    })
    return allUsers
}

export function CreateUser(){
    
}