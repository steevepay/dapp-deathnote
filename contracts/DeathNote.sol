pragma solidity ^0.5.8;

import "./ownable.sol";
import "./safemath.sol";

contract DeathNote is Ownable {

     using SafeMath for uint256;
    event NewDeath(address owner, string _name, string _conditions, string _date, string _img);

    struct Death{
        address owner;
        string name;
        string conditions;
        string timeOfDeath;
        string img;
    }

    uint deathFee = 0.001 ether;
    Death[] public deaths;
    mapping(uint => address) public deathsOwner;
    mapping(address => uint) public deathsCounterOwner;

    function addDeath(string memory _name, string memory _conditions, string memory _date, string memory _img) public payable {
        require(msg.value >= deathFee, "Not enough funds.");
        uint id = deaths.push(Death(msg.sender, _name, _conditions, _date, _img));
        deathsOwner[id] = msg.sender;
        deathsCounterOwner[msg.sender] = deathsCounterOwner[msg.sender].add(1);
        emit NewDeath(msg.sender, _name, _conditions, _date, _img);
    }

    function getDeathsLength() public view returns (uint) {
        return deaths.length;
    }

    function setDeathFee(uint _fee) public onlyOwner {
        deathFee = _fee;
    }

    function getDeathFee() public view onlyOwner returns (uint){
        return deathFee;
    }

    function withdraw() public onlyOwner {
        address payable _owner = owner();
        _owner.transfer(address(this).balance);
    }
    
}