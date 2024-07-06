import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./css/Add.css"
import { get } from 'react-hook-form';
import Cookies from 'js-cookie';

export default function GenerateInvoice({cart,setCart,dbpath,vsb}) {

  const [id, setId] = useState('');
  const [name, setName] = useState('-');
  const [cno, setCno] = useState('-');
  const [email, setEmail] = useState('-');
  const [address, setAddress] = useState('-');
  const [price, setPrice] = useState('');
  const [pid, setPid] = useState('');
  const [qrid, setQrid] = useState('');
  const [pname, setPname] = useState('');
  const [fprice, setFprice] = useState('0');
  const [damount, setDAmount] = useState('0');
  const [gstStatus, setGststatus] = useState('0');
  const [tamount, setTamount] = useState('0');
  const [artifact, setArtifact] = useState([]);
  const [gst, setGst] = useState('0');
  const [image, setImage] = useState('');
  const [hsncode, setHsncode] = useState('');
  const [gstValue, setGstvalue] = useState('0');
  const [aQuantity, setAQuantity] = useState('0');
  const [invoiceNo, setInvoiceNo] = useState('0');
  const [invoiceId, setInvoiceId] = useState('0');
  const navigate = useNavigate();

  const [invoiceData, setInvoiceData] = useState([]);

  function handleClick() {
    navigate("/Invoice");
  }
  
  useEffect(() => {
    cart.splice(0,cart.length);
    
    loadino();
  }, []);

  const isUserLoggedIn = Cookies.get('userLoggedIn');
  
      useEffect(() => {
          if (isUserLoggedIn !== 'true') {
              navigate('/AdminLogin');
          }
          else
          {
            loadArtifacts();
              vsb('1');
          }
      }, [isUserLoggedIn]);    


  const fetchData = async() => { 
      let result;
      let tqrid;
      if(qrid.includes('display'))
      {
        tqrid =qrid.slice(-8);
        setQrid(tqrid);
        console.log(" wd "+tqrid);
        result = await axios.get(dbpath+"invoicefetch.php?qrid="+tqrid);
      }
      else
      {
         result = await axios.get(dbpath+"invoicefetch.php?qrid="+qrid);
         console.log("My REsuklt: ", result.data.phpresult)
         setInvoiceData([...invoiceData, result.data.phpresult]);
      } 
      if (!result.data.phpresult || result.data.phpresult.length === 0) {
      
        alert("Invalid QR ID. Please enter a valid QR ID.");
        return;

      }
      setArtifact(result.data.phpresult);
    
      setPname(result.data.phpresult[0]['name']);
      setId(result.data.phpresult[0]['id']);
      setPrice(result.data.phpresult[0]['price']);
      document.getElementById("finalp").value = result.data.phpresult[0]['price'];
      setHsncode(result.data.phpresult[0]['hsncode']);
      setImage(result.data.phpresult[0]['image']);
      setAQuantity(result.data.phpresult[0]['quantity'])
      addCart(result.data.phpresult[0]['qrid'],result.data.phpresult[0]['hsncode'],result.data.phpresult[0]['quantity'],result.data.phpresult[0]['name'],result.data.phpresult[0]['price'],result.data.phpresult[0]['price'],result.data.phpresult[0]['id'],result.data.phpresult[0]['description']);
      calculateFprice(result.data.phpresult[0]['price'],damount,gst);
  }

  const addCart = (pqrid, hsncodef, paqty, pnamef,ratef,pricef,ppid,pdesc) => { 
    setCart([
      ...cart,
      {
        cqrid: pqrid,
        qrid: hsncodef,
        aqty : paqty,
        pname: pnamef,
        rate: ratef,
        quantity: '1',
        price: ratef,
        id: ppid,
        desc: pdesc

      }
    ]);
  };

  const loadino = async () => {
    let query="select max(invoice_no) as mid from invoice";
         
       /* alert(query); */
       const url = dbpath + 'getDynamic.php';
       let fData = new FormData();

     

       fData.append('query', query);

       const response = await axios.post(url, fData);

       if (response && response.data) {

           if (response.data.phpresult) {
           
               console.log(response.data.phpresult);
               document.getElementById('ino').innerHTML = parseInt(response.data.phpresult[0]['mid']) + parseInt(1);
                setInvoiceId(parseInt(response.data.phpresult[0]['mid']) + parseInt(1));
              }
           
       }
      }

  const removeCart =() =>{
   
  }
  



  const calculateFprice = (cprice, cdamount, cgst) => {
    var ttamount = parseInt(tamount) + parseInt(cprice);
    setTamount(parseInt(tamount) + parseInt(cprice));
    document.getElementById('totalid').innerHTML = priceFormat(ttamount);
    var tdisc= (ttamount/100)*damount;
    var discountedtamount = ttamount - tdisc;
    var tgst = (discountedtamount/100)*gst;
    setFprice(parseInt(discountedtamount)+parseInt(tgst));
    document.getElementById('finalp').value = parseInt(discountedtamount)+parseInt(tgst);
  }

  // const calgstanddiscount = () => {
  //   var tdisc = (tamount / 100) * damount;
  //   var discountedtamount = tamount - tdisc;
  //   var tgst = (discountedtamount / 100) * gst;
  //   setFprice(parseInt(discountedtamount) + parseInt(tgst));
  //   document.getElementById('finalp').value = parseInt(discountedtamount) + parseInt(tgst);
  // };

  // calculating GST and Total Amount
  const calgstanddiscount = () => {
    let total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let discountAmount = (total / 100) * damount;
    let discountedTotal = total - discountAmount;
    let gstAmount = (discountedTotal / 100) * gst;
    let finalAmount = discountedTotal + gstAmount;
    
    setTamount(total);
    document.getElementById('totalid').innerHTML = priceFormat(total);
  
    setFprice(finalAmount);
    document.getElementById('finalp').value = priceFormat(finalAmount);

    // console.log("GST-->", gst);
    // const {name, description, price, qrid, hsncode, image} = invoiceData;
    // setInvoiceData({
    //   name: name,
    //   description: description,
    //   price: price,
    //   qrid: qrid,
    //   hsncode: hsncode,
    //   image: image,
    //   gst: gst,
    //   discount: damount,
    //   finalPrice: fprice,
    // })
    // console.log("MY INVOICE: ", invoiceData);
  };
  

  const onQuantyityAdd = (index) => {
    const newCart = [...cart];
    newCart[index].quantity = parseInt(newCart[index].quantity) + 1;
    setCart(newCart);
    calculateTotalAmount(newCart);
  }; 
  
  const onQuantyitySub = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity = parseInt(newCart[index].quantity) - 1;
      setCart(newCart);
      calculateTotalAmount(newCart);
    } else {
      alert("Quantity can't be less than 1");
    }
  };

  // Handle Delete Function
  // const handleDelete = (productId, event) => {
  //   event.preventDefault();
    
  //   const updatedCart = cart.filter(item => item.id !== productId);
    
  //   setCart(updatedCart);
  // }

  // Handle Delete Function
