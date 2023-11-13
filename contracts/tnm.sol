// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Tnm {
    address public owner;
    uint256 public productCount;

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

    struct Order {
        uint256 id;
        uint256 productId;
        uint256 quantity;
        uint256 cost;
        uint256 timestamp;
    }

    mapping(uint256 => Product) public products;
    // address is the key. Creates a uint256 for the number of orders that they have received.
    mapping(address => uint256) public orderCount;
    // Nested mapping to store orders
    mapping(address => mapping(uint256 => Order)) public orders; // uint here is the product count in each order?

    // Define the events
    event Withdraw(address owner, uint256 amount);
    event Buy(address indexed _buyer, uint256 _id, uint256 _quantity, uint256 _cost, uint256 _timestamp);
    event ProductListed(uint256 id, string name, string category, string image, uint256 cost, uint256 rating, uint256 stock );

    // check that  sender is owner of contract.
    // Apply this to the function: public onlyOwner {}
    modifier onlyOwner {
        require(msg.sender == owner, "Ownable: caller is not the owner");
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

    // Buy product
    function buy(uint256 _id) public payable { // Payable allows the function to receive Ether

        // Fetch the product
        Product memory product = products[_id];

        // Require that there is enough Ether in the transaction
        require(msg.value >= product.cost, "Not enough Ether sent");

        // Require that there is enough stock
        require(product.stock > 0, "Out of stock");

        // Fetch the order 
        Order memory order = Order(
            orderCount[msg.sender],
            product.id,
            1,
            product.cost,
            block.timestamp
        );

        // Add order for user
        orderCount[msg.sender] += 1; // Order ID
        orders[msg.sender][orderCount[msg.sender]] = order;

        // Subtract stock
        products[_id].stock = product.stock - 1;

        // Emit event
        emit Buy(msg.sender, orderCount[msg.sender], product.id, 1, product.cost);

    }

    // Withdraw funds
    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;
        (bool success, ) = payable(owner).call{value: amount}("");
        require(success, "Failed to send Ether");

        // Emit the event
        emit Withdraw(owner, amount);
    }

}
