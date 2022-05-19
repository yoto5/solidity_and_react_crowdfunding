// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Project {
    address project_owner;
    string project_name;
    string project_description;
    uint256 target_amount;
    uint256 date_limit;
    string image_url;
    string[] types;
    uint256[] fixed_amounts_to_donate;

    address[] doners;
    mapping(address=>uint256) doner_to_amount;

    constructor(
        address owner,
        string memory name,
        string memory desc,
        uint256 target,
        uint256 end_date,
        string memory image_add,
        string[] memory types_arr,
        uint256[] memory amounts_to_donate) {
            project_owner = owner;
            project_name = name;
            project_description = desc;
            target_amount = target;
            date_limit = end_date;
            image_url = image_add;
            types = types_arr;
            fixed_amounts_to_donate = amounts_to_donate;

    }
    
    function fund_project() public payable {
        doner_to_amount[msg.sender] += msg.value;
        doners.push(msg.sender);
    }

    function return_funds_to_doners() public {

    }

    function owner_withdraw() public {

    }

    function is_success() public {

    }

    function is_fail() public {

    }

    function add_fix_amount(uint256 amount) public {

    }

    function remove_fix_amount(uint256 amount) public {

    }

    function add_type(string memory project_type) public {

    }

    
    function remove_type(string memory project_type) public {

    }

    function change_picture(string memory picture_url) public {

    }
}