// const handleDelete = (productId, event, index) => {
  
//   event.preventDefault();

//   const updatedCart = cart.filter((item, i) => item.id !== productId && i !== index);
//   setCart(updatedCart);
//   calculateTotalAmount(updatedCart);
// }

const handleDelete = (event, index) => {
  event.preventDefault();

  // Use the index to delete the specific item
  const updatedCart = cart.filter((item, i) => i !== index);
  setCart(updatedCart);
  calculateTotalAmount(updatedCart);
};  
  
const priceFormat = (price) => {
  price = parseFloat(price).toFixed(2).toString();

  let [wholePart, decimalPart] = price.split('.');

  var lastThree = wholePart.substring(wholePart.length - 3);
  var otherNumbers = wholePart.substring(0, wholePart.length - 3);
  if (otherNumbers != '')
      lastThree = ',' + lastThree;
  var formattedWholePart = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  var formattedPrice = formattedWholePart + '.' + decimalPart;
  
  return formattedPrice;
}

  const calculateTotalAmount = (cartItems) => {
    let total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    let discountAmount = (total / 100) * damount;
    let discountedTotal = total - discountAmount;
    let gstAmount = (discountedTotal / 100) * gst;
    let finalAmount = discountedTotal + gstAmount;

    setTamount(total);
    document.getElementById('totalid').innerHTML = total;

    setFprice(finalAmount);
  };

  /* const viewCart = () =>{
    for (let index = 0; index < cart.length; index++) {
      let item = cart[index];
      console.log(`Item ${index + 1}:`);
      console.log(`Name: ${item.pname}`);
      console.log(`HSN Code: ${item.qrid}`);
      console.log(`Rate: ${item.rate}`);
      console.log(`Quantity: ${item.quantity}`);
      console.log(`Price: ${item.price}`);
      console.log("--------------------");
    }
  }
  
  const updateItemDB = () => {
    for (let index = 0; index < cart.length; index++) {
      let item = cart[index];
      const selectedQuantity = item.quantity;
      console.log(`Item ${index + 1}:`);
      console.log(`Name: ${item.pname}`);
      console.log(`HSN Code: ${item.qrid}`);
      console.log(`Rate: ${item.rate}`);
      console.log(`Quantity: ${item.quantity}`);
      console.log(`Price: ${item.price}`);
      console.log(selectedQuantity);
      console.log("--------------------");

      let quantityCheck = 0;
      const url1 = dbpath+'getQuantity.php';

      let fData1 = new FormData();
      fData1.append('id', item.qrid);
      
      console.log(fData1);
      axios.post(url1, fData1)
        .then()
        .catch(error => {
          console.log(error.toJSON());
        });

         */
      
          

      /* const url = dbpath+'updateQuantity.xphp';

      let fData = new FormData();
      fData.append('id', item.qrid);
      fData.append('quantity', item.quantity);
      
      console.log(fData);
      axios.post(url, fData)
        .then(response => alert(response.data))
        .catch(error => {
          console.log(error.toJSON());
        });
    }
  } */
  
  const loadArtifacts = () => {
    
  }

  const handleQrid=(e)=>{
    e.preventDefault();
    console.log("QR id Value :-> ", e.target.value);
    // if(e.target.value>10){
    //   let newdata = e.target.value.slice(0,40)
    //   console.log(newdata);
    //   setQrid(newdata);
    // }
    setQrid(e.target.value);
    localStorage.setItem("InvoiceQrid", e.target.value);
  }

  const submit = async() => {
    // try{
    //   const result = await axios.get(dbpath+"getPInvoice.php?id="+invoiceNo);
    //   console.log("result For invoice", result.data?.phpresult);

    //   if(result.data.phpresult.length){
    //     alert('This Invoice Number Is Already Exists, Try Another One!');
    //     return
    //   }

      let finalData = {product:cart, total:tamount, gst:gst, discount:damount, fprice:fprice, Cname: name, contactNo: cno, gstNo: email, address: address, invoiceId: invoiceId, invoiceNo: invoiceNo}

    localStorage.setItem("invoiceData", JSON.stringify(finalData))
    console.log("finalll", finalData)


    if (name.length === 0) {
      alert("Name has been left blank!");
    }  else if (cart.length === 0) {
      alert("No Products added to the invoice!");
    } else if (pname.length === 0) {
      alert("Product Name has been left blank!");
    } else if (id.length === 0) {
      alert("Product Id has been left blank!");
    } else if (price.length === 0) {
      alert("Product cost has been left blank!");
    }  else {
      //alert("Invoice Generated");
      
      const url = dbpath+'addInvoice.php';
      let fData = new FormData();
      fData.append('invoice_id', invoiceId );
      fData.append('invoiceNo', invoiceNo);
      fData.append('name', name);
      fData.append('email', email);
      fData.append('cno', cno);
      fData.append('address', address);
      fData.append('pid', pid)
      fData.append('price', tamount);
    
      fData.append('gst', gst);
      fData.append('fprice', fprice);
      fData.append('discount', damount);
      fData.append('image', image);
      console.log("Form Data = ", fData);
      console.log("datatatata", fData);
      let tempq, flag =0;
      console.log(cart);
      for (let index = 0; index < cart.length; index++) {
        
        if(cart[index].aqty<cart[index].quantity)
        {
            flag =1;

            alert('Item Out of Stock for QRID : '+cart[index].cqrid+' | Name : '+cart[index].pname);
        }

        if(flag!=1){
          tempq= parseInt(cart[index].aqty)-parseInt(cart[index].quantity);
       //   alert(tempq);
            const url2 = dbpath+'updateQuantity.php';
            let fData2 = new FormData();
            fData2.append('id', cart[index].cqrid);
            fData2.append('quantity', tempq);
            console.log("Form Data = ", fData);
            axios.post(url2, fData2)
              .then(response2 => {})
              .catch(error => {
                console.log(error.toJSON());
              });

              fData.append('qrid', cart[index].cqrid);
              fData.append('pname', cart[index].pname);
              //alert( cart[index].pnamef);
              fData.append('id', cart[index].id);
              fData.append('hsncode', cart[index].qrid);

              fData.append('rate', cart[index].rate);
              fData.append('t_quantity', cart[index].quantity);
              var sq = parseInt(cart[index].quantity);
              var sr = parseInt(cart[index].rate);
              var st= sq*sr;
              fData.append('t_price', st);
              fData.append('description', cart[index].desc);
              // console.log("dataatatata",fData)F
              axios.post(url, fData)
              .then(response => { })
              .catch(error => {
                console.log(error.toJSON());
              });
              
        }
    }

      
    //invoice
    
    document.getElementById("btn1").innerHTML= "Generating Invoice...";
    setTimeout(() => {
      handleClick();
    }, 2000);

     }
    // } catch(error){
    //   console.log("Error While Fetching the Data --> ", error)
    // }
  } 
