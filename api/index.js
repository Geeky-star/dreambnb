const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const User = require('./models/User.js');
const Place = require('./models/Places.js');
const bcrypt = require('bcryptjs')
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const download = require('image-downloader');
const Booking = require('./models/Booking.js')

const multer = require('multer');
const fs = require('fs');
const { ObjectId } = require('mongodb');

app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));

const corsOptions = {
    credentials: true,
    origin: 'http://localhost:3000', // Allow requests from your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
};
app.use(cors(corsOptions));
mongoose.connect(VITE_MONGO_URL);

const jwtSecret = 'fasfjhgkjhjk'

app.get('/test', (req, res) => {
    console.log("testing api")
    res.json('test ok')
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        console.log("req received")

        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        console.log("req not served")
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
})


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email })

    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if (passOk) {
            const user = { name: userDoc.name, email: userDoc.email, id: userDoc._id }
            jwt.sign(user, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);

            })

        } else {
            res.status(422).json("incorrect")
        }


    } else {
        res.json("User not found")
    }
})

app.post("/logout", (req, res) => {
    res.cookie("token", "").json(true)

})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    console.log(token);
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        })
    } else {
        res.json(null)
    }
})


app.post("/upload-by-link", async (req, res) => {
    console.log(__dirname)
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    const options = {
        url: link,
        dest: __dirname + '/uploads/' + newName
    }
    await download.image(options)
    res.json(newName)
})

app.post("/places", (req, res) => {

    mongoose.connect(VITE_MONGO_URL);
    const { token } = req.cookies;
    const { title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn
        , checkOut, maxGuests } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: user.id,
            photos:addedPhotos,
            title, address, description, perks, extraInfo, checkIn
            , checkOut, maxGuests

        })
        res.json(placeDoc)
    })
})

app.get("/user_places", (req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
        if (err) throw err;
        else{
            console.log("user data - ",userData);
            const {id} = userData;
            const response = await Place.find({owner:id});
           res.json(response);
        }
    })
})

app.get("/all_places",async (req,res)=>{
    await mongoose.connect(VITE_MONGO_URL);
    const response = await Place.find();
    if(response){
        res.json(response);
    }else{
        res.json("Something happened");
    }
})

app.get("/places/:id",async (req,res)=>{
    const {id} = req.params;
    res.json(await Place.findById(id));
})


const photosMiddleware = multer({ dest: '/tmp' });
app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname, mimetype } = req.files[i];
        const newPath = originalname.split('.')
        const url = path + newPath[-1]
        uploadedFiles.push(url);
    }
    res.json(uploadedFiles);
});

app.post("/booking",async (req,res)=>{
    const { token } = req.cookies;
    const {
        place,checkIn,checkOut,numberOfGuests,name,phone,price
      } = req.body 
    
    

    jwt.verify(token,jwtSecret,{},async (err,user)=>{
        if(err) throw err;
        if(user){
            const placeId = new ObjectId(place)
            const bookingResponse = await Booking.create({
                user:user.id,
                place:placeId,checkIn,checkOut,numberOfGuests,name,phone,price
               })
               res.json(bookingResponse);
        }
    })
})

app.get("/user_bookings",async (req,res)=>{
    const {token} = req.cookies;
    await mongoose.connect(VITE_MONGO_URL);
    var apiResult=[]

    jwt.verify(token,jwtSecret,{},async (err,user)=>{
        if(err) throw err;
        if(user){
           const result = await Booking.find({user:user.id});
           if (result.length > 0) {
            const promises = result.map(async (booking) => {
              try {
                const id = booking.place;
                const bookingDetails = await Place.findById(id);
                return bookingDetails;
              } catch (err) {
                console.log("Error:", err);
                return null;
              }
            });
  
            // Wait for all promises to resolve
            const resolvedPromises = await Promise.all(promises);
  
            // Filter out null values and send the response
            const filteredResults = resolvedPromises.filter((details) => details !== null);
            res.json(filteredResults);
          } else {
            res.json("No bookings found");
          }
        }
    })
})

app.listen(4000, () => {
    console.log("server started at port 4000");
});









