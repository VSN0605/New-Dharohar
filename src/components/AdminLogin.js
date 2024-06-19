import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { set } from 'react-hook-form';
import Cookies from 'js-cookie';

export default function RegisterCoach({dbpath,vsb,setBtnstatus}) {
  const containerStyle = {
    backgroundColor: 'white',
    border:'1px solid rgb(67,35,130)'
  };

  useEffect(() => {
    vsb('1');
  }, []);  

  const navigate = useNavigate();

  function handleClick() {
    Cookies.set('userLoggedIn', 'true');
    setBtnstatus('Dashboard');
    navigate('/dashboard');
  }

var btnsubmit =() => {

    var username = document.getElementById('InputUsername').value;
    var password = document.getElementById('InputPassword1').value;

    if(username === 'admin' && password === 'dharohar@2023') {
        // Redirection to dashboard page
        handleClick();
    } else {
        alert('Invalid username or password');
    }
};

  
  return (
    <>
    <div className='main_div' style={{ backgroundColor:'#f1ebff'}}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
     
      <div className="container shadow-lg p-5 mb-5 bg-body-tertiary rounded outer_c1" style={{border:'1px solid rgb(67,35,130)', padding:'50px', backgroundColor:'white'}} >
        <center>
          <h1 className="sp1" style={{fontWeight:'700', color:'rgb(67,35,130)'}}>Admin Login</h1>
        </center>
        <br />
    
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label" style={{color:'RGB(104 81 155)'}}>Username</label>
            <input type="text" class="form-control" id="InputUsername" aria-describedby="emailHelp"/>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label" style={{color:'RGB(104 81 155)'}}>Password</label>
            <input type="password" class="form-control" id="InputPassword1"/>
          </div>
          <br></br>
          <center><button type="button" onClick={btnsubmit} id="submitbtn" class="btn btn-primary" style={{backgroundColor:'rgb(67,35,130)'}}>Login</button></center>
        </form>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      </div>
    </>
  );
}
