import { useEffect, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "./PhotosUploader";
import axios from "axios";
import { Navigate } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useParams } from "react-router-dom";

export default function PlacesFormPage(){
    const {id} = useParams();
    
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [perks,setPerks] = useState([]);
    const [extraIno,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [redirect,setRedirect] = useState(false);

    useEffect(()=>{
        if(!id){
            return ;
        }
        console.log("id - of place - ",id)
    
     axios.get(`/places/${id}`).then((response)=>{
        const data = response.data;
        setTitle(data.title)
        setDescription(data.description);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setPerks(data.perks);
        setExtraInfo(data.extraIno);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);

     });
    },[id])
    
  
    function inputHeader(text){
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    function inputDescription(text){
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }

    function preInput(header,description){

        return (
            <>
            {inputHeader(header)}
            {inputDescription(description)}
            </>
        )
    }

    async function addNewPlace(event){

        event.preventDefault();
        const placesData = {title,address,addedPhotos,description,
        perks,extraIno,checkIn,checkOut,maxGuests}

        await axios.post("/places",placesData)
        setRedirect(true);
    }

    if(redirect){
       return <Navigate to={'/account/places'}/>
    }

    return (
    <div>
        <AccountNav/>
            <form onSubmit={addNewPlace} className="flex flex-col justify-center">
                {preInput('Title','Title for your place.')}
                   <input type="text" className="w-full border my-1 py-2 px-3 rounded-2xl"  placeholder="Title"
                    value={title} onChange={(e)=>setTitle(e.target.value)}
                    ></input>
                  {preInput('Address','Your Address')}
                    <input type="text" className="w-full border my-1 py-2 px-3 rounded-2xl" placeholder="Address" 
                    value={address}
                     onChange={(e)=>setAddress(e.target.value)}></input>
                  {preInput('Photos','Add photos for your place..')}
                 <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                {preInput('Description','Provide description of your place')}
                
                <textarea className="w-full border my-1 py-2 px-3 rounded-2xl" value={description} 
                onChange={(e)=>setDescription(e.target.value)}></textarea>

                {preInput('Perks','Some of perks your place offers.')}
               <Perks selected={perks} onChange={setPerks}/>
                <h2 className="text-2xl mt-4">Extra Info</h2>
                <p className="text-gray-500 text-sm">House rules or any relevant information to your place</p>
                <textarea className="w-full border my-1 py-2 px-3 rounded-2xl" value={extraIno} onChange={(e)=>setExtraInfo(e.target.value)}></textarea>

                <h2 className="text-2xl mt-4">Stay Details</h2>
                <p className="text-gray-500 text-sm">Add CheckIn time, CheckOut Time, Number of Guests that can stay</p>
<div className="grid sm:grid-cols-3 gap-2">
    <div>
        <h3 className="mt-2 -mb-1">CheckIn time</h3>
    <input className="w-full border my-1 py-2 px-3 rounded-2xl" placeholder="24:00" value={checkIn} onChange={(e)=>setCheckIn(e.target.value)}></input>
    </div>
    <div>
        <h3>CheckOut time</h3>
    <input className="w-full border my-1 py-2 px-3 rounded-2xl" placeholder="24:00" value={checkOut} onChange={(e)=>setCheckOut(e.target.value)}></input>
    </div>
    <div>
        <h3>Max number of Guests</h3>
    <input className="w-full border my-1 py-2 px-3 rounded-2xl" value={maxGuests} onChange={(e)=>setMaxGuests(e.target.value)}></input>
    </div>
</div>
<button className="my-4 bg-primary mx-auto font-semibold text-white px-8 py-3 rounded-xl">Save</button>
                </form>                
    </div>
  );
}








