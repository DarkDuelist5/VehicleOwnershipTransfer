import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Track = ({ contract, account, provider }) => {

    const [data, setData] = useState(null);

    const handleSubmit = async(event) => {
        event.preventDefault();
        let val = document.querySelector("#regNo").value;
        let arr = await contract.viewHistory(val);
        //console.log(val);
        console.log(arr);
        setData(arr);
    }
    return (
        <div>
            <h1>Track Ownership of Vehicle</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter car ID</label>
                <input type="text" id="regNo"/>
                <input type="submit"/>
            </form>
            <p>{data}</p>
        </div>
    )
};


export default Track;