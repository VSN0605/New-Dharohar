import React, { useState, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { Link, useNavigate } from "react-router-dom";
import "./css/Dashboard.css";
import Cookies from "js-cookie";

export default function Dashboard({
  qrid,
  
  dbpath,
  cart,
  setQrid,
 
  vsb,
  setBtnstatus,
}) {
  const [artifact, setArtifact] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); //newly set
  const [totalQuantity, setTotalQuantity] = useState(0); //newly set
  const navigate = useNavigate();

  const loadArtifacts = async () => {
    const result = await axios.get(dbpath + "displayall.php");
  
    setArtifact(result.data.phpresult);
    console.log(result.data.phpresult);
  };

  // calculating total amount of quantity and price
  useEffect(() => {
    let totalPrice = 0;
    let totalQuantity = 0;
    artifact?.forEach((item) => {
      totalPrice += parseFloat(item.price);
      totalQuantity += parseInt(item.quantity);
    });
    setTotalPrice(totalPrice);
    setTotalQuantity(totalQuantity);
  }, [artifact]);

  function onLogout() {
    Cookies.set("userLoggedIn", "false");
    setBtnstatus("Admin Login");
    navigate("/");
  }

  const isUserLoggedIn = Cookies.get("userLoggedIn");

  useEffect(() => {
    if (isUserLoggedIn !== "true") {
      navigate("/AdminLogin");
      cart.splice(0, cart.length);
    } else {
      loadArtifacts();
      cart.splice(0, cart.length);
      vsb("1");
    }
  }, [isUserLoggedIn]);

  const priceFormat = (price) => {
    var lastThree = price.substring(price.length - 3);
    var otherNumbers = price.substring(0, price.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  };

  const handleDelete = (artifactId) => {
    console.log(`Delete artifact with ID ${artifactId}`);
    if (window.confirm("Do you want to delete the data?")) {
      const url = `${dbpath}deleteartifact.php`;
      axios
        .post(url, JSON.stringify({ id: artifactId }), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          loadArtifacts();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // Placeholder for handleUpdate function
  const handleUpdate = (description, price) => {
    // Implement your update logic here
    console.log(
      `Update artifact with description ${description} and price ${price}`
    );
  };

  // for update button
  const [id1, setId1] = useState([]);
  const [Fid, setFid] = useState([]);

  const loadFid = async () => {
    const result = await axios.get(dbpath + "getid.php");
    if (result.data.phpresult && result.data.phpresult.length > 0) {
      setFid(result.data.phpresult);
      console.log(result.data.phpresult);
      setId1(result.data.phpresult[0]["id"]);
    } else {
      console.log("No data received or ID not found");
    }
  };

  const onDelete = () => {
    if (qrid.length === 0) {
      alert("Qrid has been left blank!");
    } else {
      if (window.confirm("Do you want to delete the data By QR id?")) {
        const url = dbpath + "deletartifactqr.php";
        let fData = new FormData();
        fData.append("qrid", qrid);
        axios
          .post(url, fData)
          .then((response) => {
            console.log(response.data);
            loadArtifacts();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  const handleNavigate = () => {
    navigate("/qr")
  }

  return (
    <>
      <div style={{ backgroundColor: "#f1ebff", color: "black", }}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <center>
          {" "}
          <p style={{fontWeight: 'bold', fontSize: '25px'}}>Admin Panel</p><br></br>
          <br></br>
          <Link style={{ width: "8%" }} to="/Add">
            <button
              type="button"
              className="btn-primary btn"
              style={{ backgroundColor: "rgb(67,35,130)" }}
            >
              Add Artifact
            </button>
          </Link>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link style={{ width: "8%" }} to="/GenerateInvoice">
            <button
              type="button"
              className="btn-primary btn"
              style={{ backgroundColor: "rgb(67,35,130)" }}
            >
              Generate Invoice
            </button>
          </Link>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link style={{ width: "8%" }} to="/GenerateQuotation">
            <button
              type="button"
              className="btn-primary btn"
              style={{ backgroundColor: "rgb(67,35,130)" }}
            >
              Generate Quotation
            </button>
          </Link>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link style={{ width: "8%" }} to="/UpdateQuantity">
            <button
              type="button"
              className="btn-primary btn"
              style={{ backgroundColor: "rgb(67,35,130)" }}
            >
              Quantity
            </button>
          </Link>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link style={{ width: "8%" }} to="/PrintInvoice">
            <button
              type="button"
              className="btn-primary btn"
              style={{ backgroundColor: "rgb(67,35,130)" }}
            >
              Print Invoice
            </button>
          </Link>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link style={{ width: "8%" }} to="/UpdateArtifact">
            <button
              type="button"
              className="btn-primary btn"
              style={{ backgroundColor: "rgb(67,35,130)" }}
            >
              Update
            </button>
          </Link>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link style={{ width: "8%" }} to="/PrintQuotation">
            <button
              type="button"
              className="btn-primary btn"
              style={{ backgroundColor: "rgb(67,35,130)" }}
            >
              Print Quotation
            </button>
          </Link>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            type="button"
            className="btn-primary btn"
            style={{ backgroundColor: "rgb(67,35,130)", width: "8%" }}
            onClick={onLogout}
          >
            Logout
          </button>
          <br></br>
          <br></br>
          <br></br>
          <form>
            <div class="mb-3">
              <input
                type="text"
                style={{ width: "60%" }}
                class="form-control"
                placeholder="Enter Qrid"
                onChange={(e) => setQrid(e.target.value)}
                id="id"
                required
              ></input>
            </div>
            <div style={{ display: "flex", marginLeft: "40%", gap: "20px" }}>
              <Link
                className="nav-link"
                style={{ width: "8%" }}
                to={`/qr`}
                state={{ from: "occupation" }}
              >
                <button
                  type="submit"
                  class="btn btn-primary"
                  style={{ backgroundColor: "rgb(67,35,130)", height: "38px", marginTop: "0px" }}
           onClick={handleNavigate}
                >
                  Get QR
                </button>
              </Link>
              <Link
                className="nav-link"
                style={{ width: "8%" }}
                to={`/display/` + qrid}
                state={{ from: "occupation" }}
              >
                <button
                  type="submit"
                  class="btn btn-primary"
                  style={{ backgroundColor: "rgb(67,35,130)" }}
                >
                  Display
                </button>
              </Link>
              <Link className="nav-link" style={{ width: "8%" }}>
                {" "}
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={onDelete}
                  style={{ backgroundColor: "rgb(67,35,130)" }}
                >
                  Delete
                </button>
              </Link>
            </div>
          </form>
        </center>

        <div>
          <br></br>

          <br></br>
          <center>
            <h5> All Artifacts </h5>

            <br></br>
            <div></div>
            <div className="scrollable-table">
              <table
                class="table"
                style={{ width: "90%", backgroundColor: "white" }}
              >
                <thead>
                  <tr className="c1">
                    <th scope="col">Sr No.</th>
                    {/* <th scope="col">Artifact ID</th> */}
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Qunatity</th>
                    <th scope="col">QR ID</th>
                    {/* <th scope="col">AQR ID</th> */}
                    <th scope="col">HSN Code</th>
                    <th scope="col">Image</th>
                    {/* <th scope="col">UPDATE</th> */}
                    <th scope="col">DELETE</th>

                    {/*  <th scope="col">QR</th> */}
                  </tr>
                </thead>
                <tbody>
                  {artifact &&
                    artifact?.map((res, index) => (
                      <tr>
                        <td>{index+1}</td>
                        {/* <td>{res.artid}</td> */}
                        <td>{res.name}</td>
                        <td style={{ width: "250px" }}>{res.description}</td>
                        <td> &#8377; {priceFormat(res.price)}</td>
                        <td>{res.quantity}</td>
                        <td>{res.qrid}</td>
                        <td>{res.hsncode}</td>
                        <td>
                          <a
                            href={
                              dbpath + "uploads/" +
                              // "http://localhost/archaeoshop/uploads/" +
                              res.image
                            }
                          >
                            <u>view</u>
                          </a>
                        </td>
                        {/* <td>
                                     <Link style={{ width: "8%" }} to="/UpdateArtifact">
            <button
              type="button"
              className="btn-primary btn"
              style={{ backgroundColor: "rgb(67,35,130)" }}
            >
              UPDATE 
            </button>
          </Link>{" "}                </td> */}

                        <td>
                          {Fid &&
                            Fid.map((res) => (
                              <input type="hidden" value={res.id} disabled />
                            ))}
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDelete(res.id)}
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <table
              className="table"
              style={{
                width: "89%",
                backgroundColor: "white",
                border: "2px solid black", 
                borderColor: "black", // specify border color
                marginRight: "15px"
              }}
            >
              <thead>
                <tr className="c1">
                  <th scope="col" style={{border: "2px solid black"}}>TOTAL PRICE</th>
                  <th scope="col" style={{border: "2px solid black"}}>TOTAL QUANTITY</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{border: "2px solid black", textAlign: "center"}}>&#8377; {totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                  <td style={{border: "2px solid black", textAlign: "center"}}>{totalQuantity}</td>
                </tr>
              </tbody>
            </table>
          </center>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </>
  );
}
