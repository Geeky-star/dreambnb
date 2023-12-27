import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios";

export default function RegisterPage() {

    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    async function registerUser(e) {
        e.preventDefault();
        try{
            await axios.post('/register', {
                'name': name,
                'email': email,
                'password': password
            })
        }
        catch(e){
            alert('Some error')
        }

    }


    return (
        <div className="mt-4 grow flex flex-col items-center justify-around">
            <div className="mb-32">
                <h1 className="text-xl font-semibold text-center mb-4">Register for Dreambnb</h1>
                <form className="p-20 border flex flex-col gap-2" onSubmit={registerUser}>
                    <input type="text" placeholder="John Doe"
                        value={name} onChange={e => setName(e.target.value)}></input>
                    <input type="email" placeholder="your@email.com"
                        value={email} onChange={e => setEmail(e.target.value)}></input>
                    <input type="password" placeholder="password"
                        value={password} onChange={e => setPassword(e.target.value)}></input>
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>

            </div>       </div>
    )
}







