import { useEffect, useState } from "react";
import PlacePage from "./PlacePage";
import axios from "axios";
import e from "express";

export default function Indexpage(){

    const [places,setPlaces] = useState([]);
    const [page,setPage] = useState(false);
    const [pageDetail,setPageDetail] = useState(null);
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [username,setUsername] = useState('');
    const [phone,setPhone] = useState('');

     
    useEffect(()=>{
        async function getUserBookings(){
            const response = await axios.get("/all_places");
            if(response){
                console.log("response all places api - ",response)
                setPlaces(response.data);
            }
        }
        getUserBookings();
    },[])

   function navigateToPlacePage(place){
        console.log("event - ",place)
        setPage(true);
        setPageDetail(place);
    }

    function handleBooking(){
        const data = {place:pageDetail._id, checkIn,checkOut,name:username,phone};
        axios.post("/booking",data).then(response=>{
            console.log("booking done - ",response)
        }).catch(e=>{
            console.log("error - ",e)
        })
    }

    /*
    function handleWishlistButtonClick(e){
        e.preventDefault()
        console.log("add to wishlist")
    }
    */

    return (
    <div>
        {!page && (
        <div className="mt-8 grid gap-x-10 gap-y-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {places.length>0 && places.map((place) => (
            <div key={place._id} >
                <div className="bg-gray-500 mb-2 rounded-2xl flex" onClick={()=>{
                navigateToPlacePage(place)
            }}>
                    {place.photos?.[0] && (
                        <img className="rounded-2xl object-cover aspect-square" src={"http://localhost:4000/uploads/"+ place.photos[0]}></img>
                    )}
                    </div>
                    <div className="flex justify-between">
                        <h2 className="font-bold">{place.address}</h2>
                    <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>
                    </button>
                    </div>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            </div>
        ))}
    </div>
    )}
    {page && (
       <div className="mt-16 mx-32 ">
         <h2 className="text-2xl font-semibold mb-5">{pageDetail.title}</h2>
<div className="grid grid-cols-2 grid-flow-col-dense gap-2 rounded-3xl overflow-hidden mb-4 max-h-full">
    <div>
        {pageDetail.photos?.[0] && (
          <div>
            <img src={"http://localhost:4000/uploads/"+ pageDetail.photos[0]}></img>
            </div>
        )}
        </div>
        <div className="grid">
            {pageDetail.photos?.[1] && (
                <img src={"http://localhost:4000/uploads/"+pageDetail.photos[1]}></img>
            )}
            <div>
                {pageDetail.photos[2] && (
                    <img src={"http://localhost:4000/uploads/"+pageDetail.photos[2]}></img>
                )}
                </div>
            </div>
    

    </div>
    <h3 className="text-lg font-semibold">{pageDetail.address}</h3>
    <div>
    <div className="flex mb-4 mt-4 border">
         </div>      
          <div className="flex justify-between">
          <div className="flex flex-col gap-10">
            <div>
            <h3 className="font-semibold text-xl mb-4">What this place offers</h3>
            <div className="grid lg:grid-cols-4 md:grid-cols-2">
                {pageDetail.perks.length>0 && pageDetail.perks.map(
                    amenity => <span key={amenity}>{amenity}</span>
                )}
                {pageDetail.perks.length==0 && (
                    <span>No Amenities offered currently.</span>
                )}
                </div>    
                </div> 
                <div>
                    {pageDetail.description}
                    </div> 
        </div> 
          <div className="bg-white shadow p-10 rounded-2xl m-10">
                <div className="text-2xl text-center">
                Price: 200 per night 
                    </div> 
               <div className="border rounded-2xl mt-4 mb-4">
               <div className="py-4 px-4 rounded-2xl">
                        <label className="font-semibold">CHECK-IN:</label>
                        <input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)}></input>
                        </div> 
                        <div className="py-4 px-4 rounded-2xl">
                        <label className="font-semibold">CHECKOUT:</label>
                        <input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)}></input>
                            </div>
                            <div className="py-4 px-4 rounded-2xl">
                                <label className="font-semibold">NAME:</label>
                                <input type="text" value={username} onChange={e=>setUsername(e.target.value)}></input>
                                </div>
                                <div className="py-4 px-4 rounded-2xl">
                                <label className="font-semibold">PHONE:</label>
                                <input type="text" value={phone} onChange={e=>setPhone(e.target.value)}></input>
                                </div>
               
                </div> 
                    <button className="primary" onClick={handleBooking}>Reserve</button>
                </div>
 
            </div> 
         
            </div> 
                   </div> 
    )}
    </div>
    );
}






