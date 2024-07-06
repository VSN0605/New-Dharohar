import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const DeletedArtifacts = ({dbpath}) => {
  const [artifact, setArtifact] = useState([]);
  const [artifact2, setArtifact2] = useState([]);
  const [id1, setId1] = useState([]);
  const [Fid, setFid] = useState([]);
  const location = useLocation();
  // const dbpath = location.state?.dbpath || "";
  // console.log(dbpath, " : dbpath")

  useEffect(() => {
    loadFid();
  }, []);

  const priceFormat = (price) => {
    var lastThree = price.substring(price.length - 3);
    var otherNumbers = price.substring(0, price.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  };

  const loadFid = async () => {
    try {
      const result = await axios.get(dbpath + "displayDeletedArtifacts.php");
      if (result.data.phpresult && result.data.phpresult.length > 0) {
        setFid(result.data.phpresult);
        setId1(result.data.phpresult[0].id);
        console.log("Deleted Artifacts: ", result.data.phpresult)
        setArtifact(result.data.phpresult)
      } else {
        console.log("No data received or ID not found");
      }
    } catch (error) {
      console.error("Error loading FID:", error);
    }
  };

  // const handleRecover = async (id) => {
  //   try {
  //     await axios.post(`${dbpath}recoverArtifact.php?id=${id}`);
  //     
  //     setArtifact(artifact.filter((item) => item.id !== id));
  //   } catch (error) {
  //     console.error("Error in recovery of artifact:", error);
  //   }
  // };

  const handleRecover = async (id) => {
    try {
      await axios.post(`${dbpath}recoverArtifact.php`, { id });
      // Optionally, reload data or remove deleted item from state
      setArtifact(artifact.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error in recovery of artifact:", error);
    }
  };

  return (
    <div style={{marginTop: "150px"}}>
      <h2 style={{display:"flex", justifyContent:"center", textAlign:"center"}}>DELETED ARTIFACTS</h2>
      <div className="scrollable-table" style={{display: "flex", justifyContent: "center"}}>
      
        <table className="table" style={{ width: "90%", backgroundColor: "white", marginTop: "100px", color: "black" }}>
          <thead>
            <tr className="c1">
              <th scope="col">Sr No.</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">QR ID</th>
              <th scope="col">HSN Code</th>
              <th scope="col">Deleted On</th>
              <th scope="col">Image</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {artifact &&
              artifact?.map((res, index) => (
                <tr key={res.id}>
                  <td>{index + 1}</td>
                  <td>{res.id}</td>
                  <td>{res.name}</td>
                  <td style={{ width: "250px" }}>{res.description}</td>
                  <td> &#8377; {priceFormat(res.price)}</td>
                  <td>{res.quantity}</td>
                  <td>{res.qrid}</td>
                  <td>{res.hsncode}</td>
                  <td>{res.deleteTime}</td>
                  <td>
                    <a href={`${dbpath}uploads/${res.image}`}>
                      <u>view</u>
                    </a>
                  </td>
                  <td>
                    {Fid &&
                      Fid.map((fidRes) => (
                        <input key={fidRes.id} type="hidden" value={fidRes.id} disabled />
                      ))}
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleRecover(res.id)}
                    >
                      RECOVER
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeletedArtifacts;
