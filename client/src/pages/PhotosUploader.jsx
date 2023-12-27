import { useState } from "react";
import axios from 'axios';

export default function PhotosUploader({addedPhotos,onChange}){
    const [photoLink,setPhotoLink] = useState('');
    
    async function addPhotoByLink(e){
        e.preventDefault()
        await axios.post("/upload-by-link",{link:photoLink}).then((res)=>{
            console.log("response ",res);
            setPhotoLink('')
            onChange(prev =>{
                return [...prev,res.data]
            })
        })
    }

    function uploadPhoto(e){
        const files = e.target.files;
        const data = new FormData()
        
        for(var i=0;i<files.length;i++){
            data.append('photos',files[i])
        }

        axios.post('/upload',data,{
            headers:{'Content-Type' : 'multipart/form-data'}
        }).then(response=>{
            const {data:filenames} = response;
            onChange(prev=>{
                return [...prev,...filenames];
            })
        })
    }
    return (
        <>
          <div className="flex gap-2">
                    <input type="text" placeholder="Add using link" 
                    value={photoLink} onChange={e=>setPhotoLink(e.target.value)}></input>
                <button onClick={addPhotoByLink} className="bg-gray-200 w-60 rounded-full">Add&nbsp; photo</button>
                </div>
                <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                   
             {addedPhotos.length>0 && ( addedPhotos.map((link)=>(
                <div className="h-32 flex " key={link}>
                <img className="rounded-2xl w-full object-cover" src={"http://localhost:4000/uploads/"+link} alt=""></img>
                </div>
             ))
             )}
                <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-8" >
                <input multiple type="file" className="hidden" onChange={uploadPhoto}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
</svg>
Upload
                </label>
                
                </div>
        </>
    )
}