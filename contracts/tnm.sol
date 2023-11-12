// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Tnm {
    address public owner;

    // List products
    struct Product {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount;

    event ProductListed(
        uint256 id,
        string name,
        string category,
        string image,
        uint256 cost,
        uint256 rating,
        uint256 stock
    );

    // check that  sender is owner of contract.
    // Apply this to the function: public onlyOwner {}
    modifier onlyOwner {
        require(msg.sender == owner);
        _; // This represents the function body. 
        // So the require statement must execute before the function body in this case.
    }

    constructor() {
        owner = msg.sender;
    }

    function list(
        uint256 _id,
        string memory _name, 
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
        ) public onlyOwner { 

        // Require a valid name
        require(bytes(_name).length > 0);
        // Require sender is equal to owner
        require(msg.sender == owner);

        // Create product structure
        Product memory product = Product(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );

        // Add product to blockchain
        products[_id] = product; 

        // Emit an event for tracking on the blockchain
        emit ProductListed(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );

    }
}
