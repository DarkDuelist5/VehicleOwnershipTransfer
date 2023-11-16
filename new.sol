// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Pay {
    struct Vehicle{
    uint id;
    string name;
    uint price;
    string pic;
    uint wdrive;
    bool avail;
    }
    
    Vehicle[] public onSale;

    function addVehicle(uint _id, string memory _name, uint _price, string memory _pic, uint _wdrive) public{
        
        onSale.push(Vehicle(_id, _name, _price, _pic, _wdrive, true));
    }
    function viewVehicles() public view returns(Vehicle[] memory){
        return onSale;
    }
    function getBalance() public view returns(uint){
        return address(this).balance;
    }


}