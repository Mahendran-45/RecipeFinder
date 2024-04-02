import '../App.css';
import Header from './Header';
import React, {  useState } from 'react'

import Search from './Search';
import Router from './Router'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const[data,setData]=useState([])
  const getFavourites=(value)=>{
    console.log("from app"+value)
    // setData(value)
        //  setData(prevstate => (value))
            //  setData(prevstate => ([...prevstate,value]))


    return value


  }
  return (
    <div >
      <Header value={data}/>
      <Router getFavourites={getFavourites}/>

      
    </div>
  );
}

export default App;
