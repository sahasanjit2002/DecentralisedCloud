// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload {
    //this structure will store information about user those access is shared with others
    struct Access{
        address user;
        bool access; //true or false
    }

    //store images from every user where user address is the key and images(string[]) is the value 
    mapping (address => string[]) values;
    //this will store list of all users and the accounts with whom they shared access
    mapping (address => Access[]) accessList;
    //ownership will work same as accessList, this will used to update accesslist
    mapping (address => mapping (address => bool)) ownership;
    //this will store the previous state of the ownership
    mapping (address => mapping (address => bool)) previousState;

    //functions
    function add(address _user, string memory url) external {
        values[_user].push(url);
    }

    //try to access account of _user (my own account or another user's account is viewed by me i.e.[_user][msg.sender])
    function display(address _user) external view returns(string[] memory) {
        require(_user == msg.sender || ownership[_user][msg.sender],"You don't have access");
        return values[_user];
    }

    //grant access to another user (I'm giving access to user i.e.[msg.sender][user])
    function allow(address user) external{
        ownership[msg.sender][user] = true;
        if(previousState[msg.sender][user]){
            //means account is already present in accesslist but its access is false
            for (uint i=0; i<accessList[msg.sender].length; i++) 
            {
                if(accessList[msg.sender][i].user == user){
                    accessList[msg.sender][i].access = true;
                }
            }
        }else{
            //means acccount is not already present
            accessList[msg.sender].push(Access(user, true));
            previousState[msg.sender][user] = true;
        }
    }

    //revoke access from an user (I'm dening access to user i.e.[msg.sender][user]) 
    function disallow(address user) public{
        ownership[msg.sender][user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) 
        {
            if(accessList[msg.sender][i].user == user){
                accessList[msg.sender][i].access = false;
            }
        }
    }

    //display accesslist of a specific user
    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}