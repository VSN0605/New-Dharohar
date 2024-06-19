import React from 'react'
import logo from './images/logo.jpg'
import './css/Header.css'
import { useNavigate } from "react-router-dom";
import {
    Link
  } from "react-router-dom";
import { useEffect } from 'react';
  import Cookies from 'js-cookie';
export default function Header({dbpath, btnStatus, setBtnstatus}) {

  
  const navigate = useNavigate();

 

  const isUserLoggedIn = Cookies.get('userLoggedIn');


var clickme =() => {

  if (isUserLoggedIn !== 'true') {
    navigate('/AdminLogin');
  }
  else
  {
    navigate('/Dashboard');
  }
  
}

useEffect(() => {
  statusLogin();
}, []); 


var statusLogin =() => {

  if (isUserLoggedIn !== 'true') {
    setBtnstatus('Admin Login');
  }
  else
  {
    setBtnstatus('Dashboard');
  }


}

  return (
    <>
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top bborder hf-hide" id="mainNav">
      <div class="container-fluid">
        <a class="navbar-brand js-scroll-trigger" href="#page-top">
            <Link to="/"><img src={logo} style={{width:'100px'}}/></Link>
		</a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger active" href="#home">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#about">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#services">Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#products">Products</a>
            </li>
			<li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#team">Team</a>
            </li>
			<li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#contact">Contact Us</a>
            </li>
            <li class="nav-item">
                <button type="button" onClick={clickme} class="btn" id='btnswitch' style={{backgroundColor:"#432382", color:"white", marginTop:'5px'}}>{btnStatus}</button>
            </li>
          </ul>
        </div>
      </div>
      <div style={{height:'1px', backgroundClip:'color:rgb(67,35,130)'}}></div>
    </nav>
    </>
  )
}
