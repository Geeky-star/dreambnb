import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user,setUser] = useState(null);
    const [ready,setReady] = useState(null);

    useEffect(()=>{
       if(!user){
       axios.get("/profile").then(({data})=>{
        console.log('profile data 0 ',data)
        setUser(data);
        setReady(true);
       })
       }
    },[])

    return (
        <UserContext.Provider value={{user,setUser,ready,setReady}}>
            {children}    
        </UserContext.Provider>
    )
}