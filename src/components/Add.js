// import React from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import dum from "./images/dummy.jpeg";
// import "./css/Add.css"
// import Cookies from 'js-cookie';


// export default function Add({dbpath, qrid, setQrid, vsb}) {

//   const [selectedImage, setSelectedImage] = useState('');
//   let files;
//   const onFileChange = (e) => {

//     setImgstatus('1');
//     files = document.getElementById("fileup").files;
//     let fileReader = new FileReader();
//     fileReader.readAsDataURL(files[0]);

//     fileReader.onload = (event) => {
//       setSelectedImage(event.target.result);
//       console.log(files[0]);
//     }
//   }

//   const [id1, setid1] = useState([]);
//   const [Fid, setFid] = useState([]);

//   const loadFid = async () => {
//   const result = await axios.get(dbpath+"getid.php");
//     setFid(result.data.phpresult);
//     console.log(result.data.phpresult);
//     setId(result.data.phpresult[0]['id']);
//   };

//   const isUserLoggedIn = Cookies.get('userLoggedIn');

//       useEffect(() => {
//           if (isUserLoggedIn !== 'true') {
//               navigate('/AdminLogin');
//           }
//           else
//           {
//             loadFid();
//             setQrid(makeid(8));
//             vsb('1');
//             console.log(qrid);
//           }
//       }, [isUserLoggedIn]);    


//     function makeid(length) {
//         let result = '';
//         const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghjikmnopqrstuvwxyz0123456789';
//         const charactersLength = characters.length;
//         let counter = 0;
//         while (counter < length) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//         counter += 1;
//         }
//         return result;
//     }

//   const [id, setId] = useState('');
//   const [name, setName] = useState('-');
//   const [desc, setDesc] = useState('-');
//   const [price, setPrice] = useState('');
//   const [hsncode, setHsncode] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [imgstatus, setImgstatus] = useState('0');
  
//   const navigate = useNavigate();

//   function handleClick() {
    
//       navigate("/qr");
   
//   }


//   const onAdd = () => {
//     if (price.length === 0) {
//       alert("Price has been left blank!");
//     }else if (quantity.length === 0) {
//       alert("Quantity has been left blank!");
//     } 
//        else {
//       files = document.getElementById("fileup").files;
//       console.log("files\n");
//       console.log(files[0]['name']);
//       console.log("files\n");

//       setid1(document.getElementById("trno").value);  
//       console.log("ew" + hsncode);
//       const url = dbpath+'add.php';
//       let fData = new FormData();
//       fData.append('qrid', qrid);
//       // fData.append('id', id);
//       fData.append('name', name);
//       fData.append('desc', desc);
//       fData.append('hsncode', hsncode);
//       fData.append('quantity', quantity);
//       fData.append('price', price);
//       fData.append('image',files[0]);
//       axios.post(url, fData)
//         .then(response => {})
//         .catch(error => {
//           console.log(error.toJSON());
//         });
//         document.getElementById("btn1").innerHTML= "Submitting... just a sec!! ";
//         setTimeout(() => {
//       handleClick();
//     }, 2000);
//       }
//   }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import "./css/Add.css";


  export default function Add({ dbpath, qrid, setQrid, vsb }) {
  const [selectedImage, setSelectedImage] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [artid, setArtid] = useState(''); 
  const [hsncode, setHsncode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imgstatus, setImgstatus] = useState('0');
  // const [aqrid, setAqrid] = useState('');   
  const navigate = useNavigate();

  const isUserLoggedIn = Cookies.get('userLoggedIn');

  useEffect(() => {
    if (isUserLoggedIn !== 'true') {
      navigate('/AdminLogin');
    } else {
      setQrid(makeid(8));
      vsb('1');
    }
  }, [isUserLoggedIn]);

  
  const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const onFileChange = (e) => {
    setImgstatus('1');
    const file = e.target.files[0];
    if (file) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
    }
  };

  const onAdd = () => {
    if (price.length === 0) {
      alert("Price has been left blank!");
    } else if (quantity.length === 0) {
      alert("Quantity has been left blank!");
    } else if (artid.length === 0) {
      alert("Artifact ID has been left blank!");
    } else {
      const fileInput = document.getElementById("fileup");
      const file = fileInput.files[0];

      const fData = new FormData();
      fData.append('artid', artid);
      fData.append('qrid', qrid);
      // fData.append('aqrid', aqrid);
      fData.append('name', name);
      fData.append('desc', desc);
      fData.append('hsncode', hsncode);
      fData.append('quantity', quantity);
      fData.append('price', price);
      fData.append('image', file);

      axios.post(`${dbpath}add.php`, fData)
        .then(response => {
          console.log("Response from server:", response.data);
         
        })
        .catch(error => {
          console.error("Error in submission:", error);
        });

      document.getElementById("btn1").innerHTML = "Submitting... just a sec!! ";
      setTimeout(() => {
        handleClick();
      }, 2000);
    }

    const handleClick = () => {
      navigate("/qr");
    };

  };



  return (
    <div style={{ backgroundColor: '#f1ebff' }}>
      <br /><br /><br /><br /><br /><br />
      <div className="container shadow-lg" style={{ border: '1px solid rgb(67,35,130)', padding: '50px', backgroundColor: 'white' }}>
        <center>
          <h1 className="sp1" style={{ fontWeight: '700', color: 'rgb(67,35,130)' }}>Add Artifact</h1>
        </center>
        <br />
        <form>
          <div className="mb-3">
            <label className="form-label" style={{ color: 'RGB(104 81 155)' }}>Artifact ID</label>
            <input type="hidden" className="form-control" id="trno1" value={artid} disabled />
            <input type="text" className="form-control" id="artid" value={artid} onChange={(e) => setArtid(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: 'RGB(104 81 155)' }}>Artifact Name</label>
            <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} />
          </div>
          {/* <div className="mb-3">
            <label className="form-label" style={{ color: 'RGB(104 81 155)' }}>Artifact Qrid</label>
            <input type="text" className="form-control" id="qrid" onChange={(e) => setAqrid(e.target.value)} />
          </div>   */}
          <div className="mb-3">
            <label className="form-label" style={{ color: 'RGB(104 81 155)' }}>Artifact Description</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setDesc(e.target.value)}></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: 'RGB(104 81 155)' }}>Quantity<span style={{ color: 'red' }}>*</span></label>
            <input type="number" className="form-control" id="quantity" onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: 'RGB(104 81 155)' }}>HSN Code</label>
            <input type="text" className="form-control" id="hsncode" onChange={(e) => setHsncode(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="form-label me-3" style={{ color: 'RGB(104 81 155)' }}>Upload Image<span style={{ color: 'red', marginRight: '20px' }}>*</span></label>
            <input type="file" className='form-control' id="fileup" onChange={onFileChange} />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: 'RGB(104 81 155)' }}>Artifact Price<span style={{ color: 'red' }}>*</span></label>
            <input type="number" className="form-control" id="price" onChange={(e) => setPrice(e.target.value)} />
          </div>
          <br />
          <center>
            <button type="button" id="btn1" className="btn btn-primary1" style={{ backgroundColor: 'rgb(67,35,130)' }} onClick={onAdd}>Submit</button>
          </center>
        </form>
      </div>
      <br /><br /><br />
    </div>
  );
}