console.log("ib=nvo", invoiceData)
  console.log("mukesh", cart)

  


useEffect(()=>{
  function getCurrentYearMonth() {
    const date = new Date();
    let year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month and pad with zero if needed
    let day = (date.getDate()).toString().padStart(2, '0');
    // return year + month + day;
    return day + month + year;
  }

console.log(getCurrentYearMonth());

function generateRandomCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

const InvoiceNumber = `DHI-${getCurrentYearMonth()}-${generateRandomCode()}`;
console.log("INVOICVCE NUMBER: ", InvoiceNumber);
  setInvoiceNo(InvoiceNumber);
},[])

  return (
    <>
   
    <div style={{backgroundColor:'#f1ebff'}}>
      <br /><br /><br /><br /><br /><br />
    {/*   <input type='button' value="view Cart" onClick={updateItemDB}></input> */}
      <div className="container shadow-lg" style={{border:'1px solid rgb(67,35,130)', padding:'50px', backgroundColor:'white'}}> 
        <center><h3 className="sp1" style={{fontWeight:'700', color:'rgb(67,35,130)'}}>Generate Invoice - <span id="ino">Loading..</span></h3></center>
        
        <form >
        <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Invoice No.<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="invoiceNo" value={invoiceNo} disabled />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Customer Name<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Contact Number</label>
            <input type="text" className="form-control" id="cno"  onChange={(e) => setCno(e.target.value)}/>
          </div>

          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> GST Number</label>
            <input type="email" className="form-control" id="email"  onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Address</label>
            <input type="text" className="form-control" id="address"  onChange={(e) => setAddress(e.target.value)}/>
          </div>

          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Product QR ID<span style={{color:'red'}}>*</span></label>
            <div style={{display:'flex'}}>
              <input type="text" className="form-control" id="qrid" style={{width:'280%'}} onChange={handleQrid} /> &nbsp;&nbsp;&nbsp;
              <button id="btn" type='button' className="btn btn-primary1" style={{backgroundColor:'rgb(67,35,130)', height:"7%"}} onClick={() => {fetchData()}}>Fetch data</button>
            </div>
          {/*   Available Quantity : {aQuantity} */}
          </div>
       
         {/*  <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Product Name<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="pname" onChange={(e) => setPname(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Product ID<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="pid" onChange={(e) => setId(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Product Cost<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="pcost" onChange={(e) => setPrice(e.target.value)}/>
          </div> */}

          <div className="mb-3" style={{color:'black'}}>

            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Cart items:</label>

            <table class="table">
            <thead>
              <tr>
                <th scope="col" style={{width:'25px'}}>Sr.No.</th>
                <th scope="col">Name</th>
                <th scope="col">HSN Code</th>
                <th scope="col" style={{width:'150px'}}>Available Qty</th>
                <th scope="col">Rate</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {cart.map((item, index) =>
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.pname}</td>
                <td>{item.qrid}</td>
                <td>{item.aqty}</td>
                <td>{priceFormat(item.price)}</td>
                <td>
                  <button type='button' onClick={() => onQuantyitySub(index)}>-</button> 
                  &nbsp;<span id={'quantity'+index}>{item.quantity}</span>&nbsp;
                  <button type='button' onClick={() => onQuantyityAdd(index)}>+</button>
                </td>
                <td><span id={'rate'+index}>{priceFormat(item.price * item.quantity)}</span></td>
                <td><button
  style={{ backgroundColor: 'red', borderRadius: '10px', border: '0px solid', width: '80px', color: 'white', fontWeight: 'bold', height: '35px' }}
  onClick={(event) => handleDelete(event, index)}
>
  DELETE
</button>

</td>
              </tr>
            )}
                <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total : </td>    
                <td><span id="totalid"><b>&nbsp;&nbsp;-</b></span></td>              
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> GST</label>
            <div style={{display:'flex'}}>
              <input type="text" className="form-control" id="discount" style={{width:'280%'}}  placeholder='In Percentage for eg : 10' onChange={(e) => setGst(e.target.value)} /> &nbsp;&nbsp;&nbsp;
              {/* <button id="btn" type='button' className="btn btn-primary1" style={{backgroundColor:'rgb(67,35,130)', height:"7%"}} onClick={(e) => {calgstanddiscount()}}>Add GST</button> */}
              <button id="btn" type='button' className="btn btn-primary1" style={{backgroundColor:'rgb(67,35,130)', height:"7%"}} onClick={calgstanddiscount} >ADD GST</button>
            </div>    
          </div>

          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Discount</label>
            <div style={{display:'flex'}}>
              <input type="text" className="form-control" id="discount" style={{width:'280%'}}  placeholder='In Percentage for eg : 10' onChange={(e) => setDAmount(e.target.value)} /> &nbsp;&nbsp;&nbsp;
              {/* <button id="btn" type='button' className="btn btn-primary1" style={{backgroundColor:'rgb(67,35,130)', height:"7%"}} onClick={(e) => {calgstanddiscount()}}>Add Discount</button> */}
              <button id="btn" type='button' className="btn btn-primary1" style={{backgroundColor:'rgb(67,35,130)', height:"7%"}} onClick={calgstanddiscount}>ADD DISCOUNT</button>
            </div>  
          </div>
          <div className="mb-3">
            <label className="form-label" style={{color:'RGB(104 81 155)'}}> Final Price<span style={{color:'red'}}>*</span></label>
            <input type="text" className="form-control" id="finalp" value={priceFormat(fprice)} disabled/>

          </div>
          <center>
          <button type="button" id="btn1" className="btn btn-primary1 mt-3" style={{backgroundColor:'rgb(67,35,130)'}} onClick={() => { submit() }}>Submit</button>
          </center>
        </form>
      </div>
          
      <br></br><br></br><br></br>
      </div>
    </>
  );
}
