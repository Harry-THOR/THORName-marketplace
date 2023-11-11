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
        ) public {

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

        // Buy products


    }
}
