import React from 'react';
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import logo from './images/logo.jpg'
import "./css/Display.css"
export default function Display({dbpath,vsb}) {

    const { id } = useParams();
    const [artifact, setArtifact] = useState([]);

    const loadArtifacts = async () => {
          const result = await axios.get(dbpath+"display.php?id="+id);
          setArtifact(result.data.phpresult);
          console.log(result.data.phpresult); 
    }

    const priceFormat = (price) => {
      var lastThree = price.substring(price.length-3);
      var otherNumbers = price.substring(0,price.length-3);
      if(otherNumbers != '')
          lastThree = ',' + lastThree;
      var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
      return res;
    }

    useEffect(() => {
      loadArtifacts();
      vsb('0');
    }, []); 

    return (
    <>
    <div className='mainDiv'>
    <div className='submainDiv'>
        <br />
        <center><img src={logo} style={{width:'120px'}}/>
        <hr />
        <br></br>
        <span style={{fontFamily: 'Times New Roman'}}>QRID = {id}</span>
        <br></br><br></br>
        
        <hr />  
        </center>
        <div>  
              <br></br>
              <br></br>
            {artifact?.map((res)=>
                
                <div className='didiv'><div className='image'> 
                    
                    <center><img className='i_img mt-2'  id="p_img" style={{ width: '200px', border:'rgb(67,35,130) solid 2px', borderRadius: '10px'}} src={"https://shop.dharoharvintagestore.com/archaeoshop/uploads/"+res.image}></img> </center>
                    {/* <center><img className='i_img mt-2'  id="p_img" style={{ width: '200px', border:'rgb(67,35,130) solid 2px', borderRadius: '10px'}} src={"http://localhost/archaeoshop/uploads" + res.image}></img> </center> */}

                    </div>
                    <div className='data'>
                    <div style={{color:'black'}}><strong style={{color:'rgb(67,35,130)'}}>Id</strong> : {res.id} <br></br>
                    <strong style={{color:'rgb(67,35,130)'}}>Name </strong>: {res.name} <br></br>
                    <strong style={{color:'rgb(67,35,130)'}}>Desc </strong>: {res.description} <br></br>
                    <strong style={{color:'rgb(67,35,130)'}}>HSN Code </strong>: {res.hsncode} <br></br>
                    <br></br>
                    <span style={{ marginLeft: '100px', fontSize: '20px', fontWeight: 'bold', color:'red'}}>PRICE : {priceFormat(res.price)}</span> <br></br></div>
                    </div>
                </div>
            )}  
            
          </div>
          <br></br>
          <br></br>
          </div>
          </div>

    </>
  )
}
