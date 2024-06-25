import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const AllQuotation = ({ dbpath }) => {
  const [QuotationResponse, setQuotationResponse] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.get(`${dbpath}getAllQuotation.php`);
      console.log("Data", response.data.phpresult);
      setQuotationResponse(response.data.phpresult);
    } catch (error) {
      console.log(error, 'Something Went Wrong');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteQuotation = async(id)=> {

    console.log("Id to be Deleted:",id);
    if (window.confirm("Do you want to delete the data?")) {
      const url = dbpath + "deleteFetchQuotation.php"
      let fData = new FormData();
      fData.append("id", id);
      axios
        .post(url, fData)
        .then((response) => {
          console.log(response.data);
          loadData();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }



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
        <h2 style={{fontWeight: "bold", marginBottom: "2%"}}>All Generated Quotations</h2>
      </div>

      <div className="scrollable-table" style={{display: "flex", justifyContent: "flex-start"}}>
              <table
                class="table"
                style={{ width: "90%", backgroundColor: "white", width: "100%" }}
              >
                <thead style={{borderWidth: "2px", borderColor: "black"}}>
                  <tr className="c1">
                    <th scope="col">Sr No.</th>
                    <th scope="col">ID.</th>
                    <th scope="col">Quotation No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product ID</th>
                    <th scope="col">Product QRID</th>
                    <th scope="col">HSN Code</th>
                    <th scope="col">Date And Time</th>
                    <th scope="col">Price</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Total Quantity</th>
                    <th scope="col">GST</th>
                    <th scope="col">Final Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {QuotationResponse?.map((res, index) =>
                      <tr>

                        <td>{index+1}</td>
                        <td>{res.id}</td>
                        <td>{res.quotation_no}</td>
                        <td>{res.name}</td>
                        <td>{res.contact}</td>
                        <td>{res.email}</td>
                        <td>{res.address}</td>
                        <td>{res.pname}</td>
                        <td>{res.pid}</td>
                        <td>{res.pqrid}</td>
                        <td>{res.hsncode}</td>
                        <td>{res.timestamp}</td>
                        <td>{res.price}</td>
                        <td>{res.rate}</td>
                        <td>{res.t_quantity}</td>
                        <td>{res.gst}</td>
                        <td>{res.fprice}</td>
                        <td>{res.discount}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => deleteQuotation(res.id)}
                          >
                            DELETE
                          </button>
                        </td>
                        

                      </tr>
                   )}
                </tbody>
              </table>
            </div>
    </>
  )
}

export default AllQuotation
