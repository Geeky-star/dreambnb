import axios from "axios";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import AccountNav from "../AccountNav";

export default function ProfilePage() {

    const { ready, user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);


    let { subpage } = useParams();



    async function logOut() {
        await axios.post("/logout")
        setRedirect("/")
        setUser(null);
    }
    if (redirect) {
        console.log("redirect - ",redirect)
        return <Navigate to={redirect}></Navigate>
    }
    if (!ready) {
        return <>Loading....</>
    }

    if (ready & !user && !redirect) {
        return <Navigate to={'/login'}></Navigate>
    }

    if (subpage == undefined) {
        subpage = 'profile'
    }




    return (
        <div>
            <AccountNav/>
            {subpage == 'profile' && (
                <div className="text-center font-semibold flex flex-col gap-4">
                    Logged in as {user.name} ({user.email})
                    <button onClick={logOut} className="mx-auto w-40 rounded-full bg-primary text-white p-2">LogOut</button>
                </div>
            )}

        </div>
    );
}