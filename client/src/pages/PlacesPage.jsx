import { Link, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect,useState } from "react";
import axios from "axios";

export default function PlacesPage(){

    const [placeList,setPlaceList] = useState([]);
    

    useEffect(()=>{
        axios.get("user_places").then((response)=>{
            setPlaceList([...response.data])
        })
    },[])

    return (
        <div>
            <AccountNav/>
           <div className="mx-auto bg-gray-300 w-40 rounded-full px-4 flex gap-3 align-middle">
           <Link className="flex gap-1 py-2" to={'/account/places/new'}>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
       </svg>     <span className="py-0">New Place</span>
                   </Link>
                 
           </div>
          
         {placeList.length>0 && (
            placeList.map(place=>
           (
            <div key={place._id} className="cursor-pointer mb-4 mt-6 bg-gray-100 rounded-xl p-4">
            <Link to={'/account/places/'+place._id} key={place._id} className="cursor-pointer font-semibold text-2xl">
            {place.title}
            </Link>
            <div className="grid grid-cols-3 gap-2 mt-4 mb-6">
                    {place.photos.length>0 && place.photos.map(photo=>(
                         <img src={"http://localhost:4000/uploads/"+ photo} alt="" key={photo}></img>
                    ))}
                </div>
                <span>Address:&nbsp;{place?.address}</span>
            </div>
           )
             )
         )}
        </div>
    );
}