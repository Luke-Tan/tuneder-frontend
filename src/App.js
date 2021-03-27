import React, { useState, useMemo, useEffect } from 'react'
import Matches from './Matches'
import Login from './Login'
import './App.css'
import 'antd/dist/antd.css';

import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAO76Hlsg2Gras17FJdsMJ_Ov_h1rYk4cI",
  authDomain: "tuneder-804e8.firebaseapp.com",
  databaseURL: "https://tuneder-804e8-default-rtdb.firebaseio.com",
  projectId: "tuneder-804e8",
  storageBucket: "tuneder-804e8.appspot.com",
  messagingSenderId: "269614238814",
  appId: "1:269614238814:web:02c72dfca6f0d70bc838cf"
};

firebase.initializeApp(firebaseConfig);


function Advanced () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return(
    <>
    {
      isLoggedIn ? 
      <Matches/> :
      <Login setIsLoggedIn={setIsLoggedIn}/> 
    }
    </>
  )
}

export default Advanced