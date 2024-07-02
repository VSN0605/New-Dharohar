import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const AllInvoice = ({ dbpath }) => {
    const [InvoiceResponse, setInvoiceResponse] = useState([]);
    const [InvoiceData, setInvoiceData] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    const loadData = async () => {
        try {
            const response = await axios.get(dbpath + "getAllInvoice.php");
            console.log("Data", response.data.phpresult);
            setInvoiceResponse(response.data?.phpresult);
            setInvoiceData(response.data?.phpresult);
        } catch (error) {
            console.log(error, 'Something Went Wrong');
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id) => {
        console.log("Id to be Deleted:", id);
        if (window.confirm("Do you want to delete the data?")) {
            const url = dbpath + "deleteFetchInvoice.php";
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
    };

    useEffect(() => {
        let filteredData = InvoiceData;

        if (inputValue !== '') {
            if (filterValue === 'name') {
                filteredData = InvoiceData.filter((item) =>
                    item.name.toLowerCase().includes(inputValue.toLowerCase())
                );
            } else if (filterValue === 'invoice_no') {
                filteredData = InvoiceData.filter((item) =>
                    item.invoice_no.includes(inputValue)
                );
            } else if (filterValue === 'timestamp') {
                filteredData = InvoiceData.filter((item) =>
                    item.timestamp.includes(inputValue)
                );
            }
        }

        setInvoiceResponse(filteredData);
    }, [filterValue, inputValue, InvoiceData]);

    return (
        <>
            <style>
                {`
                    td, thead, th, tbody {
                        border: 1px solid black;
                        color: black;
                        font-weight: 500;
                    }
                `}
            </style>

            <div style={{ marginTop: "10%", display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'column' }}>
                <div>
                    <h2>All Generated Invoices</h2>
                </div>
                <div className="input-group mb-3" style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
            <div>
                <select
                    className="form-select"
                    id="inputGroupSelect01"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    style={{ padding: '6px 6px', borderRadius: '1px' }}
                >
                    <option value="">Filter By...</option>
                    <option value="name">Name</option>
                    <option value="invoice_no">Invoice Number</option>
                    <option value="timestamp">Date</option>
                </select>
            </div>

            <div>
                <input
                    type={filterValue === 'timestamp' ? 'date' : 'text'}
                    style={{ color: 'gray', fontWeight: '500', padding: '4px 6px' }}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>
        </div>
            </div>

            <div className="scrollable-table" style={{ display: "flex", justifyContent: "flex-start" }}>
                <table
                    className="table"
                    style={{ width: "90%", borderWidth: "1px", borderColor: "black" }}
                >
                    <thead style={{ borderWidth: "2px", borderColor: "black" }}>
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
                        {InvoiceResponse.map((res, index) => (
                            <tr key={res.id}>
                                <td>{index + 1}</td>
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
                                <td>
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
        </>
    );
};

export default AllInvoice;
