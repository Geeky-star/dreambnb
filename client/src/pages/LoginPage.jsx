import { useContext, useState } from "react"
import { Link,Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";


export default function LoginPage(){

    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');
    let [redirect,setRedirect] = useState('');

    const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(e){
        e.preventDefault();
        try{
          const response =  await axios.post('/login',{
            'email': email,
            'password': password})
            setUser(response['data']);
            setRedirect(true);
        }
        catch(e){
            console.log("login not done")
        }

        
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (
        <div className="mt-4 grow flex flex-col items-center justify-around">
          <div className="mb-32">
          <h1 className="text-2xl font-semibold text-center mb-4">Welcome to Dreambnb</h1>
            <form  className="p-20 border flex flex-col gap-4" onSubmit={handleLoginSubmit}>
               
                <input type="email" placeholder="your@email.com"
                value={email} onChange={(e)=>setEmail(e.target.value)}
                ></input>
                <input type="password" placeholder="password" 
                value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button className="primary">Login</button>
                <div className="text-center py-2 text-gray-500">
Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
                </div>
                </form> 
 
            </div>       </div>
    )
}







