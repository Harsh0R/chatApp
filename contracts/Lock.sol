// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

contract MyChatApp {


    struct friend{
        address pubkey;
        string name; 
    }
    struct user {
        string name;
        friend[] friendList;
    }

    struct message {
        address sender;
        uint timestamp;
        string msg;
    }

    struct AllUserStruck {
        string name;
        address acountAddress;
    }

    AllUserStruck[] getAllUsers;

    mapping (address => user) userList;
    mapping (bytes32 => message[]) allMessage;

    // check user exist or not
    function checkUserExist(address pubkey) public view returns(bool){
        return bytes(userList[pubkey].name).length > 0;
    }

    // create Account
    function createAccount(string calldata _name)  external {
        require(checkUserExist(msg.sender)==false,"USER ALREADY EXIST");
        require(bytes(_name).length > 0 , "USER NAME CAN NOT BE EMPTY");
        userList[msg.sender].name = _name;
        getAllUsers.push(AllUserStruck(_name,msg.sender));
    }

    // get user name
    function getUserName(address pubkey) external view returns (string memory) {
        // require(checkUserExist(pubkey), "USER NOT REGISTER");
        // return "HARSHrR";
        return userList[pubkey].name;
    }

    // add friends
    function addFriend(address friend_key , string calldata name) external {
        require(checkUserExist(friend_key),"Your friend does not register");
        require(checkUserExist(msg.sender),"Create account first");
        require(msg.sender!=friend_key , "User can not add themselves as friends");
        require(checkAlreadyFriend(msg.sender,friend_key)==false , "Thes users are already friends");

        _addFriend(msg.sender,friend_key,name);
        _addFriend(friend_key,msg.sender,userList[msg.sender].name);
                
    }

    // check friend is already your friend or not
     function checkAlreadyFriend(address myAddress , address friendAddress) internal view returns (bool) {
        if (userList[myAddress].friendList.length > userList[friendAddress].friendList.length) {
            address temp = myAddress;
            myAddress = friendAddress;
            friendAddress = temp;
        }

        for (uint i = 0; i < userList[myAddress].friendList.length; i++) {
            if (userList[myAddress].friendList[i].pubkey == friendAddress) {
                return true;
            }   
        }
        return false;
     }

    // add new friend in my friend list 
     function _addFriend(address me , address friend_key , string memory name) internal{
        friend memory newFriend = friend(friend_key,name);
        userList[me].friendList.push(newFriend);
     }

    //  show all my friend list 
    function getMyFriendList() external view returns (friend[] memory) {
        return userList[msg.sender].friendList;
    }

    // get chat code 
    function _getChatCode(address add1 , address add2) internal pure returns (bytes32) {
        if (add1 > add2) {
            return keccak256(abi.encodePacked(add1,add2));
        }else {
            return keccak256(abi.encodePacked(add2,add1));
        }
    }

    // send message
    function sendMessage(address friend_key , string calldata _msg) external {
        // require(checkUserExist(friend_key),"User in not registered");
        // require(checkUserExist(msg.sender),"First create your account");
        // require(checkAlreadyFriend(msg.sender,friend_key)==false , "You are not friend with given user");

        bytes32 msgCode = _getChatCode(msg.sender, friend_key);
        message memory newMessage = message(msg.sender,block.timestamp,_msg);
        allMessage[msgCode].push(newMessage);
    }

    // read message
    function readMessage(address friend_key) external view returns (message[] memory) {
        bytes32 msgCode = _getChatCode(msg.sender, friend_key);
        return allMessage[msgCode];
    }

    function getAllAppUsers() public view returns (AllUserStruck[] memory) {
        return getAllUsers;
    }


    
    // uint public unlockTime;
    // address payable public owner;

    // // event Withdrawal(uint amount, uint when);

    // constructor(uint _unlockTime) payable {
    //     require(
    //         block.timestamp < _unlockTime,
    //         "Unlock time should be in the future"
    //     );

    //     unlockTime = _unlockTime;
    //     owner = payable(msg.sender);
    // }


}

