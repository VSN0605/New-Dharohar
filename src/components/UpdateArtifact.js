// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import './css/Add.css';

// export default function UpdateArtifact({ dbpath, vsb }) {
//   const [selectedImage, setSelectedImage] = useState('');
//   let files;

//   const [id1, setid1] = useState([]);
//   const [Fid, setFid] = useState([]);

//   const navigate = useNavigate(); // Move this line to the top

//   const isUserLoggedIn = Cookies.get('userLoggedIn');

//   useEffect(() => {
//     if (isUserLoggedIn !== 'true') {
//       navigate('/AdminLogin');
//     } else {
//       vsb('1');
//     }
//   }, [isUserLoggedIn, navigate]);

//   const [qrid, setQrid] = useState('-');
//   const [description, setdescription] = useState('');
//   const [price, setprice] = useState('');

//   const onAdd = () => {
//     if (qrid.length === 0) {
//       alert('Artifact Qrid has been left blank!');
//     } else if (description.length === 0) {
//       alert('Artifact Description has been left blank!');
//     } else if (price.length === 0) {
//       alert('Updated Price has been left blank!');
//     } else {
//       const url = dbpath + 'updateartifact.php';
//       let fData = new FormData();
//       fData.append('qrid', qrid);
//       fData.append('description', description);
//       fData.append('price', price);

//       axios
//         .post(url, fData)
//         .then(response => {
//           if (response.data.message === 'Update successful') {
//             alert('Update successful');
//           } else if (response.data.error === 'ID not found') {
//             alert('ID not found');
//           } else {
//             console.log(response.data);
//           }
//         })
//         .catch(error => {
//           console.log(error.toJSON());
//           alert('An error occurred while updating the Data');
//         });
//     }
//   };

//   return (
//     <>
//       <div style={{ backgroundColor: '#f1ebff' }}>
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <div className="container shadow-lg" style={{ border: '1px solid rgb(67,35,130)', padding: '50px', backgroundColor: 'white' }}>
//           <center>
//             <h1 className="sp1" style={{ fontWeight: '700', color: 'rgb(67,35,130)' }}>
//               Update Description and Price
//             </h1>
//           </center>
//           <br />
//           <form>
//             <div className="mb-3">
//               <label className="form-label" style={{ color: 'RGB(104 81 155)' }}>
//                 Artifact Qrid<span style={{ color: 'red' }}>*</span>
//               </label>
//               <input type="text" className="form-control" id="name" onChange={e => setQrid(e.target.value)} />
//             </div>
//             <div className="mb-3">
//               <label className="form-label" style={{ color: 'RGB(104 81 155)' }}>
//                 Artifact Description<span style={{ color: 'red' }}>*</span>
//               </label>
//               <input type="text" className="form-control" id="description" onChange={e => setdescription(e.target.value)} />
//             </div>
//             <div className="mb-3">
//               <label className="form-label" style={{ color: 'RGB(104 81 155)' }}>
//                 Updated Price<span style={{ color: 'red' }}>*</span>
//               </label>
//               <input type="number" className="form-control" id="quantity" onChange={e => setprice(e.target.value)} />
//             </div>
//             <br />
//             <center>
//               <button
//                 type="button"
//                 id="btn1"
//                 className="btn btn-primary1"
//                 style={{ backgroundColor: 'rgb(67,35,130)' }}
//                 onClick={() => {
//                   onAdd();
//                 }}
//               >
//                 Submit
//               </button>
//             </center>
//           </form>
//         </div>
//         <br></br>
//         <br></br>
//         <br></br>
//       </div>
//     </>
//   );
// }

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function UpdateArtifact({ dbpath, vsb }) {
  const [selectedImage, setSelectedImage] = useState('');
  const [id1, setid1] = useState([]);
  const [Fid, setFid] = useState([]);
  const [qrid, setQrid] = useState('-');
  const [description, setdescription] = useState('');
  const [price, setPrice] = useState('');
  const [password, setPassword] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();

  const isUserLoggedIn = Cookies.get('userLoggedIn');

  const onAuthenticate = () => {
    const enteredPassword = prompt('Enter the password for authentication:');
    // Check if the entered password is correct (you might want to use a more secure way to validate the password)
    if (enteredPassword === 'dharohar@2023') {
      setIsEditMode(true);
    } else {
      alert('Authentication failed. You need the correct password to edit the data.');
    }
  };
  
  const onAdd = () => {
    if (!isEditMode) {
      if (qrid.trim() === '') {
        alert('QRID has been left blank!');
      } else if (description.trim() === '') {
        alert('Description has been left blank!');
      } else {
        const url = dbpath + 'updateartifact.php';
        let fData = new FormData();
        fData.append('id', qrid);
        fData.append('description', description);
  
        axios.post(url, fData)
          .then(response => {
            if (response.data.message === 'Update successful') {
              alert('Update successful');
            } else if (response.data.error === 'ID not found') {
              alert('QR ID not found');
            } else {
              console.log(response.data);
            }
          })
          .catch(error => {
            console.log(error.toJSON());
            alert('An error occurred while updating the data');
          });
      }
    } else {
      // Continue with the existing logic for edit mode
      if (qrid.trim() === '') {
        alert('QRID has been left blank!');
      } else if (description.trim() === '') {
        alert('Description has been left blank!');
      } else if (price.trim() === '') {
        alert('Price has been left blank!');
      } else {
        const url = dbpath + 'updateartifact.php';
        let fData = new FormData();
        fData.append('id', qrid);
        fData.append('description', description);
        fData.append('price', price);
  
        axios.post(url, fData)
          .then(response => {
            if (response.data.message === 'Update successful') {
              alert('Update successful');
            } else if (response.data.error === 'ID not found') {
              alert('QR ID not found');
            } else {
              console.log(response.data);
            }
          })
          .catch(error => {
            console.log(error.toJSON());
            alert('An error occurred while updating the data');
          });
      }
    }
  };

  
  

  return (
    <>
    <div style={{backgroundColor:'#f1ebff'}}>
      <br /><br /><br /><br /><br /><br />
      <div className="container shadow-lg" style={{border:'1px solid rgb(67,35,130)', padding:'50px', backgroundColor:'white'}}>
      <center>
          <h1 className="sp1" style={{fontWeight:'700', color:'rgb(67,35,130)'}}>Update description and Price</h1>
        </center>
        <br />
     
        
        <form>
          
          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}>Artifact Qrid<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="name" onChange={(e) => setQrid(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}>Updated description<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="description" onChange={(e) => setdescription(e.target.value)} />
          </div>
          <div className="mb-3">
        <label className="form-label" style={{ color: 'RGB(104 81 155)' }}>
          Updated Price<span style={{ color: 'red' }}>*</span>
        </label>
        {isEditMode ? (
          <input
            type="number"
            className="form-control"
            id="quantity"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        ) : (
          <button type="button" className="btn btn-primary" onClick={onAuthenticate}>
              Enter Password to Edit 
          </button>
        )}
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




