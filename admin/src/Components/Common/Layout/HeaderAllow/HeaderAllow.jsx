import React from 'react'
import { useLocation } from "react-router-dom";
import Header from '../Header/Header';

const HeaderAllow = (props) => {
  const {setAdmin}=props;
  const location=useLocation()
  const headerPaths = [
    "/", 
    '/trip/oneway',
    '/trip/round',
    "/manage/trip/round",
    '/manage/trip/oneway',
    '/statepermit',
    '/manage/statepermit',
    '/manage/taxibooking',
    '/manage/contact',

   
  ];
  return (
   <>
     {headerPaths.includes(location.pathname) && <Header setAdmin={setAdmin} />}
   </>
  )
}

export default HeaderAllow