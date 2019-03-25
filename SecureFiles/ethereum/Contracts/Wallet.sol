pragma solidity ^0.4.17;
contract WalletFactory{
    mapping(address => address) private wallets;
    mapping(address => bool) private users;
    function createWallet(string name,string email) public{
        require(!users[msg.sender]);
        address wallet = new Wallet(name,email,msg.sender);
        wallets[msg.sender] =  wallet;
        users[msg.sender] = true;
    }
    function getWallet() public view returns(address){
        require(users[msg.sender]);
        return wallets[msg.sender];
    }
}
contract Wallet{
    string public Name;
    address public manager;
    string public email;
    struct Image{
        string ipfsHash;
        string ipfsLink;
    }
    mapping(uint => Image) private images;
    uint public imagesCount;
    function Wallet(string _name ,string _email, address _manager) public{
        manager=_manager;
        email=_email;
        manager=_manager;
        Name = _name;
    }
    function addImage(string _ipfsHash, string _ipfsLink) public{
        images[imagesCount]=Image(_ipfsHash,_ipfsLink);
        imagesCount++;
    }
    function getImage(uint index) public view returns(string,string){
        return (images[index].ipfsHash,images[index].ipfsLink);
    }
}
