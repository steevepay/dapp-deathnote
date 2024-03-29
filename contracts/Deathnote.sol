pragma solidity ^0.5.8;

import  "./Ownable.sol";
import "./Safemath.sol";

contract Deathnote is Ownable {

  using SafeMath for uint256;
  event NewDeath(uint id, address owner, string name, string conditions, string timeOfDeath, string img);

  struct Death{
      address owner;
      string name;
      string conditions;
      string timeOfDeath;
      string img;
  }

  uint private deathFee = 0.001 ether;
  Death[] public deaths;
  mapping(uint => address) public deathsOwner;
  mapping(address => uint[]) public deathsNotesOwner;

  function addDeath(string memory _name, string memory _conditions, string memory _date, string memory _img) public payable {
      require(msg.value >= deathFee, "Not enough funds.");
      uint id = deaths.push(Death(msg.sender, _name, _conditions, _date, _img));
      deathsOwner[id] = msg.sender;
      deathsNotesOwner[msg.sender].push(id);
      emit NewDeath( id, msg.sender, _name, _conditions, _date, _img);
  }
  
  function getDeath(uint _id) public view returns (uint id, address owner, string memory name, string memory conditions, string memory timeOfDeath, string memory img) {
      require(_id >= 0 && _id < deaths.length);
      return(_id, deaths[_id].owner, deaths[_id].name, deaths[_id].conditions, deaths[_id].timeOfDeath, deaths[_id].img);
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

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function getOwnerNotes() public view returns (uint[] memory) {
      return deathsNotesOwner[msg.sender];
  }

  function getOwnerNotesLength() public view returns (uint) {
      return deathsNotesOwner[msg.sender].length;
  }

  function getOwnerNote(uint _id) public view returns (uint) {
      return deathsNotesOwner[msg.sender][_id];
  }
}