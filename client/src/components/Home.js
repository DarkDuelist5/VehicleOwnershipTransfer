import React, { useEffect } from "react"
import { useState } from "react";
import { ethers } from "ethers";
const Home = ({ contract, account, provider }) => {
    const [data, setData] = useState(null);

    const pay = async(event) => {
        let ele = event.target.parentElement;
        console.log(ele);
        let keemat = ele.querySelector(".cost").value;
        let carRegNo = ele.querySelector(".carid").value;
        console.log(carRegNo);
        console.log(keemat);
        await contract.raiseRequest(carRegNo, keemat, {value: ethers.utils.parseUnits(keemat, "ether")});
    }

    const fetchData = async() =>{
        let dataArray = await contract.viewVehicles();
        //console.log(dataArray);

        const isEmpty = Object.keys(dataArray).length===0;
        if(!isEmpty){
            console.log("found data");
            //dataArray = dataArray.toString();
            //console.log(dataArray);

            const listItems = dataArray.map((item, i)=>{
                item = item.toString();
                console.log(item);
                const str_array = item.split(",");
                return (
                    // <button onClick={handleClick} style={{height:50}}> Get Summary</button>
                   <li style={{marginTop: '10px'}} key={i}> {str_array[0]}, {str_array[1]} <input type="hidden" className="cost" value={str_array[2]}/> <input type="hidden" className="carid" value={str_array[0]}/> <button onClick={pay}>PAY HERE</button> </li>
                )
            });
            setData(listItems);
        }
        else{
            console.log("No data");
        }
        //setData(listItems);
    }
    
    return (
        <div>
            <h1>Cars on sale:-</h1>
            <button onClick={fetchData}>Show on sale cars</button>
            <ul>{data}</ul>
        </div>
    )
};

export default Home;