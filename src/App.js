import React, { useState, useMemo, useEffect } from 'react'
import Cards from './Cards'
import Login from './Login'
import './App.css'
import 'antd/dist/antd.css';

import firebase from "firebase/app";
import Main from './Main'

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
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
        setIsLoggedIn(uid)
      } else {
        // User is signed out
        // ...
        setIsLoggedIn(false)
      }
    });
  }, [])
  return(
    <>
    {
      isLoggedIn ? 
      <Main user={isLoggedIn}/> :
      <Login setIsLoggedIn={setIsLoggedIn}/> 
    }
    </>
  )
}

export default Advanced