import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Indexpage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from "axios";
import { UserContextProvider } from './UserContext';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage'; 
import PlacePage from './pages/PlacePage';
import BookingPage from './pages/BookingPage';

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>

<Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element = {<Indexpage/>}></Route>
    <Route path="/login" element={<LoginPage/>}></Route>
    <Route path='/register' element={<RegisterPage/>}></Route>
  <Route path='/account' element={<ProfilePage/>}></Route>
  <Route path='/account/places' element={<PlacesPage/>}></Route>   
  <Route path='/account/places/new' element={<PlacesFormPage/>}></Route>  
  <Route path='/account/places/:id' element={<PlacesFormPage/>}></Route>  
  <Route path='/account/bookings' element={<BookingPage/>}></Route>
  <Route path='/:id' element={<PlacePage/>}></Route>
      </Route>
  </Routes>
    </UserContextProvider>
  )
}

export default App









