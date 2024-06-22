import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const AllInvoice = ({dbpath}) => {

    const [InvoiceResponse, setInvoiceResponse] = useState([])

    const loadData = async()=>{       
    try {
        const response = await axios.get(dbpath + "getAllInvoice.php");
        // setInvoiceResponse(response)
        console.log("Data", response.data.phpresult)
        setInvoiceResponse(response.data?.phpresult)
      } catch (error) {
        console.log(error, 'Something Went Wrong');
      }
    }

    useEffect(() => {
        loadData();
    },[])


  


  return (
    <>

    <style>

      {`

        td, thead, th, tbody{
          border: 1px, solid, black;
          color: black;
          font-weight: 500;
        }

      `}
     
    </style>

    <div style={{marginTop: "10%", display: "flex", justifyContent: "center"}}>
      <h2 style={{fontWeight: "bold", }}>All Generated Invoice</h2>
    </div>

    <div className="scrollable-table " style={{display: "flex", justifyContent: "flex-start"}}>
            <table
                class="table"
                style={{ width: "90%",  width: "90%", borderWidth: "1px", borderColor: "black" }}
              >
                <thead style={{borderWidth: "2px", borderColor: "black"}}>
                  <tr className="c1">
                    <th scope="col">Sr No.</th>
                    <th scope="col">ID.</th>
                    <th scope="col">Invoice No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product ID</th>
                    <th scope="col">Product QRID</th>
                    <th scope="col">HSN Code</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Total Quantity</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date And Time</th>
                    <th scope="col">Final Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Action</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {/* {artifact &&
                    artifact?.map((res, index) => ( */}
                    {InvoiceResponse?.map((res, index) => 

                      <tr>
                        <td>{index+1}</td>
                        <td>{res.id}</td>
                        <td>{res.invoice_no}</td>
                        <td>{res.name}</td>
                        <td>{res.contact}</td>
                        <td>{res.email}</td>
                        <td>{res.address}</td>
                        <td>{res.pname}</td>
                        <td>{res.pid}</td>
                        <td>{res.pqrid}</td>
                        <td>{res.hsncode}</td>
                        <td>&#8377; {res.rate}/-</td>
                        <td>{res.t_quantity}</td>
                        <td>&#8377; {res.t_price}/-</td>
                        <td>{res.description}</td>
                        <td>{res.timestamp}</td>
                        <td>&#8377; {res.fprice}/-</td>
                        <td>{res.discount}%</td>
                        
                        <td>  <button
                            type="button"
                            className="btn btn-danger"
                            // onClick={() => handleDelete(res.id)}
                          >
                            DELETE
                          </button></td>
                      
                        

                      </tr>
)}
                   
                </tbody>
              </table>
            </div>
  </>
  )
}

export default AllInvoice