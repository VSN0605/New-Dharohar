import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import dum from "./images/dummy.jpeg";
import "./css/Add.css"
import Cookies from 'js-cookie';

export default function UpdateQuantity({dbpath, vsb}) {

  const [selectedImage, setSelectedImage] = useState('');
  let files;
  

  const [id1, setid1] = useState([]);
  const [Fid, setFid] = useState([]);


  const isUserLoggedIn = Cookies.get('userLoggedIn');

      useEffect(() => {
          if (isUserLoggedIn !== 'true') {
              navigate('/AdminLogin');
          }
          else
          {
            
            vsb('1');
          }
      }, [isUserLoggedIn]);    


  const [qrid, setQrid] = useState('-');
  const [quantity, setQuantity] = useState('');
  
  const navigate = useNavigate();



  const onAdd = () => {
    if (qrid.length === 0) {
      alert("QRID has been left blank!");
    }else if (quantity.length === 0) {
      alert("Quantity has been left blank!");
    } 
       else {
      
      const url = dbpath+'updateQuantity.php';
      let fData = new FormData();
      fData.append('id', qrid);
      fData.append('quantity', quantity);
      axios.post(url, fData)
        .then(response => alert(response.data))
        .catch(error => {
          console.log(error.toJSON());
        });

      }
  }

  return (
    <>
    <div style={{backgroundColor:'#f1ebff'}}>
      <br /><br /><br /><br /><br /><br />
      <div className="container shadow-lg" style={{border:'1px solid rgb(67,35,130)', padding:'50px', backgroundColor:'white'}}>
      <center>
          <h1 className="sp1" style={{fontWeight:'700', color:'rgb(67,35,130)'}}>Update Qunatity</h1>
        </center>
        <br />
     
        
        <form>
          
          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}>Artifact Qrid<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="name" onChange={(e) => setQrid(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}>Updated Quantity<span style={{color:'red'}}>*</span></label>
            <input type="number" className="form-control" id="quantity" onChange={(e) => setQuantity(e.target.value)} />
          </div>
         
          <br />
          <center>  
            <button type="button" id="btn1" className="btn btn-primary1" style={{backgroundColor:'rgb(67,35,130)'}} onClick={() => { onAdd() }}>Submit</button>
          </center>
        </form>
      </div>
      <br></br><br></br><br></br>
      </div>
    </>
  );
}
