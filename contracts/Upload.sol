// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Upload {
  
  struct Access{
     address user; 
     bool access; //true or false
  }
  struct Vehicle{
    uint id;
    string name;
    uint price;
    string pic;
    uint wdrive;
    bool avail;
    address beingSoldBy;
    }
    struct Pair{
        uint id;
        address buyerName;
        uint price;
        bool accepted;
    }
    struct Cert{
        uint id;
        string date;
        uint price;
        address buyer;
        address seller;
    }
    Vehicle[] public onSale;
    mapping(address=>Pair[]) incomingReqs;
    mapping(uint=>address[]) history;

  mapping(address=>string[]) value;
  mapping(address=>mapping(address=>bool)) ownership;
  mapping(address=>Access[]) accessList;
  mapping(address=>Cert[]) forCert;
  mapping(address=>mapping(address=>bool)) previousData;

  function addVehicle(uint _id, string memory _name, uint _price, string memory _pic, uint _wdrive) public{
        
        onSale.push(Vehicle(_id, _name, _price, _pic, _wdrive, true, msg.sender));
        history[_id].push(msg.sender);
    }
    function raiseRequest(uint _id, uint cost) public payable{
        for(uint i = 0; i<onSale.length; i++)
        {
            if(onSale[i].id==_id)
            {
                incomingReqs[onSale[i].beingSoldBy].push(Pair(_id, msg.sender, cost, false));
            }
        }
    }
    function acceptRequest(uint _id, uint amt) public{
        
        amt = amt * (10**18);
        (bool success, ) = payable(msg.sender).call{value: amt}("");
        require(success, "Failed to transfer");

        for(uint i = 0; i<onSale.length; i++)
        {
            if(onSale[i].id==_id){
                onSale[i].avail = false;
            }
        }
        address buyer;
        for(uint i = 0; i<incomingReqs[msg.sender].length; i++)
        {
            if(incomingReqs[msg.sender][i].id==_id){
                buyer = incomingReqs[msg.sender][i].buyerName;
                incomingReqs[msg.sender][i].accepted = true;
            }
        }
        history[_id].push(buyer);
        forCert[buyer].push(Cert(_id, "0/0/000", amt, buyer, msg.sender));
    }
    // payable(msg.sender).transfer(1 ether);

    function viewLatestTransac() public view returns(Cert memory)
    {
        uint n = forCert[msg.sender].length;

        return forCert[msg.sender][n-1];
    }

    function viewIncoming() public view returns(Pair[] memory)
    {
        return incomingReqs[msg.sender];
    }
    function viewVehicles() public view returns(Vehicle[] memory){
        return onSale;
    }
    function getBalance() public view returns(uint){
        return address(this).balance/1 ether;
    }
    function viewHistory(uint _id) public view returns(address[] memory){
        return history[_id];
    }

  function add(address _user,string memory url) external {
      value[_user].push(url);
  }
  function allow(address user) external {//def
      ownership[msg.sender][user]=true; 
      if(previousData[msg.sender][user]){
         for(uint i=0;i<accessList[msg.sender].length;i++){
             if(accessList[msg.sender][i].user==user){
                  accessList[msg.sender][i].access=true; 
             }
         }
      }else{
          accessList[msg.sender].push(Access(user,true));  
          previousData[msg.sender][user]=true;  
      }
    
  }
  function disallow(address user) public{
      ownership[msg.sender][user]=false;
      for(uint i=0;i<accessList[msg.sender].length;i++){
          if(accessList[msg.sender][i].user==user){ 
              accessList[msg.sender][i].access=false;  
          }
      }
  }

  function display(address _user) external view returns(string[] memory){
      require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
      return value[_user];
  }

  function shareAccess() public view returns(Access[] memory){
      return accessList[msg.sender];
  }
}



