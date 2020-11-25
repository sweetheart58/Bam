pragma solidity >=0.4.21 <0.7.0;

contract Bam{
    
    string public name = 'Bam';
    
    
    struct Prescription {
        string fileId;
        string fileHash;
        uint uploadTime;
    }
    

    struct User{
        string name;
        string email;
        string utype;
        string licenseCode;
        uint age;
        string specialisation;
    }

    address[] userAddress;

    
    mapping(address => Prescription[]) public prescriptions;
    mapping(address => User) public users;
    
     event PrescriptionUpload(
        string fileId,
        string fileHash,
        uint uploadTime
  );
  
  constructor() public {
  }

  function pay(address payable _recipient,uint amount) external {
    _recipient.transfer(amount);
  }
  function addUser(string memory _name,string memory _email,string memory _type,string memory _licenseCode,uint _age,string memory _specialisation)public{

      userAddress.push(msg.sender);

      users[msg.sender] = User(_name,_email,_type,_licenseCode,_age,_specialisation);
      
  }

  function getUser() public view returns(string memory,string memory,string memory,string memory,uint,string memory){

      User memory usr = users[msg.sender];

      return (usr.name,usr.email,usr.utype,usr.licenseCode,usr.age,usr.specialisation);

  }

  function getUserof(address _address) view public returns(string memory,string memory,string memory,string memory,uint,string memory){
      User memory usr = users[_address];

      return (usr.name,usr.email,usr.utype,usr.licenseCode,usr.age,usr.specialisation);
  }
    
  function UploadPrescriptions(string memory _fileId,string memory _fileHash) public{

    require(bytes(_fileHash).length > 0);
    require(bytes(_fileId).length > 0);

    require(msg.sender!=address(0));

    
    prescriptions[msg.sender].push(Prescription(_fileId,_fileHash, now));


    emit PrescriptionUpload(_fileId,_fileHash,now);

  }
  
  function getCount() public view returns(uint){
      
    return prescriptions[msg.sender].length;
  }
    function getCountUsers() public view returns(uint){
      
    return userAddress.length;
  }

  function getAddress(uint _index) public view returns(address){

    return userAddress[_index];

  }
  
  function getFilesofUser(uint _index) public view returns(string memory,string memory,uint) {
      
      
      require(_index>=0);
      
      Prescription memory file = prescriptions[msg.sender][_index];
      
      return (file.fileId,file.fileHash,file.uploadTime);
    
  }

    function removeHash(string memory _fileId) public {
      
         Prescription[] storage f = prescriptions[msg.sender];
  
         for (uint i = 0; i < f.length; i++) {
             if (keccak256(abi.encodePacked(f[i].fileId)) == keccak256(abi.encodePacked(_fileId))) {
              
               delete prescriptions[msg.sender][i];
                 
             }
             
         }
  }
    
}