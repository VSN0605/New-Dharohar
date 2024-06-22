import React from 'react'
import './css/Recipt.css'
import rcss from './css/Recipt.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import img1 from './images/formatInvoice1.jpg'
import img2 from './images/formatInvoice2.jpg'
export default function Invoice({dbpath,vsb}) {

  const navigate = useNavigate();

   const mapData = JSON.parse(localStorage.getItem("invoiceData"))
   const {product, qrid, total, gst, gstNo, Cname, address, contactNo, discount, fprice, invoiceId, invoiceNo } = mapData
  
  const [cart, setCart] = useState([]);
  const [pqrid, setPqrid] = useState('');
  const [invoiceData, setInvoiceData] = useState(null);
  const [error, setError] = useState(null);

  const isUserLoggedIn = Cookies.get('userLoggedIn');
      useEffect(() => {
        if (isUserLoggedIn !== 'true') {
          navigate('/AdminLogin');
          //cart.splice(0,cart.length);
        }
        else
        {
            fetchData();
            //cart.splice(0,cart.length);
            vsb('1');
          }
      }, [isUserLoggedIn]);    

      const fetchData = async () => {
        try {
          const localId = localStorage.getItem('InvoiceQrid');
          console.log("Get QRID: ",localId);
          setPqrid(localId);
          const result = await axios.get(dbpath + "getInvoice.php?pqrid=" + pqrid);
          console.log(dbpath + "getInvoice.php?pqrid=" + pqrid);
       
            console.log("Data -> ",result.data.phpresult);
            setCart(result.data.phpresult);
          
          
      
          /* document.getElementById("p_img").src = "http://localhost/archaeoshop/uploads/" + result.data.phpresult[0]['image']; */
          // document.getElementById("name").innerHTML = result.data.phpresult[0]['name'];
          // document.getElementById("cno").innerHTML = result.data.phpresult[0]['contact'];
          // document.getElementById("email").innerHTML = result.data.phpresult[0]['email'];
      
          // if (result.data.phpresult[0]['invoice_id'] < 10) {
          //   document.getElementById("iid").innerHTML = "0" + result.data.phpresult[0]['invoice_id'];
          // } else {
          //   document.getElementById("iid").innerHTML = result.data.phpresult[0]['invoice_id'];
          // }
      
          /* document.getElementById("pname").innerHTML = result.data.phpresult[0]['pname']; 
          document.getElementById("pid").innerHTML = result.data.phpresult[0]['pid']; 
          document.getElementById("price").innerHTML = result.data.phpresult[0]['price']; 
          document.getElementById("qrid").innerHTML = result.data.phpresult[0]['pqrid'];  */
      
          // document.getElementById("pprice").innerHTML = priceFormat(result.data.phpresult[0]['price']);
          // document.getElementById("gst").innerHTML = result.data.phpresult[0]['gst'];
      
          //  document.getElementById("discount").innerHTML = result.data.phpresult[0]['discount']; 
          // if(result.data.phpresult[0]['discount']==='0')
          // {
          //     console.log('worked');
          //     document.getElementById('discdiv').style.display= "none";
          // } 
      
          // document.getElementById("fprice").innerHTML = priceFormat(result.data.phpresult[0]['fprice']);
          // document.getElementById("timestamp").innerHTML = result.data.phpresult[0]['timestamp'];
        } catch (error) {
          // Handle the error here
          console.error("Error fetching data:", error);
          // alert("Please, Enter Correct Invoice id");
        }
      }
    

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

function printDiv() {
  var divContents = document.getElementById("receipt_div").innerHTML;
  var a = window.open('', '', 'height=800, width=800');
  a.document.write('<html>');
  a.document.write('<head>');
  a.document.write('</head>');
  a.document.write('<body >');
  a.document.write(divContents);
  a.document.write('</body></html>');
  a.document.close();
  a.print();

}

console.log("Invoice Data Hiii: ", mapData);
const [date, setDate] = useState(new Date())
// const [actualDate, setActualDate] = useState()
const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
useEffect(() => {
  formatDate(date)
  console.log("Formatted Date:", formatDate(date));
}, [date]);


  return (
    <>

      <div style={{ backgroundColor:'#f1ebff'}}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div id="receipt_div" style={{padding:'0px', margin:'0px'}}> 
      <br />
      <div className='shadow-lg mb-5 bg-body-tertiary rounded' style={{ width:'900px',color:'black', fontWeight:'400' , margin:'0 auto', backgroundColor:'white'}} >
        <div style={{backgroundImage: `url(${img1})`,  backgroundSize: 'cover', width:'100%', height:'170px'}}>
          <div style={{marginLeft: '6%'}}>
            <br />
            <b>GST NO </b>: <b>27ARGPC6266P1Z9</b> <span style={{marginLeft: '320px'}}><b>dharoharvintagestore@gmail.com</b></span><br></br>
            <span ><b>Mob.No : 9359521614</b></span>
          </div>
        </div>
        <br /> 
        <div >
          <div >
         
         <div style={{marginLeft: '10%'}}>
              {/* <b>Invoice No. </b>: <span id='iid'>{invoiceId ? invoiceId : 'NA'}</span><br /> */}
              <b>Invoice No. </b>: <span id='iid'>{invoiceNo ? invoiceNo : 'NA'}</span><br />
              <b>Date &  Time </b>: <span id="timestamp">{formatDate(date).toString()}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <b>Customer Name </b>: <span id="name">{Cname ? Cname : 'NA'}</span><br />
              <b>Contact No. </b>: <span id="cno">{contactNo ? contactNo : 'NA'}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <b>GST No. </b>: <span id="email">{gstNo ? gstNo : 'NA'}</span>
            </div>
          
          </div>
        </div>
        <br />
        <div >
        <center>
          <div>
           
            {/* <div style={{marginLeft: '10%'}}>
              <br />
              Product Details,<br />
              Name : <span id="pname">NA</span><br />
              ID : <span id="pid">NA</span><br />
              Price : <span id="price">NA</span><br />
              QR ID : <span id="qrid">NA</span><br />
            </div>
           
            <div style={{marginLeft: '42%'}}>
                <img className='i_img mt-2'  id="p_img" style={{marginLeft:'-25px', width: '200px', border:'rgb(166, 2, 2) solid 2px', borderRadius: '10px'}} src=""></img>
            </div> */}
            
             <table class="table" style={{width: '80%'}}>
              <thead>
                <tr>
                  <th scope="col" style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '10%'}}>Sr.No.</th>
                  <th scope="col" style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '20%'}}>Description</th>
                  <th scope="col" style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '20%'}}>HSN CODE</th>
                  <th scope="col" style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '20%'}}>Rate</th>
                  <th scope="col" style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '10%'}}>Quantity</th>
                  <th scope="col" style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '20%'}}>Price</th>

                </tr>
              </thead>
              <tbody>
                {product.map((item, index) =>
                  <tr key={index}>
                    <td style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '10%'}}>{index+1}</td>
                    <td style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '20%'}}>{item.pname}</td>
                    <td style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '20%'}}>{item.qrid}</td>
                    <td style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '20%'}}>&#8377; {priceFormat(item.rate)}/-</td>
                    <td style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '10%'}}>{item.quantity}</td>
                    <td style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '20%'}}>&#8377; {priceFormat(item.price*item.quantity)}/-</td>
                  </tr>
                )}
                <tr>
                
                  
                </tr>
              </tbody>
            </table>
           
        </div>
        </center>
        </div>
        <center>
          <br />
          <table style={{width: '80%'}} >
            <tbody>
              <tr>
                <td className='l_col' style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '70%'}}>Product Total</td>
                <td className='r_col' style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', paddingLeft: '20px'}}>&nbsp;&nbsp;&nbsp; &#8377;<span id="pprice">{priceFormat(total ? total : 'NA')}</span>/-</td>
              </tr>
              
              <tr>
                <td className='l_col' style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '70%'}}>GST</td>
                <td className='r_col' style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', paddingLeft: '20px'}}>&nbsp;&nbsp;&nbsp;<span id="gst">{gst ? gst : 'NA'}</span> %</td>
              </tr>

              <tr id='discdiv'>
                <td className='l_col' style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '70%'}}>Discount</td>
                <td className='r_col' style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', paddingLeft: '20px'}}>- <span id="discount"> {discount ? discount : 'NA'}</span>  %</td>
              </tr>
              
              <tr>
                <td className='l_col' style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', width: '70%'}}>Grand Total</td>
                <td className='r_col' style={{ border: '1px solid rgb(209, 209, 209)', height: '40px', paddingLeft: '20px', paddingLeft: '20px'}}>&nbsp;&nbsp;&nbsp; &#8377;<span id="fprice">{fprice ? priceFormat(fprice) : 'NA'}</span>/-</td>
              </tr>
            </tbody>
          </table>
          </center>
          <br /><br />
          <b style={{marginLeft:'80px', fontSize:'10px'}}>Terms & Conditions : </b>
          <ul style={{listStyleType: 'circle', marginLeft:'80px', width:"750px", fontSize:'10px'}}>
            <li>GST, Delivery Charges, lifting charges, Packaging charges are excluded in the price.</li>
            <li>Products are sold on a non-return basis</li>
            <li>Orders for goods cannot be suspended or cancelled except with the company's consent. The customer Shall pay all reasonable expenses in curred by company due to suspension or cancellation.   </li>
            <li>Delivery dates are estimates only and the company is not liable for any loss or damage for failure by those dates.</li>
            <li>The company may make part deliveries of any order.</li>
            <li>Customer must pay the invoice Value at the time of purchasing.</li>
            <li>The company does not entertain any EMI policy.</li>
            <li>The company's responsibility in goods ends on the delivery date.</li>
            <li>Ownership of the goods delivered by the company to the customer remains with the company until the customer has made full payment for all goods whatever sold by the company to the Customer.</li>
            <li>The customer will be liable for GST on every product.</li>
          </ul>

          <center>
            <div class="receipt-right">
              <div className='cl2' style={{paddingLeft:'80px', marginTop:'40px', marginLeft:'40%'}}>
                {/*  <div style={{backgroundColor:'black', height:'0.2px', width:'100px'}}></div> */} 
                 (Signature)<br />CHAWDA ASSOCIATES
              </div>  
						</div>
          </center>
          <div style={{backgroundImage: `url(${img2})`,  backgroundSize: 'cover', width:'100%', height:'140px'}}>
        </div>
      </div>
      </div>
      <center><button type="button" class="btn btn-primary" onClick={printDiv}>Print</button>&nbsp;&nbsp;
      <Link to="/GenerateInvoice"><button type="button" class="btn btn-primary">Generate Invoice</button></Link></center>
      <br /><br />
      <br />
      <br />
      </div>

    </>
  )
}
