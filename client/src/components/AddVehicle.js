const AddVehicle = ({ contract, account, provider }) => {
    const handleSubmit = async(e) => {
        
        let v1 = document.querySelector("#one").value;
        let v2 = document.querySelector("#two").value;
        let v3 = document.querySelector("#three").value;
        let v4 = document.querySelector("#four").value;
        let v5 = document.querySelector("#five").value;
        console.log(v1, v2, v3, v4, v5);
        e.preventDefault();
        await contract.addVehicle(v1, v2, v3, v4, v5);
        
    }
    return (
        <div>
            <h1>Add the vehicle</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter ID</label>
                <input type="number" id="one"/>
                <br></br>
                <label>Enter name of vehicle</label>
                <input type="text" id="two"/>
                <br></br>
                <label>Enter price</label>
                <input type="number" id="three"/>
                <br></br>
                <label>Enter image url for vehicle</label>
                <input type="text" id="four"/>
                <br></br>
                <label>Enter whether 2 or 4 wheel drive</label>
                <input type="number" id="five"/>

                <input type="submit"/>
            </form>
        </div>
    )
};

export default AddVehicle;