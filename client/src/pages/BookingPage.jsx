import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from '../AccountNav';

export default function BookingPage(){

    const [bookingData,setBookingData] = useState([]);

    useEffect(()=>{
        async function getUserBookings(){
            const response = await axios.get("/user_bookings");
            if(response){
                console.log("response bookings api - ",response)
                setBookingData(response.data);
            }
        }
        getUserBookings();
    },[])
    return (
      <div>
        <AccountNav/>
<h1 className="mx-auto font-bold text-2xl mt-10 mb-10 text-center">Booking Page</h1>
{bookingData.length>0 && bookingData.map(booking=>(
    <div className="bg-gray-100 p-5 rounded-2xl">
        <h3 className="font-semibold text-xl">{booking.title}</h3>
        <span>{booking.address}</span>
       <div className="grid grid-cols-4 gap-5 mt-5">
       {booking.photos.length>0 && booking.photos.map(photo => (
            <img className="rounded-xl h-24 w-40" src={"http://localhost:4000/uploads/" + photo} alt=""></img>
        ))}
        </div> 
        <div className="flex gap-4 mt-5 text-gray-500">
        <span>Check In:&nbsp;{booking.checkIn}</span>
        <span>Check Out:&nbsp;{booking.checkOut}</span>
        <span>Maximum Guests:&nbsp;{booking.maxGuests}</span>
            </div> 
    </div>
))}
      </div>
    );
}