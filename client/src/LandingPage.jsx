import { useState } from "react";
import HotelsList from "./HotelsList";
import './LandingPage.css';

function LandingPage(){

    let [data,setData] = useState([]);
    let [hotelsSaved,setHotelsSaved] = useState(0)

    function increment(){
        setHotelsSaved(prevState => prevState+1);
    }

    async function getHotels(){
        const value = document.querySelector("#input").value.trim();
        const checkInDate = document.getElementById("checkin-date").value;
        const checkoutDate = document.getElementById("checkout-date").value;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '7873d2e966mshe66589160e37262p1556e3jsn9ff665b3ac48',
                'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
            }
        };
        
          const url = `https://airbnb13.p.rapidapi.com/search-location?location=${value}&checkin=${checkInDate}&checkout=${checkoutDate}&adults=1`;

        const response = await fetch(url,options)
        data = await response.json()
        data=data['results']
        setData(data);
        console.log("data - ",typeof data);
    }
    return <>
    <h1>Welcome to Dreambnb</h1>
    <div className="user-input">
    <input type="text" placeholder="Enter a location..." id="input"></input>
    <input type="date" id="checkin-date"></input>
    <input type="date" id="checkout-date"></input>
    <button onClick={getHotels}>Search</button>
    </div>
    <div>Saved - {hotelsSaved}</div>
    
    {Array.isArray(data) && data.length>0 ? <HotelsList hotelsList = {data} incrementSaved = {increment}></HotelsList> : null}
    
    </>
}

export default LandingPage